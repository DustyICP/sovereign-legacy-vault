import { createActor } from "@/backend";
import type { Asset, AuditEvent } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { symbolToCoinId, useCryptoPrices } from "@/hooks/use-crypto-prices";
import { useOisyWallet } from "@/hooks/use-oisy-wallet";
import { useTranslation } from "@/lib/translations";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Copy, Landmark, Loader2, QrCode, Send, Wallet } from "lucide-react";
import { useMemo, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "sonner";

/**
 * ICRC-standard ledger canister ids for the tokens the vault can send through
 * OISY. Only assets with a known ICRC ledger can be routed as an ICRC-49
 * canister call to the token's ledger transfer. Symbols without a chain-key
 * ledger (e.g. DOT) are not sendable via OISY and are excluded from the picker.
 */
const ICRC_LEDGERS: Record<string, string> = {
  ICP: "ryjl3-tyaaa-aaaaa-aaaba-cai",
  BTC: "mxzaz-hqaaa-aaaar-qaada-cai", // ckBTC
  ETH: "ss2fx-dyaaa-aaaar-qacoq-cai", // ckETH
  USDC: "xevnm-gaaaa-aaaar-qafnq-cai", // ckUSDC
  USDT: "cngnf-vqaaa-aaaar-qag4q-cai", // ckUSDT
};

/** Convert a raw token balance (smallest unit) into a human-readable number. */
function toHumanBalance(balance: bigint, decimals: bigint): number {
  return Number(balance) / 10 ** Number(decimals);
}

/** Format a number as a compact USD string. */
function formatUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(value);
}

/** Split a nanosecond backend timestamp into date and time display strings. */
function formatTimestamp(timestamp: bigint): { date: string; time: string } {
  const date = new Date(Number(timestamp / 1_000_000n));
  if (Number.isNaN(date.getTime())) {
    return { date: "—", time: "—" };
  }
  return {
    date: date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }),
  };
}

function useWalletBalance() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["walletBalance"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWalletBalance();
    },
    enabled: !!actor && !isFetching,
  });
}

function useDepositAddress() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["depositAddress"],
    queryFn: async () => {
      if (!actor) return "";
      return actor.getDepositAddress();
    },
    enabled: !!actor && !isFetching,
  });
}

function useAuditEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["auditEvents"],
    queryFn: async () => {
      if (!actor) return [] as AuditEvent[];
      return actor.listAuditEvents();
    },
    enabled: !!actor && !isFetching,
  });
}

function WalletSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="h-40 animate-pulse rounded border border-border bg-surface shadow-subtle" />
      <div className="h-64 animate-pulse rounded border border-border bg-surface shadow-subtle" />
    </div>
  );
}

/**
 * Wallet tab. Shows the liquid assets held in the vault with live USD values
 * from CoinGecko, a portfolio breakdown by asset, the sealed transaction
 * history, and the OISY send/receive UI. The OISY integration touches only the
 * manual send/receive surface here — it has zero effect on the trigger release
 * (dead man's switch), which continues to run via the vault canister's own
 * custody and direct ledger transfer.
 */
