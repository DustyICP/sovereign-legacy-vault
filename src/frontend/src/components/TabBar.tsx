import { useTranslation } from "@/lib/translations";
import { Link, useRouterState } from "@tanstack/react-router";

/**
 * The four primary tabs of the vault, in order. These replace the sidebar as
 * the primary navigation: OVERVIEW, WALLET, BENEFICIARY, TIMELINES.
 */
export const TABS = [
  { to: "/overview", labelKey: "tabs.overview" },
  { to: "/wallet", labelKey: "tabs.wallet" },
  { to: "/beneficiary", labelKey: "tabs.beneficiary" },
  { to: "/timelines", labelKey: "tabs.timelines" },
] as const;

/**
 * Horizontal tab bar rendered under the header. The active tab carries the
 * gold indicator (via the `tab-item[data-active]` styles in index.css). On
 * mobile the bar scrolls horizontally (`tab-bar-scroll`).
 */
export function TabBar() {
  const { t } = useTranslation();
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <nav data-ocid="tab_bar" className="tab-bar" aria-label="Primary">
      <div className="tab-bar-scroll mx-auto flex max-w-7xl px-6 lg:px-8">
        {TABS.map((tab) => {
          const isActive = pathname === tab.to;
          return (
            <Link
              key={tab.to}
              to={tab.to}
              data-ocid={`tab.${tab.to.replace("/", "")}`}
              data-active={isActive}
              className="tab-item"
            >
              {t(tab.labelKey)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
