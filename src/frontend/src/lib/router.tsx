import { Layout } from "@/components/Layout";
import { AuditLogPage } from "@/pages/AuditLogPage";
import { BeneficiaryPage } from "@/pages/BeneficiaryPage";
import { LandingPage } from "@/pages/LandingPage";
import { OverviewPage } from "@/pages/OverviewPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { TimelinesPage } from "@/pages/TimelinesPage";
import { WalletPage } from "@/pages/WalletPage";
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Navigate } from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: Layout,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const overviewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/overview",
  component: OverviewPage,
});

/* The full sealed audit ledger is a sub-view of Overview. */
const auditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/overview/audit",
  component: AuditLogPage,
});

const walletRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wallet",
  component: WalletPage,
});

const beneficiaryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/beneficiary",
  component: BeneficiaryPage,
});

const timelinesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timelines",
  component: TimelinesPage,
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
});

/* ---- Legacy route redirects to the new tabs ---- */
const dashboardRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => <Navigate to="/overview" replace />,
});

const beneficiariesRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/beneficiaries",
  component: () => <Navigate to="/beneficiary" replace />,
});

const legacyAssetsRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/legacy-assets",
  component: () => <Navigate to="/beneficiary" replace />,
});

const theSwitchRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/the-switch",
  component: () => <Navigate to="/timelines" replace />,
});

const auditLogsRedirect = createRoute({
  getParentRoute: () => rootRoute,
  path: "/audit-logs",
  component: () => <Navigate to="/overview/audit" replace />,
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  overviewRoute,
  auditRoute,
  walletRoute,
  beneficiaryRoute,
  timelinesRoute,
  settingsRoute,
  dashboardRedirect,
  beneficiariesRedirect,
  legacyAssetsRedirect,
  theSwitchRedirect,
  auditLogsRedirect,
]);

export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  scrollRestoration: true,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
