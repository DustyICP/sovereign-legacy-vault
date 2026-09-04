import type {
  Asset,
  AuditEvent,
  Beneficiary,
  Overview,
  SwitchState,
  SwitchStatus,
  SwitchTimeline,
  WalletBalance,
} from "@/backend";

/**
 * Shared frontend types for the new tab pages. The backend bindings already
 * define the canonical record shapes (Overview, WalletBalance, SwitchTimeline,
 * etc.); this module re-exports them and adds the small frontend-only shapes
 * the pages compose on top.
 */
export type {
  Asset,
  AuditEvent,
  Beneficiary,
  Overview,
  SwitchState,
  SwitchStatus,
  SwitchTimeline,
  WalletBalance,
};

/** The three-parameter dead man's switch configuration. */
export interface TimelineConfig {
  warningOnsetDays: bigint;
  warningRepeatDays: bigint;
  triggerDays: bigint;
}

/** A held asset paired with its live USD price and computed USD value. */
export interface AssetWithUsd {
  asset: Asset;
  usdPrice?: number;
  usdValue?: number;
}

/** A CoinGecko coin id to USD price map, keyed by coin id. */
export interface PriceMap {
  [coinId: string]: number;
}

/**
 * The live connection state of the OISY wallet signer session. The UI never
 * shows a connected state unless a real OISY session was established.
 */
export type OisyConnectionState = "disconnected" | "connecting" | "connected";

/** A single ICRC-27 account reported by the connected OISY wallet. */
export interface OisyAccount {
  owner: string;
  subaccount?: string;
}

/**
 * The result of an OISY-routed ICRC-1 transfer. On success the block index of
 * the transfer is returned; on rejection, popup close, or signer error the
 * OISY-reported message is surfaced so the UI can return to the form.
 */
export type OisySendResult =
  | { ok: true; blockIndex: bigint }
  | { ok: false; error: string };
