import List "mo:core/List";
import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/vault";
import VaultLib "../lib/vault";

mixin (
  accessControlState : AccessControl.AccessControlState,
  state : Types.SwitchStateInternal,
  auditEvents : List.List<Types.AuditEvent>,
  ids : Types.VaultIds,
) {
  public query ({ caller }) func getSwitchState() : async Types.SwitchState {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultLib.getSwitchState(state);
  };

  public shared ({ caller }) func armSwitch(cadenceSeconds : Nat) : async Types.SwitchState {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let result = VaultLib.armSwitch(state, cadenceSeconds, Time.now());
    ignore VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, "switch_armed", "Switch armed with check-in cadence of " # cadenceSeconds.toText() # " seconds", Time.now());
    ids.nextAuditEventId += 1;
    result
  };

  public shared ({ caller }) func disarmSwitch() : async Types.SwitchState {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let result = VaultLib.disarmSwitch(state, Time.now());
    ignore VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, "switch_disarmed", "Switch disarmed", Time.now());
    ids.nextAuditEventId += 1;
    result
  };

  public shared ({ caller }) func checkIn() : async Types.SwitchState {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    let result = VaultLib.checkIn(state, Time.now());
    ignore VaultLib.appendAuditEvent(auditEvents, ids.nextAuditEventId, "switch_checked_in", "Switch check-in recorded", Time.now());
    ids.nextAuditEventId += 1;
    result
  };

  public query ({ caller }) func getSwitchTimeline() : async Types.SwitchTimeline {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultLib.getSwitchTimeline(state, Time.now());
  };
};
