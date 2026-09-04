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
 * Beneficiary tab. An organized, editable list of the people and causes your
 * legacy is sealed for, each with an inline inheritance-percentage control
 * (slider + numeric input) and a running allocation snapshot. The total of all
 * allocation shares is enforced to never exceed 100% on both the add and edit
 * paths.
 */
export function BeneficiaryPage() {
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

  // Inline percentage drafts keyed by beneficiary id, plus per-row errors.
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const [rowErrors, setRowErrors] = useState<Record<string, string>>({});

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

  /**
   * Commit an inline percentage change for a beneficiary. Validates the new
   * total against the 100% cap before calling updateBeneficiary; on success
   * the query refetch refreshes the row, on failure the draft is restored.
   */
  const commitShare = (beneficiary: Beneficiary, raw: string) => {
    const parsed = Number.parseInt(raw, 10);
    if (Number.isNaN(parsed) || parsed <= 0) {
      setRowErrors((e) => ({
        ...e,
        [beneficiary.id.toString()]: t("beneficiaries.errors.sharePositive"),
      }));
      return;
    }
    const share = BigInt(parsed);
    const newTotal = totalShare - beneficiary.allocationShare + share;
    if (newTotal > 100n) {
      setRowErrors((e) => ({
        ...e,
        [beneficiary.id.toString()]: t(
          "beneficiaries.errors.totalExceedsEdit",
          {
            total: newTotal.toString(),
          },
        ),
      }));
      return;
    }
    setRowErrors((e) => {
      const next = { ...e };
      delete next[beneficiary.id.toString()];
      return next;
    });
    updateMutation.mutate(
      {
        id: beneficiary.id,
        name: beneficiary.name,
        allocationShare: share,
        walletAddress: beneficiary.walletAddress,
      },
      {
        onError: () => {
          setRowErrors((e) => ({
            ...e,
            [beneficiary.id.toString()]: t("beneficiaries.errors.saveFailed"),
          }));
        },
      },
    );
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <div
      data-ocid="beneficiary"
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
        {/* Allocation snapshot */}
        <section
          data-ocid="beneficiary.allocation"
          className="snapshot-card animate-fade-rise p-6 lg:col-span-2"
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
              <div className="mt-6 flex items-end justify-between gap-4">
                <p className="font-display text-4xl font-semibold tracking-tight text-foreground">
                  {formatShare(totalShare)}
                </p>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                  {totalShare === 100n ? "Sealed" : "Remaining"}
                </p>
              </div>
              <div
                className="mt-4 flex h-2.5 w-full overflow-hidden rounded-full bg-surface-raised"
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
                      data-ocid={`beneficiary.allocation.segment.${index}`}
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
          data-ocid="beneficiary.actions"
          className="snapshot-card animate-fade-rise flex flex-col justify-between p-6 [animation-delay:60ms]"
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
            data-ocid="beneficiary.add_button"
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
        data-ocid="beneficiary.list"
        className="mt-6 animate-fade-rise rounded border border-border bg-surface shadow-subtle [animation-delay:120ms]"
      >
        {isLoading ? (
          <div
            data-ocid="beneficiary.loading_state"
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
            data-ocid="beneficiary.error_state"
            className="p-6 text-sm text-destructive"
          >
            {t("beneficiaries.loadError")}
          </div>
        ) : beneficiaries.length === 0 ? (
          <div
            data-ocid="beneficiary.empty_state"
            className="flex flex-col items-center gap-3 px-6 py-12 text-center"
          >
            <p className="font-display text-xl font-semibold text-foreground">
              {t("beneficiaries.emptyTitle")}
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              {t("beneficiaries.emptyBody")}
            </p>
            <Button
              data-ocid="beneficiary.empty_add_button"
              onClick={openAdd}
              className="mt-2 bg-gradient-gold text-primary-foreground hover:opacity-90"
            >
              <Plus />
              {t("common.addBeneficiary")}
            </Button>
          </div>
        ) : (
          <ul className="divide-y divide-border">
            {beneficiaries.map((b, index) => {
              const draft =
                drafts[b.id.toString()] ?? b.allocationShare.toString();
              const rowError = rowErrors[b.id.toString()];
              return (
                <li
                  key={b.id.toString()}
                  data-ocid={`beneficiary.item.${index}`}
                  className="flex flex-col gap-4 p-5 transition-smooth hover:bg-surface-raised lg:flex-row lg:items-center lg:justify-between"
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

                  <div className="flex flex-col gap-2 lg:w-72">
                    <div className="flex items-center gap-3">
                      <input
                        type="range"
                        min={1}
                        max={100}
                        value={draft}
                        data-ocid={`beneficiary.slider.${index}`}
                        aria-label={t("beneficiaries.editAria", {
                          name: b.name,
                        })}
                        className="slider-track"
                        style={
                          {
                            "--fill": `${draft}%`,
                          } as React.CSSProperties
                        }
                        onChange={(e) => {
                          const value = e.target.value;
                          setDrafts((d) => ({
                            ...d,
                            [b.id.toString()]: value,
                          }));
                          setRowErrors((err) => {
                            const next = { ...err };
                            delete next[b.id.toString()];
                            return next;
                          });
                        }}
                        onBlur={() => commitShare(b, draft)}
                        onKeyUp={(e) => {
                          if (e.key === "Enter") commitShare(b, draft);
                        }}
                      />
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={draft}
                        data-ocid={`beneficiary.percent_input.${index}`}
                        aria-label={t("beneficiaries.editAria", {
                          name: b.name,
                        })}
                        className="percent-input"
                        onChange={(e) => {
                          setDrafts((d) => ({
                            ...d,
                            [b.id.toString()]: e.target.value,
                          }));
                          setRowErrors((err) => {
                            const next = { ...err };
                            delete next[b.id.toString()];
                            return next;
                          });
                        }}
                        onBlur={() => commitShare(b, draft)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") commitShare(b, draft);
                        }}
                      />
                      <span className="font-mono text-sm font-semibold text-foreground">
                        %
                      </span>
                    </div>
                    {rowError && (
                      <p
                        data-ocid={`beneficiary.row_error.${index}`}
                        className="text-xs text-destructive"
                      >
                        {rowError}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <Button
                      data-ocid={`beneficiary.edit_button.${index}`}
                      variant="ghost"
                      size="icon"
                      aria-label={t("beneficiaries.editAria", { name: b.name })}
                      onClick={() => openEdit(b)}
                    >
                      <Pencil />
                    </Button>
                    <Button
                      data-ocid={`beneficiary.delete_button.${index}`}
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
                </li>
              );
            })}
          </ul>
        )}
      </section>

      {/* Add / edit dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent data-ocid="beneficiary.modal">
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
                data-ocid="beneficiary.name_input"
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
                data-ocid="beneficiary.share_input"
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
                data-ocid="beneficiary.wallet_input"
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
                data-ocid="beneficiary.form_error"
                className="text-sm text-destructive"
              >
                {formError}
              </p>
            )}

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                data-ocid="beneficiary.cancel_button"
                onClick={() => setDialogOpen(false)}
              >
                {t("common.cancel")}
              </Button>
              <Button
                type="submit"
                data-ocid="beneficiary.submit_button"
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
