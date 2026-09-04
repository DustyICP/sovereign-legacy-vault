import { OverviewPage } from "@/pages/OverviewPage";

/**
 * Legacy section shell. The old section-based routing (SectionSearch /
 * beneficiariesRoute) was replaced by the tabbed navigation, so this file is
 * no longer routed. It is kept as a thin re-export of a valid page so any
 * stale imports continue to compile.
 */
export function SectionPage() {
  return <OverviewPage />;
}
