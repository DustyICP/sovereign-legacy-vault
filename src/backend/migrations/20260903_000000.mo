import AccessControl "mo:caffeineai-authorization/access-control";
import List "mo:core/List";

module {
  type Timestamp = Int;

  type SwitchStatus = {
    #armed;
    #disarmed;
  };

  type OldSwitchStateInternal = {
    var status : SwitchStatus;
    var cadenceSeconds : Nat;
    var lastCheckIn : ?Timestamp;
    var armedAt : ?Timestamp;
  };

  type NewSwitchStateInternal = {
    var status : SwitchStatus;
    var warningOnsetDays : Nat;
    var warningRepeatDays : Nat;
    var triggerDays : Nat;
    var lastCheckIn : ?Timestamp;
    var armedAt : ?Timestamp;
  };

  type Beneficiary = {
    id : Nat;
    name : Text;
    allocationShare : Nat;
    walletAddress : Text;
    createdAt : Timestamp;
  };

  type AssetAllocation = {
    beneficiaryId : Nat;
    share : Nat;
  };

  type Asset = {
    id : Nat;
    symbol : Text;
    name : Text;
    balance : Nat;
    decimals : Nat;
    allocations : [AssetAllocation];
  };

  type AuditEvent = {
    id : Nat;
    timestamp : Timestamp;
    eventType : Text;
    description : Text;
    prevHash : Blob;
    hash : Blob;
  };

  type VaultIds = {
    var nextBeneficiaryId : Nat;
    var nextAssetId : Nat;
    var nextAuditEventId : Nat;
  };

  type OldActor = {
    accessControlState : AccessControl.AccessControlState;
    switchState : OldSwitchStateInternal;
    beneficiaries : List.List<Beneficiary>;
    assets : List.List<Asset>;
    auditEvents : List.List<AuditEvent>;
    ids : VaultIds;
  };

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    switchState : NewSwitchStateInternal;
    beneficiaries : List.List<Beneficiary>;
    assets : List.List<Asset>;
    auditEvents : List.List<AuditEvent>;
    ids : VaultIds;
  };

  public func migration(old : OldActor) : NewActor {
    // The old single cadence (in seconds) was the release time. Map it to the
    // new trigger day count, and derive the warning onset/repeat from it so the
    // switch keeps a sensible inactivity timeline after the upgrade.
    let cadenceDays = if (old.switchState.cadenceSeconds < 86_400) { 1 } else { old.switchState.cadenceSeconds / 86_400 };
    let triggerDays = cadenceDays;
    let warningOnsetDays = if (triggerDays < 2) { 1 } else { triggerDays / 2 };
    let warningRepeatDays = if (triggerDays < 4) { 1 } else { triggerDays / 4 };
    {
      accessControlState = old.accessControlState;
      switchState = {
        var status = old.switchState.status;
        var warningOnsetDays;
        var warningRepeatDays;
        var triggerDays;
        var lastCheckIn = old.switchState.lastCheckIn;
        var armedAt = old.switchState.armedAt;
      };
      beneficiaries = old.beneficiaries;
      assets = old.assets;
      auditEvents = old.auditEvents;
      ids = old.ids;
    };
  };
};
