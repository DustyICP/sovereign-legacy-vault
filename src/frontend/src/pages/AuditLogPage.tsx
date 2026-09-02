import { createActor } from "@/backend";
import type { AuditEvent } from "@/backend";
import { useTranslation } from "@/lib/translations";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

function useAuditEvents() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["audit-events"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAuditEvents();
    },
    enabled: !!actor && !isFetching,
  });
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

/** Split a nanosecond backend timestamp into date and time display strings. */
function formatTimestamp(timestamp: bigint): {
  date: string;
  time: string;
} {
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

/**
 * Audit Logs. A permanent, tamper-evident ledger of every action taken
 * against the vault, driven by the backend `listAuditEvents` query. Mono
 * timestamps, event-type markers, and descriptions on hairline-divided rows
 * inside a floating surface card. Security events carry the single gold
 * accent; verification events read in success tone.
 */
export function AuditLogPage() {
  const { t } = useTranslation();
  const { data: events = [], isLoading, isError } = useAuditEvents();

  return (
    <div
      data-ocid="audit_logs"
      className="mx-auto max-w-7xl px-6 py-10 lg:px-8"
    >
      <header className="mb-8 animate-fade-rise">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("audit.eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
          {t("audit.title")}
        </h1>
      </header>

      <section
        data-ocid="audit_logs.ledger"
        className="animate-fade-rise overflow-hidden rounded border border-border bg-surface shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:60ms]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-6 py-4">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            {t("audit.ledger")}
          </p>
          <p className="font-mono text-xs text-muted-foreground">
            {t("audit.count", { count: events.length })}
          </p>
        </div>

        {isLoading ? (
          <div
            data-ocid="audit_logs.loading_state"
            className="flex flex-col gap-3 p-6"
            aria-busy="true"
          >
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded bg-surface-raised"
              />
            ))}
          </div>
        ) : isError ? (
          <div
            data-ocid="audit_logs.error_state"
            className="flex flex-col items-center gap-3 px-6 py-12 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-destructive">
              {t("audit.errorEyebrow")}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("audit.errorBody")}
            </p>
          </div>
        ) : events.length === 0 ? (
          <div
            data-ocid="audit_logs.empty_state"
            className="flex flex-col items-center gap-3 px-6 py-12 text-center"
          >
            <p className="font-display text-xl font-semibold text-foreground">
              {t("audit.emptyTitle")}
            </p>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              {t("audit.emptyBody")}
            </p>
          </div>
        ) : (
          <table
            data-ocid="audit_logs.table"
            className="w-full border-collapse"
            aria-label={t("audit.tableAria")}
          >
            <thead>
              <tr className="border-b border-border">
                <th
                  scope="col"
                  className="w-[8.5rem] px-6 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {t("audit.timestamp")}
                </th>
                <th
                  scope="col"
                  className="w-[8.5rem] px-6 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {t("audit.event")}
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-muted-foreground"
                >
                  {t("audit.description")}
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event: AuditEvent, index: number) => {
                const { date, time } = formatTimestamp(event.timestamp);
                return (
                  <tr
                    key={event.id.toString()}
                    data-ocid={`audit_logs.row.${index + 1}`}
                    className="border-b border-border transition-smooth last:border-b-0 hover:bg-surface-raised"
                  >
                    <td className="w-[8.5rem] px-6 py-4 align-top">
                      <p className="font-mono text-[11px] text-muted-foreground">
                        {date}
                      </p>
                      <p className="mt-0.5 font-mono text-xs tabular-nums text-foreground">
                        {time}
                      </p>
                    </td>
                    <td className="w-[8.5rem] px-6 py-4 align-top">
                      <span className="flex items-center gap-2">
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${eventDot(event.eventType)}`}
                          aria-hidden="true"
                        />
                        <span
                          className={`truncate font-mono text-xs font-medium uppercase tracking-[0.14em] ${eventTone(event.eventType)}`}
                        >
                          {event.eventType}
                        </span>
                      </span>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <p className="text-sm leading-relaxed text-foreground/90">
                        {event.description}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
