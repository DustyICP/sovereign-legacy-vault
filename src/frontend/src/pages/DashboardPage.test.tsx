import { SwitchStatus } from "@/backend";
import { DashboardPage } from "@/pages/DashboardPage";
import { actorState } from "@/test/state";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("DashboardPage", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
  });

  it("shows balance, beneficiary count, and allocation summary cards", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({
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
    });
    actor.listBeneficiaries.mockResolvedValue([
      {
        id: 0n,
        name: "Ada",
        allocationShare: 60n,
        walletAddress: "addr-1",
        createdAt: 1n,
      },
      {
        id: 1n,
        name: "Bob",
        allocationShare: 40n,
        walletAddress: "addr-2",
        createdAt: 2n,
      },
    ]);
    actor.getSwitchState.mockResolvedValue({
      status: SwitchStatus.armed,
      cadenceSeconds: 604800n,
      armedAt: 1n,
      lastCheckIn: 1n,
    });
    setActor(actor);

    renderPage(<DashboardPage />);

    const balanceCard = await screen.findByTestId("dashboard.balance");
    expect(within(balanceCard).getByText("Vault Balance")).toBeInTheDocument();
    expect(
      within(balanceCard).getByText((content) => content.startsWith("1.25")),
    ).toBeInTheDocument();
    expect(within(balanceCard).getByText("1 asset held")).toBeInTheDocument();

    const beneficiariesCard = screen.getByTestId("dashboard.beneficiaries");
    expect(
      within(beneficiariesCard).getByText("Beneficiaries"),
    ).toBeInTheDocument();
    // Assert the count is shown with the corrected pluralization
    // (production renders "2 beneficiaries sealed").
    expect(
      within(beneficiariesCard).getByText(/2 beneficiaries? sealed/),
    ).toBeInTheDocument();

    const allocationCard = screen.getByTestId("dashboard.allocation");
    expect(
      within(allocationCard).getByText("Beneficiary Allocation"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: "Beneficiary allocation shares" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Ada · 60%")).toBeInTheDocument();
    expect(screen.getByText("Bob · 40%")).toBeInTheDocument();
  });

  it("pluralizes the sealed beneficiary count correctly", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({ assets: [] });
    actor.listBeneficiaries.mockResolvedValue([
      {
        id: 0n,
        name: "Ada",
        allocationShare: 100n,
        walletAddress: "addr-1",
        createdAt: 1n,
      },
    ]);
    actor.getSwitchState.mockResolvedValue({
      status: SwitchStatus.disarmed,
      cadenceSeconds: 0n,
    });
    setActor(actor);

    renderPage(<DashboardPage />);

    const beneficiariesCard = await screen.findByTestId(
      "dashboard.beneficiaries",
    );
    expect(
      within(beneficiariesCard).getByText("1 beneficiary sealed"),
    ).toBeInTheDocument();
    expect(
      within(beneficiariesCard).queryByText(/beneficiaries sealed/),
    ).not.toBeInTheDocument();
  });

  it("shows the switch status as armed when the backend reports armed", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({ assets: [] });
    actor.listBeneficiaries.mockResolvedValue([]);
    actor.getSwitchState.mockResolvedValue({
      status: SwitchStatus.armed,
      cadenceSeconds: 604800n,
      armedAt: 1n,
      lastCheckIn: 1n,
    });
    setActor(actor);

    renderPage(<DashboardPage />);

    const switchCard = await screen.findByTestId("dashboard.switch");
    expect(await within(switchCard).findByText("Armed")).toBeInTheDocument();
  });

  it("shows the switch status as disarmed when the backend reports disarmed", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({ assets: [] });
    actor.listBeneficiaries.mockResolvedValue([]);
    actor.getSwitchState.mockResolvedValue({
      status: SwitchStatus.disarmed,
      cadenceSeconds: 0n,
    });
    setActor(actor);

    renderPage(<DashboardPage />);

    const switchCard = await screen.findByTestId("dashboard.switch");
    expect(within(switchCard).getByText("Disarmed")).toBeInTheDocument();
  });

  it("shows empty states when the vault holds nothing", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({ assets: [] });
    actor.listBeneficiaries.mockResolvedValue([]);
    actor.getSwitchState.mockResolvedValue({
      status: SwitchStatus.disarmed,
      cadenceSeconds: 0n,
    });
    setActor(actor);

    renderPage(<DashboardPage />);

    expect(await screen.findByText("No assets held yet")).toBeInTheDocument();
    expect(screen.getByText("No beneficiaries yet")).toBeInTheDocument();
    expect(
      screen.getByText("No allocations yet. Add a beneficiary to begin."),
    ).toBeInTheDocument();
  });
});
