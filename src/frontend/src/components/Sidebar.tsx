import { createActor } from "@/backend";
import type { Beneficiary } from "@/backend";
import { useTranslation } from "@/lib/translations";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Settings } from "lucide-react";

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

/**
 * Narrowed quick-reference sidebar. No longer the primary navigation — it
 * stays visible alongside whichever tab is active and shows only two things:
 * a compact beneficiary contact card and a Settings link. Uses the
 * `beneficiary-card` and `settings-link` design tokens.
 */
export function Sidebar() {
  const { t } = useTranslation();
  const { data: beneficiaries = [] } = useBeneficiaries();

  return (
    <aside
      data-ocid="sidebar"
      className="hidden w-64 shrink-0 border-r border-border bg-surface md:block"
    >
      <div className="sticky top-16 flex flex-col gap-6 p-4">
        <section
          data-ocid="sidebar.beneficiaries"
          className="beneficiary-card p-4"
        >
          <p className="contact-label">{t("sidebar.beneficiaries")}</p>
          {beneficiaries.length === 0 ? (
            <p className="mt-3 font-mono text-xs text-muted-foreground">
              {t("sidebar.noBeneficiaries")}
            </p>
          ) : (
            <ul className="mt-3 space-y-3">
              {beneficiaries.map((b: Beneficiary) => (
                <li key={b.id.toString()} className="min-w-0">
                  <p className="contact-value truncate">{b.name}</p>
                  <p className="mt-0.5 truncate font-mono text-[0.6875rem] text-muted-foreground">
                    {b.walletAddress || t("sidebar.noWallet")}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <Link
          to="/settings"
          data-ocid="sidebar.settings"
          className="settings-link flex items-center gap-2"
        >
          <Settings className="size-4" aria-hidden="true" />
          {t("sidebar.settings")}
        </Link>
      </div>
    </aside>
  );
}
