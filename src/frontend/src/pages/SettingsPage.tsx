import { createActor } from "@/backend";
import type { Beneficiary, SwitchState } from "@/backend";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { type TranslationKey, useTranslation } from "@/lib/translations";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
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

function formatShare(share: bigint): string {
  return `${Number(share)}%`;
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
      data-ocid={`settings.param.${param.key}`}
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
        data-ocid={`settings.param.${param.key}.slider`}
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

function SwitchSettings() {
  const { t } = useTranslation();
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const { data: state, isLoading } = useQuery({
    queryKey: ["switchState"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getSwitchState();
    },
    enabled: !!actor && !isFetching,
  });

  const armMutation = useMutation({
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
    onSuccess: (next: SwitchState) => {
      queryClient.setQueryData(["switchState"], next);
      toast.success(t("settings.toast.armed"), {
        description: t("settings.toast.armedDesc"),
      });
    },
    onError: () => {
      toast.error(t("settings.toast.armError"), {
        description: t("settings.toast.armErrorDesc"),
      });
    },
  });

  const disarmMutation = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.disarmSwitch();
    },
    onSuccess: (next: SwitchState) => {
      queryClient.setQueryData(["switchState"], next);
      toast.success(t("settings.toast.disarmed"), {
        description: t("settings.toast.disarmedDesc"),
      });
    },
    onError: () => {
      toast.error(t("settings.toast.disarmError"), {
        description: t("settings.toast.disarmErrorDesc"),
      });
    },
  });

  const [onset, setOnset] = useState(DEFAULT_ONSET);
  const [repeat, setRepeat] = useState(DEFAULT_REPEAT);
  const [trigger, setTrigger] = useState(DEFAULT_TRIGGER);
  const [validationError, setValidationError] = useState<string | null>(null);

  if (isLoading || !state) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-32" />
      </div>
    );
  }

  const isArmed = state.status === "armed";

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
    armMutation.mutate({
      warningOnsetDays: BigInt(onset),
      warningRepeatDays: BigInt(repeat),
      triggerDays: BigInt(trigger),
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`h-2.5 w-2.5 rounded-full ${isArmed ? "bg-success" : "bg-muted-foreground"}`}
            aria-hidden="true"
          />
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
            {isArmed ? t("common.armed") : t("common.disarmed")}
          </span>
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          {t("settings.cadence", {
            value: `${Number(state.triggerDays)} ${t("timelines.param.trigger.unit")}`,
          })}
        </p>
      </div>

      {isArmed ? (
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {t("timelines.standingDownBody")}
          </p>
          <Button
            data-ocid="settings.disarm_button"
            variant="outline"
            onClick={() => disarmMutation.mutate()}
            disabled={disarmMutation.isPending}
          >
            <ShieldOff className="size-4" />
            {disarmMutation.isPending
              ? t("common.disarming")
              : t("common.disarm")}
          </Button>
        </div>
      ) : (
        <div>
          <div className="grid gap-4 md:grid-cols-3">
            {params.map((param) => (
              <ParamControl key={param.key} param={param} t={t} />
            ))}
          </div>

          {validationError && (
            <p
              data-ocid="settings.validation_error"
              className="mt-4 flex items-center gap-2 text-sm text-destructive"
            >
              <ShieldCheck className="size-4" aria-hidden="true" />
              {validationError}
            </p>
          )}

          <div className="mt-6 flex justify-end">
            <Button
              data-ocid="settings.arm_button"
              onClick={handleArm}
              disabled={armMutation.isPending}
            >
              <ShieldCheck className="size-4" />
              {armMutation.isPending ? t("common.arming") : t("common.arm")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

interface BeneficiaryFormState {
  name: string;
  allocationShare: string;
  walletAddress: string;
}

function BeneficiaryRow({
  beneficiary,
  onEdit,
  onRemove,
  t,
}: {
  beneficiary: Beneficiary;
  onEdit: (b: Beneficiary) => void;
  onRemove: (b: Beneficiary) => void;
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
}) {
  return (
    <div
      data-ocid={`settings.beneficiary.${beneficiary.id}`}
      className="flex flex-wrap items-center justify-between gap-3 rounded border border-border bg-surface-raised px-4 py-3"
    >
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-foreground">
          {beneficiary.name}
        </p>
        <p className="mt-0.5 truncate font-mono text-xs text-muted-foreground">
          {beneficiary.walletAddress}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="rounded border border-border bg-surface px-2 py-1 font-mono text-xs text-muted-foreground">
          {formatShare(beneficiary.allocationShare)}
        </span>
        <Button
          data-ocid={`settings.beneficiary.edit_button.${beneficiary.id}`}
          variant="outline"
          size="sm"
          onClick={() => onEdit(beneficiary)}
        >
          {t("common.edit")}
        </Button>
        <Button
          data-ocid={`settings.beneficiary.delete_button.${beneficiary.id}`}
          variant="ghost"
          size="icon"
          aria-label={t("beneficiaries.removeAria", { name: beneficiary.name })}
          onClick={() => onRemove(beneficiary)}
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

function BeneficiarySettings() {
  const { t } = useTranslation();
  const { actor, isFetching } = useActor(createActor);
  const queryClient = useQueryClient();

  const { data: beneficiaries, isLoading } = useQuery({
    queryKey: ["beneficiaries"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listBeneficiaries();
    },
    enabled: !!actor && !isFetching,
  });

  const [editing, setEditing] = useState<Beneficiary | null>(null);
  const [removing, setRemoving] = useState<Beneficiary | null>(null);
  const [form, setForm] = useState<BeneficiaryFormState>({
    name: "",
    allocationShare: "",
    walletAddress: "",
  });

  const openEdit = (b: Beneficiary) => {
    setEditing(b);
    setForm({
      name: b.name,
      allocationShare: b.allocationShare.toString(),
      walletAddress: b.walletAddress,
    });
  };

  const updateMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !editing) throw new Error("Backend is not ready");
      return actor.updateBeneficiary(
        editing.id,
        form.name,
        BigInt(form.allocationShare),
        form.walletAddress,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
      setEditing(null);
      toast.success(t("settings.toast.beneficiaryUpdated"), {
        description: t("settings.toast.beneficiaryUpdatedDesc"),
      });
    },
    onError: () => {
      toast.error(t("settings.toast.updateError"), {
        description: t("settings.toast.updateErrorDesc"),
      });
    },
  });

  const removeMutation = useMutation({
    mutationFn: async () => {
      if (!actor || !removing) throw new Error("Backend is not ready");
      return actor.removeBeneficiary(removing.id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
      setRemoving(null);
      toast.success(t("settings.toast.beneficiaryRemoved"), {
        description: t("settings.toast.beneficiaryRemovedDesc"),
      });
    },
    onError: () => {
      toast.error(t("settings.toast.removeError"), {
        description: t("settings.toast.removeErrorDesc"),
      });
    },
  });

  const canSave =
    form.name.trim().length > 0 &&
    form.allocationShare.trim().length > 0 &&
    form.walletAddress.trim().length > 0;

  if (isLoading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-14 w-full" />
        <Skeleton className="h-14 w-full" />
      </div>
    );
  }

  const list = beneficiaries ?? [];

  return (
    <div className="space-y-4">
      {list.length === 0 ? (
        <p
          data-ocid="settings.beneficiaries.empty_state"
          className="rounded border border-dashed border-border px-4 py-8 text-center font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
        >
          {t("settings.emptyBeneficiaries")}
        </p>
      ) : (
        <div className="space-y-3">
          {list.map((b) => (
            <BeneficiaryRow
              key={b.id.toString()}
              beneficiary={b}
              onEdit={openEdit}
              onRemove={setRemoving}
              t={t}
            />
          ))}
        </div>
      )}

      <Dialog
        open={editing !== null}
        onOpenChange={(open) => !open && setEditing(null)}
      >
        <DialogContent data-ocid="settings.beneficiary_modal">
          <DialogHeader>
            <DialogTitle>{t("settings.editBeneficiary")}</DialogTitle>
            <DialogDescription>
              {t("settings.editBeneficiaryDesc")}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="beneficiary-name">{t("common.name")}</Label>
              <Input
                id="beneficiary-name"
                data-ocid="settings.beneficiary.name_input"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beneficiary-share">
                {t("common.allocationShare")}
              </Label>
              <Input
                id="beneficiary-share"
                data-ocid="settings.beneficiary.share_input"
                inputMode="numeric"
                value={form.allocationShare}
                onChange={(e) =>
                  setForm((f) => ({ ...f, allocationShare: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="beneficiary-wallet">
                {t("common.walletAddress")}
              </Label>
              <Input
                id="beneficiary-wallet"
                data-ocid="settings.beneficiary.wallet_input"
                value={form.walletAddress}
                onChange={(e) =>
                  setForm((f) => ({ ...f, walletAddress: e.target.value }))
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="settings.beneficiary.cancel_button"
              onClick={() => setEditing(null)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              data-ocid="settings.beneficiary.save_button"
              onClick={() => updateMutation.mutate()}
              disabled={!canSave || updateMutation.isPending}
            >
              {updateMutation.isPending
                ? t("common.saving")
                : t("common.saveChanges")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={removing !== null}
        onOpenChange={(open) => !open && setRemoving(null)}
      >
        <DialogContent data-ocid="settings.beneficiary_remove_modal">
          <DialogHeader>
            <DialogTitle>{t("settings.removeBeneficiary")}</DialogTitle>
            <DialogDescription>
              {t("settings.removeBeneficiaryDesc", {
                name: removing?.name ?? "",
              })}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              data-ocid="settings.beneficiary.remove_cancel_button"
              onClick={() => setRemoving(null)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              variant="destructive"
              data-ocid="settings.beneficiary.remove_confirm_button"
              onClick={() => removeMutation.mutate()}
              disabled={removeMutation.isPending}
            >
              {removeMutation.isPending
                ? t("common.removing")
                : t("common.remove")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function SettingsPage() {
  const { t } = useTranslation();
  return (
    <div data-ocid="settings" className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <header className="mb-8 animate-fade-rise">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("settings.eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
          {t("settings.title")}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t("settings.subtitle")}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        <section
          data-ocid="settings.switch"
          className="animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
        >
          <CardHeader className="px-0 pt-0">
            <CardTitle className="font-display text-xl font-semibold tracking-tight">
              {t("settings.switchTitle")}
            </CardTitle>
            <CardDescription>{t("settings.switchDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <SwitchSettings />
          </CardContent>
        </section>

        <section
          data-ocid="settings.beneficiaries"
          className="animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:60ms]"
        >
          <CardHeader className="px-0 pt-0">
            <CardTitle className="font-display text-xl font-semibold tracking-tight">
              {t("settings.beneficiariesTitle")}
            </CardTitle>
            <CardDescription>{t("settings.beneficiariesDesc")}</CardDescription>
          </CardHeader>
          <CardContent className="px-0 pb-0">
            <BeneficiarySettings />
          </CardContent>
        </section>
      </div>
    </div>
  );
}
