import {
  LANGUAGES,
  type Language,
  applyLanguageDirection,
  getStoredLanguage,
  setStoredLanguage,
} from "@/lib/i18n";
import { ar } from "@/lib/translations/ar";
import { bg } from "@/lib/translations/bg";
import { de } from "@/lib/translations/de";
import { type Translations, en } from "@/lib/translations/en";
import { es } from "@/lib/translations/es";
import { fa } from "@/lib/translations/fa";
import { fil } from "@/lib/translations/fil";
import { fr } from "@/lib/translations/fr";
import { hi } from "@/lib/translations/hi";
import { id } from "@/lib/translations/id";
import { it } from "@/lib/translations/it";
import { ja } from "@/lib/translations/ja";
import { ko } from "@/lib/translations/ko";
import { pl } from "@/lib/translations/pl";
import { pt } from "@/lib/translations/pt";
import { sw } from "@/lib/translations/sw";
import { th } from "@/lib/translations/th";
import { tr } from "@/lib/translations/tr";
import { uk } from "@/lib/translations/uk";
import { ur } from "@/lib/translations/ur";
import { vi } from "@/lib/translations/vi";
import { zh } from "@/lib/translations/zh";
import {
  type ReactNode,
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

/** A nested partial of the full dictionary, used by non-English locales. */
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends string ? string : DeepPartial<T[K]>;
};

/** Dot-path type over the nested dictionary, e.g. "landing.faq.q1.q". */
type Path<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends string
          ? K
          : `${K}.${Path<T[K]>}`
        : never;
    }[keyof T]
  : never;

export type TranslationKey = Path<Translations>;

/** Every locale dictionary, keyed by language code. English is the fallback. */
const DICTIONARIES: Record<string, DeepPartial<Translations>> = {
  en,
  es,
  fr,
  de,
  pt,
  ja,
  zh,
  hi,
  vi,
  ko,
  id,
  fil,
  tr,
  uk,
  pl,
  it,
  ar,
  th,
  bg,
  sw,
  fa,
  ur,
};

/** Deep-merge a partial dictionary over English so no key is ever missing. */
function mergeTranslations<T extends Record<string, unknown>>(
  base: T,
  partial: DeepPartial<T>,
): T {
  const result: Record<string, unknown> = { ...base };
  for (const key of Object.keys(partial) as (keyof T)[]) {
    const value = partial[key];
    if (value && typeof value === "object" && !Array.isArray(value)) {
      result[key as string] = mergeTranslations(
        base[key] as Record<string, unknown>,
        value as DeepPartial<Record<string, unknown>>,
      );
    } else if (typeof value === "string") {
      result[key as string] = value;
    }
  }
  return result as T;
}

/** Resolve a dot-path key against a dictionary. */
function resolvePath(dict: Translations, path: string): string {
  const parts = path.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (current == null || typeof current !== "object") return path;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : path;
}

/** Replace `{param}` placeholders in a translated string. */
function interpolate(
  template: string,
  params?: Record<string, string | number>,
): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) => {
    const value = params[key];
    return value === undefined ? match : String(value);
  });
}

/** Standalone `t` used outside the provider (defaults to English). */
export function t(
  key: TranslationKey,
  params?: Record<string, string | number>,
): string {
  return interpolate(resolvePath(en, key), params);
}

