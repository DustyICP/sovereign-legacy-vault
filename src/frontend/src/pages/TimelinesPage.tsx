import { createActor } from "@/backend";
import type { SwitchState, SwitchTimeline } from "@/backend";
import { Button } from "@/components/ui/button";
import { type TranslationKey, useTranslation } from "@/lib/translations";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BellRing, ShieldCheck, ShieldOff, Timer } from "lucide-react";
import { type CSSProperties, useState } from "react";
import { toast } from "sonner";

const ONSET_MIN = 1;
const ONSET_MAX = 365;
const REPEAT_MIN = 1;
const REPEAT_MAX = 90;
const TRIGGER_MIN = 1;
const TRIGGER_MAX = 730;

const DEFAULT_ONSET = 30;
const DEFAULT_REPEAT = 7;
const DEFAULT_TRIGGER = 180;

interface Param {
  key: "onset" | "repeat" | "trigger";
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
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
    mutationFn: async (config: {
      warningOnsetDays: bigint;
      warningRepeatDays: bigint;
      triggerDays: bigint;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.armSwitch(
        config.warningOnsetDays,
        config.warningRepeatDays,
        config.triggerDays,
      );
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

function ParamControl({
  param,
  t,
}: {
  param: Param;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}) {
  const labelKey = `timelines.param.${param.key}.label` as TranslationKey;
  const hintKey = `timelines.param.${param.key}.hint` as TranslationKey;
  const unitKey = `timelines.param.${param.key}.unit` as TranslationKey;
  const fill = ((param.value - param.min) / (param.max - param.min)) * 100;

  return (
    <div
      data-ocid={`timelines.param.${param.key}`}
      className="param-control p-5"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="param-label">{t(labelKey)}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
            {t(hintKey)}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="param-value">{param.value}</p>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-muted-foreground">
            {t(unitKey)}
          </p>
        </div>
      </div>

      <input
        type="range"
        data-ocid={`timelines.param.${param.key}.slider`}
        className="slider-track mt-5"
        min={param.min}
        max={param.max}
        value={param.value}
        aria-label={t(labelKey)}
        style={{ "--fill": `${fill}%` } as CSSProperties}
        onChange={(e) => param.onChange(Number(e.target.value))}
      />

      <div className="mt-2 flex justify-between font-mono text-[0.6875rem] text-muted-foreground">
        <span>{param.min}</span>
        <span>{param.max}</span>
      </div>
    </div>
  );
}

/**
 * The Timelines tab. Three separately configurable inactivity parameters —
 * warning onset, warning repeat frequency, and the trigger day — govern when
 * the vault warns the owner and when it finally releases to beneficiaries.
 * The full configuration, state, and logic work; real outgoing email dispatch
 * is deferred pending an email provider decision.
 */
export function TimelinesPage() {
  const { t, formatDate } = useTranslation();
  const stateQuery = useSwitchState();
  const timelineQuery = useSwitchTimeline();
  const armMutation = useArmSwitch();
  const disarmMutation = useDisarmSwitch();
  const checkInMutation = useCheckIn();

  const [onset, setOnset] = useState(DEFAULT_ONSET);
  const [repeat, setRepeat] = useState(DEFAULT_REPEAT);
  const [trigger, setTrigger] = useState(DEFAULT_TRIGGER);
  const [validationError, setValidationError] = useState<string | null>(null);

  const state = stateQuery.data;
  const timeline = timelineQuery.data;
  const loading = stateQuery.isLoading || timelineQuery.isLoading;
  const isArmed = state?.status === "armed";

  const params: Param[] = [
    {
      key: "onset",
      min: ONSET_MIN,
      max: ONSET_MAX,
      value: onset,
      onChange: (v) => {
        setOnset(v);
        setValidationError(null);
      },
    },
    {
      key: "repeat",
      min: REPEAT_MIN,
      max: REPEAT_MAX,
      value: repeat,
      onChange: (v) => {
        setRepeat(v);
        setValidationError(null);
      },
    },
    {
      key: "trigger",
      min: TRIGGER_MIN,
      max: TRIGGER_MAX,
      value: trigger,
      onChange: (v) => {
        setTrigger(v);
        setValidationError(null);
      },
    },
  ];

  const handleArm = () => {
    if (onset < 1 || repeat < 1 || trigger < 1) {
      setValidationError(t("timelines.validation.allPositive"));
      return;
    }
    if (onset >= trigger) {
      setValidationError(t("timelines.validation.onsetBeforeTrigger"));
      return;
    }
    setValidationError(null);
    armMutation.mutate(
      {
        warningOnsetDays: BigInt(onset),
        warningRepeatDays: BigInt(repeat),
        triggerDays: BigInt(trigger),
      },
      {
        onSuccess: () => {
          toast.success(t("timelines.armedToast"), {
            description: t("timelines.armedToastDesc"),
          });
        },
        onError: () => {
          toast.error(t("timelines.armError"), {
            description: t("timelines.armErrorDesc"),
          });
        },
      },
    );
  };

  const handleDisarm = () => {
    disarmMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success(t("timelines.disarmedToast"), {
          description: t("timelines.disarmedToastDesc"),
        });
      },
    });
  };

