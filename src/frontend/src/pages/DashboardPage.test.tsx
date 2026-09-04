import { SwitchStatus } from "@/backend";
import { DashboardPage } from "@/pages/DashboardPage";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("DashboardPage legacy re-export", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
  });

  it("renders the Overview summary through the legacy Dashboard route", async () => {
    const actor = createMockActor();
    actor.getOverview.mockResolvedValue({
      switchStatus: SwitchStatus.disarmed,
      totalAllocationShare: 0n,
      recentActivity: [],
      beneficiaryCount: 0n,
      vaultBalance: { assets: [], depositAddress: "" },
      timeline: {
        status: SwitchStatus.disarmed,
        warningOnsetDays: 30n,
        warningRepeatDays: 7n,
        triggerDays: 180n,
      },
    });
    setActor(actor);

    renderPage(<DashboardPage />, { withRouter: true });

    const balanceCard = await screen.findByTestId("overview.balance");
    expect(within(balanceCard).getByText("Vault Balance")).toBeInTheDocument();
    expect(
      within(balanceCard).getByText("No assets held yet"),
    ).toBeInTheDocument();
  });
});
