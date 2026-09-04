import { WalletPage } from "@/pages/WalletPage";
import {
  createMockActor,
  renderPage,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { fireEvent, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Cover for the OISY wallet integration in the Wallet tab. The connection is
 * live and manual only: the UI never shows a connected state unless a real
 * OISY session was established. Every send is routed through OISY as an
 * ICRC-49 canister call to the token's ledger transfer, requiring the owner's
 * explicit approval in the OISY popup each time.
 *
 * The `@dfinity/oisy-wallet-signer/icrc-wallet` module is mocked at the seam
 * the hook uses (`IcrcWallet.connect`), so the tests exercise the real
 * WalletPage + useOisyWallet wiring against a fake signer session.
 *
 * The Radix `Select` primitive is replaced with a native `<select>` so the
 * send form's asset picker can be driven reliably in jsdom; the validation and
 * send-routing logic under test is unaffected.
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

vi.mock("@/components/ui/select", () => {
  const React = require("react");
  const Select = ({ value, onValueChange, children }: any) => {
    const options = React.Children.toArray(children)
      .flatMap((child: any) =>
        child?.props?.children
          ? React.Children.toArray(child.props.children)
          : [],
      )
      .filter((child: any) => child?.type?.displayName === "SelectItem")
      .map((child: any) => child.props);
    return (
      <select
        data-ocid="mock-select"
        value={value ?? ""}
        onChange={(e) => onValueChange?.(e.target.value)}
      >
        {options.map((opt: any) => (
          <option key={opt.value} value={opt.value}>
            {opt.children}
          </option>
        ))}
      </select>
    );
  };
  const SelectTrigger = ({ children, ...props }: any) => (
    <div data-testid="mock-select-trigger" {...props}>
      {children}
    </div>
  );
  const SelectValue = ({ placeholder }: any) => <span>{placeholder}</span>;
  const SelectContent = ({ children }: any) => <>{children}</>;
  const SelectItem = ({ value, children }: any) => (
    <option value={value}>{children}</option>
  );
  SelectItem.displayName = "SelectItem";
  return {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
  };
});

/** The send form's asset picker, scoped to the send section. */
function sendAssetSelect() {
  return within(screen.getByTestId("wallet.send")).getByTestId("mock-select");
}

/** A fake OISY signer session returned by `IcrcWallet.connect`. */
function makeWallet() {
  return {
    requestPermissions: requestPermissionsMock,
    accounts: accountsMock,
    transfer: transferMock,
    disconnect: disconnectMock,
  };
}

/** A syntactically valid principal so `Principal.fromText` succeeds in `send`. */
const VALID_RECIPIENT = "aaaaa-aa";

/** An ICP asset the vault holds, so it appears in the sendable asset picker. */
function icpAsset() {
  return {
    id: 0n,
    symbol: "ICP",
    name: "Internet Computer",
    balance: 100000000n, // 1 ICP
    decimals: 8n,
    allocations: [],
  };
}

describe("WalletPage OISY integration", () => {
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
      assets: [icpAsset()],
      depositAddress: "deposit-addr",
    });
    actor.getDepositAddress.mockResolvedValue("deposit-addr");
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);
    renderPage(<WalletPage />);
    return actor;
  }

  it("shows only the Connect Wallet action before a real OISY session exists", async () => {
    renderWallet();

    expect(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    ).toBeInTheDocument();
    // No connected badge and no send form until a real session is established.
    expect(
      screen.queryByTestId("wallet.connected_badge"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("wallet.send")).not.toBeInTheDocument();
    // The receive view falls back to the vault deposit address when disconnected.
    expect(await screen.findByText("deposit-addr")).toBeInTheDocument();
  });

  it("opens the OISY sign page and shows the connected account after approval", async () => {
    connectMock.mockResolvedValue(makeWallet());
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );

    // The connection handshake opens oisy.com/sign and requests ICRC-25
    // permissions, then reads the ICRC-27 account list.
    await waitFor(() => {
      expect(connectMock).toHaveBeenCalledWith(
        expect.objectContaining({ url: "https://oisy.com/sign" }),
      );
    });
    // The signer window features are passed as a plain string (the library's
    // DEFAULT_SIGNER_WINDOW_FEATURES), never as an object with position. The
    // object form computes popup geometry from `window.top`, which throws a
    // SecurityError inside a cross-origin iframe and aborts the handshake.
    const connectArgs = connectMock.mock.calls[0][0];
    expect(connectArgs.windowOptions).toBe(
      "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no",
    );
    expect(typeof connectArgs.windowOptions).toBe("string");
    expect(requestPermissionsMock).toHaveBeenCalled();
    expect(accountsMock).toHaveBeenCalled();

    // The connected state surfaces the OISY account identifier.
    const badge = await screen.findByTestId("wallet.connected_badge");
    expect(within(badge).getByText("owner-principal")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Disconnect" }),
    ).toBeInTheDocument();
  });

  it("awaits the OISY approval response before requesting the account list", async () => {
    // The connect-flow fix: the app must not request the ICRC-27 account list
    // until the user has approved the ICRC-25 permission prompt. If the account
    // request fired before the approval resolved, OISY would be left stuck on
    // 'Waiting for the dApp interaction...'.
    let resolvePermissions: (v: unknown) => void = () => {};
    requestPermissionsMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePermissions = resolve;
        }),
    );
    connectMock.mockResolvedValue(makeWallet());
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );

    // The approval prompt is requested, but the account list must NOT be
    // requested until the approval response arrives.
    await waitFor(() => expect(requestPermissionsMock).toHaveBeenCalled());
    expect(accountsMock).not.toHaveBeenCalled();
    // Still connecting: no connected badge until the handshake completes.
    expect(
      screen.queryByTestId("wallet.connected_badge"),
    ).not.toBeInTheDocument();

    // The user approves the prompt; only now does the account list get read.
    resolvePermissions(undefined);
    await waitFor(() => expect(accountsMock).toHaveBeenCalled());
    expect(
      await screen.findByTestId("wallet.connected_badge"),
    ).toBeInTheDocument();
  });

  it("shows a disabled Connecting state while the OISY handshake is in flight", async () => {
    // The connect promise never settles, so the UI must stay in the connecting
    // state: the button is disabled and labelled "Connecting to OISY…" until
    // the handshake resolves. This working in-flight state must survive the
    // connect-flow fix.
    connectMock.mockImplementation(
      () =>
        new Promise(() => {
          /* never resolves */
        }),
    );
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );

    const connecting = await screen.findByRole("button", {
      name: "Connecting to OISY…",
    });
    expect(connecting).toBeDisabled();
    // No connected badge and no send form while the handshake is pending.
    expect(
      screen.queryByTestId("wallet.connected_badge"),
    ).not.toBeInTheDocument();
    expect(screen.queryByTestId("wallet.send")).not.toBeInTheDocument();
  });

  it("does not show a connected state when the OISY handshake fails", async () => {
    connectMock.mockRejectedValue(new Error("user closed popup"));
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );

    // The connection never resolves, so the UI must stay disconnected.
    await waitFor(() => expect(connectMock).toHaveBeenCalled());
    expect(
      screen.queryByTestId("wallet.connected_badge"),
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Connect Wallet" }),
    ).toBeInTheDocument();
  });

  it("shows the connected OISY account as the receive address when connected", async () => {
    connectMock.mockResolvedValue(makeWallet());
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );
    await screen.findByTestId("wallet.connected_badge");

    // The receive view reflects the connected OISY account, not the vault
    // deposit address.
    const receive = screen.getByTestId("wallet.receive");
    expect(within(receive).getByText("owner-principal")).toBeInTheDocument();
    expect(within(receive).queryByText("deposit-addr")).not.toBeInTheDocument();
  });

  it("validates the send form: empty recipient, invalid amount, and over-balance", async () => {
    const user = userEvent.setup();
    connectMock.mockResolvedValue(makeWallet());
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );
    await screen.findByTestId("wallet.connected_badge");

    // Select the ICP asset, then submit with an empty recipient.
    await user.selectOptions(sendAssetSelect(), "0");
    fireEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(
      await screen.findByText("Enter a recipient account."),
    ).toBeInTheDocument();

    // Enter a recipient, then an invalid (zero) amount.
    await user.type(
      screen.getByTestId("wallet.send_recipient"),
      "recipient-principal",
    );
    await user.type(screen.getByTestId("wallet.send_amount"), "0");
    fireEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(
      await screen.findByText("Enter a valid amount greater than zero."),
    ).toBeInTheDocument();

    // Enter an amount exceeding the 1 ICP balance.
    await user.clear(screen.getByTestId("wallet.send_amount"));
    await user.type(screen.getByTestId("wallet.send_amount"), "2");
    fireEvent.click(screen.getByRole("button", { name: "Send" }));
    expect(
      await screen.findByText("Amount exceeds the available balance."),
    ).toBeInTheDocument();

    // No transfer was ever routed to OISY.
    expect(transferMock).not.toHaveBeenCalled();
  });

  it("enters a waiting-for-approval state while a send is pending", async () => {
    const user = userEvent.setup();
    connectMock.mockResolvedValue(makeWallet());
    let resolveTransfer: (v: bigint) => void = () => {};
    transferMock.mockImplementation(
      () =>
        new Promise<bigint>((resolve) => {
          resolveTransfer = resolve;
        }),
    );
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );
    await screen.findByTestId("wallet.connected_badge");
    await user.selectOptions(sendAssetSelect(), "0");
    await user.type(
      screen.getByTestId("wallet.send_recipient"),
      VALID_RECIPIENT,
    );
    await user.type(screen.getByTestId("wallet.send_amount"), "0.5");
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    // The send is routed to OISY and the UI shows the explicit approval state.
    await waitFor(() => expect(transferMock).toHaveBeenCalled());
    expect(
      await screen.findByText("Waiting for approval in OISY"),
    ).toBeInTheDocument();

    // Resolve the approval; the send completes and reflects the block index.
    resolveTransfer(42n);
    expect(
      await screen.findByText("Transfer confirmed on block 42."),
    ).toBeInTheDocument();
  });

  it("returns to the form with a clear message when the send is rejected", async () => {
    const user = userEvent.setup();
    connectMock.mockResolvedValue(makeWallet());
    transferMock.mockRejectedValue(new Error("User rejected the request"));
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );
    await screen.findByTestId("wallet.connected_badge");
    await user.selectOptions(sendAssetSelect(), "0");
    await user.type(
      screen.getByTestId("wallet.send_recipient"),
      VALID_RECIPIENT,
    );
    await user.type(screen.getByTestId("wallet.send_amount"), "0.5");
    fireEvent.click(screen.getByRole("button", { name: "Send" }));

    // The rejection surfaces the OISY-reported error and returns to the form.
    expect(await screen.findByText("Send cancelled")).toBeInTheDocument();
    expect(
      screen.getByText("The transfer was not approved in OISY."),
    ).toBeInTheDocument();
    // The form is available again for another attempt.
    expect(screen.getByTestId("wallet.send_amount")).toBeInTheDocument();
  });

  it("disconnects and returns the Wallet tab to the disconnected state", async () => {
    connectMock.mockResolvedValue(makeWallet());
    renderWallet();

    fireEvent.click(
      await screen.findByRole("button", { name: "Connect Wallet" }),
    );
    await screen.findByTestId("wallet.connected_badge");

    fireEvent.click(screen.getByRole("button", { name: "Disconnect" }));

    expect(disconnectMock).toHaveBeenCalled();
    await waitFor(() => {
      expect(
        screen.queryByTestId("wallet.connected_badge"),
      ).not.toBeInTheDocument();
    });
    expect(
      screen.getByRole("button", { name: "Connect Wallet" }),
    ).toBeInTheDocument();
    // The send form is no longer shown once disconnected.
    expect(screen.queryByTestId("wallet.send")).not.toBeInTheDocument();
  });
});
