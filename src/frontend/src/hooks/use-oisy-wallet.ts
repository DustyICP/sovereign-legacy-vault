import type {
  OisyAccount,
  OisyConnectionState,
  OisySendResult,
} from "@/lib/types";
import { DEFAULT_SIGNER_WINDOW_FEATURES } from "@dfinity/oisy-wallet-signer";
import { IcrcWallet } from "@dfinity/oisy-wallet-signer/icrc-wallet";
import { Principal } from "@icp-sdk/core/principal";
import { useCallback, useRef, useState } from "react";

/** The OISY signer page that hosts the ICRC-25 connection handshake. */
const OISY_SIGN_URL = "https://oisy.com/sign";

/** The OISY signer origins that may postMessage back into the app window. */
const OISY_ORIGINS = new Set(["https://oisy.com/sign", "https://oisy.com"]);

/**
 * Bounded window for the whole connect handshake (permission request +
 * account-list request). If the user never approves the prompt, or the signer
 * never answers, the connection resets to disconnected instead of hanging
 * forever on 'Waiting for the dApp interaction...'.
 */
const CONNECT_TIMEOUT_MS = 90_000;

/**
 * Short diagnostic window after `requestPermissions` is issued. If the
 * approval response has not arrived within this window, we log a clear warning
 * so a lost internal postMessage listener can be traced. This is purely
 * diagnostic — it never gates or aborts the real handshake.
 */
const APPROVAL_DIAGNOSTIC_MS = 15_000;

/** Prefix for every OISY diagnostic log so it is easy to filter in the console. */
const LOG_PREFIX = "[OISY]";

/** Logs a diagnostic message with the shared [OISY] prefix. */
function oisyLog(...args: unknown[]): void {
  // eslint-disable-next-line no-console
  console.log(LOG_PREFIX, ...args);
}

/**
 * Trims a postMessage data payload to a bounded, JSON-safe shape for logging.
 * Returns a short string so a huge or circular payload cannot flood the console.
 */
function trimPayload(data: unknown): string {
  try {
    const json = JSON.stringify(data);
    if (json === undefined) {
      return String(data);
    }
    return json.length > 500 ? `${json.slice(0, 500)}…` : json;
  } catch {
    return String(data);
  }
}

/**
 * Registers a manual window 'message' listener that logs every postMessage
 * event received from the OISY signer origins. Active only while the connect
 * handshake is in flight; removed as soon as the handshake settles. Returns a
 * cleanup function.
 */
function attachOisyMessageListener(): () => void {
  const onMessage = (event: MessageEvent): void => {
    if (!OISY_ORIGINS.has(event.origin)) {
      return;
    }
    oisyLog(
      `postMessage from OISY origin "${event.origin}"`,
      `data=${trimPayload(event.data)}`,
    );
  };
  window.addEventListener("message", onMessage);
  return () => window.removeEventListener("message", onMessage);
}

/**
 * Races a promise against a bounded timeout so a stalled handshake cannot hang
 * forever. On timeout the caller is expected to tear the session down.
 */
function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`OISY connection timed out after ${ms}ms`)),
      ms,
    );
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (error) => {
        clearTimeout(timer);
        reject(error);
      },
    );
  });
}

/**
 * Awaits a promise but, if it has not settled within a short diagnostic window,
 * logs a clear warning. The returned promise is the original one — this only
 * observes, it never gates or aborts the underlying handshake.
 */
function logIfSlow<T>(
  promise: Promise<T>,
  ms: number,
  label: string,
): Promise<T> {
  const timer = setTimeout(() => {
    oisyLog(
      `WARNING: "${label}" has not resolved within ${ms}ms — the OISY approval response may not have arrived. Check the postMessage logs above.`,
    );
  }, ms);
  // Clear the diagnostic timer when the promise settles. The `.finally()`
  // chain returns a promise that rejects when the original rejects, so attach
  // a `.catch()` to swallow that derived rejection — otherwise a rejected
  // permission promise (e.g. the user closes the OISY popup) would emit an
  // unhandled rejection. This wrapper stays purely observational: the original
  // promise is still returned and its rejection still flows to the caller's
  // catch path that resets to disconnected.
  promise
    .finally(() => clearTimeout(timer))
    .catch(() => {
      // The original rejection is handled by the caller; this only prevents
      // the derived `.finally()` promise from becoming an unhandled rejection.
    });
  return promise;
}