  const handleCheckIn = () => {
    checkInMutation.mutate(undefined, {
      onSuccess: () => {
        toast.success(t("timelines.checkInToast"), {
          description: t("timelines.checkInToastDesc"),
        });
      },
      onError: () => {
        toast.error(t("timelines.checkInError"), {
          description: t("timelines.checkInErrorDesc"),
        });
      },
    });
  };

  const anyPending =
    armMutation.isPending ||
    disarmMutation.isPending ||
    checkInMutation.isPending;

  const warningDuration = timeline?.timeUntilWarning;
  const triggerDuration = timeline?.timeUntilTrigger;

  return (
    <div data-ocid="timelines" className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <header className="mb-8 animate-fade-rise">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("timelines.eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
          {t("timelines.title")}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t("timelines.subtitle")}
        </p>
      </header>

      {loading ? (
        <section
          data-ocid="timelines.loading_state"
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
          data-ocid="timelines.error_state"
          className="rounded border border-destructive/40 bg-surface p-10 text-center shadow-subtle"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-destructive">
            {t("timelines.errorEyebrow")}
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            {t("timelines.errorBody")}
          </p>
        </section>
      ) : (
        <>
          {/* Status card */}
          <section
            data-ocid="timelines.status_card"
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
                    {isArmed
                      ? t("timelines.active")
                      : t("timelines.standingDown")}
                  </p>
                </div>
                <p
                  data-ocid="timelines.status_word"
                  className={`mt-4 font-display text-6xl font-semibold tracking-tight md:text-7xl ${
                    isArmed ? "text-extruded-gold" : "text-muted-foreground"
                  }`}
                >
                  {isArmed ? t("timelines.armed") : t("timelines.disarmed")}
                </p>
              </div>

              <div className="flex flex-col items-stretch gap-3 sm:items-end">
                {isArmed ? (
                  <Button
                    data-ocid="timelines.checkin_button"
                    onClick={handleCheckIn}
                    disabled={anyPending}
                    className="bg-gradient-gold px-6 text-primary-foreground hover:opacity-90"
                  >
                    <ShieldCheck />
                    {t("timelines.checkIn")}
                  </Button>
                ) : (
                  <Button
                    data-ocid="timelines.arm_button"
                    onClick={handleArm}
                    disabled={anyPending}
                    className="bg-gradient-gold px-6 text-primary-foreground hover:opacity-90"
                  >
                    <ShieldCheck />
                    {t("timelines.arm")}
                  </Button>
                )}
                {isArmed && (
                  <Button
                    data-ocid="timelines.disarm_button"
                    variant="outline"
                    onClick={handleDisarm}
                    disabled={anyPending}
                    className="text-muted-foreground"
                  >
                    <ShieldOff />
                    {t("timelines.disarm")}
                  </Button>
                )}
              </div>
            </div>

            {/* Timeline progress */}
            <div className="mt-10">
              <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Timer className="size-3.5" aria-hidden="true" />
                  {t("timelines.eyebrow")}
                </span>
                {isArmed && (
                  <span className="flex items-center gap-4">
                    {warningDuration != null && (
                      <span data-ocid="timelines.time_until_warning">
                        {t("timelines.warningIn", {
                          duration: formatDuration(warningDuration),
                        })}
                      </span>
                    )}
                    {triggerDuration != null && (
                      <span data-ocid="timelines.time_until_trigger">
                        {t("timelines.triggerIn", {
                          duration: formatDuration(triggerDuration),
                        })}
                      </span>
                    )}
                  </span>
                )}
              </div>

              <div
                className="relative mt-4 h-3 w-full"
                role="img"
                aria-label={
                  isArmed
                    ? t("timelines.timelineAriaArmed", {
                        warning: warningDuration
                          ? formatDuration(warningDuration)
                          : "—",
                        trigger: triggerDuration
                          ? formatDuration(triggerDuration)
                          : "—",
                      })
                    : t("timelines.timelineAriaDisarmed")
                }
              >
                <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-surface-raised" />
                <div
                  className="absolute inset-y-0 left-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-gradient-gold"
                  style={{
                    width: `${progressWidth(warningDuration, triggerDuration)}%`,
                  }}
                  aria-hidden="true"
                />
                {warningDuration != null && (
                  <span
                    className="absolute top-1/2 h-3 w-px -translate-y-1/2 bg-warning"
                    style={{
                      left: `${warningPosition(warningDuration, triggerDuration)}%`,
                    }}
                    aria-hidden="true"
                  />
                )}
              </div>

              <div className="mt-2 flex justify-between font-mono text-[0.6875rem] text-muted-foreground">
                <span>0</span>
                <span>{t("timelines.triggerIn", { duration: "…" })}</span>
              </div>
            </div>

            {/* Metadata */}
            <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-3">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t("timelines.lastCheckIn")}
                </p>
                <p className="mt-2 font-mono text-sm text-foreground">
                  {state?.lastCheckIn
                    ? formatDateTime(state.lastCheckIn, formatDate)
                    : "—"}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t("timelines.armedAt")}
                </p>
                <p className="mt-2 font-mono text-sm text-foreground">
                  {state?.armedAt
                    ? formatDateTime(state.armedAt, formatDate)
                    : "—"}
                </p>
              </div>
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {t("timelines.param.trigger.label")}
                </p>
                <p className="mt-2 font-mono text-sm text-foreground">
                  {state?.triggerDays != null
                    ? `${Number(state.triggerDays)} ${t("timelines.param.trigger.unit")}`
                    : "—"}
                </p>
              </div>
            </div>
          </section>

          {/* Three-parameter configuration */}
          <section
            data-ocid="timelines.controls"
            className="mt-6 animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:60ms]"
          >
            {isArmed ? (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {t("timelines.standingDownTitle")}
                  </p>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {t("timelines.standingDownBody")}
                  </p>
                </div>
                <Button
                  data-ocid="timelines.controls_disarm_button"
                  variant="outline"
                  onClick={handleDisarm}
                  disabled={anyPending}
                  className="text-muted-foreground"
                >
                  <ShieldOff />
                  {t("timelines.disarmTheSwitch")}
                </Button>
              </div>
            ) : (
              <div>
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      {t("timelines.armTitle")}
                    </p>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                      {t("timelines.armBody")}
                    </p>
                  </div>
                  <Button
                    data-ocid="timelines.controls_arm_button"
                    onClick={handleArm}
                    disabled={anyPending}
                    className="bg-gradient-gold px-6 text-primary-foreground hover:opacity-90"
                  >
                    <ShieldCheck />
                    {t("timelines.arm")}
                  </Button>
                </div>

                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {params.map((param) => (
                    <ParamControl key={param.key} param={param} t={t} />
                  ))}
                </div>

                {validationError && (
                  <p
                    data-ocid="timelines.validation_error"
                    className="mt-4 flex items-center gap-2 text-sm text-destructive"
                  >
                    <BellRing className="size-4" aria-hidden="true" />
                    {validationError}
                  </p>
                )}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
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

/** Fraction of the trigger window elapsed, as a percentage (0–100). */
function progressWidth(
  timeUntilWarning: bigint | undefined,
  timeUntilTrigger: bigint | undefined,
): number {
  if (timeUntilWarning == null || timeUntilTrigger == null) return 0;
  const warning = Number(timeUntilWarning);
  const trigger = Number(timeUntilTrigger);
  if (trigger <= 0) return 100;
  const elapsed = trigger - warning;
  return Math.min(100, Math.max(0, (elapsed / trigger) * 100));
}

/** Position of the warning marker along the trigger window, as a percentage. */
function warningPosition(
  timeUntilWarning: bigint | undefined,
  timeUntilTrigger: bigint | undefined,
): number {
  if (timeUntilWarning == null || timeUntilTrigger == null) return 0;
  const warning = Number(timeUntilWarning);
  const trigger = Number(timeUntilTrigger);
  if (trigger <= 0) return 0;
  const elapsed = trigger - warning;
  return Math.min(100, Math.max(0, (elapsed / trigger) * 100));
}
