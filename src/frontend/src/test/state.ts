import { vi } from "vitest";

/**
 * Mutable auth + actor state shared between the mock of
 * `@caffeineai/core-infrastructure` and the tests. Plain module state (not
 * `vi.hoisted`) so it can be imported and mutated from test helpers.
 */
export const authState = {
  isAuthenticated: false,
  isInitializing: false,
  login: vi.fn(),
};

export const actorState = {
  actor: null as unknown,
  isFetching: false,
};
