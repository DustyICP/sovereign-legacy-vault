module {
  public type Timestamp = Int;

  public type SwitchStatus = {
    #armed;
    #disarmed;
  };

  public type SwitchState = {
    status : SwitchStatus;
    cadenceSeconds : Nat;
    lastCheckIn : ?Timestamp;
    armedAt : ?Timestamp;
  };

  public type SwitchStateInternal = {
    var status : SwitchStatus;
    var cadenceSeconds : Nat;
    var lastCheckIn : ?Timestamp;
    var armedAt : ?Timestamp;
  };

  public type SwitchTimeline = {
    status : SwitchStatus;
    timeSinceLastCheckIn : ?Nat;
    timeUntilRelease : ?Nat;
    cadenceSeconds : Nat;
  };

  public type Beneficiary = {
    id : Nat;
    name : Text;
    allocationShare : Nat;
    walletAddress : Text;
    createdAt : Timestamp;
  };

  public type AssetAllocation = {
    beneficiaryId : Nat;
    share : Nat;
  };

  public type Asset = {
    id : Nat;
    symbol : Text;
    name : Text;
    balance : Nat;
    decimals : Nat;
    allocations : [AssetAllocation];
  };

  public type WalletBalance = {
    assets : [Asset];
    totalUsd : ?Nat;
  };

  public type AuditEvent = {
    id : Nat;
    timestamp : Timestamp;
    eventType : Text;
    description : Text;
    prevHash : Blob;
    hash : Blob;
  };

  public type VaultIds = {
    var nextBeneficiaryId : Nat;
    var nextAssetId : Nat;
    var nextAuditEventId : Nat;
  };
};
