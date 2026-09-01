import App from "@/App";
import type { backendInterface } from "@/backend";
import { actorState, authState } from "@/test/state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

/** Render a page component inside the providers the app uses. */
export function renderPage(ui: ReactElement) {
  const queryClient = makeQueryClient();
  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
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
