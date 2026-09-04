import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import VaultTypes "../types/vault";
import Types "../types/vault-timelines-wallet";
import VaultLib "../lib/vault";
import VaultTimelinesWalletLib "../lib/vault-timelines-wallet";

mixin (
  accessControlState : AccessControl.AccessControlState,
  state : Types.SwitchStateInternal,
  beneficiaries : List.List<Types.Beneficiary>,
  assets : List.List<Types.Asset>,
  auditEvents : List.List<Types.AuditEvent>,
  ids : VaultTypes.VaultIds,
) {
  public query ({ caller }) func getSwitchState() : async Types.SwitchState {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultTimelinesWalletLib.getSwitchState(state);
  };

  public shared ({ caller }) func armSwitch(
    warningOnsetDays : Nat,
    warningRepeatDays : Nat,
    triggerDays : Nat,
  ) : async Types.SwitchState {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let result = VaultTimelinesWalletLib.armSwitch(state, warningOnsetDays, warningRepeatDays, triggerDays, Time.now());
    ignore VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, "switch_armed", "Switch armed: warning after " # warningOnsetDays.toText() # " days, repeating every " # warningRepeatDays.toText() # " days, triggering after " # triggerDays.toText() # " days", Time.now());
    ids.nextAuditEventId += 1;
    result
  };

  public shared ({ caller }) func disarmSwitch() : async Types.SwitchState {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let result = VaultTimelinesWalletLib.disarmSwitch(state, Time.now());
    ignore VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, "switch_disarmed", "Switch disarmed", Time.now());
    ids.nextAuditEventId += 1;
    result
  };

  public shared ({ caller }) func checkIn() : async Types.SwitchState {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let result = VaultTimelinesWalletLib.checkIn(state, Time.now());
    ignore VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, "switch_checked_in", "Switch check-in recorded; inactivity clock reset", Time.now());
    ids.nextAuditEventId += 1;
    result
  };

  public query ({ caller }) func getSwitchTimeline() : async Types.SwitchTimeline {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultTimelinesWalletLib.getSwitchTimeline(state, Time.now());
  };

  public query ({ caller }) func getDepositAddress() : async Text {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultTimelinesWalletLib.getDepositAddress(caller);
  };

  public query ({ caller }) func getWalletBalance() : async Types.WalletBalance {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultTimelinesWalletLib.getWalletBalance(assets, caller.toText());
  };

  public query ({ caller }) func getOverview() : async Types.Overview {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultTimelinesWalletLib.getOverview(assets, beneficiaries, state, auditEvents, Time.now(), caller.toText());
  };
};
