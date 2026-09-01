import Blob "mo:core/Blob";
import List "mo:core/List";
import Nat "mo:core/Nat";
import Sha256 "mo:sha2/Sha256";
import Types "../types/vault";

module {
  public func getSwitchState(state : Types.SwitchStateInternal) : Types.SwitchState {
    {
      status = state.status;
      cadenceSeconds = state.cadenceSeconds;
      lastCheckIn = state.lastCheckIn;
      armedAt = state.armedAt;
    };
  };

  public func armSwitch(state : Types.SwitchStateInternal, cadenceSeconds : Nat, now : Types.Timestamp) : Types.SwitchState {
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

  public func removeBeneficiary(beneficiaries : List.List<Types.Beneficiary>, id : Nat) : Bool {
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