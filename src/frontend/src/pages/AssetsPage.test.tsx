import { WalletPage } from "@/pages/WalletPage";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { fireEvent, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("WalletPage", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
    // The Wallet page pulls live USD prices from the CoinGecko feed. Stub the
    // network call so the suite never touches an external API.
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({ "internet-computer": { usd: 10 } }),
      }),
    );
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("lists held assets with balances and live USD values", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({
      assets: [
        {
          id: 0n,
          symbol: "ICP",
          name: "Internet Computer",
          balance: 125000000n,
          decimals: 8n,
          allocations: [],
        },
      ],
      depositAddress: "abc",
    });
    actor.getDepositAddress.mockResolvedValue("abc");
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);

    renderPage(<WalletPage />);

    expect(await screen.findByText("Internet Computer")).toBeInTheDocument();
    expect(screen.getAllByText("ICP").length).toBeGreaterThan(0);
    // 1.25 ICP at the stubbed $10 price = $12.50. The price feed is a separate
    // query from the balance, so wait for it to resolve. The same total also
    // appears in the portfolio snapshot, so match all occurrences.
    expect((await screen.findAllByText("$12.50")).length).toBeGreaterThan(0);
    // The 1.25 ICP balance appears both in the asset row and the dropdown
    // value, so match all occurrences.
    expect(
      screen.getAllByText((content) => content.startsWith("1.25")).length,
    ).toBeGreaterThan(0);
    // Portfolio snapshot reflects the same live total.
    const snapshot = screen.getByTestId("wallet.snapshot");
    expect(within(snapshot).getByText("Portfolio Value")).toBeInTheDocument();
    expect(await within(snapshot).findByText("$12.50")).toBeInTheDocument();
  });

  it("shows the empty state when the vault holds no assets", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({
      assets: [],
      depositAddress: "",
    });
    actor.getDepositAddress.mockResolvedValue("");
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);

    renderPage(<WalletPage />);

    expect(await screen.findByText("No assets held")).toBeInTheDocument();
    expect(screen.getByText("No transactions yet")).toBeInTheDocument();
  });

  it("shows the deposit address and its QR code in the receive view", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({
      assets: [],
      depositAddress: "rrkah-fqaaa-aaaaa-aaaaq-cai",
    });
    actor.getDepositAddress.mockResolvedValue("rrkah-fqaaa-aaaaa-aaaaq-cai");
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);

    renderPage(<WalletPage />);

    expect(
      await screen.findByText("rrkah-fqaaa-aaaaa-aaaaq-cai"),
    ).toBeInTheDocument();
    // The QR code is an SVG rendered by react-qr-code carrying the aria-label;
    // query it by label rather than role since the svg is not exposed as an img.
    expect(
      screen.getByLabelText("QR code encoding the vault deposit address"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Copy address" }),
    ).toBeInTheDocument();
  });

  it("copies the deposit address to the clipboard from the receive view", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(window.navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({
      assets: [],
      depositAddress: "rrkah-fqaaa-aaaaa-aaaaq-cai",
    });
    actor.getDepositAddress.mockResolvedValue("rrkah-fqaaa-aaaaa-aaaaq-cai");
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);

    renderPage(<WalletPage />);

    const copyButton = await screen.findByRole("button", {
      name: "Copy address",
    });
    fireEvent.click(copyButton);
    expect(writeText).toHaveBeenCalledWith("rrkah-fqaaa-aaaaa-aaaaq-cai");
  });

  it("shows the error state when the wallet is unreachable", async () => {
    const actor = createMockActor();
    actor.getWalletBalance.mockRejectedValue(new Error("boom"));
    setActor(actor);

    renderPage(<WalletPage />);

    expect(await screen.findByText("Vault unreachable")).toBeInTheDocument();
    const errorState = screen.getByTestId("wallet.error_state");
    expect(
      within(errorState).getByText(
        "We couldn't read the wallet. Please try again.",
      ),
    ).toBeInTheDocument();
  });
});
