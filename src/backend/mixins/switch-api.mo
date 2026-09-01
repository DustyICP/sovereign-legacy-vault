import Runtime "mo:core/Runtime";
import Time "mo:core/Time";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/vault";
import VaultLib "../lib/vault";

mixin (
  accessControlState : AccessControl.AccessControlState,
  state : Types.SwitchStateInternal,
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
    VaultLib.armSwitch(state, cadenceSeconds, Time.now());
  };

  public shared ({ caller }) func disarmSwitch() : async Types.SwitchState {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultLib.disarmSwitch(state, Time.now());
  };

  public shared ({ caller }) func checkIn() : async Types.SwitchState {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultLib.checkIn(state, Time.now());
  };

  public query ({ caller }) func getSwitchTimeline() : async Types.SwitchTimeline {
    if (not AccessControl.hasPermission(accessControlState, caller, #user)) {
      Runtime.trap("Unauthorized");
    };
    VaultLib.getSwitchTimeline(state, Time.now());
  };
};
