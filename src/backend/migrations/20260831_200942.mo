import AccessControl "mo:caffeineai-authorization/access-control";
import List "mo:core/List";

module {
  type Timestamp = Int;

  type SwitchStatus = {
    #armed;
    #disarmed;
  };

  type SwitchStateInternal = {
    var status : SwitchStatus;
    var cadenceSeconds : Nat;
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

  type OldActor = {};

  type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    switchState : SwitchStateInternal;
    beneficiaries : List.List<Beneficiary>;
    assets : List.List<Asset>;
    auditEvents : List.List<AuditEvent>;
    ids : VaultIds;
  };

  public func migration(_old : OldActor) : NewActor {
    {
      accessControlState = AccessControl.initState();
      switchState = {
        var status = #disarmed;
        var cadenceSeconds = 0;
        var lastCheckIn = null;
        var armedAt = null;
      };
      beneficiaries = List.empty();
      assets = List.empty();
      auditEvents = List.empty();
      ids = {
        var nextBeneficiaryId = 0;
        var nextAssetId = 0;
        var nextAuditEventId = 0;
      };
    };
  };
};
