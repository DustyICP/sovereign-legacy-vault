import { createActor } from "@/backend";
import type { Asset, Beneficiary, SwitchState } from "@/backend";
import { useTranslation } from "@/lib/translations";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

const NEUTRAL_SEGMENTS = ["bg-chart-2", "bg-chart-3", "bg-chart-4"];

function useWalletBalance() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getWalletBalance();
    },
    enabled: !!actor && !isFetching,
  });
}

function useBeneficiaries() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["beneficiaries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBeneficiaries();
    },
    enabled: !!actor && !isFetching,
  });
}

function useSwitchState() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["switch-state"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSwitchState();
    },
    enabled: !!actor && !isFetching,
  });
}

/** Convert a raw token balance (smallest unit) into a human-readable string. */
function formatBalance(balance: bigint, decimals: bigint): string {
  const divisor = 10n ** decimals;
  const whole = balance / divisor;
  const frac = balance % divisor;
  const fracStr = frac
    .toString()
    .padStart(Number(decimals), "0")
    .replace(/0+$/, "");
  return fracStr
    ? `${whole.toLocaleString()}.${fracStr}`
    : whole.toLocaleString();
}

/** Total vault balance across all held assets, as a display string. */
function totalBalance(assets: Asset[] | undefined): string {
  if (!assets || assets.length === 0) return "0.00";
  return assets
    .map((asset) => formatBalance(asset.balance, asset.decimals))
    .join(" + ");
}

function formatDateTime(
  timestamp: bigint,
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string,
): string {
  const date = new Date(Number(timestamp / 1_000_000n));
  if (Number.isNaN(date.getTime())) return "—";
  return formatDate(date, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function SummarySkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3" aria-busy="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-44 animate-pulse rounded border border-border bg-surface shadow-subtle"
        />
      ))}
    </div>
  );
}

/**
 * Dashboard. Floating surface cards on the near-black background: three
 * summary cards (vault balance, beneficiary count, allocations) with hairline
 * borders, large Fraunces numerals, mono uppercase labels and gold accents,
 * plus a full-width The Switch status card below. All figures are driven by
 * the backend via React Query, with loading skeletons and empty/zero states.
 */
export function DashboardPage() {
  const { t, formatDate } = useTranslation();
  const balanceQuery = useWalletBalance();
  const beneficiariesQuery = useBeneficiaries();
  const switchQuery = useSwitchState();

  const loading =
    balanceQuery.isLoading ||
    beneficiariesQuery.isLoading ||
    switchQuery.isLoading;

  const assets = balanceQuery.data?.assets;
  const beneficiaries = beneficiariesQuery.data ?? [];
  const switchState: SwitchState | null | undefined = switchQuery.data;

  const totalShare = beneficiaries.reduce(
    (sum, b) => sum + b.allocationShare,
    0n,
  );
  const isArmed = switchState?.status === "armed";

  return (
    <div data-ocid="dashboard" className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <header className="mb-8 animate-fade-rise">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("dashboard.eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
          {t("dashboard.title")}
        </h1>
      </header>

      {loading ? (
        <SummarySkeleton />
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          <section
            data-ocid="dashboard.balance"
            className="animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t("dashboard.balance")}
            </p>
            <p className="mt-4 font-display text-5xl font-semibold tracking-tight text-foreground">
              {totalBalance(assets)}
              <span className="ml-2 font-mono text-lg font-medium text-muted-foreground">
                ICP
              </span>
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {assets && assets.length > 0
                ? t("dashboard.assetsHeld", { count: assets.length })
                : t("dashboard.noAssets")}
            </p>
          </section>

          <section
            data-ocid="dashboard.beneficiaries"
            className="animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:60ms]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t("dashboard.beneficiaries")}
            </p>
            <p className="mt-4 font-display text-5xl font-semibold tracking-tight text-foreground">
              {beneficiaries.length}
              <span className="ml-2 font-mono text-lg font-medium text-muted-foreground">
                {t("dashboard.named")}
              </span>
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {beneficiaries.length > 0
                ? t("dashboard.sealed", { count: beneficiaries.length })
                : t("dashboard.none")}
            </p>
          </section>

          <section
            data-ocid="dashboard.allocation"
            className="animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:120ms]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t("dashboard.allocation")}
            </p>
            {beneficiaries.length === 0 ? (
              <p className="mt-6 font-mono text-xs text-muted-foreground">
                {t("dashboard.allocationNone")}
              </p>
            ) : (
              <>
                <div
                  className="mt-6 flex h-3 w-full overflow-hidden rounded-full bg-surface-raised"
                  role="img"
                  aria-label={t("dashboard.allocationAria")}
                >
                  {beneficiaries.map((b, index) => {
                    const width =
                      totalShare > 0n
                        ? Number((b.allocationShare * 10000n) / totalShare) /
                          100
                        : 0;
                    return (
                      <span
                        key={b.id.toString()}
                        className={`h-full ${index === 0 ? "bg-gradient-gold" : NEUTRAL_SEGMENTS[(index - 1) % NEUTRAL_SEGMENTS.length]}`}
                        style={{ width: `${width}%` }}
                        aria-hidden="true"
                      />
                    );
                  })}
                </div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-xs text-muted-foreground">
                  {beneficiaries.map((b, index) => (
                    <span
                      key={b.id.toString()}
                      className="flex items-center gap-2"
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${index === 0 ? "bg-gradient-gold" : NEUTRAL_SEGMENTS[(index - 1) % NEUTRAL_SEGMENTS.length]}`}
                        aria-hidden="true"
                      />
                      {b.name} · {b.allocationShare.toString()}%
                    </span>
                  ))}
                </div>
              </>
            )}
          </section>
        </div>
      )}

      <section
        data-ocid="dashboard.switch"
        className="mt-6 animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:180ms]"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t("dashboard.switch")}
            </p>
            <div className="mt-3 flex items-center gap-3">
              <span
                className={`h-2.5 w-2.5 rounded-full ${isArmed ? "bg-success" : "bg-muted-foreground"}`}
                aria-hidden="true"
              />
              <span
                className={`font-mono text-sm font-semibold uppercase tracking-[0.16em] ${isArmed ? "text-extruded-gold" : "text-muted-foreground"}`}
              >
                {isArmed ? t("common.armed") : t("common.disarmed")}
              </span>
            </div>
          </div>
          <p className="font-mono text-xs text-muted-foreground">
            {switchState?.lastCheckIn
              ? t("dashboard.lastVerified", {
                  time: formatDateTime(switchState.lastCheckIn, formatDate),
                })
              : t("dashboard.notVerified")}
          </p>
        </div>
      </section>
    </div>
  );
}
