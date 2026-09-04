import { WalletPage } from "@/pages/WalletPage";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import {
  act,
  fireEvent,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Characterization of the OISY Account panel (the connection card) on the
 * Wallet tab. This is the baseline captured before the connect-flow change:
 * after a successful OISY connect the panel must switch from the disconnected
 * 'Connect your OISY wallet...' state to the connected view showing the
 * resolved account address and a Disconnect option. The fix must preserve this
 * transition — it must not leave the panel stuck on the disconnected state
 * after a successful connect.
 *
 * The `@dfinity/oisy-wallet-signer/icrc-wallet` module is mocked at the seam
 * the hook uses (`IcrcWallet.connect`), so the tests exercise the real
 * WalletPage + useOisyWallet wiring against a fake signer session.
 */
const connectMock = vi.hoisted(() => vi.fn());
const requestPermissionsMock = vi.hoisted(() => vi.fn());
const accountsMock = vi.hoisted(() => vi.fn());
const transferMock = vi.hoisted(() => vi.fn());
const disconnectMock = vi.hoisted(() => vi.fn());

vi.mock("@dfinity/oisy-wallet-signer/icrc-wallet", () => ({
  IcrcWallet: {
    connect: connectMock,
  },
}));

/** A fake OISY signer session returned by `IcrcWallet.connect`. */
function makeWallet() {
  return {
    requestPermissions: requestPermissionsMock,
    accounts: accountsMock,
    transfer: transferMock,
    disconnect: disconnectMock,
  };
}

describe("WalletPage OISY Account panel characterization", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
    // The Wallet page pulls live USD prices from the CoinGecko feed. Stub the
    // network call so the suite never touches an external API.
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => ({}),
      }),
    );
    connectMock.mockReset();
    requestPermissionsMock.mockReset().mockResolvedValue(undefined);
    accountsMock
      .mockReset()
      .mockResolvedValue([{ owner: "owner-principal", subaccount: [] }]);
    transferMock.mockReset();
    disconnectMock.mockReset().mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  function renderWallet() {
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({
      assets: [],
      depositAddress: "deposit-addr",
    });
    actor.getDepositAddress.mockResolvedValue("deposit-addr");
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);
    renderPage(<WalletPage />);
    return actor;
  }

  it("shows the disconnected OISY Account panel before any connect", async () => {
    renderWallet();

    const panel = await screen.findByTestId("wallet.connection");
    // The disconnected state explains the OISY connection and offers Connect.
    expect(
      within(panel).getByText(
        "Connect your OISY wallet to send assets from the vault. A popup will open at oisy.com for you to approve the connection.",
      ),
    ).toBeInTheDocument();
    expect(
      within(panel).getByRole("button", { name: "Connect Wallet" }),
    ).toBeInTheDocument();
    // No connected badge and no Disconnect option while disconnected.
    expect(
      within(panel).queryByTestId("wallet.connected_badge"),
    ).not.toBeInTheDocument();
    expect(
      within(panel).queryByRole("button", { name: "Disconnect" }),
    ).not.toBeInTheDocument();
  });

  it("switches the OISY Account panel to the connected view after a successful connect", async () => {
    connectMock.mockResolvedValue(makeWallet());
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );

    // The panel must render the connected state: the resolved account address
    // and a Disconnect option, not the disconnected 'Connect your OISY
    // wallet...' state.
    const panel = await screen.findByTestId("wallet.connection");
    const badge = await within(panel).findByTestId("wallet.connected_badge");
    expect(within(badge).getByText("owner-principal")).toBeInTheDocument();
    expect(
      within(panel).getByRole("button", { name: "Disconnect" }),
    ).toBeInTheDocument();
    // The disconnected description is gone once connected.
    expect(
      within(panel).queryByText(
        "Connect your OISY wallet to send assets from the vault. A popup will open at oisy.com for you to approve the connection.",
      ),
    ).not.toBeInTheDocument();
    expect(
      within(panel).queryByRole("button", { name: "Connect Wallet" }),
    ).not.toBeInTheDocument();
  });

  it("keeps the panel connected when a spurious onDisconnect fires right after connect", async () => {
    connectMock.mockResolvedValue(makeWallet());
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );
    const panel = await screen.findByTestId("wallet.connection");
    await within(panel).findByTestId("wallet.connected_badge");

    // The OISY signer fires onDisconnect when its popup closes right after a
    // successful handshake. Capture that callback and fire it to simulate the
    // spurious popup-close event.
    const onDisconnect = connectMock.mock.calls[0][0].onDisconnect;
    expect(typeof onDisconnect).toBe("function");
    act(() => {
      onDisconnect();
    });

    // The spurious event must NOT reset the panel back to disconnected.
    expect(
      within(panel).getByTestId("wallet.connected_badge"),
    ).toBeInTheDocument();
    expect(within(panel).getByText("owner-principal")).toBeInTheDocument();
    expect(
      within(panel).getByRole("button", { name: "Disconnect" }),
    ).toBeInTheDocument();
    expect(
      within(panel).queryByRole("button", { name: "Connect Wallet" }),
    ).not.toBeInTheDocument();
  });

  it("resets the panel to disconnected on a genuine user-initiated disconnect", async () => {
    connectMock.mockResolvedValue(makeWallet());
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );
    const panel = await screen.findByTestId("wallet.connection");
    await within(panel).findByTestId("wallet.connected_badge");

    // A real disconnect (the user clicking Disconnect) must reset the panel.
    fireEvent.click(within(panel).getByRole("button", { name: "Disconnect" }));

    await waitFor(() => {
      expect(
        within(panel).queryByTestId("wallet.connected_badge"),
      ).not.toBeInTheDocument();
    });
    expect(
      within(panel).getByRole("button", { name: "Connect Wallet" }),
    ).toBeInTheDocument();
    expect(
      within(panel).queryByRole("button", { name: "Disconnect" }),
    ).not.toBeInTheDocument();
  });

  it("keeps the panel disconnected when the connect handshake fails", async () => {
    connectMock.mockRejectedValue(new Error("user closed popup"));
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );

    // A failed handshake must not fake a connected state: the panel stays on
    // the disconnected view.
    await waitFor(() => expect(connectMock).toHaveBeenCalled());
    const panel = screen.getByTestId("wallet.connection");
    expect(
      within(panel).queryByTestId("wallet.connected_badge"),
    ).not.toBeInTheDocument();
    expect(
      within(panel).getByRole("button", { name: "Connect Wallet" }),
    ).toBeInTheDocument();
  });
});
