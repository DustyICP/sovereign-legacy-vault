import { type SwitchState, SwitchStatus, type SwitchTimeline } from "@/backend";
import { SwitchPage } from "@/pages/SwitchPage";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

function disarmedState(): SwitchState {
  return {
    status: SwitchStatus.disarmed,
    warningOnsetDays: 30n,
    warningRepeatDays: 7n,
    triggerDays: 180n,
  };
}

function armedState(): SwitchState {
  return {
    status: SwitchStatus.armed,
    warningOnsetDays: 30n,
    warningRepeatDays: 7n,
    triggerDays: 180n,
    armedAt: 1n,
    lastCheckIn: 1n,
  };
}

function disarmedTimeline(): SwitchTimeline {
  return {
    status: SwitchStatus.disarmed,
    warningOnsetDays: 30n,
    warningRepeatDays: 7n,
    triggerDays: 180n,
  };
}

function armedTimeline(): SwitchTimeline {
  return {
    status: SwitchStatus.armed,
    warningOnsetDays: 30n,
    warningRepeatDays: 7n,
    triggerDays: 180n,
    timeSinceLastCheckIn: 10n,
    timeUntilWarning: 2_592_000n,
    timeUntilTrigger: 15_552_000n,
  };
}

describe("SwitchPage (Timelines tab)", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
  });

  it("shows DISARMED with arm controls when the switch is disarmed", async () => {
    const actor = createMockActor();
    actor.getSwitchState.mockResolvedValue(disarmedState());
    actor.getSwitchTimeline.mockResolvedValue(disarmedTimeline());
    setActor(actor);

    renderPage(<SwitchPage />);

    expect(await screen.findByText("DISARMED")).toBeInTheDocument();
    expect(
      screen.getAllByRole("button", { name: /Arm the switch/i }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.queryByRole("button", { name: /I'm still here/i }),
    ).not.toBeInTheDocument();
  });

  it("arms the switch with three parameters and shows ARMED with a check-in button", async () => {
    const actor = createMockActor();
    let state: SwitchState = disarmedState();
    actor.getSwitchState.mockImplementation(async () => state);
    actor.getSwitchTimeline.mockImplementation(async () =>
      state.status === SwitchStatus.armed
        ? armedTimeline()
        : disarmedTimeline(),
    );
    actor.armSwitch.mockImplementation(
      async (
        warningOnsetDays: bigint,
        warningRepeatDays: bigint,
        triggerDays: bigint,
      ) => {
        state = {
          status: SwitchStatus.armed,
          warningOnsetDays,
          warningRepeatDays,
          triggerDays,
          armedAt: 1n,
          lastCheckIn: 1n,
        };
        return state;
      },
    );
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<SwitchPage />);

    expect(await screen.findByText("DISARMED")).toBeInTheDocument();
    await user.click(
      screen.getAllByRole("button", { name: /Arm the switch/i })[0],
    );

    expect(actor.armSwitch).toHaveBeenCalledWith(30n, 7n, 180n);
    expect(await screen.findByText("ARMED")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /I'm still here/i }),
    ).toBeInTheDocument();
  });

  it("checks in and disarms the switch", async () => {
    const actor = createMockActor();
    let state: SwitchState = armedState();
    actor.getSwitchState.mockImplementation(async () => state);
    actor.getSwitchTimeline.mockImplementation(async () => armedTimeline());
    actor.checkIn.mockImplementation(async () => {
      state = { ...state, lastCheckIn: 2n };
      return state;
    });
    actor.disarmSwitch.mockImplementation(async () => {
      state = disarmedState();
      return state;
    });
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<SwitchPage />);

    expect(await screen.findByText("ARMED")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /I'm still here/i }));
    expect(actor.checkIn).toHaveBeenCalledTimes(1);

    await user.click(screen.getAllByRole("button", { name: /Disarm/i })[0]);
    expect(actor.disarmSwitch).toHaveBeenCalledTimes(1);
    expect(await screen.findByText("DISARMED")).toBeInTheDocument();
  });

  it("shows the error state when the switch is unreachable", async () => {
    const actor = createMockActor();
    actor.getSwitchState.mockRejectedValue(new Error("boom"));
    actor.getSwitchTimeline.mockRejectedValue(new Error("boom"));
    setActor(actor);

    renderPage(<SwitchPage />);

    expect(await screen.findByText("Switch unreachable")).toBeInTheDocument();
    expect(
      screen.getByText(/couldn't read the switch state/i),
    ).toBeInTheDocument();
  });

  it("shows the warning and trigger timeline when armed", async () => {
    const actor = createMockActor();
    actor.getSwitchState.mockResolvedValue(armedState());
    actor.getSwitchTimeline.mockResolvedValue(armedTimeline());
    setActor(actor);

    renderPage(<SwitchPage />);

    expect(await screen.findByText("ARMED")).toBeInTheDocument();
    const statusCard = screen.getByTestId("timelines.status_card");
    expect(
      within(statusCard).getByText(/First warning in/),
    ).toBeInTheDocument();
    // "Vault triggers in" appears both in the timeline header and the scale
    // footer, so scope to the dedicated trigger element.
    expect(
      within(statusCard).getByTestId("timelines.time_until_trigger"),
    ).toHaveTextContent(/Vault triggers in/);
    expect(
      screen.getByRole("img", { name: /Inactivity timeline/ }),
    ).toBeInTheDocument();
  });
});
