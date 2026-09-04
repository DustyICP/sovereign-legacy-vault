import { OverviewPage } from "@/pages/OverviewPage";

/**
 * Legacy Dashboard route. No longer routed — the Overview tab replaced it.
 * Re-exported so any stale import still typechecks and renders the Overview
 * summary rather than a dead shell.
 */
export function DashboardPage() {
  return <OverviewPage />;
}
