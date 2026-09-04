import App from "@/App";
import type { backendInterface } from "@/backend";
import { actorState, authState } from "@/test/state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { render } from "@testing-library/react";
import type { ReactElement } from "react";
import { type Mock, vi } from "vitest";

/**
 * The generated backend interface with every method widened to a Vitest mock,
 * so tests can stub return values (`mockResolvedValue`) and assert calls.
 */
export type MockedBackend = {
  [K in keyof backendInterface]: Mock<backendInterface[K]>;
};

/** A typed actor mock implementing the full generated backend interface. */
export function createMockActor(): MockedBackend {
  return {
    _initialize_access_control: vi.fn(),
    _internet_identity_sign_in_finish: vi.fn(),
    _internet_identity_sign_in_start: vi.fn(),
    addAsset: vi.fn(),
    addBeneficiary: vi.fn(),
    appendAuditEvent: vi.fn(),
    armSwitch: vi.fn(),
    assignCallerUserRole: vi.fn(),
    checkIn: vi.fn(),
    disarmSwitch: vi.fn(),
    execute: vi.fn(),
    getApiDoc: vi.fn(),
    getCallerUserRole: vi.fn(),
    getDepositAddress: vi.fn(),
    getOverview: vi.fn(),
    getSwitchState: vi.fn(),
    getSwitchTimeline: vi.fn(),
    getWalletBalance: vi.fn(),
    isCallerAdmin: vi.fn(),
    listAssets: vi.fn(),
    listAuditEvents: vi.fn(),
    listBeneficiaries: vi.fn(),
    removeBeneficiary: vi.fn(),
    schema: vi.fn(),
    updateBeneficiary: vi.fn(),
  };
}

export function setActor(actor: backendInterface | null): void {
  actorState.actor = actor;
  actorState.isFetching = false;
}

export function setAuthenticated(value: boolean): void {
  authState.isAuthenticated = value;
  authState.isInitializing = false;
}

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });
}

/**
 * Render a page component inside the providers the app uses. Pages under test
 * may render `<Link>` from `@tanstack/react-router` (e.g. OverviewPage's link
 * to the audit ledger), which requires a router context. Pass `withRouter:
 * true` for those pages; the dedicated test router renders the page at `/` and
 * declares the routes those links target so they resolve without throwing.
 *
 * Note: `RouterProvider` renders asynchronously, so pages rendered with
 * `withRouter` must be queried with async `findBy*` helpers. Pages that render
 * synchronously (e.g. LandingPage) should omit the flag.
 */
export function renderPage(
  ui: ReactElement,
  options: { withRouter?: boolean } = {},
) {
  const queryClient = makeQueryClient();
  if (!options.withRouter) {
    return render(
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
    );
  }
  const rootRoute = createRootRoute({
    component: () => ui,
  });
  // Routes referenced by <Link> in the pages under test.
  const overviewRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/overview",
    component: () => null,
  });
  const auditRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/overview/audit",
    component: () => null,
  });
  const routeTree = rootRoute.addChildren([overviewRoute, auditRoute]);
  const testRouter = createRouter({ routeTree });
  return render(
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={testRouter} />
    </QueryClientProvider>,
  );
}

/** Render the full app (real router) inside the providers the app uses. */
export function renderApp() {
  const queryClient = makeQueryClient();
  const view = render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>,
  );
  return {
    ...view,
    rerender: () =>
      view.rerender(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>,
      ),
  };
}
