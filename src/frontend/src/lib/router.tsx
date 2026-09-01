import { Layout } from "@/components/Layout";
import { AssetsPage } from "@/pages/AssetsPage";
import { AuditLogPage } from "@/pages/AuditLogPage";
import { BeneficiariesPage } from "@/pages/BeneficiariesPage";
import { DashboardPage } from "@/pages/DashboardPage";
import { LandingPage } from "@/pages/LandingPage";
import { SettingsPage } from "@/pages/SettingsPage";
import { SwitchPage } from "@/pages/SwitchPage";
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

export type SectionKey =
  | "beneficiaries"
  | "legacy-assets"
  | "the-switch"
  | "audit-logs"
  | "settings";

export interface SectionSearch {
  section: SectionKey;
}

const rootRoute = createRootRoute({
  component: Layout,
});

const landingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardPage,
});

export const beneficiariesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/beneficiaries",
  component: BeneficiariesPage,
  validateSearch: (): SectionSearch => ({ section: "beneficiaries" }),
});

const legacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/legacy-assets",
  component: AssetsPage,
  validateSearch: (): SectionSearch => ({ section: "legacy-assets" }),
});

const switchRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/the-switch",
  component: SwitchPage,
});

const auditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/audit-logs",
  component: AuditLogPage,
  validateSearch: (): SectionSearch => ({ section: "audit-logs" }),
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: SettingsPage,
  validateSearch: (): SectionSearch => ({ section: "settings" }),
});

const routeTree = rootRoute.addChildren([
  landingRoute,
  dashboardRoute,
  beneficiariesRoute,
  legacyRoute,
  switchRoute,
  auditRoute,
  settingsRoute,
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
