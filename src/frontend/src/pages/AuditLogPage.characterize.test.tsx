import { router } from "@/lib/router";
import {
  createMockActor,
  renderApp,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

/**
 * Characterization of the audit log's working behavior that the localization
 * pass must NOT change. The event-type labels and descriptions are intentionally
 * being localized, so this suite deliberately does not pin their raw-English
 * rendering. Instead it protects the surrounding behavior that stays the same:
 *
 *  - the static wrapper text (column headers, count, empty-state, footer, table
 *    aria label) is already wired through `t('audit.*')` and re-renders in the
 *    selected language immediately;
 *  - the mono/ISO-ish timestamp format is deliberately NOT localized (per the
 *    do-not-build scope) and must stay identical across languages;
 *  - the audit log renders inside the app's RTL document context for Arabic,
 *    Persian, and Urdu.
 */
describe("AuditLogPage characterization (unchanged audit-log behavior)", () => {
  beforeEach(() => {
    setAuthenticated(true);
    setActor(null);
    window.localStorage.clear();
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  });

  afterEach(async () => {
    await router.navigate({ to: "/" });
    router.invalidate();
  });

  it("re-renders the static wrapper text in the selected language immediately", async () => {
    const user = userEvent.setup();
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
    ]);
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });

    // English baseline for the static wrapper text.
    const table = await screen.findByRole("table", { name: "Vault audit log" });
    expect(within(table).getByText("Timestamp")).toBeInTheDocument();
    expect(within(table).getByText("Event")).toBeInTheDocument();
    expect(within(table).getByText("Description")).toBeInTheDocument();
    expect(screen.getByText("1 event(s) sealed")).toBeInTheDocument();

    // Switch to Spanish via the header language switcher.
    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    // The static wrapper text re-renders in Spanish without a reload.
    const spanishTable = await screen.findByRole("table", {
      name: "Registro de auditoría de la bóveda",
    });
    expect(
      within(spanishTable).getByText("Marca de tiempo"),
    ).toBeInTheDocument();
    expect(within(spanishTable).getByText("Evento")).toBeInTheDocument();
    expect(within(spanishTable).getByText("Descripción")).toBeInTheDocument();
    expect(screen.getByText("1 evento(s) sellados")).toBeInTheDocument();
  });

  it("localizes the empty-state and footer copy when switching language", async () => {
    const user = userEvent.setup();
    const actor = createMockActor();
    actor.listAuditEvents.mockResolvedValue([]);
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });

    expect(await screen.findByText("No events yet")).toBeInTheDocument();
    expect(
      screen.getByText(/Every entry is sealed on the ledger/i),
    ).toBeInTheDocument();

    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    expect(await screen.findByText("Aún no hay eventos")).toBeInTheDocument();
    expect(
      screen.getByText(/Cada entrada está sellada en el registro/i),
    ).toBeInTheDocument();
  });

  it("keeps the mono/ISO-ish timestamp format unchanged across languages", async () => {
    const user = userEvent.setup();
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
    ]);
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });

    const row = await screen.findByTestId("audit_logs.row.1");
    const englishTimestamp = within(row).getByText(/\d{2}:\d{2}:\d{2}/);

    // The timestamp is deliberately NOT localized (do-not-build scope): the
    // same mono/ISO-ish date+time string must render after switching language.
    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    const spanishRow = await screen.findByTestId("audit_logs.row.1");
    const spanishTimestamp = within(spanishRow).getByText(/\d{2}:\d{2}:\d{2}/);
    expect(spanishTimestamp.textContent).toBe(englishTimestamp.textContent);
  });

  it("renders the audit log inside the RTL document context for Arabic, Persian, and Urdu", async () => {
    const user = userEvent.setup();
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
    ]);
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });
    await screen.findByRole("table", { name: "Vault audit log" });

    const select = screen.getByRole("combobox", { name: "Language" });

    for (const code of ["ar", "fa", "ur"]) {
      await user.selectOptions(select, code);
      expect(document.documentElement.dir).toBe("rtl");
      expect(document.documentElement.lang).toBe(code);
      // The ledger still renders its rows in the RTL document context.
      expect(await screen.findByTestId("audit_logs.row.1")).toBeInTheDocument();
    }
  });
});
