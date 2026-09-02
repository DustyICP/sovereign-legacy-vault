import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/vault";
import VaultLib "../lib/vault";

mixin (
  accessControlState : AccessControl.AccessControlState,
  beneficiaries : List.List<Types.Beneficiary>,
  assets : List.List<Types.Asset>,
  auditEvents : List.List<Types.AuditEvent>,
  ids : Types.VaultIds,
) {
  public shared ({ caller }) func addBeneficiary(
    name : Text,
    allocationShare : Nat,
    walletAddress : Text,
  ) : async Types.Beneficiary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let beneficiary = VaultLib.addBeneficiary(beneficiaries, ids.nextBeneficiaryId, name, allocationShare, walletAddress, Time.now());
    ids.nextBeneficiaryId += 1;
    ignore VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, "beneficiary_added", "Beneficiary '" # name # "' added with allocation share " # allocationShare.toText() # "%", Time.now());
    ids.nextAuditEventId += 1;
    beneficiary
  };

  public query ({ caller }) func listBeneficiaries() : async [Types.Beneficiary] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultLib.listBeneficiaries(beneficiaries)
  };

  public shared ({ caller }) func updateBeneficiary(
    id : Nat,
    name : Text,
    allocationShare : Nat,
    walletAddress : Text,
  ) : async ?Types.Beneficiary {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let updated = VaultLib.updateBeneficiary(beneficiaries, id, name, allocationShare, walletAddress);
    switch (updated) {
      case (?b) {
        ignore VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, "beneficiary_updated", "Beneficiary '" # name # "' (id " # id.toText() # ") updated with allocation share " # allocationShare.toText() # "%", Time.now());
        ids.nextAuditEventId += 1;
      };
      case null {};
    };
    updated
  };

  public shared ({ caller }) func removeBeneficiary(id : Nat) : async Bool {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let removed = VaultLib.removeBeneficiary(beneficiaries, assets, id);
    if (removed) {
      ignore VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, "beneficiary_removed", "Beneficiary (id " # id.toText() # ") removed and its asset allocations cleaned up", Time.now());
      ids.nextAuditEventId += 1;
    };
    removed
  };

  public shared ({ caller }) func addAsset(
    symbol : Text,
    name : Text,
    balance : Nat,
    decimals : Nat,
    allocations : [Types.AssetAllocation],
  ) : async Types.Asset {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let asset = VaultLib.addAsset(assets, ids.nextAssetId, symbol, name, balance, decimals, allocations, Time.now());
    ids.nextAssetId += 1;
    ignore VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, "asset_added", "Asset '" # name # "' (" # symbol # ") added with balance " # balance.toText(), Time.now());
    ids.nextAuditEventId += 1;
    asset
  };

  public query ({ caller }) func listAssets() : async [Types.Asset] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultLib.listAssets(assets)
  };

  public query ({ caller }) func getWalletBalance() : async Types.WalletBalance {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultLib.getWalletBalance(assets)
  };

  public shared ({ caller }) func appendAuditEvent(
    eventType : Text,
    description : Text,
  ) : async Types.AuditEvent {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let event = VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, eventType, description, Time.now());
    ids.nextAuditEventId += 1;
    event
  };

  public query ({ caller }) func listAuditEvents() : async [Types.AuditEvent] {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultLib.listAuditEvents(auditEvents)
  };
};
