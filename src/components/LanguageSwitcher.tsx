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
  /** Visible label for the *other* language (e.g. "العربية" / "English"). Required for `link` variant. */
  switchLabel?: string;
  ariaLabel: string;
  /** `link` = single toggle (header). `pair` = English | العربية (footer). */
  variant?: "link" | "pair";
  className?: string;
};

function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale};path=/;max-age=${60 * 60 * 24 * 365};samesite=lax`;
}

function resolveActiveLocale(pathname: string, locale: Locale): Locale {
  if (pathname === "/" || pathname.startsWith("/ar")) {
    return localeFromPathname(pathname);
  }
  return locale;
}

/**
 * Lightweight EN ↔ AR control.
 * - `link`: single “switch to other language” link (header).
 * - `pair`: English | العربية with active state (footer bottom bar).
 */
export default function LanguageSwitcher({
  locale,
  switchLabel,
  ariaLabel,
  variant = "link",
  className = "",
}: LanguageSwitcherProps) {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const activeLocale = resolveActiveLocale(pathname, locale);
  const nextLocale: Locale = activeLocale === "ar" ? "en" : "ar";
  const isHome = pathname === "/" || pathname === "/ar";

  if (variant === "pair") {
    const optionClass = (isActive: boolean) =>
      [
        "rounded-sm px-0.5 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
        isActive
          ? "font-semibold text-white"
          : "text-gray-400 hover:text-white",
      ].join(" ");

    return (
      <nav
        aria-label={ariaLabel}
        className={`flex items-center gap-2 text-sm ${className}`.trim()}
      >
        <Link
          href={homePath("en")}
          hrefLang="en-AE"
          lang="en"
          aria-current={activeLocale === "en" ? "page" : undefined}
          aria-label="English"
          className={optionClass(activeLocale === "en")}
          onClick={() => {
            writeLocaleCookie("en");
          }}
        >
          English
        </Link>
        <span className="select-none text-gray-600" aria-hidden="true">
          |
        </span>
        <Link
          href={homePath("ar")}
          hrefLang="ar-AE"
          lang="ar"
          aria-current={activeLocale === "ar" ? "page" : undefined}
          aria-label="العربية"
          className={optionClass(activeLocale === "ar")}
          onClick={() => {
            writeLocaleCookie("ar");
          }}
        >
          العربية
        </Link>
      </nav>
    );
  }

  const href = isHome ? homePath(nextLocale) : pathname;

  return (
    <Link
      href={href}
      hrefLang={nextLocale === "ar" ? "ar-AE" : "en-AE"}
      aria-label={ariaLabel}
      lang={nextLocale === "ar" ? "ar" : "en"}
      className={
        className ||
        "text-sm font-semibold text-gray-600 transition-colors hover:text-emerald-600"
      }
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
