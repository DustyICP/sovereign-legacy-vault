import "@testing-library/jest-dom/vitest";
import { cleanup, configure } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// Generated components carry `data-ocid` instead of `data-testid`; make the
// Testing Library test-id queries target that attribute.
configure({ testIdAttribute: "data-ocid" });

// Vitest globals are disabled, so @testing-library/react's auto-cleanup never
// registers; without this, renders accumulate across tests in one file.
afterEach(() => {
  cleanup();
});

// The mock factory loads the shared state lazily so the mock can be hoisted
// above the state module's own imports.
vi.mock("@caffeineai/core-infrastructure", async () => {
  const { authState, actorState } = await import("./state");
  return {
    useInternetIdentity: () => ({
      identity: undefined,
      login: authState.login,
      clear: vi.fn(),
      loginStatus: authState.isAuthenticated ? "success" : "idle",
      isInitializing: authState.isInitializing,
      isLoginIdle: !authState.isAuthenticated,
      isLoggingIn: false,
      isLoginSuccess: authState.isAuthenticated,
      isLoginError: false,
      isAuthenticated: authState.isAuthenticated,
    }),
    useActor: () => ({
      actor: actorState.actor,
      isFetching: actorState.isFetching,
    }),
  };
});

// `@caffeineai/object-storage` ships a dist whose internal `./blob` import
// Vitest's resolver cannot follow through the pnpm store symlink. The app only
// uses `ExternalBlob` as a type in the generated bindings, so a stub keeps the
// module graph loadable without exercising any storage behavior.
vi.mock("@caffeineai/object-storage", () => ({
  ExternalBlob: class ExternalBlob {
    directURL: string;
    constructor(directURL: string) {
      this.directURL = directURL;
    }
    static fromURL(url: string) {
      return new ExternalBlob(url);
    }
    static fromBytes(
      _blob: Uint8Array,
      contentType?: string,
      _filename?: string,
    ) {
      return new ExternalBlob(
        `blob:${contentType ?? "application/octet-stream"}`,
      );
    }
    getBytes() {
      return Promise.resolve(new Uint8Array());
    }
    getDirectURL() {
      return this.directURL;
    }
    withUploadProgress() {
      return this;
    }
  },
}));