/** Arguments for a single OISY-routed ICRC-1 transfer. */
export interface OisySendParams {
  /** The ledger canister id (principal text) of the token being sent. */
  ledgerCanisterId: string;
  /** The recipient account owner (principal text). */
  to: string;
  /** The amount to send in the token's base units (e.g. e8s for ICP). */
  amount: bigint;
}

/**
 * Encapsulates the OISY wallet signer integration for the Wallet tab.
 *
 * The connection is live and manual only: the UI never reports a connected
 * state unless a real OISY session was established. Every send is routed
 * through OISY as an ICRC-49 canister call to the token's ledger transfer,
 * requiring the owner's explicit approval in the OISY popup each time.
 *
 * This hook only touches the Wallet tab's manual send/receive UI. It has zero
 * effect on the trigger release (dead man's switch), which continues to run
 * via the vault canister's own custody and direct ledger transfer.
 */
export function useOisyWallet() {
  const walletRef = useRef<IcrcWallet | null>(null);
  // Tracks whether a successful connect has just completed. The OISY signer
  // fires onDisconnect when its popup closes right after a successful
  // handshake — a spurious event that must not clobber the freshly-connected
  // state. This ref lets onDisconnect distinguish that popup-close event from
  // a real disconnect.
  const connectedRef = useRef(false);
  const [connectionState, setConnectionState] =
    useState<OisyConnectionState>("disconnected");
  const [account, setAccount] = useState<OisyAccount | null>(null);
  const [pendingSend, setPendingSend] = useState(false);

  /** Opens the OISY sign page and initiates the ICRC-25 connection handshake. */
  const connect = useCallback(async (): Promise<OisyAccount | null> => {
    if (connectionState === "connecting" || connectionState === "connected") {
      return account;
    }
    setConnectionState("connecting");
    // Listen for postMessage events from the OISY signer for the whole
    // handshake so an actual approval attempt can be traced. Removed once the
    // handshake settles (success or failure).
    const removeOisyListener = attachOisyMessageListener();
    try {
      oisyLog("connect: opening OISY signer window");
      const wallet = await IcrcWallet.connect({
        url: OISY_SIGN_URL,
        // Pass the signer window features as a plain string. The library's
        // object form (position: "center") computes the popup geometry from
        // `window.top.innerWidth/innerHeight`, which throws a SecurityError
        // when the app runs inside a cross-origin iframe (e.g. a live preview)
        // and aborts the ICRC-25 handshake before the popup can complete. A
        // string is used verbatim by the library, so the popup opens without
        // ever touching `window.top`.
        windowOptions: DEFAULT_SIGNER_WINDOW_FEATURES,
        connectionOptions: {
          timeoutInMilliseconds: 120_000,
        },
        onDisconnect: () => {
          // The OISY signer fires onDisconnect when its popup closes after a
          // successful handshake — AFTER the connect success path already set
          // the connected state. That spurious popup-close event must not reset
          // the panel back to disconnected. Only a real disconnect (connectedRef
          // is false) resets the account/connectionState.
          if (connectedRef.current) {
            connectedRef.current = false;
          } else {
            setAccount(null);
            setConnectionState("disconnected");
          }
          walletRef.current = null;
        },
      });
      oisyLog("connect: IcrcWallet.connect resolved");

      // Request the ICRC-25 permissions (icrc27_accounts + icrc49_call_canister)
      // directly. `requestPermissionsNotGranted` first queries the signer's
      // current permissions and throws when that list is empty — which is
      // exactly the case on a fresh connection where the user has never
      // granted this dApp any permissions — aborting the handshake before the
      // approval prompt can complete. Requesting the scopes directly always
      // triggers the approval prompt and works regardless of prior grants.
      //
      // The whole permission + account-list sequence is bounded by a timeout so
      // a stalled handshake (e.g. the user never approves, or the signer never
      // answers the account-list request) resets to disconnected instead of
      // hanging forever on 'Waiting for the dApp interaction...'. The wallet
      // instance is a single local const reused across the whole sequence —
      // never recreated between connect and accounts, or the popup reference is
      // lost and the response never matches.
      const connectedAccount = await withTimeout(
        (async () => {
          oisyLog("requestPermissions: requesting ICRC-25 permissions");
          // The requestPermissions promise resolution is what gates the
          // accounts() call below. We also race it against a short diagnostic
          // window purely to log a warning if the approval response has not
          // arrived — the real promise is still awaited, so behavior is
          // unchanged and the account list is never requested early.
          await logIfSlow(
            wallet.requestPermissions({}),
            APPROVAL_DIAGNOSTIC_MS,
            "requestPermissions",
          );
          oisyLog("requestPermissions: approval response resolved");

          // Only after the approval response resolves do we request the ICRC-27
          // account list. Firing it earlier leaves OISY stuck waiting for the
          // dApp interaction.
          oisyLog("accounts: requesting ICRC-27 account list");
          const accounts = await wallet.accounts({});
          oisyLog(`accounts: resolved ${accounts.length} account(s)`);
          const first = accounts[0];
          if (!first) {
            throw new Error("OISY returned no accounts");
          }
          const resolvedAccount = {
            owner: first.owner,
            subaccount: first.subaccount,
          } satisfies OisyAccount;
          oisyLog("connect: resolved account", resolvedAccount);
          return resolvedAccount;
        })(),
        CONNECT_TIMEOUT_MS,
      );

      walletRef.current = wallet;
      connectedRef.current = true;
      setAccount(connectedAccount);
      setConnectionState("connected");
      removeOisyListener();
      oisyLog("connect: connected", connectedAccount);
      return connectedAccount;
    } catch (error) {
      oisyLog(
        "connect: failed",
        error instanceof Error ? error.message : error,
      );
      removeOisyListener();
      // Tear down the signer session (closes the popup) so a timed-out or
      // failed handshake does not leave a stuck OISY window behind.
      const wallet = walletRef.current;
      walletRef.current = null;
      connectedRef.current = false;
      setAccount(null);
      setConnectionState("disconnected");
      if (wallet) {
        try {
          await wallet.disconnect();
        } catch {
          // The session is already torn down locally; ignore signer-side errors.
        }
      }
      throw error;
    }
  }, [account, connectionState]);

  /** Ends the OISY session and returns the Wallet tab to the disconnected state. */
  const disconnect = useCallback(async (): Promise<void> => {
    const wallet = walletRef.current;
    walletRef.current = null;
    connectedRef.current = false;
    setAccount(null);
    setConnectionState("disconnected");
    if (wallet) {
      try {
        await wallet.disconnect();
      } catch {
        // The session is already torn down locally; ignore signer-side errors.
      }
    }
  }, []);

  /**
   * Routes a single send through OISY as an ICRC-49 canister call to the
   * token's ledger transfer. Requires the owner's explicit approval in the
   * OISY popup every time. Returns the block index on success or surfaces the
   * OISY-reported error on rejection, popup close, or signer failure.
   */
  const send = useCallback(
    async ({
      ledgerCanisterId,
      to,
      amount,
    }: OisySendParams): Promise<OisySendResult> => {
      const wallet = walletRef.current;
      if (!wallet || connectionState !== "connected") {
        return { ok: false, error: "Wallet is not connected" };
      }
      if (!account) {
        return { ok: false, error: "Wallet is not connected" };
      }

      setPendingSend(true);
      try {
        const blockIndex = await wallet.transfer({
          owner: account.owner,
          ledgerCanisterId,
          params: {
            to: {
              owner: Principal.fromText(to),
              subaccount: [],
            },
            amount,
          },
        });
        return { ok: true, blockIndex };
      } catch (error) {
        const message =
          error instanceof Error ? error.message : "OISY transfer failed";
        return { ok: false, error: message };
      } finally {
        setPendingSend(false);
      }
    },
    [account, connectionState],
  );

  return {
    connectionState,
    account,
    pendingSend,
    connect,
    disconnect,
    send,
  };
}
