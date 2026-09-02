import { createActor } from "@/backend";
import type { Beneficiary } from "@/backend";
import { Button } from "@/components/ui/button";
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
import { type TranslationKey, useTranslation } from "@/lib/translations";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";

/** Neutral steel tones used for non-primary allocation segments. */
const NEUTRAL_SEGMENTS = ["bg-chart-2", "bg-chart-3", "bg-chart-4"];

function useListBeneficiaries() {
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

function useAddBeneficiary() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      name: string;
      allocationShare: bigint;
      walletAddress: string;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.addBeneficiary(
        input.name,
        input.allocationShare,
        input.walletAddress,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
    },
  });
}

function useUpdateBeneficiary() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (input: {
      id: bigint;
      name: string;
      allocationShare: bigint;
      walletAddress: string;
    }) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.updateBeneficiary(
        input.id,
        input.name,
        input.allocationShare,
        input.walletAddress,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
    },
  });
}

function useRemoveBeneficiary() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Backend is not ready");
      return actor.removeBeneficiary(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["beneficiaries"] });
    },
  });
}

/** Format a bigint allocation share as a whole-number percentage string. */
function formatShare(share: bigint): string {
  return `${share.toString()}%`;
}

/** Standard CRC-32 (IEEE 802.3) over a byte array, returned as an unsigned int. */
function crc32(bytes: Uint8Array): number {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) {
    crc ^= bytes[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

/**
 * Validate the CRC-32 checksum of an ICP account identifier. The 64-hex-char
 * string encodes 32 bytes: the first 4 bytes are the CRC-32 of the remaining
 * 28 bytes (the account hash).
 */
function isValidAccountIdChecksum(hex: string): boolean {
  const bytes = new Uint8Array(32);
  for (let i = 0; i < 32; i++) {
    bytes[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  const provided =
    ((bytes[0] << 24) | (bytes[1] << 16) | (bytes[2] << 8) | bytes[3]) >>> 0;
  const expected = crc32(bytes.slice(4));
  return provided === expected;
}

/**
 * Validate a beneficiary wallet address. Returns a user-facing error message,
 * or null when the address is valid (or left blank, which is optional).
 * Accepts an ICP account identifier (64-hex-char string with a valid CRC-32
 * checksum) or an ICP principal.
 */
function validateWalletAddress(
  raw: string,
  t: (key: TranslationKey, params?: Record<string, string | number>) => string,
): string | null {
  const address = raw.trim();
  if (!address) return null;
  if (/^[0-9a-fA-F]{64}$/.test(address)) {
    return isValidAccountIdChecksum(address)
      ? null
      : t("beneficiaries.errors.invalidChecksum");
  }
  if (/^[a-z0-9]+(-[a-z0-9]+)*-[a-z0-9]{3}$/.test(address)) {
    return null;
  }
  return t("beneficiaries.errors.invalidWallet");
}

interface BeneficiaryFormState {
  name: string;
  allocationShare: string;
  walletAddress: string;
}

const EMPTY_FORM: BeneficiaryFormState = {
  name: "",
  allocationShare: "",
  walletAddress: "",
};

/**
 * Beneficiaries. Add, view, and manage the people and causes your legacy is
 * sealed for, each with an allocation share. A thin stacked allocation bar
 * renders every beneficiary as a segment — the largest share in gold, the
 * rest in neutral steel greys.
 */
export function BeneficiariesPage() {
  const { t } = useTranslation();
  const {
    data: beneficiaries = [],
    isLoading,
    isError,
  } = useListBeneficiaries();
  const addMutation = useAddBeneficiary();
  const updateMutation = useUpdateBeneficiary();
  const removeMutation = useRemoveBeneficiary();

  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Beneficiary | null>(null);
  const [form, setForm] = useState<BeneficiaryFormState>(EMPTY_FORM);
  const [formError, setFormError] = useState<string | null>(null);

  const totalShare = beneficiaries.reduce(
    (sum, b) => sum + b.allocationShare,
    0n,
  );

  const openAdd = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setFormError(null);
    setDialogOpen(true);
  };

  const openEdit = (beneficiary: Beneficiary) => {
    setEditing(beneficiary);
    setForm({
      name: beneficiary.name,
      allocationShare: beneficiary.allocationShare.toString(),
      walletAddress: beneficiary.walletAddress,
    });
    setFormError(null);
    setDialogOpen(true);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const share = BigInt(form.allocationShare.trim() || "0");
    if (!form.name.trim()) {
      setFormError(t("beneficiaries.errors.nameRequired"));
      return;
    }
    if (share <= 0n) {
      setFormError(t("beneficiaries.errors.sharePositive"));
      return;
    }
    const walletError = validateWalletAddress(form.walletAddress, t);
    if (walletError) {
      setFormError(walletError);
      return;
    }
    const newTotal = editing
      ? totalShare - editing.allocationShare + share
      : totalShare + share;
    if (newTotal > 100n) {
      setFormError(
        editing
          ? t("beneficiaries.errors.totalExceedsEdit", {
              total: newTotal.toString(),
            })
          : t("beneficiaries.errors.totalExceedsAdd", {
              total: newTotal.toString(),
            }),
      );
      return;
    }
    setFormError(null);
    const payload = {
      name: form.name.trim(),
      allocationShare: share,
      walletAddress: form.walletAddress.trim(),
    };
    if (editing) {
      updateMutation.mutate(
        { id: editing.id, ...payload },
        {
          onSuccess: () => setDialogOpen(false),
          onError: () => setFormError(t("beneficiaries.errors.saveFailed")),
        },
      );
    } else {
      addMutation.mutate(payload, {
        onSuccess: () => {
          setDialogOpen(false);
          setForm(EMPTY_FORM);
        },
        onError: () => setFormError(t("beneficiaries.errors.addFailed")),
      });
    }
  };

  const handleRemove = (beneficiary: Beneficiary) => {
    removeMutation.mutate(beneficiary.id);
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <div
      data-ocid="beneficiaries"
      className="mx-auto max-w-7xl px-6 py-10 lg:px-8"
    >
      <header className="mb-8 animate-fade-rise">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          {t("beneficiaries.eyebrow")}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
          {t("beneficiaries.title")}
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          {t("beneficiaries.subtitle")}
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Allocation bar */}
        <section
          data-ocid="beneficiaries.allocation"
          className="animate-fade-rise rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow lg:col-span-2"
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t("beneficiaries.allocation")}
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              {t("beneficiaries.count", { count: beneficiaries.length })}
            </p>
          </div>

          {beneficiaries.length === 0 ? (
            <p className="mt-6 font-mono text-xs text-muted-foreground">
              {t("beneficiaries.noAllocations")}
            </p>
          ) : (
            <>
              <div
                className="mt-6 flex h-2.5 w-full overflow-hidden rounded-full bg-surface-raised"
                role="img"
                aria-label={t("beneficiaries.allocationAria")}
              >
                {beneficiaries.map((b, index) => {
                  const width =
                    totalShare > 0n
                      ? Number((b.allocationShare * 10000n) / totalShare) / 100
                      : 0;
                  const isPrimary = index === 0;
                  return (
                    <span
                      key={b.id.toString()}
                      data-ocid={`beneficiaries.allocation.segment.${index}`}
                      className={`h-full ${isPrimary ? "bg-gradient-gold" : NEUTRAL_SEGMENTS[index % NEUTRAL_SEGMENTS.length]}`}
                      style={{ width: `${width}%` }}
                      aria-hidden="true"
                    />
                  );
                })}
              </div>
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1.5">
                {beneficiaries.map((b, index) => (
                  <span
                    key={b.id.toString()}
                    className="flex items-center gap-2 font-mono text-xs text-muted-foreground"
                  >
                    <span
                      className={`h-2 w-2 rounded-full ${index === 0 ? "bg-gradient-gold" : NEUTRAL_SEGMENTS[index % NEUTRAL_SEGMENTS.length]}`}
                      aria-hidden="true"
                    />
                    {b.name} · {formatShare(b.allocationShare)}
                  </span>
                ))}
              </div>
            </>
          )}
        </section>

        {/* Add action */}
        <section
          data-ocid="beneficiaries.actions"
          className="animate-fade-rise flex flex-col justify-between rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:60ms]"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
              {t("beneficiaries.manage")}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("beneficiaries.manageBody")}
            </p>
          </div>
          <Button
            data-ocid="beneficiaries.add_button"
            onClick={openAdd}
            className="mt-6 w-full bg-gradient-gold text-primary-foreground hover:opacity-90"
          >
            <Plus />
            {t("common.addBeneficiary")}
          </Button>
        </section>
      </div>

      {/* Beneficiary list */}
      <section
        data-ocid="beneficiaries.list"
        className="mt-6 animate-fade-rise rounded border border-border bg-surface shadow-subtle [animation-delay:120ms]"
      >
        {isLoading ? (
          <div
            data-ocid="beneficiaries.loading_state"
            className="flex flex-col gap-3 p-6"
          >
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-14 animate-pulse rounded bg-surface-raised"
              />
            ))}
          </div>
        ) : isError ? (
          <div
            data-ocid="beneficiaries.error_state"
            className="p-6 text-sm text-destructive"
          >
            {t("beneficiaries.loadError")}
          </div>
        ) : beneficiaries.length === 0 ? (
          <div
            data-ocid="beneficiaries.empty_state"
            className="flex flex-col items-center gap-3 px-6 py-12 text-center"
          >
            <p className="font-display text-xl font-semibold text-foreground">
              {t("beneficiaries.emptyTitle")}
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              {t("beneficiaries.emptyBody")}
            </p>
            <Button
              data-ocid="beneficiaries.empty_add_button"
              onClick={openAdd}
              className="mt-2 bg-gradient-gold text-primary-foreground hover:opacity-90"
            >
              <Plus />
              {t("common.addBeneficiary")}
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {beneficiaries.map((b, index) => (
              <li
                key={b.id.toString()}
                data-ocid={`beneficiaries.item.${index}`}
                className="flex flex-col gap-3 p-5 transition-smooth hover:bg-surface-raised sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-mono text-sm font-semibold ${index === 0 ? "bg-gradient-gold text-primary-foreground" : "bg-surface-raised text-muted-foreground"}`}
                    aria-hidden="true"
                  >
                    {b.name.charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-display text-base font-semibold text-foreground">
                      {b.name}
                    </p>
                    <p className="truncate font-mono text-xs text-muted-foreground">
                      {b.walletAddress || t("beneficiaries.noWallet")}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-semibold text-foreground">
                    {formatShare(b.allocationShare)}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      data-ocid={`beneficiaries.edit_button.${index}`}
                      variant="ghost"
                      size="icon"
                      aria-label={t("beneficiaries.editAria", { name: b.name })}
                      onClick={() => openEdit(b)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      data-ocid={`beneficiaries.delete_button.${index}`}
                      variant="ghost"
                      size="icon"
                      aria-label={t("beneficiaries.removeAria", {
                        name: b.name,
                      })}
                      className="text-muted-foreground hover:text-destructive"
                      onClick={() => handleRemove(b)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Add / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="beneficiaries.modal">
          <DialogHeader>
            <DialogTitle className="font-display text-xl text-foreground">
              {editing
                ? t("beneficiaries.modal.editTitle")
                : t("beneficiaries.modal.addTitle")}
            </DialogTitle>
            <DialogDescription>
              {editing
                ? t("beneficiaries.modal.editDesc")
                : t("beneficiaries.modal.addDesc")}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="beneficiary-name">{t("common.name")}</Label>
              <Input
                id="beneficiary-name"
                data-ocid="beneficiaries.name_input"
                value={form.name}
                onChange={(e) =>
                  setForm((f) => ({ ...f, name: e.target.value }))
                }
                placeholder={t("beneficiaries.namePlaceholder")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="beneficiary-share">
                {t("common.allocationShare")}
              </Label>
              <Input
                id="beneficiary-share"
                data-ocid="beneficiaries.share_input"
                type="number"
                min={1}
                value={form.allocationShare}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    allocationShare: e.target.value,
                  }))
                }
                placeholder={t("beneficiaries.sharePlaceholder")}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="beneficiary-wallet">
                {t("common.walletAddress")}
              </Label>
              <Input
                id="beneficiary-wallet"
                data-ocid="beneficiaries.wallet_input"
                value={form.walletAddress}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    walletAddress: e.target.value,
                  }))
                }
                placeholder={t("common.optional")}
              />
            </div>

            {formError && (
              <p
                data-ocid="beneficiaries.form_error"
                className="text-sm text-destructive"
              >
                {formError}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                data-ocid="beneficiaries.cancel_button"
                onClick={() => setDialogOpen(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                data-ocid="beneficiaries.submit_button"
                disabled={isPending}
                className="bg-gradient-gold text-primary-foreground hover:opacity-90"
              >
                {editing ? t("common.saveChanges") : t("common.addBeneficiary")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
