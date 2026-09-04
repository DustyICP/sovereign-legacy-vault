import { router } from "@/lib/router";
import {
  createMockActor,
  renderApp,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("AuditLogPage", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
  });

  afterEach(async () => {
    await router.navigate({ to: "/" });
    router.invalidate();
  });

  it("renders audit rows with event type and description", async () => {
    const actor = createMockActor();
    actor.listAuditEvents.mockResolvedValue([
      {
        id: 0n,
        timestamp: 1_700_000_000_000_000_000n,
        eventType: "SECURITY",
        description: "Vault armed",
        prevHash: new Uint8Array([0]),
        hash: new Uint8Array([1]),
      },
      {
        id: 1n,
        timestamp: 1_700_000_100_000_000_000n,
        eventType: "VERIFICATION",
        description: "Check-in recorded",
        prevHash: new Uint8Array([1]),
        hash: new Uint8Array([2]),
      },
    ]);
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });

    expect(await screen.findByText("SECURITY")).toBeInTheDocument();
    expect(screen.getByText("VERIFICATION")).toBeInTheDocument();
    expect(screen.getByText("Vault armed")).toBeInTheDocument();
    expect(screen.getByText("Check-in recorded")).toBeInTheDocument();
    expect(screen.getByText("2 event(s) sealed")).toBeInTheDocument();

    const table = screen.getByRole("table", { name: "Vault audit log" });
    expect(within(table).getByText("Timestamp")).toBeInTheDocument();
    expect(within(table).getByText("Event")).toBeInTheDocument();
    expect(within(table).getByText("Description")).toBeInTheDocument();
  });

  it("shows the error state when the ledger is unreachable", async () => {
    const actor = createMockActor();
    actor.listAuditEvents.mockRejectedValue(new Error("boom"));
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });

    expect(await screen.findByText("Ledger unreachable")).toBeInTheDocument();
    expect(
      screen.getByText(/couldn't read the audit ledger/i),
    ).toBeInTheDocument();
  });

  it("keeps the tamper-evidence claim on the ledger footer", async () => {
    const actor = createMockActor();
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });

    expect(await screen.findByText("No events yet")).toBeInTheDocument();
    expect(
      screen.getByText(/Every entry is sealed on the ledger/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Entries cannot be edited or removed/i),
    ).toBeInTheDocument();
  });

  it("shows the empty state when the ledger has no events", async () => {
    const actor = createMockActor();
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });

    expect(await screen.findByText("No events yet")).toBeInTheDocument();
    expect(screen.getByText("0 event(s) sealed")).toBeInTheDocument();
  });
});
