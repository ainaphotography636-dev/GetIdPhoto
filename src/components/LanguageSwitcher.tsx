"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LOCALE_COOKIE,
  homePath,
  localeFromPathname,
  type Locale,
} from "@/i18n/config";

type LanguageSwitcherProps = {
  locale: Locale;
  /** Visible label for the *other* language (e.g. "العربية" / "English"). */
  switchLabel: string;
  ariaLabel: string;
};

function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

/**
 * Lightweight EN ↔ AR text link (minimal English-header impact).
 */
export default function LanguageSwitcher({
  locale,
  switchLabel,
  ariaLabel,
}: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const pathLocale = localeFromPathname(pathname);
  const activeLocale =
    pathname === "/" || pathname.startsWith("/ar") ? pathLocale : locale;
  const nextLocale: Locale = activeLocale === "ar" ? "en" : "ar";

  const isHome = pathname === "/" || pathname === "/ar";
  const href = isHome ? homePath(nextLocale) : pathname;

  return (
    <Link
      href={href}
      hrefLang={nextLocale === "ar" ? "ar-AE" : "en-AE"}
      aria-label={ariaLabel}
      lang={nextLocale === "ar" ? "ar" : "en"}
      className="text-sm font-semibold text-gray-600 transition-colors hover:text-emerald-600"
      onClick={(event) => {
        writeLocaleCookie(nextLocale);
        if (!isHome) {
          event.preventDefault();
          router.refresh();
        }
      }}
    >
      {switchLabel}
    </Link>
  );
}
