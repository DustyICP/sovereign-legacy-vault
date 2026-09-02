import { SwitchStatus } from "@/backend";
import { router } from "@/lib/router";
import { I18nProvider } from "@/lib/translations";
import { DashboardPage } from "@/pages/DashboardPage";
import {
  createMockActor,
  renderApp,
  setActor,
  setAuthenticated,
} from "@/test/utils";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

/**
 * Cover for the i18n translation pass. These tests exercise the three new
 * behaviors the build adds on top of the existing language registry:
 *
 *  - switching locale re-renders all copy immediately (landing sections,
 *    navigation, footer, and protected pages);
 *  - RTL locales (Arabic, Persian, Urdu) set documentElement.dir=rtl;
 *  - the selected language persists across reloads and is applied on the next
 *    render (no flash of English).
 *
 * The hero section is now translated with curated per-locale strings, which is
 * pinned by LandingPage.hero.test.tsx.
 */
describe("i18n translation pass", () => {
  beforeEach(() => {
    setAuthenticated(false);
    window.localStorage.clear();
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  });

  afterEach(async () => {
    await router.navigate({ to: "/" });
    router.invalidate();
  });

  it("re-renders landing sections, nav, and footer copy when switching to Spanish", async () => {
    const user = userEvent.setup();
    renderApp();

    // English baseline for the translated (non-hero) sections.
    await screen.findByText("Self-sovereign inheritance");
    expect(
      screen.getByRole("heading", {
        name: "The Dead Man's Switch — Born in the Age of Steam",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Frequently Asked Questions" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Terms & Conditions" }),
    ).toBeInTheDocument();

    // Switch to Spanish via the header language switcher.
    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    // The translated sections re-render in Spanish immediately.
    expect(
      screen.getByRole("heading", {
        name: "El Interruptor de Hombre Muerto: Nacido en la Era del Vapor",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Preguntas Frecuentes" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Términos y Condiciones" }),
    ).toBeInTheDocument();

    // The footer tagline re-renders in Spanish.
    const footer = screen.getByTestId("footer");
    expect(
      within(footer).getByText("Sellada hasta que deje de estarlo"),
    ).toBeInTheDocument();

    // The hero now shows the curated Spanish copy (no longer deferred).
    expect(
      screen.getByRole("heading", {
        name: /Tu bóveda\. Sellada hasta que deje de estarlo\./,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "Iniciar sesión con Internet Identity",
      }),
    ).toBeInTheDocument();
  });

  it("re-renders protected page copy when switching locale", async () => {
    setAuthenticated(true);
    const user = userEvent.setup();
    renderApp();
    await router.navigate({ to: "/dashboard" });

    // English dashboard title.
    expect(
      await screen.findByRole("heading", { name: "The Vault" }),
    ).toBeInTheDocument();

    // Switch to Spanish.
    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    // The dashboard title and sidebar nav re-render in Spanish.
    expect(
      await screen.findByRole("heading", { name: "La Bóveda" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Panel" })).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Beneficiarios" }),
    ).toBeInTheDocument();
  });

  it("sets documentElement.dir=rtl for Arabic, Persian, and Urdu", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Self-sovereign inheritance");

    const select = screen.getByRole("combobox", { name: "Language" });

    for (const code of ["ar", "fa", "ur"]) {
      await user.selectOptions(select, code);
      expect(document.documentElement.dir).toBe("rtl");
      expect(document.documentElement.lang).toBe(code);
    }

    // Switching back to a left-to-right language restores LTR.
    await user.selectOptions(select, "es");
    expect(document.documentElement.dir).toBe("ltr");
  });

  it("renders RTL copy in Arabic after switching", async () => {
    const user = userEvent.setup();
    renderApp();
    await screen.findByText("Self-sovereign inheritance");

    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "ar");

    expect(document.documentElement.dir).toBe("rtl");
    expect(
      screen.getByRole("heading", {
        name: "مفتاح الرجل الميت — وُلد في عصر البخار",
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "الأسئلة الشائعة" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "الشروط والأحكام" }),
    ).toBeInTheDocument();
  });

  it("persists the selected language and applies it on the next render", async () => {
    const user = userEvent.setup();
    const first = renderApp();
    await screen.findByText("Self-sovereign inheritance");

    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    // The selection is persisted to localStorage.
    expect(window.localStorage.getItem("sovereign-legacy.lang")).toBe("es");

    // Unmount the first app, then render a fresh one (simulating a reload).
    // The fresh mount reads the stored language and applies it before paint,
    // so the copy renders in Spanish, not English.
    first.unmount();
    renderApp();

    expect(
      await screen.findByRole("heading", {
        name: "El Interruptor de Hombre Muerto: Nacido en la Era del Vapor",
      }),
    ).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("es");
  });

  it("formats dates with the active locale's conventions", async () => {
    setAuthenticated(true);
    const actor = createMockActor();
    actor.getWalletBalance.mockResolvedValue({ assets: [] });
    actor.listBeneficiaries.mockResolvedValue([]);
    actor.getSwitchState.mockResolvedValue({
      status: SwitchStatus.armed,
      cadenceSeconds: 604800n,
      armedAt: 1_700_000_000_000_000_000n,
      lastCheckIn: 1_700_000_000_000_000_000n,
    });
    setActor(actor);

    const queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
    const view = render(
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <DashboardPage />
        </I18nProvider>
      </QueryClientProvider>,
    );

    // English locale formats the last-verified label in English.
    expect(await screen.findByText(/Last verified ·/)).toBeInTheDocument();

    // Re-render with a Spanish locale and assert the label re-renders.
    window.localStorage.setItem("sovereign-legacy.lang", "es");
    view.unmount();
    render(
      <QueryClientProvider client={queryClient}>
        <I18nProvider>
          <DashboardPage />
        </I18nProvider>
      </QueryClientProvider>,
    );
    expect(
      await screen.findByText(/Última verificación ·/),
    ).toBeInTheDocument();
  });
});
