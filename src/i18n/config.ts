export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const LOCALE_COOKIE = "NEXT_LOCALE";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isRtl(locale: Locale): boolean {
  return locale === "ar";
}

/** BCP 47 language tag for the <html lang> attribute. */
export function htmlLang(locale: Locale): string {
  return locale === "ar" ? "ar-AE" : "en-AE";
}

/** Detect locale from a pathname (`/ar`, `/ar/...` → ar). */
export function localeFromPathname(pathname: string): Locale {
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    return "ar";
  }
  return defaultLocale;
}

/** Homepage href for a locale. */
export function homePath(locale: Locale): string {
  return locale === "ar" ? "/ar" : "/";
}
