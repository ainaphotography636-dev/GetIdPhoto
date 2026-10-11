import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

type DocumentFaqItem = {
  question: string;
  answer: string;
  source?: { label: string; href: string };
};

export interface PageSpec {
  slug: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  authority: string;
  dimensions: string;
  background: string;
  targetAudience: string;
  keyRules: string[];
  canonical: string;
  overviewLead: string;
  areaServed: string[];
}

export const uaePagesData: Record<string, PageSpec> = {
  "uae-emirates-id-photo": {
    slug: "uae-emirates-id-photo",
    h1: "Online UAE Emirates ID Photo Maker (ICP Compliant)",
    metaTitle: "Emirates ID Photo Maker Online | Official ICP Specifications",
    metaDescription:
      "Create official ICP Smart Services compliant Emirates ID photos online in seconds. Sized 35x45 mm on plain white background. 100% acceptance guarantee.",
    authority:
      "Federal Authority for Identity, Citizenship, Customs & Port Security (ICP)",
    dimensions: "35x45 mm (827x1063 px at 600 DPI)",
    background: "Plain, uniform white background",
    targetAudience:
      "UAE residents, expats, and citizens renewing or applying for Emirates ID.",
    keyRules: [
      "Head height 70-80% of frame",
      "No smiling or mouth open",
      "Hijab allowed with clear facial boundary",
    ],
    canonical: "https://www.getidphotoai.ae/uae-emirates-id-photo",
    overviewLead:
      "ICP Smart Services checks an Emirates ID card portrait at 35×45 mm on a plain white field, with the head filling most of the card and the mouth shut.",
    areaServed: [
      "United Arab Emirates",
      "Dubai",
      "Abu Dhabi",
      "Sharjah",
      "Ajman",
      "Ras Al Khaimah",
      "Fujairah",
      "Umm Al Quwain",
    ],
  },
  "dubai-visa-photo": {
    slug: "dubai-visa-photo",
    h1: "Dubai Visa Photo Maker",
    metaTitle: "Dubai Visa Photo Size & Background Removal AI | GDRFA Compliant",
    metaDescription:
      "Format selfies into official Dubai residency and tourist visa photos meeting GDRFA requirements. Fast 43x55 mm / 35x45 mm cropping with instant background removal.",
    authority:
      "General Directorate of Residency and Foreigners Affairs (GDRFA Dubai)",
    dimensions: "43x55 mm (or 35x45 mm for online GDRFA portals)",
    background: "Pure white backdrop without shadows",
    targetAudience:
      "Expats applying for Dubai employment visas, family residency, or freelance permits.",
    keyRules: [
      "Recent photo within 6 months",
      "No reflections on glasses",
      "High contrast with background",
    ],
    canonical: "https://www.getidphotoai.ae/dubai-visa-photo",
    overviewLead:
      "GDRFA Dubai reviews entry permits, residence renewals, and family sponsorship on a pure white portrait, printed at 43×55 mm or uploaded at 35×45 mm.",
    areaServed: ["Dubai"],
  },
  "uae-visa-photo": {
    slug: "uae-visa-photo",
    h1: "UAE Residency Visa Photo Maker (MOHRE & ICP)",
    metaTitle: "UAE Visa Photo Maker Online | Sharjah, Abu Dhabi & All Emirates",
    metaDescription:
      "Generate government-compliant UAE residency visa photos online for Abu Dhabi, Sharjah, Ajman, and Northern Emirates. Meets all MOHRE & ICP portal standards.",
    authority: "Ministry of Human Resources & Emiratisation (MOHRE) & ICP",
    dimensions: "35x45 mm / 40x60 mm options",
    background: "White or light grey according to submission portal",
    targetAudience:
      "Expats working or living in Abu Dhabi, Sharjah, Ajman, RAK, Fujairah, and UAQ.",
    keyRules: [
      "Eyes clearly visible and open",
      "Neutral facial expression",
      "Uniform facial lighting",
    ],
    canonical: "https://www.getidphotoai.ae/uae-visa-photo",
    overviewLead:
      "MOHRE work-permit desks, and residency portals in Abu Dhabi, Sharjah, and the northern emirates, take 35×45 mm or 40×60 mm on white or light grey.",
    areaServed: [
      "Abu Dhabi",
      "Sharjah",
      "Ajman",
      "Ras Al Khaimah",
      "Fujairah",
      "Umm Al Quwain",
    ],
  },
  "uae-passport-photo": {
    slug: "uae-passport-photo",
    h1: "Emirati Passport Photo Maker (UAE Citizens)",
    metaTitle: "UAE Passport Photo Maker Online | Official Emirati Biometric Size",
    metaDescription:
      "Convert selfies into official UAE passport biometric photos meeting strict Emirati citizenship renewal rules. Fast AI cropping and instant download.",
    authority: "UAE Ministry of Interior & Federal Passport Authority",
    dimensions: "40x60 mm (Official UAE Passport Biometric standard)",
    background: "Crisp white studio background",
    targetAudience:
      "UAE National citizens renewing Emirati passports online or via typing centers.",
    keyRules: [
      "Kandora and Ghutra/Egal permitted",
      "Full face visibility without shadows",
      "Biometric facial scaling",
    ],
    canonical: "https://www.getidphotoai.ae/uae-passport-photo",
    overviewLead:
      "The Federal Passport Authority prints an Emirati citizen portrait at 40×60 mm on a crisp white field, and allows a kandora or ghutra when the full face stays visible.",
    areaServed: ["United Arab Emirates"],
  },
};

export function pageSpecMetadata(spec: PageSpec): Metadata {
  return {
    title: { absolute: spec.metaTitle },
    description: spec.metaDescription,
    alternates: { canonical: spec.canonical },
    openGraph: {
      title: spec.metaTitle,
      description: spec.metaDescription,
      url: spec.canonical,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_AE",
    },
  };
}

export function documentPageJsonLd(
  data: PageSpec,
  faq: DocumentFaqItem[],
  offerUrl: string,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "FAQPage",
        "@id": `${data.canonical}#faq`,
        url: data.canonical,
        name: data.h1,
        inLanguage: "en-AE",
        areaServed: data.areaServed.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        about: {
          "@type": "GovernmentOrganization",
          name: data.authority,
          description: data.dimensions,
        },
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.source
              ? `${item.answer} Official source: ${item.source.label} (${item.source.href})`
              : item.answer,
          },
        })),
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${data.canonical}#app`,
        name: data.h1,
        url: data.canonical,
        description: data.metaDescription,
        applicationCategory: "PhotographyApplication",
        applicationSubCategory: data.authority,
        areaServed: data.areaServed.map((name) => ({
          "@type": "AdministrativeArea",
          name,
        })),
        operatingSystem: "Web",
        browserRequirements: "Requires JavaScript and a modern browser",
        featureList: [data.dimensions, data.background, ...data.keyRules],
        additionalProperty: [
          {
            "@type": "PropertyValue",
            name: "authority",
            value: data.authority,
          },
          {
            "@type": "PropertyValue",
            name: "dimensions",
            value: data.dimensions,
          },
        ],
        offers: {
          "@type": "Offer",
          price: "20.00",
          priceCurrency: "AED",
          availability: "https://schema.org/InStock",
          url: offerUrl,
        },
        provider: {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_URL,
        },
      },
    ],
  };
}
