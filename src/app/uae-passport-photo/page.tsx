import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import EmiratesIdGuide from "@/components/EmiratesIdGuide";
import GeoSummaryBox from "@/components/GeoSummaryBox";
import EmiratesIdHero from "@/components/EmiratesIdHero";
import EmiratesIdHowItWorks from "@/components/EmiratesIdHowItWorks";
import EmiratesIdPricing from "@/components/EmiratesIdPricing";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import RelatedDocuments from "@/components/RelatedDocuments";
import UaePageCrossLinks from "@/components/UaePageCrossLinks";
import ServicesMenu from "@/components/ServicesMenu";
import { uaePassportData, uaePassportPackageCopy } from "@/data/uaePassportData";
import {
  documentPageJsonLd,
  pageSpecMetadata,
  uaePagesData,
} from "@/data/uaePagesData";
import { getDictionary } from "@/i18n/get-dictionary";
import { getRequestLocale } from "@/i18n/get-request-locale";
import { makePhotoHref } from "@/lib/document-catalog";
import { SITE_URL } from "@/lib/seo";

const slug = "uae-passport-photo";
const data = uaePagesData[slug];
const makeHref = makePhotoHref("uae-passport");

const pageJsonLd = documentPageJsonLd(
  data,
  uaePassportData.faq,
  `${SITE_URL}${makeHref}`,
);

export const metadata: Metadata = {
  ...pageSpecMetadata(data),
  title: { absolute: data.metaTitle },
  description: data.metaDescription,
  alternates: { canonical: data.canonical },
};

export default async function UaePassportPhotoPage() {
  const locale = await getRequestLocale();
  const dictionary = await getDictionary(locale);

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="GetIDPhotoAI home">
            <BrandLogo height={56} />
          </Link>
          <nav className="flex items-center gap-4 text-sm font-medium text-slate-600 sm:gap-5">
            <Link href="/" className="hover:text-emerald-700">
              Home
            </Link>
            <ServicesMenu label="Services" className="hidden sm:block" />
            <Link href="/make-photo" className="hidden hover:text-emerald-700 sm:inline">
              Make photo
            </Link>
            <Link
              href={makeHref}
              className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-hover"
            >
              Create this photo
            </Link>
          </nav>
        </div>
      </header>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageJsonLd) }}
      />
      <main>
        <EmiratesIdHero
          locale={locale}
          hero={dictionary.hero}
          content={uaePassportData}
          specCode="uae-passport"
          title={data.h1}
        />
        <GeoSummaryBox pageData={data} />
        <EmiratesIdGuide content={uaePassportData} pageSpec={data} />
        <EmiratesIdHowItWorks content={uaePassportData} />
        <EmiratesIdPricing
          locale={locale}
          pricing={dictionary.pricing}
          specCode="uae-passport"
          heading={{
            eyebrow: uaePassportData.pricingEyebrow,
            title: uaePassportData.pricingTitle,
            subtitle: uaePassportData.pricingSubtitle,
          }}
          packageCopy={uaePassportPackageCopy}
        />
        <FaqSection
          items={uaePassportData.faq}
          eyebrow="Passport FAQ"
          title={uaePassportData.faqTitle}
          subtitle={uaePassportData.faqSubtitle}
        />
      </main>

      <UaePageCrossLinks currentSlug="uae-passport-photo" />
      <RelatedDocuments currentSlug="uae-passport-photo" />
      <Footer locale={locale} dictionary={dictionary} homeHref="/" />
    </div>
  );
}
