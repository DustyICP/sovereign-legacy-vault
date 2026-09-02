import { LANGUAGES } from "@/lib/i18n";
import { router } from "@/lib/router";
import { renderApp, setAuthenticated } from "@/test/utils";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

/**
 * Characterization baseline for the brand wordmark contract.
 *
 * The brand wordmark 'Sovereign Legacy' must remain in English/Latin script in
 * every locale — it is a proper noun and is intentionally excluded from the
 * translation pass. This pins that contract across all 22 locales so a
 * translation change that accidentally rewrites the wordmark is caught here,
 * while the surrounding copy is free to be translated.
 */
describe("Sovereign Legacy wordmark stays English/Latin in every locale", () => {
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

  it("keeps the wordmark 'Sovereign Legacy' in English/Latin across all 22 locales", async () => {
    const user = userEvent.setup();
    renderApp();

    // The landing page renders the header wordmark.
    await screen.findByText("Self-sovereign inheritance");

    const select = screen.getByRole("combobox", { name: "Language" });

    for (const lang of LANGUAGES) {
      await user.selectOptions(select, lang.code);

      // The wordmark's visible text stays 'Sovereign Legacy' in English/Latin
      // script regardless of the active locale. The link's aria-label is
      // translated (e.g. "Inicio de Sovereign Legacy"), so query the visible
      // wordmark text by its data-ocid seam.
      const wordmark = screen.getByTestId("header.wordmark");
      expect(
        within(wordmark).getByText("Sovereign Legacy"),
      ).toBeInTheDocument();
    }
  });

  it("keeps the wordmark in English/Latin for the RTL locales", async () => {
    const user = userEvent.setup();
    renderApp();

    await screen.findByText("Self-sovereign inheritance");

    const select = screen.getByRole("combobox", { name: "Language" });

    // Arabic, Persian, and Urdu flip the document to RTL but must not
    // transliterate or translate the brand wordmark.
    for (const code of ["ar", "fa", "ur"]) {
      await user.selectOptions(select, code);
      expect(document.documentElement.dir).toBe("rtl");

      const wordmark = screen.getByTestId("header.wordmark");
      expect(
        within(wordmark).getByText("Sovereign Legacy"),
      ).toBeInTheDocument();
    }
  });
});
