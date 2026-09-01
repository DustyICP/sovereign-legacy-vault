export interface Language {
  code: string;
  name: string;
  nativeName: string;
  dir: "ltr" | "rtl";
}

/**
 * The 22 supported languages. `dir` drives RTL layout for Arabic, Persian,
 * and Urdu. The switcher is a functional placeholder — selection persists
 * locally and flips the document direction even before full translation
 * coverage lands.
 */
export const LANGUAGES: Language[] = [
  { code: "en", name: "English", nativeName: "English", dir: "ltr" },
  { code: "es", name: "Spanish", nativeName: "Español", dir: "ltr" },
  { code: "fr", name: "French", nativeName: "Français", dir: "ltr" },
  { code: "de", name: "German", nativeName: "Deutsch", dir: "ltr" },
  { code: "pt", name: "Portuguese", nativeName: "Português", dir: "ltr" },
  { code: "ja", name: "Japanese", nativeName: "日本語", dir: "ltr" },
  { code: "zh", name: "Chinese", nativeName: "中文", dir: "ltr" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", dir: "ltr" },
  { code: "vi", name: "Vietnamese", nativeName: "Tiếng Việt", dir: "ltr" },
  { code: "ko", name: "Korean", nativeName: "한국어", dir: "ltr" },
  {
    code: "id",
    name: "Indonesian",
    nativeName: "Bahasa Indonesia",
    dir: "ltr",
  },
  { code: "fil", name: "Filipino", nativeName: "Filipino", dir: "ltr" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", dir: "ltr" },
  { code: "uk", name: "Ukrainian", nativeName: "Українська", dir: "ltr" },
  { code: "pl", name: "Polish", nativeName: "Polski", dir: "ltr" },
  { code: "it", name: "Italian", nativeName: "Italiano", dir: "ltr" },
  { code: "ar", name: "Arabic", nativeName: "العربية", dir: "rtl" },
  { code: "th", name: "Thai", nativeName: "ไทย", dir: "ltr" },
  { code: "bg", name: "Bulgarian", nativeName: "Български", dir: "ltr" },
  { code: "sw", name: "Swahili", nativeName: "Kiswahili", dir: "ltr" },
  { code: "fa", name: "Persian", nativeName: "فارسی", dir: "rtl" },
  { code: "ur", name: "Urdu", nativeName: "اردو", dir: "rtl" },
];

const STORAGE_KEY = "sovereign-legacy.lang";

export function getStoredLanguage(): Language {
  if (typeof window === "undefined") return LANGUAGES[0];
  const stored = window.localStorage.getItem(STORAGE_KEY);
  const match = LANGUAGES.find((lang) => lang.code === stored);
  return match ?? LANGUAGES[0];
}

export function setStoredLanguage(language: Language): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, language.code);
  document.documentElement.lang = language.code;
  document.documentElement.dir = language.dir;
}

export function applyLanguageDirection(language: Language): void {
  if (typeof document === "undefined") return;
  document.documentElement.lang = language.code;
  document.documentElement.dir = language.dir;
}
