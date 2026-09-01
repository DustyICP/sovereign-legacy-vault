import { AssetsPage } from "@/pages/AssetsPage";
import { actorState } from "@/test/state";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it } from "vitest";

describe("AssetsPage", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
  });

  it("lists held assets with balances and beneficiary allocations", async () => {
    const actor = createMockActor();
    actor.listAssets.mockResolvedValue([
      {
        id: 0n,
        symbol: "ICP",
        name: "Internet Computer",
        balance: 125000000n,
        decimals: 8n,
        allocations: [
          { beneficiaryId: 0n, share: 60n },
          { beneficiaryId: 1n, share: 40n },
        ],
      },
    ]);
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
    setActor(actor);

    renderPage(<AssetsPage />);

    expect(await screen.findByText("Internet Computer")).toBeInTheDocument();
    expect(screen.getAllByText("ICP").length).toBeGreaterThan(0);
    expect(
      screen.getByText((content) => content.startsWith("1.25")),
    ).toBeInTheDocument();
    expect(screen.getByText("Beneficiary Allocation")).toBeInTheDocument();
    expect(screen.getByText("Ada")).toBeInTheDocument();
    expect(screen.getByText("Bob")).toBeInTheDocument();
    expect(screen.getByText("60%")).toBeInTheDocument();
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("shows the empty state when the vault holds no assets", async () => {
    const actor = createMockActor();
    actor.listAssets.mockResolvedValue([]);
    actor.listBeneficiaries.mockResolvedValue([]);
    setActor(actor);

    renderPage(<AssetsPage />);

    expect(await screen.findByText("No assets held")).toBeInTheDocument();
    expect(screen.getByText("Assets Held")).toBeInTheDocument();
  });

  it("shows the error state when the vault is unreachable", async () => {
    const actor = createMockActor();
    actor.listAssets.mockRejectedValue(new Error("boom"));
    actor.listBeneficiaries.mockResolvedValue([]);
    setActor(actor);

    renderPage(<AssetsPage />);

    expect(await screen.findByText("Vault unreachable")).toBeInTheDocument();
    const errorState = screen.getByTestId("assets.error_state");
    expect(
      within(errorState).getByText(/couldn't read the held assets/i),
    ).toBeInTheDocument();
  });
});
