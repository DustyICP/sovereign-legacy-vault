import { useTranslation } from "@/lib/translations";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export const NAV_ITEMS = [
  { to: "/dashboard", labelKey: "nav.dashboard" },
  { to: "/beneficiaries", labelKey: "nav.beneficiaries" },
  { to: "/legacy-assets", labelKey: "nav.legacyAssets" },
  { to: "/the-switch", labelKey: "nav.theSwitch" },
  { to: "/audit-logs", labelKey: "nav.auditLogs" },
  { to: "/settings", labelKey: "nav.settings" },
] as const;

export function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside
      data-ocid="sidebar"
      className="hidden w-60 shrink-0 border-r border-border bg-surface md:block"
    >
      <nav
        className="sticky top-16 flex flex-col gap-1 p-4"
        aria-label="Primary"
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            data-ocid={`sidebar.link.${item.to}`}
            className={cn(
              "group relative flex items-center rounded px-3 py-2.5 text-sm font-medium text-muted-foreground transition-smooth hover:bg-surface-raised hover:text-foreground",
            )}
            activeProps={{
              className:
                "bg-surface-raised text-foreground shadow-subtle hover:bg-surface-raised hover:text-foreground",
            }}
          >
            {({ isActive }) => (
              <>
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute inset-y-2 left-0 w-0.5 rounded-full bg-gradient-gold transition-opacity",
                    isActive ? "opacity-100" : "opacity-0",
                  )}
                />
                {t(item.labelKey)}
              </>
            )}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
