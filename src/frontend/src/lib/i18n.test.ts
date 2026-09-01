import {
  LANGUAGES,
  applyLanguageDirection,
  getStoredLanguage,
  setStoredLanguage,
} from "@/lib/i18n";
import { beforeEach, describe, expect, it } from "vitest";

const EXPECTED_CODES = [
  "en",
  "es",
  "fr",
  "de",
  "pt",
  "ja",
  "zh",
  "hi",
  "vi",
  "ko",
  "id",
  "fil",
  "tr",
  "uk",
  "pl",
  "it",
  "ar",
  "th",
  "bg",
  "sw",
  "fa",
  "ur",
];

describe("i18n language registry", () => {
  beforeEach(() => {
    window.localStorage.clear();
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  });

  it("defines exactly the 22 supported languages", () => {
    expect(LANGUAGES).toHaveLength(22);
    expect(LANGUAGES.map((l) => l.code)).toEqual(EXPECTED_CODES);
  });

  it("marks Arabic, Persian, and Urdu as right-to-left and everything else LTR", () => {
    for (const lang of LANGUAGES) {
      if (["ar", "fa", "ur"].includes(lang.code)) {
        expect(lang.dir).toBe("rtl");
      } else {
        expect(lang.dir).toBe("ltr");
      }
    }
  });

  it("persists the selected language and applies its direction", () => {
    const arabic = LANGUAGES.find((l) => l.code === "ar");
    expect(arabic).toBeDefined();
    setStoredLanguage(arabic!);

    expect(window.localStorage.getItem("sovereign-legacy.lang")).toBe("ar");
    expect(document.documentElement.dir).toBe("rtl");
    expect(getStoredLanguage().code).toBe("ar");
  });

  it("falls back to English for an unknown stored code", () => {
    window.localStorage.setItem("sovereign-legacy.lang", "xx");
    expect(getStoredLanguage().code).toBe("en");
  });

  it("applies direction without persisting", () => {
    applyLanguageDirection(LANGUAGES.find((l) => l.code === "ur")!);
    expect(document.documentElement.dir).toBe("rtl");
    expect(window.localStorage.getItem("sovereign-legacy.lang")).toBeNull();
  });
});
