import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { LANGUAGES } from "@/lib/i18n";
import { renderPage } from "@/test/utils";
import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  });

  it("lists all 22 supported languages", () => {
    renderPage(<LanguageSwitcher />);

    const select = screen.getByRole("combobox", { name: "Language" });
    const options = within(select).getAllByRole("option");
    expect(options).toHaveLength(22);
    expect(LANGUAGES).toHaveLength(22);
  });

  it("persists the selection and applies RTL direction for Arabic", async () => {
    const user = userEvent.setup();
    renderPage(<LanguageSwitcher />);

    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "ar");

    expect(window.localStorage.getItem("sovereign-legacy.lang")).toBe("ar");
    expect(document.documentElement.dir).toBe("rtl");
    expect(document.documentElement.lang).toBe("ar");
  });

  it("applies LTR direction for a left-to-right language", async () => {
    const user = userEvent.setup();
    renderPage(<LanguageSwitcher />);

    const select = screen.getByRole("combobox", { name: "Language" });
    await user.selectOptions(select, "es");

    expect(window.localStorage.getItem("sovereign-legacy.lang")).toBe("es");
    expect(document.documentElement.dir).toBe("ltr");
  });
});
