import { type SwitchState, SwitchStatus } from "@/backend";
import { SwitchPage } from "@/pages/SwitchPage";
import { actorState } from "@/test/state";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

describe("SwitchPage", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
  });

  it("shows DISARMED with arm controls when the switch is disarmed", async () => {
    const actor = createMockActor();
    actor.getSwitchState.mockResolvedValue({
      status: SwitchStatus.disarmed,
      cadenceSeconds: 0n,
    });
    actor.getSwitchTimeline.mockResolvedValue({
      status: SwitchStatus.disarmed,
      cadenceSeconds: 0n,
    });
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

  it("arms the switch end to end and shows ARMED with a check-in button", async () => {
    const actor = createMockActor();
    let state: SwitchState = {
      status: SwitchStatus.disarmed,
      cadenceSeconds: 0n,
    };
    actor.getSwitchState.mockImplementation(async () => state);
    actor.getSwitchTimeline.mockImplementation(async () => ({
      status: state.status,
      cadenceSeconds: state.cadenceSeconds,
    }));
    actor.armSwitch.mockImplementation(async (cadenceSeconds: bigint) => {
      state = {
        status: SwitchStatus.armed,
        cadenceSeconds,
        armedAt: 1n,
        lastCheckIn: 1n,
      };
      return state;
    });
    setActor(actor);

    const user = userEvent.setup();
    renderPage(<SwitchPage />);

    expect(await screen.findByText("DISARMED")).toBeInTheDocument();
    await user.click(
      screen.getAllByRole("button", { name: /Arm the switch/i })[0],
    );

    expect(actor.armSwitch).toHaveBeenCalledWith(604800n);
    expect(await screen.findByText("ARMED")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /I'm still here/i }),
    ).toBeInTheDocument();
  });

  it("checks in and disarms the switch", async () => {
    const actor = createMockActor();
    let state: SwitchState = {
      status: SwitchStatus.armed,
      cadenceSeconds: 604800n,
      armedAt: 1n,
      lastCheckIn: 1n,
    };
    actor.getSwitchState.mockImplementation(async () => state);
    actor.getSwitchTimeline.mockImplementation(async () => ({
      status: state.status,
      cadenceSeconds: state.cadenceSeconds,
      timeSinceLastCheckIn: 10n,
      timeUntilRelease: 604790n,
    }));
    actor.checkIn.mockImplementation(async () => {
      state = { ...state, lastCheckIn: 2n };
      return state;
    });
    actor.disarmSwitch.mockImplementation(async () => {
      state = {
        status: SwitchStatus.disarmed,
        cadenceSeconds: state.cadenceSeconds,
        lastCheckIn: 2n,
      };
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

  it("shows the release timeline when armed", async () => {
    const actor = createMockActor();
    actor.getSwitchState.mockResolvedValue({
      status: SwitchStatus.armed,
      cadenceSeconds: 604800n,
      armedAt: 1n,
      lastCheckIn: 1n,
    });
    actor.getSwitchTimeline.mockResolvedValue({
      status: SwitchStatus.armed,
      cadenceSeconds: 604800n,
      timeSinceLastCheckIn: 10n,
      timeUntilRelease: 604790n,
    });
    setActor(actor);

    renderPage(<SwitchPage />);

    expect(await screen.findByText("ARMED")).toBeInTheDocument();
    const statusCard = screen.getByTestId("switch.status_card");
    expect(within(statusCard).getByText(/Release in/)).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /Dead man's switch timeline/ }),
    ).toBeInTheDocument();
  });
});