/** Format a duration in seconds as a compact "Xd Yh" / "Xh Ym" / "Ym" string. */
export function formatDuration(seconds: bigint | number): string {
  const total = Number(seconds);
  if (total <= 0) return "0m";
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

/** The `t` signature shared by the provider and the standalone helper. */
type TranslateFn = (
  key: TranslationKey,
  params?: Record<string, string | number>,
) => string;

/** Known backend event-type values mapped to their `audit.eventTypes.*` key. */
const EVENT_TYPE_KEYS: Record<string, TranslationKey> = {
  login: "audit.eventTypes.login",
  switch_armed: "audit.eventTypes.switch_armed",
  switch_disarmed: "audit.eventTypes.switch_disarmed",
  switch_checked_in: "audit.eventTypes.switch_checked_in",
  beneficiary_added: "audit.eventTypes.beneficiary_added",
  beneficiary_updated: "audit.eventTypes.beneficiary_updated",
  beneficiary_removed: "audit.eventTypes.beneficiary_removed",
  asset_added: "audit.eventTypes.asset_added",
};

/**
 * Localize a backend event-type value. Unknown or future event types fall
 * back to the raw value so the cell is never blank.
 */
export function translateEventType(t: TranslateFn, eventType: string): string {
  const key = EVENT_TYPE_KEYS[eventType];
  return key ? t(key) : eventType;
}

/**
 * Localize the static wrapper text of a backend audit description while
 * preserving its dynamic values (names, ids, shares, balances) as-is via
 * `t` interpolation. Unrecognized descriptions fall back to the raw string.
 */
export function translateAuditDescription(
  t: TranslateFn,
  eventType: string,
  description: string,
): string {
  switch (eventType) {
    case "login":
      return t("audit.descriptions.login");
    case "switch_disarmed":
      return t("audit.descriptions.switch_disarmed");
    case "switch_checked_in":
      return description.includes("inactivity clock reset")
        ? t("audit.descriptions.switch_checked_in_reset")
        : t("audit.descriptions.switch_checked_in");
    case "switch_armed": {
      const cadence = description.match(/cadence of (\d+) seconds/);
      if (cadence) {
        return t("audit.descriptions.switch_armed_cadence", {
          seconds: cadence[1],
        });
      }
      const warning = description.match(/warning after (\d+) days/);
      const repeat = description.match(/repeating every (\d+) days/);
      const trigger = description.match(/triggering after (\d+) days/);
      if (warning && repeat && trigger) {
        return t("audit.descriptions.switch_armed_timeline", {
          warning: warning[1],
          repeat: repeat[1],
          trigger: trigger[1],
        });
      }
      return description;
    }
    case "beneficiary_added": {
      const m = description.match(
        /Beneficiary '([^']+)' added with allocation share (\d+)%/,
      );
      return m
        ? t("audit.descriptions.beneficiary_added", {
            name: m[1],
            share: m[2],
          })
        : description;
    }
    case "beneficiary_updated": {
      const m = description.match(
        /Beneficiary '([^']+)' \(id (\d+)\) updated with allocation share (\d+)%/,
      );
      return m
        ? t("audit.descriptions.beneficiary_updated", {
            name: m[1],
            id: m[2],
            share: m[3],
          })
        : description;
    }
    case "beneficiary_removed": {
      const m = description.match(
        /Beneficiary \(id (\d+)\) removed and its asset allocations cleaned up/,
      );
      return m
        ? t("audit.descriptions.beneficiary_removed", { id: m[1] })
        : description;
    }
    case "asset_added": {
      const m = description.match(
        /Asset '([^']+)' \(([^)]+)\) added with balance (\d+)/,
      );
      return m
        ? t("audit.descriptions.asset_added", {
            name: m[1],
            symbol: m[2],
            balance: m[3],
          })
        : description;
    }
    default:
      return description;
  }
}

export interface I18nContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  dir: "ltr" | "rtl";
  t: (key: TranslationKey, params?: Record<string, string | number>) => string;
  formatNumber: (value: number, options?: Intl.NumberFormatOptions) => string;
  formatDate: (date: Date, options?: Intl.DateTimeFormatOptions) => string;
  formatPercent: (value: number, options?: Intl.NumberFormatOptions) => string;
}

/** Default context: English, fully functional without a mounted provider. */
const DEFAULT_CONTEXT: I18nContextValue = {
  language: LANGUAGES[0],
  setLanguage: (language) => {
    setStoredLanguage(language);
    applyLanguageDirection(language);
  },
  dir: "ltr",
  t,
  formatNumber: (value, options) =>
    new Intl.NumberFormat("en", options).format(value),
  formatDate: (date, options) =>
    new Intl.DateTimeFormat("en", options).format(date),
  formatPercent: (value, options) =>
    new Intl.NumberFormat("en", { style: "percent", ...options }).format(value),
};

const I18nContext = createContext<I18nContextValue>(DEFAULT_CONTEXT);

/** Update the document title and meta description for the active locale. */
function applyDocumentMeta(dict: Translations): void {
  if (typeof document === "undefined") return;
  document.title = dict.meta.title;
  const meta = document.querySelector<HTMLMetaElement>(
    'meta[name="description"]',
  );
  if (meta) meta.content = dict.meta.description;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() =>
    getStoredLanguage(),
  );

  const dict = useMemo(
    () => mergeTranslations(en, DICTIONARIES[language.code] ?? {}),
    [language],
  );

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    setStoredLanguage(next);
    applyLanguageDirection(next);
  }, []);

  // Apply document lang/dir before paint and keep the title/meta in sync.
  useEffect(() => {
    applyLanguageDirection(language);
    applyDocumentMeta(dict);
  }, [language, dict]);

  const value = useMemo<I18nContextValue>(
    () => ({
      language,
      setLanguage,
      dir: language.dir,
      t: (key, params) => interpolate(resolvePath(dict, key), params),
      formatNumber: (value, options) =>
        new Intl.NumberFormat(language.code, options).format(value),
      formatDate: (date, options) =>
        new Intl.DateTimeFormat(language.code, options).format(date),
      formatPercent: (value, options) =>
        new Intl.NumberFormat(language.code, {
          style: "percent",
          ...options,
        }).format(value),
    }),
    [language, setLanguage, dict],
  );

  return createElement(I18nContext.Provider, { value }, children);
}

/** Access the active locale, its `t` function, and locale-aware formatters. */
export function useTranslation(): I18nContextValue {
  return useContext(I18nContext);
}
