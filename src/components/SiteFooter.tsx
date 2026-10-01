"use client";

import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import SocialLinks from "@/components/SocialLinks";
import { Star } from "lucide-react";
import { constants } from "@/constants";
import {
  getPrimaryDocumentLinks,
  type DocumentLink,
} from "@/lib/document-catalog";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { RefObject } from "react";

type SiteFooterProps = {
  locale: Locale;
  dictionary: Dictionary;
  contactRef?: RefObject<HTMLElement | null>;
  homeHref?: string;
};

/**
 * Site footer with active Next.js Links for every Document photo guide.
 */
export default function SiteFooter({
  locale,
  dictionary,
  contactRef,
  homeHref = "/",
}: SiteFooterProps) {
  const t = dictionary.footer;
  const phone = constants.businessLocations[0]?.phone || "+971559461415";
  const whatsapp =
    constants.businessLocations[0]?.whatsapp || "971559461415";
  const email = constants.businessLocations[0]?.email;
  const hours =
    locale === "ar"
      ? t.hours
      : constants.businessLocations[0]?.hours || t.hours;

  const guides: DocumentLink[] = getPrimaryDocumentLinks();
  const guidesHeading =
    locale === "ar" ? "أدلة الوثائق" : "Document photo guides";
  const viewAllLabel = locale === "ar" ? "كل الأدلة ←" : "View all guides →";

  const linkClass =
    "rounded-sm text-gray-400 outline-none transition-colors hover:text-white focus-visible:text-white focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900";

  return (
    <footer ref={contactRef} className="bg-gray-900 py-12 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="mb-4">
              <BrandLogo height={64} variant="light" />
            </div>
            <p className="mb-4 leading-relaxed text-gray-400">{t.blurb}</p>
            <div className="mb-5 flex gap-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-current text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400">{t.reviews}</span>
            </div>
            <SocialLinks label={t.followUs} variant="footer" />
          </div>

          <nav aria-labelledby="footer-document-guides-heading">
            <h4
              id="footer-document-guides-heading"
              className="mb-4 font-semibold"
            >
              {guidesHeading}
            </h4>
            <ul className="space-y-2">
              {guides.map((guide) => (
                <li key={guide.href}>
                  <Link
                    href={guide.href}
                    className={linkClass}
                    aria-label={`${guide.shortTitle}: ${guide.anchorText}`}
                    title={guide.title}
                  >
                    {guide.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/spec"
              className="mt-3 inline-block rounded-sm text-sm font-medium text-emerald-400 outline-none transition-colors hover:text-emerald-300 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
            >
              {viewAllLabel}
            </Link>
          </nav>

          <div>
            <h4 className="mb-4 font-semibold">{t.contactTitle}</h4>
            <ul className="space-y-2">
              <li>
                <Link href={homeHref} className={linkClass}>
                  GetIDPhotoAI.ae
                </Link>
              </li>
              <li>
                <a href={`mailto:${email}`} className={linkClass}>
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  {t.whatsappWithPhone.replace("{phone}", phone)}
                </a>
              </li>
              <li className="text-gray-400">{hours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-gray-800 pt-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} {constants.studioName}.{" "}
              {t.rights}
            </p>
            <a
              href="https://getidphoto.ae"
              className={`text-sm ${linkClass}`}
            >
              {t.poweredBy}
            </a>
          </div>

          <LanguageSwitcher
            locale={locale}
            ariaLabel={dictionary.language.label}
            variant="pair"
          />

          <div className="flex gap-6">
            <Link href="/privacy-policy" className={linkClass}>
              {t.privacy}
            </Link>
            <Link href="/terms-of-service" className={linkClass}>
              {t.terms}
            </Link>
            <Link href="/refund-policy" className={linkClass}>
              {t.refund}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
