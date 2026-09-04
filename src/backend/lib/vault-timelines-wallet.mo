import List "mo:core/List";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Types "../types/vault-timelines-wallet";

module {
  // Seconds in one day, used to convert the day-based inactivity parameters
  // into the second-based timeline deltas the API reports.
  let SECONDS_PER_DAY = 86_400;

  public func getSwitchState(state : Types.SwitchStateInternal) : Types.SwitchState {
    {
      status = state.status;
      warningOnsetDays = state.warningOnsetDays;
      warningRepeatDays = state.warningRepeatDays;
      triggerDays = state.triggerDays;
      lastCheckIn = state.lastCheckIn;
      armedAt = state.armedAt;
    };
  };

  public func armSwitch(
    state : Types.SwitchStateInternal,
    warningOnsetDays : Nat,
    warningRepeatDays : Nat,
    triggerDays : Nat,
    now : Types.Timestamp,
  ) : Types.SwitchState {
    if (warningOnsetDays == 0 or warningRepeatDays == 0 or triggerDays == 0) {
      Runtime.trap("Invalid timeline: all three inactivity parameters must be at least 1 day");
    };
    if (warningOnsetDays >= triggerDays) {
      Runtime.trap("Invalid timeline: warning onset must occur before the trigger day");
    };
    state.status := #armed;
    state.warningOnsetDays := warningOnsetDays;
    state.warningRepeatDays := warningRepeatDays;
    state.triggerDays := triggerDays;
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
        let onset = state.warningOnsetDays * SECONDS_PER_DAY;
        let trigger = state.triggerDays * SECONDS_PER_DAY;
        let untilWarning = if (since < onset) { Nat.sub(onset, since) } else { 0 };
        let untilTrigger = if (since < trigger) { Nat.sub(trigger, since) } else { 0 };
        {
          status = #armed;
          timeSinceLastCheckIn = ?since;
          timeUntilWarning = ?untilWarning;
          timeUntilTrigger = ?untilTrigger;
          warningOnsetDays = state.warningOnsetDays;
          warningRepeatDays = state.warningRepeatDays;
          triggerDays = state.triggerDays;
        };
      };
      case (_, _) {
        {
          status = state.status;
          timeSinceLastCheckIn = null;
          timeUntilWarning = null;
          timeUntilTrigger = null;
          warningOnsetDays = state.warningOnsetDays;
          warningRepeatDays = state.warningRepeatDays;
          triggerDays = state.triggerDays;
        };
      };
    };
  };

  // The deposit address is the vault's own ICP account/principal.
  public func getDepositAddress(principal : Principal) : Text {
    principal.toText()
  };

  public func getWalletBalance(assets : List.List<Types.Asset>, depositAddress : Text) : Types.WalletBalance {
    {
      assets = assets.toArray();
      totalUsd = null;
      depositAddress;
    };
  };

  public func getOverview(
    assets : List.List<Types.Asset>,
    beneficiaries : List.List<Types.Beneficiary>,
    state : Types.SwitchStateInternal,
    auditEvents : List.List<Types.AuditEvent>,
    now : Types.Timestamp,
    depositAddress : Text,
  ) : Types.Overview {
    let beneficiaryCount = beneficiaries.size();
    var totalAllocationShare = 0;
    for (b in beneficiaries.toArray().values()) {
      totalAllocationShare += b.allocationShare;
    };
    let allEvents = auditEvents.toArray();
    let recentActivity = if (allEvents.size() > 5) {
      allEvents.sliceToArray(allEvents.size().toInt() - 5, allEvents.size().toInt())
    } else {
      allEvents
    };
    {
      vaultBalance = getWalletBalance(assets, depositAddress);
      beneficiaryCount;
      totalAllocationShare;
      switchStatus = state.status;
      timeline = getSwitchTimeline(state, now);
      recentActivity;
    };
  };
};
