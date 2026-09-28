import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  SERVICE_AREAS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo";

type JsonLdProps = {
  /** Extra schemas merged into the @graph (homepage-only extras, etc.). */
  extraGraph?: Record<string, unknown>[];
};

/**
 * Injects JSON-LD for SoftwareApplication + regional Service coverage.
 * Safe for root layout — uses a single script with @graph.
 */
export default function JsonLd({ extraGraph = [] }: JsonLdProps) {
  const organization = {
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: "hello@getidphotoai.ae",
    sameAs: [SITE_URL],
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };

  const website = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-AE",
  };

  const webApplication = {
    "@type": ["SoftwareApplication", "WebApplication"],
    "@id": `${SITE_URL}/#webapp`,
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    applicationCategory: "PhotographyApplication",
    applicationSubCategory: "Passport and ID Photo Maker",
    operatingSystem: "All",
    browserRequirements: "Requires JavaScript and a modern browser",
    offers: [
      {
        "@type": "Offer",
        name: "Standard Digital",
        price: "20.00",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/make-photo?pkgId=basic`,
      },
      {
        "@type": "Offer",
        name: "Human Verified",
        price: "30.00",
        priceCurrency: "AED",
        availability: "https://schema.org/InStock",
        url: `${SITE_URL}/make-photo?pkgId=standard`,
      },
    ],
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
  };

  const service = {
    "@type": "Service",
    "@id": `${SITE_URL}/#service`,
    name: "Online AI Passport & ID Photo Service for UAE & GCC",
    description: DEFAULT_DESCRIPTION,
    provider: { "@id": `${SITE_URL}/#organization` },
    serviceType: "Passport and biometric ID photo processing",
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    audience: {
      "@type": "Audience",
      audienceType:
        "UAE residents and GCC expatriates needing passport, Emirates ID, and visa photos",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "GetIDPhotoAI packages",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Standard Digital ID Photo",
          },
          price: "20.00",
          priceCurrency: "AED",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Human Verified ID Photo",
          },
          price: "30.00",
          priceCurrency: "AED",
        },
      ],
    },
  };

  const localBusiness = {
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: SITE_NAME,
    image: `${SITE_URL}/hero-uae.jpg`,
    url: SITE_URL,
    email: "hello@getidphotoai.ae",
    telephone: "+971559461415",
    priceRange: "AED 20 – AED 30",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dubai",
      addressRegion: "Dubai",
      addressCountry: "AE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2048,
      longitude: 55.2708,
    },
    areaServed: SERVICE_AREAS.map((name) => ({
      "@type": "AdministrativeArea",
      name,
    })),
    description: DEFAULT_TITLE,
  };

  const graph = [
    organization,
    website,
    webApplication,
    service,
    localBusiness,
    ...extraGraph,
  ];

  const payload = {
    "@context": "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      // JSON-LD must be a raw string for crawlers.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
