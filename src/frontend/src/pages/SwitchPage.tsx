import { TimelinesPage } from "@/pages/TimelinesPage";

/**
 * Legacy Switch page. No longer routed — the Timelines tab replaced the old
 * single-cadence dead man's switch with three separately configurable
 * inactivity parameters. Kept as a thin re-export so any lingering imports
 * still compile against the current backend contract.
 */
export function SwitchPage() {
  return <TimelinesPage />;
}