export function WalletPage() {
  const { t } = useTranslation();
  const {
    data: balance,
    isLoading: balanceLoading,
    isError: balanceError,
  } = useWalletBalance();
  const { data: depositAddress, isLoading: addressLoading } =
    useDepositAddress();
  const { data: events, isLoading: eventsLoading } = useAuditEvents();

  const { connectionState, account, pendingSend, connect, disconnect, send } =
    useOisyWallet();

  const assets = balance?.assets ?? [];
  const coinIds = useMemo(
    () =>
      assets
        .map((asset) => symbolToCoinId(asset.symbol))
        .filter((id): id is string => id !== null),
    [assets],
  );
  const { data: prices } = useCryptoPrices(coinIds);

  const rows = useMemo(
    () =>
      assets.map((asset) => {
        const human = toHumanBalance(asset.balance, asset.decimals);
        const coinId = symbolToCoinId(asset.symbol);
        const usdPrice = coinId ? prices?.[coinId] : undefined;
        const usdValue = usdPrice !== undefined ? human * usdPrice : undefined;
        return { asset, human, usdPrice, usdValue };
      }),
    [assets, prices],
  );

  const totalUsd = rows.reduce((sum, row) => sum + (row.usdValue ?? 0), 0);

  const [selected, setSelected] = useState<string>("all");

  // --- OISY send form state ---
  const [sendAssetId, setSendAssetId] = useState<string>("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [fieldErrors, setFieldErrors] = useState<{
    asset?: string;
    recipient?: string;
    amount?: string;
  }>({});
  const [sendResult, setSendResult] = useState<
    | { kind: "success"; block: bigint }
    | { kind: "error"; message: string }
    | null
  >(null);

  const sendableAssets = useMemo(
    () => rows.filter((row) => ICRC_LEDGERS[row.asset.symbol.toUpperCase()]),
    [rows],
  );

  const selectedSendAsset = useMemo(
    () => sendableAssets.find((row) => row.asset.id.toString() === sendAssetId),
    [sendableAssets, sendAssetId],
  );

  const isConnected = connectionState === "connected";
  const isConnecting = connectionState === "connecting";

  const handleConnect = async () => {
    try {
      await connect();
    } catch {
      toast.error(t("wallet.sendError"), {
        description: t("wallet.sendErrorDesc"),
      });
    }
  };

  const handleDisconnect = async () => {
    await disconnect();
    setSendAssetId("");
    setRecipient("");
    setAmount("");
    setFieldErrors({});
    setSendResult(null);
  };

  const validate = (): boolean => {
    const errors: typeof fieldErrors = {};
    if (!sendAssetId) {
      errors.asset = t("wallet.validation.assetRequired");
    }
    if (!recipient.trim()) {
      errors.recipient = t("wallet.validation.recipientRequired");
    }
    const parsed = Number(amount);
    if (!amount || Number.isNaN(parsed) || parsed <= 0) {
      errors.amount = t("wallet.validation.amountInvalid");
    } else if (selectedSendAsset && parsed > selectedSendAsset.human) {
      errors.amount = t("wallet.validation.amountExceedsBalance");
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSend = async () => {
    if (!isConnected || !selectedSendAsset) return;
    if (!validate()) return;

    const ledgerCanisterId =
      ICRC_LEDGERS[selectedSendAsset.asset.symbol.toUpperCase()];
    const amountBase = BigInt(
      Math.round(
        Number(amount) * 10 ** Number(selectedSendAsset.asset.decimals),
      ),
    );

    setSendResult(null);
    const result = await send({
      ledgerCanisterId,
      to: recipient.trim(),
      amount: amountBase,
    });

    if (result.ok) {
      setSendResult({ kind: "success", block: result.blockIndex });
      setRecipient("");
      setAmount("");
      setFieldErrors({});
      toast.success(t("wallet.sendSuccess"), {
        description: t("wallet.sendSuccessDesc", {
          block: result.blockIndex.toString(),
        }),
      });
    } else {
      setSendResult({ kind: "error", message: result.error });
      toast.error(t("wallet.sendRejected"), {
        description: t("wallet.sendRejectedDesc"),
      });
    }
  };

  const isLoading = balanceLoading || addressLoading;

  return (
    <div data-ocid="wallet" className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <header className="mb-8 animate-fade-rise">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("wallet.eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
          {t("wallet.title")}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t("wallet.subtitle")}
        </p>
      </header>

      {isLoading ? (
        <WalletSkeleton />
      ) : balanceError ? (
        <div
          data-ocid="wallet.error_state"
          className="flex flex-col items-center gap-3 rounded border border-border bg-surface px-6 py-12 text-center shadow-subtle"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-destructive">
            {t("wallet.errorEyebrow")}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("wallet.errorBody")}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left column: portfolio snapshot + breakdown + transactions */}
          <div className="space-y-6 lg:col-span-2">
            {/* Portfolio snapshot */}
            <section
              data-ocid="wallet.snapshot"
              className="snapshot-card animate-fade-rise p-6"
            >
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t("wallet.totalValue")}
              </p>
              <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-extruded-gold">
                {formatUsd(totalUsd)}
              </p>
              <p className="mt-3 font-mono text-xs text-muted-foreground">
                {assets.length > 0
                  ? t("wallet.assetsHeld", { count: assets.length })
                  : t("wallet.noAssets")}
              </p>
            </section>

            {/* Asset dropdown + portfolio breakdown */}
            <section
              data-ocid="wallet.assets"
              className="animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle [animation-delay:60ms]"
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {t("wallet.breakdown")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("wallet.breakdownDesc")}
                  </p>
                </div>
                <Select value={selected} onValueChange={setSelected}>
                  <SelectTrigger
                    data-ocid="wallet.asset_dropdown"
                    aria-label={t("wallet.assetDropdownAria")}
                    className="w-full sm:w-64"
                  >
                    <SelectValue placeholder={t("wallet.assetDropdown")} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">
                      {t("wallet.allAssets")} · {formatUsd(totalUsd)}
                    </SelectItem>
                    {rows.map((row) => (
                      <SelectItem
                        key={row.asset.id.toString()}
                        value={row.asset.id.toString()}
                      >
                        {row.asset.symbol} ·{" "}
                        {row.usdValue !== undefined
                          ? formatUsd(row.usdValue)
                          : t("wallet.noPrice")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {rows.length === 0 ? (
                <div
                  data-ocid="wallet.assets.empty_state"
                  className="mt-6 flex flex-col items-center gap-3 rounded border border-dashed border-border px-6 py-10 text-center"
                >
                  <Landmark
                    className="h-8 w-8 text-muted-foreground"
                    aria-hidden="true"
                  />
                  <p className="font-display text-xl font-semibold text-foreground">
                    {t("wallet.emptyTitle")}
                  </p>
                  <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                    {t("wallet.emptyBody")}
                  </p>
                </div>
              ) : (
                <ul data-ocid="wallet.assets.list" className="mt-6 space-y-3">
                  {rows.map((row, index) => {
                    const isSelected =
                      selected === "all" ||
                      selected === row.asset.id.toString();
                    const share =
                      totalUsd > 0 && row.usdValue !== undefined
                        ? (row.usdValue / totalUsd) * 100
                        : 0;
                    return (
                      <li
                        key={row.asset.id.toString()}
                        data-ocid={`wallet.asset.item.${index + 1}`}
                        className={`asset-row p-4 transition-smooth ${
                          isSelected ? "" : "opacity-40"
                        }`}
                      >
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="min-w-0">
                            <p className="asset-symbol truncate">
                              {row.asset.symbol}
                            </p>
                            <p className="mt-0.5 truncate text-sm text-muted-foreground">
                              {row.asset.name}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="asset-usd">
                              {row.usdValue !== undefined
                                ? formatUsd(row.usdValue)
                                : t("wallet.noPrice")}
                            </p>
                            <p className="mt-0.5 font-mono text-xs tabular-nums text-muted-foreground">
                              {row.human.toLocaleString(undefined, {
                                maximumFractionDigits: 6,
                              })}{" "}
                              {row.asset.symbol}
                            </p>
                          </div>
                        </div>
                        <div className="mt-3 flex items-center gap-3">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
                            <div
                              className="h-full rounded-full bg-gradient-gold"
                              style={{ width: `${share}%` }}
                            />
                          </div>
                          <span className="w-12 shrink-0 text-right font-mono text-xs tabular-nums text-muted-foreground">
                            {share.toFixed(1)}%
                          </span>
                        </div>
                        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 border-t border-border pt-3 font-mono text-xs text-muted-foreground">
                          <span>
                            {t("wallet.balance")}:{" "}
                            <span className="text-foreground">
                              {row.human.toLocaleString(undefined, {
                                maximumFractionDigits: 6,
                              })}
                            </span>
                          </span>
                          <span>
                            {t("wallet.price")}:{" "}
                            <span className="text-foreground">
                              {row.usdPrice !== undefined
                                ? formatUsd(row.usdPrice)
                                : t("wallet.noPrice")}
                            </span>
                          </span>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>

            {/* Transaction history */}
            <section
              data-ocid="wallet.transactions"
              className="animate-fade-rise overflow-hidden rounded border border-border bg-surface shadow-subtle [animation-delay:120ms]"
            >
              <div className="border-b border-border px-6 py-4">
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t("wallet.transactions")}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("wallet.transactionsDesc")}
                </p>
              </div>

              {eventsLoading ? (
                <div className="space-y-3 p-6">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : !events || events.length === 0 ? (
                <div
                  data-ocid="wallet.transactions.empty_state"
                  className="flex flex-col items-center gap-3 px-6 py-10 text-center"
                >
                  <p className="font-display text-xl font-semibold text-foreground">
                    {t("wallet.noTransactions")}
                  </p>
                </div>
              ) : (
                <ul
                  data-ocid="wallet.transactions.list"
                  className="divide-y divide-border"
                >
                  {events.map((event, index) => {
                    const { date, time } = formatTimestamp(event.timestamp);
                    return (
                      <li
                        key={event.id.toString()}
                        data-ocid={`wallet.transactions.item.${index + 1}`}
                        className="flex items-start gap-4 px-6 py-4 transition-smooth hover:bg-surface-raised"
                      >
                        <span
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                          aria-hidden="true"
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm leading-relaxed text-foreground/90">
                            {event.description}
                          </p>
                          <p className="mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                            {event.eventType}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="font-mono text-[11px] text-muted-foreground">
                            {date}
                          </p>
                          <p className="mt-0.5 font-mono text-xs tabular-nums text-foreground">
                            {time}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              )}
            </section>
          </div>

          {/* Right column: OISY connection + send + receive */}
          <div className="space-y-6">
            {/* Connection card */}
            <section
              data-ocid="wallet.connection"
              className="animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle"
            >
              {!isConnected ? (
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3">
                    <Wallet
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {t("wallet.connectedAccount")}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t("wallet.connectWalletDesc")}
                      </p>
                    </div>
                  </div>
                  <Button
                    data-ocid="wallet.connect_button"
                    className="connect-wallet-btn"
                    onClick={handleConnect}
                    disabled={isConnecting}
                  >
                    {isConnecting ? (
                      <>
                        <Loader2
                          className="size-4 animate-spin"
                          aria-hidden="true"
                        />
                        {t("wallet.connecting")}
                      </>
                    ) : (
                      t("wallet.connectWallet")
                    )}
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-start gap-4">
                  <div className="flex items-center gap-3">
                    <Wallet
                      className="h-5 w-5 text-primary"
                      aria-hidden="true"
                    />
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        {t("wallet.connectedAccount")}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t("wallet.connected")}
                      </p>
                    </div>
                  </div>
                  <div
                    data-ocid="wallet.connected_badge"
                    className="wallet-badge w-full"
                  >
                    <span className="badge-dot" aria-hidden="true" />
                    <div className="min-w-0">
                      <p className="badge-label">
                        {t("wallet.connectedAccount")}
                      </p>
                      <p className="badge-account truncate">
                        {account?.owner ?? ""}
                      </p>
                    </div>
                  </div>
                  <Button
                    data-ocid="wallet.disconnect_button"
                    className="disconnect-btn"
                    onClick={handleDisconnect}
                  >
                    {t("wallet.disconnect")}
                  </Button>
                </div>
              )}
            </section>

            {/* Send form (only when connected) */}
            {isConnected && (
              <section
                data-ocid="wallet.send"
                className="send-form animate-fade-rise p-6"
              >
                <div className="flex items-center gap-3">
                  <Send className="h-5 w-5 text-primary" aria-hidden="true" />
                  <div>
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {t("wallet.sendTitle")}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t("wallet.sendDesc")}
                    </p>
                  </div>
                </div>

                {pendingSend ? (
                  <div
                    data-ocid="wallet.approval_pending"
                    className="approval-panel mt-6 p-6"
                  >
                    <div className="approval-pending">
                      <span className="approval-spinner" aria-hidden="true" />
                      {t("wallet.waitingForApproval")}
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {t("wallet.waitingForApprovalDesc")}
                    </p>
                  </div>
                ) : (
                  <form
                    className="mt-6 space-y-5"
                    onSubmit={(e) => {
                      e.preventDefault();
                      void handleSend();
                    }}
                  >
                    {/* Asset picker */}
                    <div className="space-y-2">
                      <label
                        htmlFor="wallet-send-asset"
                        className="field-label block"
                      >
                        {t("wallet.asset")}
                      </label>
                      <Select
                        value={sendAssetId}
                        onValueChange={(value) => {
                          setSendAssetId(value);
                          setFieldErrors((prev) => ({
                            ...prev,
                            asset: undefined,
                          }));
                        }}
                      >
                        <SelectTrigger
                          id="wallet-send-asset"
                          data-ocid="wallet.send_asset"
                          aria-label={t("wallet.asset")}
                          aria-invalid={!!fieldErrors.asset}
                          className="w-full"
                        >
                          <SelectValue placeholder={t("wallet.selectAsset")} />
                        </SelectTrigger>
                        <SelectContent>
                          {sendableAssets.map((row) => (
                            <SelectItem
                              key={row.asset.id.toString()}
                              value={row.asset.id.toString()}
                            >
                              {row.asset.symbol} ·{" "}
                              {row.human.toLocaleString(undefined, {
                                maximumFractionDigits: 6,
                              })}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {fieldErrors.asset && (
                        <p
                          data-ocid="wallet.send_asset_error"
                          className="text-xs text-destructive"
                        >
                          {fieldErrors.asset}
                        </p>
                      )}
                    </div>

                    {/* Recipient */}
                    <div className="space-y-2">
                      <label
                        htmlFor="wallet-send-recipient"
                        className="field-label block"
                      >
                        {t("wallet.recipient")}
                      </label>
                      <input
                        id="wallet-send-recipient"
                        data-ocid="wallet.send_recipient"
                        className="send-field"
                        value={recipient}
                        onChange={(e) => {
                          setRecipient(e.target.value);
                          setFieldErrors((prev) => ({
                            ...prev,
                            recipient: undefined,
                          }));
                        }}
                        placeholder={t("wallet.recipientPlaceholder")}
                        aria-invalid={!!fieldErrors.recipient}
                        autoComplete="off"
                        spellCheck={false}
                      />
                      {fieldErrors.recipient && (
                        <p
                          data-ocid="wallet.send_recipient_error"
                          className="text-xs text-destructive"
                        >
                          {fieldErrors.recipient}
                        </p>
                      )}
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                      <label
                        htmlFor="wallet-send-amount"
                        className="field-label block"
                      >
                        {t("wallet.amount")}
                      </label>
                      <input
                        id="wallet-send-amount"
                        data-ocid="wallet.send_amount"
                        className="send-field send-amount"
                        value={amount}
                        onChange={(e) => {
                          setAmount(e.target.value);
                          setFieldErrors((prev) => ({
                            ...prev,
                            amount: undefined,
                          }));
                        }}
                        placeholder={t("wallet.amountPlaceholder")}
                        inputMode="decimal"
                        aria-invalid={!!fieldErrors.amount}
                        autoComplete="off"
                        spellCheck={false}
                      />
                      {selectedSendAsset && (
                        <p className="balance-hint">
                          {t("wallet.available", {
                            balance: `${selectedSendAsset.human.toLocaleString(
                              undefined,
                              { maximumFractionDigits: 6 },
                            )} ${selectedSendAsset.asset.symbol}`,
                          })}
                        </p>
                      )}
                      {fieldErrors.amount && (
                        <p
                          data-ocid="wallet.send_amount_error"
                          className="text-xs text-destructive"
                        >
                          {fieldErrors.amount}
                        </p>
                      )}
                    </div>

                    {sendResult && sendResult.kind === "success" && (
                      <div
                        data-ocid="wallet.send_success"
                        className="rounded border border-success/40 bg-surface-raised px-4 py-3"
                      >
                        <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-success">
                          {t("wallet.sendSuccess")}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {t("wallet.sendSuccessDesc", {
                            block: sendResult.block.toString(),
                          })}
                        </p>
                      </div>
                    )}

                    {sendResult && sendResult.kind === "error" && (
                      <div
                        data-ocid="wallet.send_error"
                        className="rounded border border-destructive/40 bg-surface-raised px-4 py-3"
                      >
                        <p className="font-mono text-xs font-medium uppercase tracking-[0.14em] text-destructive">
                          {t("wallet.sendRejected")}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {t("wallet.sendRejectedDesc")}
                        </p>
                      </div>
                    )}

                    <Button
                      data-ocid="wallet.send_button"
                      type="submit"
                      className="connect-wallet-btn w-full"
                    >
                      <Send className="size-4" aria-hidden="true" />
                      {t("wallet.sendButton")}
                    </Button>
                  </form>
                )}
              </section>
            )}

            {/* Receive view */}
            <section
              data-ocid="wallet.receive"
              className="qr-panel animate-fade-rise p-6 [animation-delay:180ms]"
            >
              <div className="flex items-center gap-3">
                <QrCode className="h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {t("wallet.receive")}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("wallet.receiveDesc")}
                  </p>
                </div>
              </div>

              {(() => {
                const receiveAddress = isConnected
                  ? (account?.owner ?? "")
                  : (depositAddress ?? "");
                return receiveAddress ? (
                  <>
                    <div className="qr-frame mt-6 flex items-center justify-center p-6">
                      <QRCode
                        value={receiveAddress}
                        size={176}
                        bgColor="transparent"
                        fgColor="#e8c877"
                        aria-label={t("wallet.qrAria")}
                      />
                    </div>
                    <p className="mt-6 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {t("wallet.depositAddress")}
                    </p>
                    <p
                      data-ocid="wallet.receive_address"
                      className="receive-address mt-2"
                    >
                      {receiveAddress}
                    </p>
                    <Button
                      data-ocid="wallet.copy_address_button"
                      variant="outline"
                      className="mt-4 w-full"
                      onClick={async () => {
                        try {
                          await navigator.clipboard.writeText(receiveAddress);
                          toast.success(t("wallet.copied"));
                        } catch {
                          toast.error(t("wallet.errorBody"));
                        }
                      }}
                    >
                      <Copy className="size-4" aria-hidden="true" />
                      {t("wallet.copyAddress")}
                    </Button>
                  </>
                ) : (
                  <div className="mt-6 flex flex-col items-center gap-3 rounded border border-dashed border-border px-6 py-10 text-center">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {t("wallet.noAssets")}
                    </p>
                  </div>
                );
              })()}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
