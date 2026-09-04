import { createActor } from "@/backend";
import type { AuditEvent, Overview } from "@/backend";
import {
  translateAuditDescription,
  translateEventType,
  useTranslation,
} from "@/lib/translations";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck, ShieldOff } from "lucide-react";

const RECENT_LIMIT = 4;

function useOverview() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["overview"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getOverview();
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
function totalBalance(overview: Overview | null | undefined): string {
  const assets = overview?.vaultBalance.assets;
  if (!assets || assets.length === 0) return "0.00";
  return assets
    .map((asset) => formatBalance(asset.balance, asset.decimals))
    .join(" + ");
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

/** Security events carry the single gold accent; verification reads success. */
function eventTone(eventType: string): string {
  const kind = eventType.toUpperCase();
  if (kind === "SECURITY") return "text-primary";
  if (kind === "VERIFICATION") return "text-success";
  return "text-muted-foreground";
}

function eventDot(eventType: string): string {
  const kind = eventType.toUpperCase();
  if (kind === "SECURITY") return "bg-primary";
  if (kind === "VERIFICATION") return "bg-success";
  return "bg-border";
}

function SnapshotSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3" aria-busy="true">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-40 animate-pulse rounded border border-border bg-surface shadow-subtle"
        />
      ))}
    </div>
  );
}

/**
 * Overview tab. A single-glance summary of the whole vault, driven by the
 * backend `getOverview` query: vault balance, beneficiary count/allocation,
 * and The Switch's status and timeline, plus a condensed recent-activity feed
 * that links through to the full sealed audit ledger sub-view.
 */
export function OverviewPage() {
  const { t } = useTranslation();
  const { data: overview, isLoading, isError } = useOverview();

  const assets = overview?.vaultBalance.assets;
  const beneficiaryCount = overview?.beneficiaryCount ?? 0n;
  const totalShare = overview?.totalAllocationShare ?? 0n;
  const isArmed = overview?.switchStatus === "armed";
  const timeline = overview?.timeline;
  const recent = overview?.recentActivity ?? [];

  return (
    <div data-ocid="overview" className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <header className="mb-8 animate-fade-rise">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("tabs.overview")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
          {t("tabs.overview")}
        </h1>
      </header>

      {isLoading ? (
        <SnapshotSkeleton />
      ) : isError ? (
        <div
          data-ocid="overview.error_state"
          className="flex flex-col items-center gap-3 rounded border border-border bg-surface px-6 py-12 text-center shadow-subtle"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-destructive">
            {t("audit.errorEyebrow")}
          </p>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
            {t("audit.errorBody")}
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Vault balance snapshot */}
          <section
            data-ocid="overview.balance"
            className="snapshot-card animate-fade-rise p-6"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t("dashboard.balance")}
            </p>
            <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
              {totalBalance(overview)}
              <span className="ml-2 font-mono text-base font-medium text-muted-foreground">
                ICP
              </span>
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {assets && assets.length > 0
                ? t("dashboard.assetsHeld", { count: assets.length })
                : t("dashboard.noAssets")}
            </p>
          </section>

          {/* Beneficiary count / allocation snapshot */}
          <section
            data-ocid="overview.beneficiaries"
            className="snapshot-card animate-fade-rise p-6 [animation-delay:60ms]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t("dashboard.beneficiaries")}
            </p>
            <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
              {beneficiaryCount.toString()}
              <span className="ml-2 font-mono text-base font-medium text-muted-foreground">
                {t("dashboard.named")}
              </span>
            </p>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {beneficiaryCount > 0n
                ? t("dashboard.sealed", { count: beneficiaryCount.toString() })
                : t("dashboard.none")}
            </p>
            <p className="mt-4 border-t border-border pt-3">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                {t("dashboard.allocation")}
              </span>
              <span className="mt-1 block font-display text-2xl font-semibold tracking-tight text-extruded-gold">
                {totalShare.toString()}%
                <span className="ml-2 font-mono text-xs font-medium text-muted-foreground">
                  {t("dashboard.allocated")}
                </span>
              </span>
            </p>
          </section>

          {/* Timeline / switch status snapshot */}
          <section
            data-ocid="overview.switch"
            className="snapshot-card animate-fade-rise p-6 [animation-delay:120ms]"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t("dashboard.switch")}
            </p>
            <div className="mt-4 flex items-center gap-3">
              {isArmed ? (
                <ShieldCheck
                  className="h-5 w-5 text-success"
                  aria-hidden="true"
                />
              ) : (
                <ShieldOff
                  className="h-5 w-5 text-muted-foreground"
                  aria-hidden="true"
                />
              )}
              <span
                className={`font-mono text-sm font-semibold uppercase tracking-[0.16em] ${isArmed ? "text-extruded-gold" : "text-muted-foreground"}`}
              >
                {isArmed ? t("common.armed") : t("common.disarmed")}
              </span>
            </div>
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {timeline
                ? t("switch.releaseIn", {
                    duration: formatDuration(timeline.timeUntilTrigger),
                  })
                : t("switch.cadenceLabel")}
            </p>
          </section>
        </div>
      )}

      {/* Condensed recent-activity feed + link to full audit ledger */}
      <section
        data-ocid="overview.activity"
        className="mt-6 animate-fade-rise overflow-hidden rounded border border-border bg-surface shadow-subtle [animation-delay:180ms]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {t("audit.ledger")}
          </p>
          <Link
            to="/overview/audit"
            data-ocid="overview.audit_link"
            className="group flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.16em] text-primary transition-smooth hover:text-accent"
          >
            {t("audit.title")}
            <ArrowRight
              className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
        </div>

        {recent.length === 0 ? (
          <div
            data-ocid="overview.activity.empty_state"
            className="flex flex-col items-center gap-3 px-6 py-10 text-center"
          >
            <p className="font-display text-xl font-semibold text-foreground">
              {t("audit.emptyTitle")}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("audit.emptyBody")}
            </p>
          </div>
        ) : (
          <ul
            data-ocid="overview.activity.list"
            className="divide-y divide-border"
          >
            {recent.slice(0, RECENT_LIMIT).map((event: AuditEvent, index) => {
              const { date, time } = formatTimestamp(event.timestamp);
              return (
                <li
                  key={event.id.toString()}
                  data-ocid={`overview.activity.item.${index + 1}`}
                  className="flex items-start gap-4 px-6 py-4 transition-smooth hover:bg-surface-raised"
                >
                  <span
                    className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${eventDot(event.eventType)}`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm leading-relaxed text-foreground/90">
                      {translateAuditDescription(
                        t,
                        event.eventType,
                        event.description,
                      )}
                    </p>
                    <p
                      className={`mt-1 font-mono text-[11px] font-medium uppercase tracking-[0.14em] ${eventTone(event.eventType)}`}
                    >
                      {translateEventType(t, event.eventType)}
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

        <div className="flex items-center gap-3 border-t border-border bg-surface-raised/60 px-6 py-4">
          <span
            className="h-1.5 w-1.5 rounded-full bg-primary"
            aria-hidden="true"
          />
          <p className="font-mono text-xs text-muted-foreground">
            {t("audit.footer")}
          </p>
        </div>
      </section>
    </div>
  );
}

/** Format a duration in seconds as a compact "Xd Yh" / "Xh Ym" / "Ym" string. */
function formatDuration(seconds: bigint | undefined): string {
  if (seconds === undefined) return "—";
  const total = Number(seconds);
  if (total <= 0) return "0m";
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}
