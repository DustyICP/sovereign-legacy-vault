import { LANGUAGES } from "@/lib/i18n";
import { router } from "@/lib/router";
import { renderApp, setAuthenticated } from "@/test/utils";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

/**
 * Cover for the landing hero copy contract.
 *
 * The hero section (eyebrow, headline, login CTA, subhead, and vault-door alt
 * text) is now translated with human-curated strings for each of the 22
 * locales. These tests pin that contract: switching locale re-renders the hero
 * with the exact curated per-locale strings, and the brand wordmark 'Sovereign
 * Legacy' stays English/Latin in every locale (also covered by
 * Header.wordmark.test.tsx).
 */
describe("Landing hero shows curated per-locale translations", () => {
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

  it("renders the hero eyebrow, headline, CTA, and subhead in English by default", async () => {
    renderApp();

    expect(
      await screen.findByText("Self-sovereign inheritance"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Your vault\. Sealed until it isn't\./,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Login with Internet Identity" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/A digital dead man's switch for crypto/i),
    ).toBeInTheDocument();
  });

  it("re-renders the hero with the curated Spanish strings after switching locale", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText("Self-sovereign inheritance");

    // Switch to Spanish via the header language switcher.
    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    // The hero now shows the curated Spanish copy.
    expect(screen.getByText("Herencia autosoberana")).toBeInTheDocument();
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
    expect(
      screen.getByText(/Un interruptor de hombre muerto digital/i),
    ).toBeInTheDocument();
  });

  it("re-renders the hero with the curated Arabic strings and RTL direction", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText("Self-sovereign inheritance");

    // Switch to Arabic, which flips the document to RTL.
    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "ar");

    // The document direction flips and the hero shows the curated Arabic copy.
    expect(document.documentElement.dir).toBe("rtl");
    expect(
      screen.getByRole("heading", {
        name: /خزنتك\. مختومة إلى أن يحين الوقت\./,
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: "تسجيل الدخول عبر Internet Identity",
      }),
    ).toBeInTheDocument();
  });

  it("translates the vault-door image alt text per locale", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText("Self-sovereign inheritance");

    // English alt text by default.
    const englishImage = screen.getByAltText(/bank vault door/i);
    expect(englishImage.getAttribute("alt")).toContain("bank vault door");

    // Switch to Spanish and assert the alt text is translated.
    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    const spanishImage = screen.getByAltText(/puerta de bóveda bancaria/i);
    expect(spanishImage.getAttribute("alt")).toContain(
      "puerta de bóveda bancaria",
    );
  });

  it("keeps the brand wordmark 'Sovereign Legacy' in English/Latin across all 22 locales", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText("Self-sovereign inheritance");

    const select = screen.getByRole("combobox", { name: "Language" });

    for (const lang of LANGUAGES) {
      await user.selectOptions(select, lang.code);

      // The wordmark's visible text stays 'Sovereign Legacy' in English/Latin
      // script regardless of the active locale.
      const wordmark = screen.getByTestId("header.wordmark");
      expect(wordmark.textContent).toContain("Sovereign Legacy");
    }
  });
});
