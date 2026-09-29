import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";

/** Canonical site origin for SEO, sitemap, and structured data. */
export const SITE_URL = "https://www.getidphotoai.ae";

export const SITE_NAME = "GetIDPhotoAI";

export const DEFAULT_TITLE =
  "GetIDPhotoAI | Instant AI Passport & Visa Photo Maker UAE & GCC";

export const DEFAULT_DESCRIPTION =
  "Get government-compliant biometric photos for UAE passports, Emirates ID, Dubai visas, and GCC documents in seconds. Instant AI processing with optional human verification.";

export const SEO_KEYWORDS = [
  "UAE passport photo online",
  "Emirates ID photo maker",
  "Dubai visa photo size",
  "AI passport photo Dubai",
  "GCC visa photo generator",
  "ICP compliant photo maker",
  "GDRFA photo requirements",
  "Abu Dhabi passport photo",
  "Sharjah ID photo online",
  "Saudi Arabia visa photo",
  "Qatar visa photo online",
  "Oman passport photo",
  "Bahrain ID photo",
  "Kuwait visa photo",
];

export const OG_IMAGE_PATH = "/hero-uae.jpg";

/** Localized homepage paths (English is the unprefixed root). */
export const EN_HOME_PATH = "/";
export const AR_HOME_PATH = "/ar";

export const GEO = {
  region: "AE",
  placename: "Dubai, United Arab Emirates",
  /** lat;lng for geo.position */
  position: "25.2048;55.2708",
  /** lat, lng for ICBM */
  icbm: "25.2048, 55.2708",
} as const;

export const SERVICE_AREAS = [
  "United Arab Emirates",
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Ras Al Khaimah",
  "Fujairah",
  "Umm Al Quwain",
  "Saudi Arabia",
  "Qatar",
  "Oman",
  "Bahrain",
  "Kuwait",
] as const;

/** Absolute URL for a site path (always under SITE_URL). */
export function absoluteUrl(path: string = "/"): string {
  const base = SITE_URL.replace(/\/$/, "");
  if (!path || path === "/") {
    return `${base}/`;
  }
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function homePathForLocale(locale: Locale): string {
  return locale === "ar" ? AR_HOME_PATH : EN_HOME_PATH;
}

export function homeUrlForLocale(locale: Locale): string {
  return absoluteUrl(homePathForLocale(locale));
}

/**
 * UAE-targeted hreflang map for bilingual homepage variants.
 * Absolute URLs are preferred by Google Search Console / Bing.
 */
export function hreflangLanguageMap(): NonNullable<
  NonNullable<Metadata["alternates"]>["languages"]
> {
  const enUrl = homeUrlForLocale("en");
  const arUrl = homeUrlForLocale("ar");

  return {
    "en-AE": enUrl,
    "ar-AE": arUrl,
    en: enUrl,
    ar: arUrl,
    "x-default": enUrl,
  };
}

/**
 * Canonical + hreflang alternates for the active homepage locale.
 */
export function buildHomeAlternates(locale: Locale): Metadata["alternates"] {
  return {
    canonical: homeUrlForLocale(locale),
    languages: hreflangLanguageMap(),
  };
}
