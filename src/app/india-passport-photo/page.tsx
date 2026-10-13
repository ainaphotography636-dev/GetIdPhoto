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
import RelatedLinks from "@/components/RelatedLinks";
import ServicesMenu from "@/components/ServicesMenu";
import {
  INDIA_PASSPORT_CANONICAL,
  INDIA_PASSPORT_DESCRIPTION,
  INDIA_PASSPORT_KEYWORDS,
  INDIA_PASSPORT_OG_DESCRIPTION,
  INDIA_PASSPORT_OG_IMAGE,
  INDIA_PASSPORT_OG_TITLE,
  INDIA_PASSPORT_TITLE,
  indiaPassportData,
  indiaPassportJsonLd,
  indiaPassportLocations,
  indiaPassportPackageCopy,
  indiaPassportPageSpec,
} from "@/data/indiaPassportData";
import { getDictionary } from "@/i18n/get-dictionary";
import { getRequestLocale } from "@/i18n/get-request-locale";
import { getUaeCoreCrossLinks, makePhotoHref } from "@/lib/document-catalog";
import { GEO, SITE_NAME } from "@/lib/seo";

const data = indiaPassportPageSpec;
const makeHref = makePhotoHref("india-passport");
const pageJsonLd = indiaPassportJsonLd(indiaPassportData.faq);

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: { absolute: INDIA_PASSPORT_TITLE },
    description: INDIA_PASSPORT_DESCRIPTION,
    keywords: INDIA_PASSPORT_KEYWORDS,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: INDIA_PASSPORT_CANONICAL,
      languages: {
        "en-AE": INDIA_PASSPORT_CANONICAL,
        "x-default": INDIA_PASSPORT_CANONICAL,
      },
    },
    openGraph: {
      title: INDIA_PASSPORT_OG_TITLE,
      description: INDIA_PASSPORT_OG_DESCRIPTION,
      url: INDIA_PASSPORT_CANONICAL,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_AE",
      images: [
        {
          url: INDIA_PASSPORT_OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Indian passport photo maker for AED 20, with a 51 by 51 mm print and a 630 by 810 px upload",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: INDIA_PASSPORT_OG_TITLE,
      description: INDIA_PASSPORT_OG_DESCRIPTION,
      images: [INDIA_PASSPORT_OG_IMAGE],
    },
    other: {
      "geo.region": GEO.region,
      "geo.placename":
        "Dubai, Abu Dhabi, Al Ain, Sharjah, Ajman, Fujairah, Ras Al Khaimah, United Arab Emirates",
      "geo.position": GEO.position,
      ICBM: GEO.icbm,
      coverage:
        "United Arab Emirates, India, United States, United Kingdom, Canada, Singapore, Australia, GCC",
      distribution: "global",
      rating: "general",
      "revisit-after": "3 days",
      "target-country": "AE,IN,US,GB,CA,SG,AU,SA,QA,OM,BH,KW",
    },
  };
}

export default async function IndianPassportPhotoPage() {
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
          content={indiaPassportData}
          specCode="india-passport"
          title={data.h1}
        />
        <GeoSummaryBox pageData={data} />
        <section aria-labelledby="locations-compliance" className="bg-slate-50">
          <div className="mx-auto max-w-6xl px-4 pb-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
              <div className="border-s-4 border-primary px-4 py-3.5 sm:px-5">
                <h2
                  id="locations-compliance"
                  className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg"
                >
                  {indiaPassportLocations.heading}
                </h2>
              </div>
              <div className="grid gap-px border-t border-slate-100 bg-slate-100 lg:grid-cols-2">
                <div className="bg-white px-4 py-4 sm:px-5">
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    {indiaPassportLocations.globalTitle}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-snug text-slate-900">
                    {indiaPassportLocations.globalBody}
                  </p>
                </div>
                <div className="bg-white px-4 py-4 sm:px-5">
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    {indiaPassportLocations.uaeTitle}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {indiaPassportLocations.hubs.map((hub) => (
                      <li
                        key={hub.place}
                        className="text-sm font-medium leading-snug text-slate-900"
                      >
                        <span className="font-semibold">{hub.place}:</span>{" "}
                        {hub.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
        <EmiratesIdGuide content={indiaPassportData} showOfficialSpecs={false} />
        <EmiratesIdHowItWorks content={indiaPassportData} />
        <EmiratesIdPricing
          locale={locale}
          pricing={dictionary.pricing}
          specCode="india-passport"
          heading={{
            eyebrow: indiaPassportData.pricingEyebrow,
            title: indiaPassportData.pricingTitle,
            subtitle: indiaPassportData.pricingSubtitle,
          }}
          packageCopy={indiaPassportPackageCopy}
        />
        <FaqSection
          items={indiaPassportData.faq}
          eyebrow="Indian passport FAQ"
          title={indiaPassportData.faqTitle}
          subtitle={indiaPassportData.faqSubtitle}
        />
      </main>

      <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <RelatedLinks
          links={getUaeCoreCrossLinks("india-passport-photo")}
          heading="UAE filings use a different portrait"
          subtitle="An Indian booklet at Alhind Tours & Travels is a 51 mm square. Emirates ID, Dubai visas, MOHRE residency, and Emirati passports keep their own sizes."
          showMakePhotoCtas={false}
        />
      </div>
      <RelatedDocuments currentSlug="india-passport-photo" />
      <Footer locale={locale} dictionary={dictionary} homeHref="/" />
    </div>
  );
}
