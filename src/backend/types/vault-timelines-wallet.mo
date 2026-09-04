import VaultTypes "../types/vault";

module {
  public type Timestamp = VaultTypes.Timestamp;
  public type SwitchStatus = VaultTypes.SwitchStatus;
  public type Asset = VaultTypes.Asset;
  public type AuditEvent = VaultTypes.AuditEvent;
  public type Beneficiary = VaultTypes.Beneficiary;

  // The three separately configurable inactivity parameters that replace the
  // single cadenceSeconds on the dead man's switch.
  public type TimelineConfig = {
    // Days of inactivity before the first email warning goes out.
    warningOnsetDays : Nat;
    // How frequently subsequent warnings repeat after the first one.
    warningRepeatDays : Nat;
    // Total days of inactivity before the vault triggers and releases to
    // beneficiaries.
    triggerDays : Nat;
  };

  public type SwitchState = {
    status : SwitchStatus;
    warningOnsetDays : Nat;
    warningRepeatDays : Nat;
    triggerDays : Nat;
    lastCheckIn : ?Timestamp;
    armedAt : ?Timestamp;
  };

  public type SwitchStateInternal = {
    var status : SwitchStatus;
    var warningOnsetDays : Nat;
    var warningRepeatDays : Nat;
    var triggerDays : Nat;
    var lastCheckIn : ?Timestamp;
    var armedAt : ?Timestamp;
  };

  public type SwitchTimeline = {
    status : SwitchStatus;
    timeSinceLastCheckIn : ?Nat;
    timeUntilWarning : ?Nat;
    timeUntilTrigger : ?Nat;
    warningOnsetDays : Nat;
    warningRepeatDays : Nat;
    triggerDays : Nat;
  };

  public type WalletBalance = {
    assets : [Asset];
    totalUsd : ?Nat;
    depositAddress : Text;
  };

  public type Overview = {
    vaultBalance : WalletBalance;
    beneficiaryCount : Nat;
    totalAllocationShare : Nat;
    switchStatus : SwitchStatus;
    timeline : SwitchTimeline;
    recentActivity : [AuditEvent];
  };
};
