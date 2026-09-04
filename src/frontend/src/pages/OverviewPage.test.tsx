import { type Overview, SwitchStatus } from "@/backend";
import { OverviewPage } from "@/pages/OverviewPage";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

function makeOverview(overrides: Partial<Overview> = {}): Overview {
  return {
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
    ...overrides,
  };
}

describe("OverviewPage", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
  });

  it("shows balance, beneficiary count, and switch status snapshot cards", async () => {
    const actor = createMockActor();
    actor.getOverview.mockResolvedValue(
      makeOverview({
        beneficiaryCount: 2n,
        totalAllocationShare: 100n,
        switchStatus: SwitchStatus.armed,
        vaultBalance: {
          assets: [
            {
              id: 1n,
              symbol: "ICP",
              name: "Internet Computer",
              balance: 125000000n,
              decimals: 8n,
              allocations: [],
            },
          ],
          depositAddress: "abc",
        },
        timeline: {
          status: SwitchStatus.armed,
          warningOnsetDays: 30n,
          warningRepeatDays: 7n,
          triggerDays: 180n,
          timeUntilWarning: 2_592_000n,
          timeUntilTrigger: 15_552_000n,
        },
      }),
    );
    setActor(actor);

    renderPage(<OverviewPage />, { withRouter: true });

    const balanceCard = await screen.findByTestId("overview.balance");
    expect(within(balanceCard).getByText("Vault Balance")).toBeInTheDocument();
    expect(
      within(balanceCard).getByText((content) => content.startsWith("1.25")),
    ).toBeInTheDocument();
    expect(
      within(balanceCard).getByText("1 asset(s) held"),
    ).toBeInTheDocument();

    const beneficiariesCard = screen.getByTestId("overview.beneficiaries");
    expect(
      within(beneficiariesCard).getByText("Beneficiaries"),
    ).toBeInTheDocument();
    expect(
      within(beneficiariesCard).getByText("2 beneficiary(ies) sealed"),
    ).toBeInTheDocument();
    // The allocation snapshot renders the total share with the "allocated" label.
    expect(within(beneficiariesCard).getByText("100%")).toBeInTheDocument();
    expect(
      within(beneficiariesCard).getByText("allocated"),
    ).toBeInTheDocument();

    const switchCard = screen.getByTestId("overview.switch");
    expect(within(switchCard).getByText("The Switch")).toBeInTheDocument();
    expect(within(switchCard).getByText("Armed")).toBeInTheDocument();
  });

  it("shows the switch status as disarmed when the backend reports disarmed", async () => {
    const actor = createMockActor();
    actor.getOverview.mockResolvedValue(makeOverview());
    setActor(actor);

    renderPage(<OverviewPage />, { withRouter: true });

    const switchCard = await screen.findByTestId("overview.switch");
    expect(within(switchCard).getByText("Disarmed")).toBeInTheDocument();
  });

  it("shows empty states when the vault holds nothing", async () => {
    const actor = createMockActor();
    actor.getOverview.mockResolvedValue(makeOverview());
    setActor(actor);

    renderPage(<OverviewPage />, { withRouter: true });

    expect(await screen.findByText("No assets held yet")).toBeInTheDocument();
    expect(screen.getByText("No beneficiaries yet")).toBeInTheDocument();
  });

  it("renders the condensed recent-activity feed with a link to the full audit ledger", async () => {
    const actor = createMockActor();
    actor.getOverview.mockResolvedValue(
      makeOverview({
        recentActivity: [
          {
            id: 0n,
            timestamp: 1_700_000_000_000_000_000n,
            eventType: "SECURITY",
            description: "Vault armed",
            prevHash: new Uint8Array([0]),
            hash: new Uint8Array([1]),
          },
          {
            id: 1n,
            timestamp: 1_700_000_100_000_000_000n,
            eventType: "VERIFICATION",
            description: "Check-in recorded",
            prevHash: new Uint8Array([1]),
            hash: new Uint8Array([2]),
          },
        ],
      }),
    );
    setActor(actor);

    renderPage(<OverviewPage />, { withRouter: true });

    expect(await screen.findByText("Vault armed")).toBeInTheDocument();
    expect(screen.getByText("Check-in recorded")).toBeInTheDocument();
    expect(screen.getByText("SECURITY")).toBeInTheDocument();
    expect(screen.getByText("VERIFICATION")).toBeInTheDocument();
    // The condensed feed links through to the full sealed audit ledger.
    expect(screen.getByRole("link", { name: "Audit Logs" })).toHaveAttribute(
      "href",
      "/overview/audit",
    );
  });

  it("shows the error state when the overview is unreachable", async () => {
    const actor = createMockActor();
    actor.getOverview.mockRejectedValue(new Error("boom"));
    setActor(actor);

    renderPage(<OverviewPage />, { withRouter: true });

    expect(await screen.findByText("Ledger unreachable")).toBeInTheDocument();
    expect(
      screen.getByText(/couldn't read the audit ledger/i),
    ).toBeInTheDocument();
  });
});
