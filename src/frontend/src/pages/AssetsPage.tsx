import { createActor } from "@/backend";
import type { Asset, AssetAllocation, Beneficiary } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";

const SEGMENT_COLORS = [
  "bg-gradient-gold",
  "bg-chart-2",
  "bg-chart-3",
  "bg-chart-4",
  "bg-chart-5",
];

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

function useAssets() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["assets"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listAssets();
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

function beneficiaryName(
  id: bigint,
  beneficiaries: Beneficiary[] | undefined,
): string {
  const match = beneficiaries?.find((b) => b.id === id);
  return match ? match.name : `Beneficiary #${id.toString()}`;
}

function AllocationBar({
  allocations,
}: {
  allocations: AssetAllocation[];
}) {
  const total = allocations.reduce((sum, a) => sum + a.share, 0n);
  if (total <= 0n) {
    return (
      <p className="font-mono text-xs text-muted-foreground">Unallocated</p>
    );
  }
  return (
    <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-surface-raised">
      {allocations.map((allocation, index) => (
        <span
          key={allocation.beneficiaryId.toString()}
          className={SEGMENT_COLORS[index % SEGMENT_COLORS.length]}
          style={{
            width: `${Number((allocation.share * 100n) / total)}%`,
          }}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function AllocationLegend({
  allocations,
  beneficiaries,
}: {
  allocations: AssetAllocation[];
  beneficiaries: Beneficiary[] | undefined;
}) {
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1">
      {allocations.map((allocation, index) => (
        <span
          key={allocation.beneficiaryId.toString()}
          className="flex items-center gap-2 font-mono text-xs text-muted-foreground"
        >
          <span
            className={`h-2 w-2 rounded-full ${
              SEGMENT_COLORS[index % SEGMENT_COLORS.length]
            }`}
            aria-hidden="true"
          />
          {beneficiaryName(allocation.beneficiaryId, beneficiaries)}
          <span className="text-foreground">
            {allocation.share.toString()}%
          </span>
        </span>
      ))}
    </div>
  );
}

/**
 * Legacy & Assets. Lists every crypto asset held in the vault and how each is
 * allocated to beneficiaries, driven by the backend `listAssets` and
 * `listBeneficiaries` queries.
 */
export function AssetsPage() {
  const assetsQuery = useAssets();
  const beneficiariesQuery = useBeneficiaries();
  const loading = assetsQuery.isLoading || beneficiariesQuery.isLoading;
  const assets = assetsQuery.data ?? [];
  const beneficiaries = beneficiariesQuery.data;

  return (
    <div data-ocid="assets" className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
      <header className="mb-8 animate-fade-rise">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground">
          Legacy &amp; Assets
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold tracking-tight text-foreground">
          Held Assets
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
          Everything held in the vault — balances, holdings, and the
          instructions that govern them.
        </p>
      </header>

      <section
        data-ocid="assets.summary"
        className="mb-6 grid animate-fade-rise gap-6 md:grid-cols-3"
      >
        <div className="rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Assets Held
          </p>
          <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
            {loading ? "—" : assets.length.toString()}
          </p>
        </div>
        <div className="rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:60ms]">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Beneficiaries
          </p>
          <p className="mt-4 font-display text-4xl font-semibold tracking-tight text-foreground">
            {loading ? "—" : (beneficiaries?.length ?? 0).toString()}
          </p>
        </div>
        <div className="rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow [animation-delay:120ms]">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Allocation Status
          </p>
          <div className="mt-4 flex items-center gap-3">
            <span
              className="h-2.5 w-2.5 rounded-full bg-success"
              aria-hidden="true"
            />
            <span className="font-mono text-sm font-semibold uppercase tracking-[0.16em] text-foreground">
              Sealed
            </span>
          </div>
        </div>
      </section>

      {assetsQuery.isError && (
        <section
          data-ocid="assets.error_state"
          className="rounded border border-destructive/40 bg-surface p-8 text-center shadow-subtle"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-destructive">
            Vault unreachable
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            We couldn&apos;t read the held assets. Please try again.
          </p>
        </section>
      )}

      {!assetsQuery.isError && loading && (
        <section
          data-ocid="assets.loading_state"
          className="space-y-4"
          aria-busy="true"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded border border-border bg-surface shadow-subtle"
            />
          ))}
        </section>
      )}

      {!assetsQuery.isError && !loading && assets.length === 0 && (
        <section
          data-ocid="assets.empty_state"
          className="rounded border border-border bg-surface p-10 text-center shadow-subtle"
        >
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            No assets held
          </p>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
            The vault currently holds no crypto assets. Once assets are added,
            their balances and beneficiary allocations will appear here.
          </p>
        </section>
      )}

      {!assetsQuery.isError && !loading && assets.length > 0 && (
        <section
          data-ocid="assets.list"
          className="animate-fade-rise space-y-4 [animation-delay:180ms]"
        >
          {assets.map((asset, index) => (
            <article
              key={asset.id.toString()}
              data-ocid={`assets.item.${index + 1}`}
              className="rounded border border-border bg-surface p-6 shadow-subtle transition-smooth hover:border-primary/40 hover:shadow-gold-glow"
            >
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-3">
                    <h2 className="truncate font-display text-xl font-semibold tracking-tight text-foreground">
                      {asset.name}
                    </h2>
                    <span className="rounded border border-border bg-surface-raised px-2 py-0.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
                      {asset.symbol}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-3xl font-semibold tracking-tight text-foreground">
                    {formatBalance(asset.balance, asset.decimals)}
                    <span className="ml-2 font-mono text-base font-medium text-muted-foreground">
                      {asset.symbol}
                    </span>
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <p className="mb-2 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Beneficiary Allocation
                </p>
                <AllocationBar allocations={asset.allocations} />
                <div className="mt-3">
                  <AllocationLegend
                    allocations={asset.allocations}
                    beneficiaries={beneficiaries}
                  />
                </div>
              </div>
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
