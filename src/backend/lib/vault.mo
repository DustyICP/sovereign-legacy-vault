import Blob "mo:core/Blob";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Sha256 "mo:sha2/Sha256";
import Types "../types/vault";

module {
  // A wallet address is optional (blank means no wallet is set). When present it
  // must be either a 64-hex-character ICP account identifier or a valid ICP
  // principal. Anything else is rejected as malformed (hard block).
  public func validateWalletAddress(address : Text) {
    if (address.size() == 0) {
      return;
    };
    if (address.size() == 64) {
      for (c in address.chars()) {
        let code = c.toNat32();
        let isHex = (code >= 0x30 and code <= 0x39) or (code >= 0x61 and code <= 0x66) or (code >= 0x41 and code <= 0x46);
        if (not isHex) {
          Runtime.trap("Invalid wallet address: account identifier must be exactly 64 hexadecimal characters");
        };
      };
      return;
    };
    // Not blank and not a 64-hex account identifier: must be a valid ICP
    // principal. Principal.fromText traps on malformed input.
    ignore Principal.fromText(address);
  };

  public func totalAllocationShare(beneficiaries : List.List<Types.Beneficiary>, excludeId : ?Nat) : Nat {
    var total = 0;
    for (b in beneficiaries.toArray().values()) {
      let excluded = switch (excludeId) { case (?id) b.id == id; case null false };
      if (not excluded) { total += b.allocationShare };
    };
    total
  };
  public func getSwitchState(state : Types.SwitchStateInternal) : Types.SwitchState {
    {
      status = state.status;
      cadenceSeconds = state.cadenceSeconds;
      lastCheckIn = state.lastCheckIn;
      armedAt = state.armedAt;
    };
  };

  public func armSwitch(
    state : Types.SwitchStateInternal,
    cadenceSeconds : Nat,
    now : Types.Timestamp,
  ) : Types.SwitchState {
    if (cadenceSeconds == 0 or cadenceSeconds > 31_536_000) {
      Runtime.trap("Invalid cadence: must be between 1 and 31536000 seconds");
    };
    state.status := #armed;
    state.cadenceSeconds := cadenceSeconds;
    state.lastCheckIn := ?now;
    state.armedAt := ?now;
    getSwitchState(state);
  };

  public func disarmSwitch(state : Types.SwitchStateInternal, now : Types.Timestamp) : Types.SwitchState {
    state.status := #disarmed;
    state.lastCheckIn := ?now;
    getSwitchState(state);
  };

  public func checkIn(state : Types.SwitchStateInternal, now : Types.Timestamp) : Types.SwitchState {
    state.lastCheckIn := ?now;
    getSwitchState(state);
  };

  public func getSwitchTimeline(state : Types.SwitchStateInternal, now : Types.Timestamp) : Types.SwitchTimeline {
    switch (state.status, state.lastCheckIn) {
      case (#armed, ?last) {
        let since = (now - last).toNat() / 1_000_000_000;
        let cadence = state.cadenceSeconds;
        let remaining = if (since < cadence) { Nat.sub(cadence, since) } else { 0 };
        {
          status = #armed;
          timeSinceLastCheckIn = ?since;
          timeUntilRelease = ?remaining;
          cadenceSeconds = cadence;
        };
      };
      case (_, _) {
        {
          status = state.status;
          timeSinceLastCheckIn = null;
          timeUntilRelease = null;
          cadenceSeconds = state.cadenceSeconds;
        };
      };
    };
  };

  public func addBeneficiary(
    beneficiaries : List.List<Types.Beneficiary>,
    nextId : Nat,
    name : Text,
    allocationShare : Nat,
    walletAddress : Text,
    now : Types.Timestamp,
  ) : Types.Beneficiary {
    validateWalletAddress(walletAddress);
    let total = totalAllocationShare(beneficiaries, null);
    if (total + allocationShare > 100) {
      Runtime.trap("Invalid allocation: total allocation share would exceed 100%");
    };
    let beneficiary : Types.Beneficiary = {
      id = nextId;
      name;
      allocationShare;
      walletAddress;
      createdAt = now;
    };
    beneficiaries.add(beneficiary);
    beneficiary
  };

  public func listBeneficiaries(beneficiaries : List.List<Types.Beneficiary>) : [Types.Beneficiary] {
    beneficiaries.toArray()
  };

  public func updateBeneficiary(
    beneficiaries : List.List<Types.Beneficiary>,
    id : Nat,
    name : Text,
    allocationShare : Nat,
    walletAddress : Text,
  ) : ?Types.Beneficiary {
    switch (beneficiaries.find(func b = b.id == id)) {
      case (?b) {
        validateWalletAddress(walletAddress);
        let total = totalAllocationShare(beneficiaries, ?id);
        if (total + allocationShare > 100) {
          Runtime.trap("Invalid allocation: total allocation share would exceed 100%");
        };
        let updated : Types.Beneficiary = {
          id = b.id;
          name;
          allocationShare;
          walletAddress;
          createdAt = b.createdAt;
        };
        let snapshot = beneficiaries.toArray();
        beneficiaries.clear();
        for (beneficiary in snapshot.values()) {
          if (beneficiary.id == id) {
            beneficiaries.add(updated);
          } else {
            beneficiaries.add(beneficiary);
          };
        };
        ?updated;
      };
      case null { null };
    };
  };

  public func removeBeneficiary(
    beneficiaries : List.List<Types.Beneficiary>,
    assets : List.List<Types.Asset>,
    id : Nat,
  ) : Bool {
    var removed = false;
    let snapshot = beneficiaries.toArray();
    beneficiaries.clear();
    for (beneficiary in snapshot.values()) {
      if (beneficiary.id == id) {
        removed := true;
      } else {
        beneficiaries.add(beneficiary);
      };
    };
    if (removed) {
      let assetSnapshot = assets.toArray();
      assets.clear();
      for (asset in assetSnapshot.values()) {
        let filtered = asset.allocations.filter(func a = a.beneficiaryId != id);
        assets.add({ asset with allocations = filtered });
      };
    };
    removed
  };

  public func addAsset(
    assets : List.List<Types.Asset>,
    nextId : Nat,
    symbol : Text,
    name : Text,
    balance : Nat,
    decimals : Nat,
    allocations : [Types.AssetAllocation],
    now : Types.Timestamp,
  ) : Types.Asset {
    ignore now;
    let asset : Types.Asset = {
      id = nextId;
      symbol;
      name;
      balance;
      decimals;
      allocations;
    };
    assets.add(asset);
    asset
  };

  public func listAssets(assets : List.List<Types.Asset>) : [Types.Asset] {
    assets.toArray()
  };

  public func getWalletBalance(assets : List.List<Types.Asset>) : Types.WalletBalance {
    {
      assets = assets.toArray();
      totalUsd = null;
    };
  };

  public func appendAuditEvent(
    auditEvents : List.List<Types.AuditEvent>,
    nextId : Nat,
    eventType : Text,
    description : Text,
    now : Types.Timestamp,
  ) : Types.AuditEvent {
    let prevHash = switch (auditEvents.last()) {
      case (?event) event.hash;
      case null Blob.empty();
    };
    let hash = Sha256.fromBlob(
      #sha256,
      nextId.toText().encodeUtf8().toArray()
        .concat(now.toText().encodeUtf8().toArray())
        .concat(eventType.encodeUtf8().toArray())
        .concat(description.encodeUtf8().toArray())
        .concat(prevHash.toArray())
        .toBlob(),
    );
    let event : Types.AuditEvent = {
      id = nextId;
      timestamp = now;
      eventType;
      description;
      prevHash;
      hash;
    };
    auditEvents.add(event);
    event
  };

  public func listAuditEvents(auditEvents : List.List<Types.AuditEvent>) : [Types.AuditEvent] {
    auditEvents.toArray()
  };
};