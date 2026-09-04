import { SwitchStatus } from "@/backend";
import { router } from "@/lib/router";
import {
  type I18nContextValue,
  translateAuditDescription,
  translateEventType,
} from "@/lib/translations";
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
 * Cover for the audit-log localization pass. The event-type labels and the
 * static wrapper text of descriptions now localize through the `t()` dictionary
 * (translateEventType / translateAuditDescription) with a raw-value fallback,
 * and the condensed recent-activity feed on the overview page localizes
 * consistently with the full ledger.
 *
 * The characterization suite already protects the unchanged wrapper text,
 * timestamp format, and RTL document context; this suite pins the newly
 * localized event-type/description behavior.
 */

/** A minimal `t` that resolves against the English dictionary. */
const enT: I18nContextValue["t"] = (key) => key;

/** A minimal `t` that resolves against the Spanish dictionary. */
const esT: I18nContextValue["t"] = (key, params) => {
  const es: Record<string, string> = {
    "audit.eventTypes.login": "Inicio de sesión",
    "audit.eventTypes.switch_armed": "Interruptor armado",
    "audit.eventTypes.beneficiary_added": "Beneficiario añadido",
    "audit.eventTypes.asset_added": "Activo añadido",
    "audit.descriptions.beneficiary_added":
      "Beneficiario '{name}' añadido con participación de {share}%",
    "audit.descriptions.asset_added":
      "Activo '{name}' ({symbol}) añadido con saldo {balance}",
  };
  const template = es[key] ?? key;
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, name: string) => {
    const value = params[name];
    return value === undefined ? match : String(value);
  });
};

describe("translateEventType (event-type label mapping)", () => {
  it("maps known backend event-type values to their dictionary label", () => {
    expect(translateEventType(enT, "login")).toBe("audit.eventTypes.login");
    expect(translateEventType(enT, "switch_armed")).toBe(
      "audit.eventTypes.switch_armed",
    );
    expect(translateEventType(enT, "beneficiary_added")).toBe(
      "audit.eventTypes.beneficiary_added",
    );
  });

  it("falls back to the raw event-type value for unknown event types", () => {
    expect(translateEventType(enT, "future_event_type")).toBe(
      "future_event_type",
    );
    expect(translateEventType(enT, "SECURITY")).toBe("SECURITY");
  });
});

describe("translateAuditDescription (description wrapper text)", () => {
  it("localizes the static wrapper while preserving dynamic values", () => {
    const english = translateAuditDescription(
      enT,
      "beneficiary_added",
      "Beneficiary 'Ada' added with allocation share 40%",
    );
    expect(english).toBe("audit.descriptions.beneficiary_added");

    const spanish = translateAuditDescription(
      esT,
      "beneficiary_added",
      "Beneficiary 'Ada' added with allocation share 40%",
    );
    expect(spanish).toBe("Beneficiario 'Ada' añadido con participación de 40%");
  });

  it("preserves the dynamic asset name, symbol, and balance", () => {
    const spanish = translateAuditDescription(
      esT,
      "asset_added",
      "Asset 'ICP' (Internet Computer) added with balance 1000",
    );
    expect(spanish).toBe(
      "Activo 'ICP' (Internet Computer) añadido con saldo 1000",
    );
  });

  it("falls back to the raw description when it does not match a known pattern", () => {
    expect(
      translateAuditDescription(enT, "beneficiary_added", "unrecognized text"),
    ).toBe("unrecognized text");
    expect(
      translateAuditDescription(enT, "unknown_event", "some description"),
    ).toBe("some description");
  });
});

describe("AuditLogPage cover (localized event types and descriptions)", () => {
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

  it("renders localized event-type labels and description wrapper text in English", async () => {
    const actor = createMockActor();
    actor.listAuditEvents.mockResolvedValue([
      {
        id: 0n,
        timestamp: 1_700_000_000_000_000_000n,
        eventType: "beneficiary_added",
        description: "Beneficiary 'Ada' added with allocation share 40%",
        prevHash: new Uint8Array([0]),
        hash: new Uint8Array([1]),
      },
      {
        id: 1n,
        timestamp: 1_700_000_100_000_000_000n,
        eventType: "login",
        description: "User signed in",
        prevHash: new Uint8Array([1]),
        hash: new Uint8Array([2]),
      },
    ]);
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });

    // Event-type labels render through the dictionary, not raw English.
    expect(await screen.findByText("Beneficiary added")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    // Description wrapper text localizes while preserving the dynamic name/share.
    expect(
      screen.getByText("Beneficiary 'Ada' added with allocation share 40%"),
    ).toBeInTheDocument();
  });

  it("re-renders event-type labels and descriptions in Spanish immediately", async () => {
    const user = userEvent.setup();
    const actor = createMockActor();
    actor.listAuditEvents.mockResolvedValue([
      {
        id: 0n,
        timestamp: 1_700_000_000_000_000_000n,
        eventType: "beneficiary_added",
        description: "Beneficiary 'Ada' added with allocation share 40%",
        prevHash: new Uint8Array([0]),
        hash: new Uint8Array([1]),
      },
    ]);
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });

    expect(await screen.findByText("Beneficiary added")).toBeInTheDocument();

    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    // The event-type label and description re-render in Spanish without reload.
    expect(await screen.findByText("Beneficiario añadido")).toBeInTheDocument();
    expect(
      screen.getByText("Beneficiario 'Ada' añadido con participación de 40%"),
    ).toBeInTheDocument();
  });

  it("falls back to the raw event-type value for unknown event types", async () => {
    const actor = createMockActor();
    actor.listAuditEvents.mockResolvedValue([
      {
        id: 0n,
        timestamp: 1_700_000_000_000_000_000n,
        eventType: "future_event_type",
        description: "Some future event",
        prevHash: new Uint8Array([0]),
        hash: new Uint8Array([1]),
      },
    ]);
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview/audit" });

    // Unknown event types render the raw value so the cell is never blank.
    expect(await screen.findByText("future_event_type")).toBeInTheDocument();
    expect(screen.getByText("Some future event")).toBeInTheDocument();
  });
});

describe("OverviewPage cover (condensed feed localizes consistently)", () => {
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

  it("localizes the condensed recent-activity feed event types and descriptions", async () => {
    const user = userEvent.setup();
    const actor = createMockActor();
    actor.getOverview.mockResolvedValue({
      switchStatus: SwitchStatus.disarmed,
      totalAllocationShare: 0n,
      beneficiaryCount: 0n,
      vaultBalance: { assets: [], depositAddress: "" },
      timeline: {
        status: SwitchStatus.disarmed,
        warningOnsetDays: 30n,
        warningRepeatDays: 7n,
        triggerDays: 180n,
      },
      recentActivity: [
        {
          id: 0n,
          timestamp: 1_700_000_000_000_000_000n,
          eventType: "asset_added",
          description:
            "Asset 'ICP' (Internet Computer) added with balance 1000",
          prevHash: new Uint8Array([0]),
          hash: new Uint8Array([1]),
        },
      ],
    });
    setActor(actor);

    renderApp();
    await router.navigate({ to: "/overview" });

    // English baseline in the condensed feed.
    expect(await screen.findByText("Asset added")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Asset 'ICP' (Internet Computer) added with balance 1000",
      ),
    ).toBeInTheDocument();

    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    // The condensed feed localizes consistently with the full ledger.
    expect(await screen.findByText("Activo añadido")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Activo 'ICP' (Internet Computer) añadido con saldo 1000",
      ),
    ).toBeInTheDocument();
  });
});
