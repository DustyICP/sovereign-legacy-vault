import { useOisyWallet } from "@/hooks/use-oisy-wallet";
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Characterization of the `useOisyWallet` hook's behavior that must survive
 * the OISY Connect Wallet connection-flow fix. The connect handshake itself
 * (how `IcrcWallet.connect` is invoked, the permission/account ordering, the
 * signer window options) is the behavior under investigation and is NOT frozen
 * here. Instead these tests protect the seams around it that the fix must not
 * disturb:
 *
 *  - the send guard: no transfer is ever routed unless a real session exists;
 *  - the disconnect path: tearing down with no session is a no-op, not a throw;
 *  - the connect idempotency guard: an in-flight or completed connect is not
 *    re-entered.
 *
 * The `@dfinity/oisy-wallet-signer/icrc-wallet` module is mocked at the seam
 * the hook uses (`IcrcWallet.connect`), so the tests exercise the real hook
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

describe("useOisyWallet characterization (send guard + disconnect + connect idempotency)", () => {
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
  });

  it("refuses to send when no OISY session is connected", async () => {
    const { result } = renderHook(() => useOisyWallet());

    // No session exists, so a send must be refused without touching the signer.
    const outcome = await act(async () =>
      result.current.send({
        ledgerCanisterId: "ryjl3-tyaaa-aaaaa-aaaba-cai",
        to: "aaaaa-aa",
        amount: 100000000n,
      }),
    );

    expect(outcome).toEqual({ ok: false, error: "Wallet is not connected" });
    expect(transferMock).not.toHaveBeenCalled();
  });

  it("disconnecting with no session is a no-op and does not throw", async () => {
    const { result } = renderHook(() => useOisyWallet());

    await expect(
      act(async () => result.current.disconnect()),
    ).resolves.toBeUndefined();
    // No signer session was ever created, so nothing is torn down.
    expect(disconnectMock).not.toHaveBeenCalled();
    expect(result.current.connectionState).toBe("disconnected");
  });

  it("does not re-enter the connect handshake once a session is connected", async () => {
    connectMock.mockResolvedValue(makeWallet());
    const { result } = renderHook(() => useOisyWallet());

    const first = await act(async () => result.current.connect());
    expect(first).toEqual({ owner: "owner-principal", subaccount: [] });
    expect(connectMock).toHaveBeenCalledTimes(1);

    // A second connect while already connected returns the same account and
    // does not open another signer session.
    const second = await act(async () => result.current.connect());
    expect(second).toEqual({ owner: "owner-principal", subaccount: [] });
    expect(connectMock).toHaveBeenCalledTimes(1);
  });

  it("does not re-enter the connect handshake while one is in flight", async () => {
    let resolveConnect: (w: ReturnType<typeof makeWallet>) => void = () => {};
    connectMock.mockImplementation(
      () =>
        new Promise<ReturnType<typeof makeWallet>>((resolve) => {
          resolveConnect = resolve;
        }),
    );
    const { result } = renderHook(() => useOisyWallet());

    // Start a connect that never settles yet.
    let pending: Promise<unknown>;
    act(() => {
      pending = result.current.connect();
    });

    // A second connect while the first is in flight must not open another
    // signer session.
    await act(async () => {
      await result.current.connect();
    });
    expect(connectMock).toHaveBeenCalledTimes(1);

    // Resolve the in-flight handshake; the connected account surfaces.
    await act(async () => {
      resolveConnect(makeWallet());
      await pending;
    });
    expect(result.current.connectionState).toBe("connected");
    expect(result.current.account).toEqual({
      owner: "owner-principal",
      subaccount: [],
    });
  });
});
