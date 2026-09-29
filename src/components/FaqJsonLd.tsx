import type { FaqItem } from "@/i18n/types";
import { SITE_URL } from "@/lib/seo";
import type { Locale } from "@/i18n/config";

type FaqJsonLdProps = {
  items: FaqItem[];
  locale?: Locale;
};

/**
 * Server-rendered FAQPage JSON-LD for Google rich results.
 */
export default function FaqJsonLd({ items, locale = "en" }: FaqJsonLdProps) {
  const pageUrl = locale === "ar" ? `${SITE_URL}/ar` : SITE_URL;

  const payload = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}/#faq`,
    inLanguage: locale === "ar" ? "ar-AE" : "en-AE",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
