import { createActor } from "@/backend";
import type { SwitchState, SwitchTimeline } from "@/backend";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslation } from "@/lib/translations";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, ShieldOff, Timer } from "lucide-react";
import { useState } from "react";

const CADENCE_OPTIONS = [
  { labelKey: "switch.cadence24h", seconds: 86400n },
  { labelKey: "switch.cadence7d", seconds: 604800n },
  { labelKey: "switch.cadence30d", seconds: 2592000n },
] as const;

const DEFAULT_CADENCE = "604800";

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

function useSwitchTimeline() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["switch-timeline"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSwitchTimeline();
    },
    enabled: !!actor && !isFetching,
  });
}

function useArmSwitch() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cadenceSeconds: bigint) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.armSwitch(cadenceSeconds);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["switch-state"] });
      void queryClient.invalidateQueries({ queryKey: ["switch-timeline"] });
    },
  });
}

function useDisarmSwitch() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.disarmSwitch();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["switch-state"] });
      void queryClient.invalidateQueries({ queryKey: ["switch-timeline"] });
    },
  });
}

function useCheckIn() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.checkIn();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["switch-state"] });
      void queryClient.invalidateQueries({ queryKey: ["switch-timeline"] });
    },
  });
}

/** Format a duration in seconds as a compact "Xd Yh" / "Xh Ym" / "Ym" string. */
function formatDuration(seconds: bigint): string {
  const total = Number(seconds);
  if (total <= 0) return "0m";
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/** Format a nanosecond backend timestamp as a short local date-time string. */
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

/**
 * The Switch. The single control that hands the vault over. A prominent status
 * card shows the ARMED/DISARMED state with a mono cadence timeline and a gold
 * "I'm still here" check-in button. Arm/disarm controls drive the dead man's
 * switch through the backend.
 */
export function SwitchPage() {
  const { t, formatDate } = useTranslation();
  const stateQuery = useSwitchState();
  const timelineQuery = useSwitchTimeline();
  const armMutation = useArmSwitch();
  const disarmMutation = useDisarmSwitch();
  const checkInMutation = useCheckIn();

  const [cadence, setCadence] = useState(DEFAULT_CADENCE);
  const [cadenceError, setCadenceError] = useState<string | null>(null);

  const state = stateQuery.data;
  const timeline = timelineQuery.data;
  const loading = stateQuery.isLoading || timelineQuery.isLoading;
  const isArmed = state?.status === "armed";

  const cadenceSeconds = state?.cadenceSeconds ?? BigInt(cadence);
  const progress =
    isArmed && timeline?.timeSinceLastCheckIn != null && cadenceSeconds > 0n
      ? Math.min(
          1,
          Number(timeline.timeSinceLastCheckIn) / Number(cadenceSeconds),
        )
      : 0;

  const ticks = [0, 0.25, 0.5, 0.75, 1];

  const handleArm = () => {
    const parsed = Number(cadence);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      setCadenceError(t("switch.cadenceError"));
      return;
    }
    setCadenceError(null);
    armMutation.mutate(BigInt(cadence));
  };

  const handleDisarm = () => {
    disarmMutation.mutate();
  };

  const handleCheckIn = () => {
    checkInMutation.mutate();
  };

  const anyPending =
    armMutation.isPending ||
    disarmMutation.isPending ||
    checkInMutation.isPending;

  return (
    <div data-ocid="switch" className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <header className="mb-8 animate-fade-rise">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("switch.eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
          {t("switch.title")}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t("switch.subtitle")}
        </p>
      </header>

      {loading ? (
        <section
          data-ocid="switch.loading_state"
          className="space-y-4"
          aria-busy="true"
        >
          {[0, 1].map((i) => (
            <div
              key={i}
              className="h-48 animate-pulse rounded border border-border bg-surface shadow-subtle"
            />
          ))}
        </section>
      ) : stateQuery.isError ? (
        <section
          data-ocid="switch.error_state"
          className="rounded border border-destructive/40 bg-surface p-10 text-center shadow-subtle"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-destructive">
            {t("switch.errorEyebrow")}
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("switch.errorBody")}
          </p>
        </section>
      ) : (
        <>
          {/* Status card */}
          <section
            data-ocid="switch.status_card"
            className="animate-fade-rise rounded border border-primary/50 bg-surface p-8 shadow-gold-glow"
          >
            <div className="flex flex-wrap items-start justify-between gap-6">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      isArmed ? "bg-success" : "bg-muted-foreground"
                    }`}
                    aria-hidden="true"
                  />
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
                    {isArmed ? t("switch.active") : t("switch.standingDown")}
                  </p>
                </div>
                <p
                  data-ocid="switch.status_word"
                  className={`mt-4 font-display text-6xl font-semibold tracking-tight md:text-7xl ${
                    isArmed ? "text-extruded-gold" : "text-muted-foreground"
                  }`}
                >
                  {isArmed ? t("switch.armed") : t("switch.disarmed")}
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-3 sm:items-end">
                {isArmed ? (
                  <Button
                    data-ocid="switch.checkin_button"
                    onClick={handleCheckIn}
                    disabled={anyPending}
                    className="bg-gradient-gold px-6 text-primary-foreground hover:opacity-90"
                  >
                    <ShieldCheck />
                    {t("switch.checkIn")}
                  </Button>
                ) : (
                  <Button
                    data-ocid="switch.arm_button"
                    onClick={handleArm}
                    disabled={anyPending}
                    className="bg-gradient-gold px-6 text-primary-foreground hover:opacity-90"
                  >
                    <ShieldCheck />
                    {t("switch.arm")}
                  </Button>
                )}
                {isArmed && (
                  <Button
                    data-ocid="switch.disarm_button"
                    variant="outline"
                    onClick={handleDisarm}
                    disabled={anyPending}
                    className="text-muted-foreground"
                  >
                    <ShieldOff />
                    {t("switch.disarm")}
                  </Button>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="mt-10">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Timer className="size-3.5" aria-hidden="true" />
                  {t("switch.cadence", {
                    duration: formatDuration(cadenceSeconds),
                  })}
                </span>
                {isArmed && timeline?.timeUntilRelease != null && (
                  <span data-ocid="switch.time_until_release">
                    {t("switch.releaseIn", {
                      duration: formatDuration(timeline.timeUntilRelease),
                    })}
                  </span>
                )}
              </div>

              <div
                className="relative mt-4 h-3 w-full"
                role="img"
                aria-label={
                  isArmed
                    ? t("switch.timelineAriaArmed", {
                        percent: Math.round(progress * 100),
                      })
                    : t("switch.timelineAriaDisarmed")
                }
              >
                <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-surface-raised" />
                <div
                  className="absolute inset-y-0 left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-gold"
                  style={{ width: `${progress * 100}%` }}
                  aria-hidden="true"
                />
                {ticks.map((t) => (
                  <span
                    key={t}
                    className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-border"
                    style={{ left: `${t * 100}%` }}
                    aria-hidden="true"
                  />
                ))}
              </div>

              <div className="mt-2 flex justify-between font-mono text-[0.6875rem] text-muted-foreground">
                {ticks.map((t) => (
                  <span key={t}>
                    {formatDuration(
                      BigInt(Math.round(t * Number(cadenceSeconds))),
                    )}
                  </span>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t("switch.lastCheckIn")}
                </p>
                <p className="mt-2 font-mono text-sm text-foreground">
                  {state?.lastCheckIn
                    ? formatDateTime(state.lastCheckIn, formatDate)
                    : "—"}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t("switch.armedAt")}
                </p>
                <p className="mt-2 font-mono text-sm text-foreground">
                  {state?.armedAt
                    ? formatDateTime(state.armedAt, formatDate)
                    : "—"}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t("switch.cadenceLabel")}
                </p>
                <p className="mt-2 font-mono text-sm text-foreground">
                  {formatDuration(cadenceSeconds)}
                </p>
              </div>
            </div>
          </section>

          {/* Arm / disarm control panel */}
          <section
            data-ocid="switch.controls"
            className="mt-6 animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:60ms]"
          >
            {isArmed ? (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {t("switch.standingDownTitle")}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {t("switch.standingDownBody")}
                  </p>
                </div>
                <Button
                  data-ocid="switch.controls_disarm_button"
                  variant="outline"
                  onClick={handleDisarm}
                  disabled={anyPending}
                  className="text-muted-foreground"
                >
                  <ShieldOff />
                  {t("switch.disarmTheSwitch")}
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap items-end justify-between gap-6">
                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {t("switch.armTitle")}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {t("switch.armBody")}
                  </p>
                  <div className="mt-5 grid gap-2">
                    <Label htmlFor="switch-cadence">
                      {t("common.checkInCadence")}
                    </Label>
                    <Select
                      value={cadence}
                      onValueChange={(value) => {
                        setCadence(value);
                        setCadenceError(null);
                      }}
                    >
                      <SelectTrigger
                        id="switch-cadence"
                        data-ocid="switch.cadence_select"
                        className="w-48"
                      >
                        <SelectValue placeholder={t("common.selectCadence")} />
                      </SelectTrigger>
                      <SelectContent>
                        {CADENCE_OPTIONS.map((option) => (
                          <SelectItem
                            key={option.seconds.toString()}
                            value={option.seconds.toString()}
                          >
                            {t(option.labelKey)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {cadenceError && (
                      <p
                        data-ocid="switch.cadence_error"
                        className="text-sm text-destructive"
                      >
                        {cadenceError}
                      </p>
                    )}
                  </div>
                </div>
                <Button
                  data-ocid="switch.controls_arm_button"
                  onClick={handleArm}
                  disabled={anyPending}
                  className="bg-gradient-gold px-6 text-primary-foreground hover:opacity-90"
                >
                  <ShieldCheck />
                  {t("switch.arm")}
                </Button>
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}
