import { useOisyWallet } from "@/hooks/use-oisy-wallet";
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Cover for the OISY connect-flow fix: the handshake must be bounded so a
 * stalled or failed permission/account sequence resets to disconnected instead
 * of hanging forever on 'Waiting for the dApp interaction...'. Also covers the
 * diagnostic tracing added to the connect flow: [OISY]-prefixed console logs
 * and a manual window message listener that logs postMessage events from the
 * OISY signer origin while the handshake is in flight.
 *
 * The `logIfSlow` diagnostic wrapper attaches a `.catch(() => {})` to its
 * `.finally()` chain so a rejected permission promise (e.g. the user closes the
 * OISY popup) does not surface as an unhandled rejection. The rejection-path
 * tests below assert the reset behavior without any process-level rejection
 * handler, because the hook itself now absorbs the derived rejection.
 *
 * The `@dfinity/oisy-wallet-signer/icrc-wallet` module is mocked at the seam
 * the hook uses (`IcrcWallet.connect`), so these tests exercise the real hook
 * wiring against a fake signer session.
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

describe("useOisyWallet connect-flow timeout and error reset", () => {
  beforeEach(() => {
    connectMock.mockReset();
    requestPermissionsMock.mockReset().mockResolvedValue(undefined);
    accountsMock
      .mockReset()
      .mockResolvedValue([{ owner: "owner-principal", subaccount: [] }]);
    transferMock.mockReset();
    disconnectMock.mockReset().mockResolvedValue(undefined);
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.useRealTimers();
  });

  it("resets to disconnected when the handshake stalls past the bounded timeout", async () => {
    vi.useFakeTimers();
    // The permission prompt is requested but never answered, so the handshake
    // stalls exactly as it did before the fix (stuck on 'Waiting for the dApp
    // interaction...').
    requestPermissionsMock.mockImplementation(() => new Promise(() => {}));
    connectMock.mockResolvedValue(makeWallet());
    const { result } = renderHook(() => useOisyWallet());

    let connectPromise!: Promise<unknown>;
    act(() => {
      connectPromise = result.current.connect();
    });

    // Attach the rejection handler before the timer fires so the timeout
    // rejection is never left unhandled.
    const rejection = expect(connectPromise).rejects.toThrow(/timed out/);

    // Flush the microtask chain so `IcrcWallet.connect` resolves and the
    // permission prompt is requested (without advancing the 90s timer).
    await act(async () => {});

    // The handshake is in flight and the approval prompt was requested.
    expect(result.current.connectionState).toBe("connecting");
    expect(requestPermissionsMock).toHaveBeenCalled();

    // Advance past the bounded connect timeout (90s). The stalled handshake
    // must reset to disconnected rather than hang forever.
    await act(async () => {
      await vi.advanceTimersByTimeAsync(90_000);
    });

    expect(result.current.connectionState).toBe("disconnected");
    expect(result.current.account).toBeNull();
    // The connect promise rejects with the timeout error.
    await rejection;
  });

  it("resets to disconnected when the permission request is rejected", async () => {
    // The user closes the OISY popup / rejects the permission prompt.
    requestPermissionsMock.mockRejectedValue(new Error("user closed popup"));
    connectMock.mockResolvedValue(makeWallet());
    const { result } = renderHook(() => useOisyWallet());

    await expect(act(async () => result.current.connect())).rejects.toThrow(
      "user closed popup",
    );

    // The failed handshake resets to disconnected and never fakes a connected
    // state.
    expect(result.current.connectionState).toBe("disconnected");
    expect(result.current.account).toBeNull();
    expect(accountsMock).not.toHaveBeenCalled();
  });

  it("resets to disconnected when the account-list request fails", async () => {
    // The approval succeeds but the ICRC-27 account-list request errors.
    requestPermissionsMock.mockResolvedValue(undefined);
    accountsMock.mockRejectedValue(new Error("signer unreachable"));
    connectMock.mockResolvedValue(makeWallet());
    const { result } = renderHook(() => useOisyWallet());

    await expect(act(async () => result.current.connect())).rejects.toThrow(
      "signer unreachable",
    );

    expect(result.current.connectionState).toBe("disconnected");
    expect(result.current.account).toBeNull();
  });

  it("keeps the connected state when a spurious onDisconnect fires right after connect", async () => {
    // The OISY signer fires onDisconnect when its popup closes right after a
    // successful handshake. That popup-close event must not clobber the
    // freshly-connected state (the connectedRef guard).
    connectMock.mockResolvedValue(makeWallet());
    const { result } = renderHook(() => useOisyWallet());

    await act(async () => result.current.connect());
    expect(result.current.connectionState).toBe("connected");
    expect(result.current.account).toEqual({
      owner: "owner-principal",
      subaccount: [],
    });

    // Capture the onDisconnect callback the hook registered with the signer and
    // fire it, exactly as the signer does when its popup closes after connect.
    const onDisconnect = connectMock.mock.calls[0][0].onDisconnect;
    expect(typeof onDisconnect).toBe("function");
    act(() => {
      onDisconnect();
    });

    // The spurious popup-close event must NOT reset the connected state.
    expect(result.current.connectionState).toBe("connected");
    expect(result.current.account).toEqual({
      owner: "owner-principal",
      subaccount: [],
    });
  });

  it("still resets to disconnected on a genuine user-initiated disconnect", async () => {
    connectMock.mockResolvedValue(makeWallet());
    const { result } = renderHook(() => useOisyWallet());

    await act(async () => result.current.connect());
    expect(result.current.connectionState).toBe("connected");

    // A real disconnect (the user clicking Disconnect) must reset the panel.
    await act(async () => result.current.disconnect());
    expect(result.current.connectionState).toBe("disconnected");
    expect(result.current.account).toBeNull();
    expect(disconnectMock).toHaveBeenCalled();
  });

  it("logs [OISY] diagnostics through a successful connect", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    connectMock.mockResolvedValue(makeWallet());
    const { result } = renderHook(() => useOisyWallet());

    await act(async () => result.current.connect());

    // Every diagnostic line carries the shared [OISY] prefix.
    const oisyCalls = logSpy.mock.calls.filter(
      ([prefix]) => prefix === "[OISY]",
    );
    expect(oisyCalls.length).toBeGreaterThan(0);
    const joined = oisyCalls.map(([, ...rest]) => rest.join(" ")).join("\n");
    expect(joined).toContain("connect: opening OISY signer window");
    expect(joined).toContain(
      "requestPermissions: requesting ICRC-25 permissions",
    );
    expect(joined).toContain("accounts: requesting ICRC-27 account list");
    expect(joined).toContain("connect: connected");

    logSpy.mockRestore();
  });

  it("logs postMessage events from the OISY origin while the handshake is in flight and removes the listener after", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    let resolvePermissions: (v: unknown) => void = () => {};
    requestPermissionsMock.mockImplementation(
      () =>
        new Promise((resolve) => {
          resolvePermissions = resolve;
        }),
    );
    connectMock.mockResolvedValue(makeWallet());
    const { result } = renderHook(() => useOisyWallet());

    let connectPromise!: Promise<unknown>;
    act(() => {
      connectPromise = result.current.connect();
    });
    await act(async () => {});
    expect(result.current.connectionState).toBe("connecting");

    // A postMessage from the OISY signer origin is logged while the handshake
    // is in flight.
    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          origin: "https://oisy.com/sign",
          data: { jsonrpc: "2.0", id: 1 },
        }),
      );
    });
    expect(logSpy).toHaveBeenCalledWith(
      "[OISY]",
      expect.stringContaining("postMessage from OISY origin"),
      expect.stringContaining("jsonrpc"),
    );

    // Complete the handshake; the message listener is removed.
    resolvePermissions(undefined);
    await act(async () => {
      await connectPromise;
    });
    expect(result.current.connectionState).toBe("connected");

    // A postMessage after the handshake settles is no longer logged.
    logSpy.mockClear();
    act(() => {
      window.dispatchEvent(
        new MessageEvent("message", {
          origin: "https://oisy.com/sign",
          data: { jsonrpc: "2.0", id: 2 },
        }),
      );
    });
    expect(logSpy).not.toHaveBeenCalledWith(
      "[OISY]",
      expect.stringContaining("postMessage from OISY origin"),
    );

    logSpy.mockRestore();
  });
});
