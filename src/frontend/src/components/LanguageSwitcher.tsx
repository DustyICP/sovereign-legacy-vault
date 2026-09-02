import { LANGUAGES } from "@/lib/i18n";
import { useTranslation } from "@/lib/translations";
import { ChevronDown } from "lucide-react";

/**
 * Language switcher: lists all 22 supported languages, persists the selection,
 * and flips document direction for RTL languages (Arabic, Persian, Urdu).
 * The active locale is driven by the I18nProvider context, so switching
 * re-renders all copy immediately.
 */
export function LanguageSwitcher() {
  const { language, setLanguage, t } = useTranslation();

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const next =
      LANGUAGES.find((lang) => lang.code === event.target.value) ??
      LANGUAGES[0];
    setLanguage(next);
  };

  return (
    <div className="relative">
      <label htmlFor="language-switcher" className="sr-only">
        {t("language.label")}
      </label>
      <select
        id="language-switcher"
        data-ocid="language_switcher"
        value={language.code}
        onChange={handleChange}
        className="h-9 cursor-pointer appearance-none rounded border border-border bg-surface-raised pl-3 pr-8 font-mono text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground transition-smooth hover:border-primary/60 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        {LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.nativeName}
          </option>
        ))}
      </select>
      <ChevronDown
        aria-hidden="true"
        className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground"
      />
    </div>
  );
}
