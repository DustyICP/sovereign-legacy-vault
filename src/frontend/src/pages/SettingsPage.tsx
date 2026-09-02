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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { type TranslationKey, useTranslation } from "@/lib/translations";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ShieldCheck, ShieldOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const CADENCE_OPTIONS = [
  { seconds: 86400n, labelKey: "settings.daily", hintKey: "settings.h24" },
  { seconds: 604800n, labelKey: "settings.weekly", hintKey: "settings.h7d" },
  { seconds: 2592000n, labelKey: "settings.monthly", hintKey: "settings.h30d" },
  {
    seconds: 31536000n,
    labelKey: "settings.yearly",
    hintKey: "settings.h365d",
  },
] as const;

function formatCadence(
  seconds: bigint,
  t: (key: TranslationKey, params?: Record<string, string | number>) => string,
): string {
  const option = CADENCE_OPTIONS.find((o) => o.seconds === seconds);
  return option ? t(option.labelKey) : `${seconds} s`;
}

function formatShare(share: bigint): string {
  return `${Number(share)}%`;
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
    mutationFn: async (cadenceSeconds: bigint) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.armSwitch(cadenceSeconds);
    },
    onSuccess: (next: SwitchState) => {
      queryClient.setQueryData(["switchState"], next);
      toast.success(t("settings.toast.armed"), {
        description: t("settings.toast.armedDesc", {
          cadence: formatCadence(next.cadenceSeconds, t),
        }),
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

  const [cadence, setCadence] = useState<string>(
    CADENCE_OPTIONS[0].seconds.toString(),
  );

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
            value: formatCadence(state.cadenceSeconds, t),
          })}
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-end">
        <div className="space-y-2">
          <Label htmlFor="cadence">{t("common.checkInCadence")}</Label>
          <Select
            value={cadence}
            onValueChange={setCadence}
            disabled={isArmed || armMutation.isPending}
          >
            <SelectTrigger
              id="cadence"
              data-ocid="settings.cadence"
              className="w-full"
            >
              <SelectValue placeholder={t("common.selectCadence")} />
            </SelectTrigger>
            <SelectContent>
              {CADENCE_OPTIONS.map((option) => (
                <SelectItem
                  key={option.seconds.toString()}
                  value={option.seconds.toString()}
                >
                  {t(option.labelKey)} · {t(option.hintKey)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {isArmed ? (
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
        ) : (
          <Button
            data-ocid="settings.arm_button"
            onClick={() => armMutation.mutate(BigInt(cadence))}
            disabled={armMutation.isPending}
          >
            <ShieldCheck className="size-4" />
            {armMutation.isPending ? t("common.arming") : t("common.arm")}
          </Button>
        )}
      </div>
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
