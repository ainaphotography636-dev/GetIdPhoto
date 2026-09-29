import { allPhotoSpecs, type SpecCode } from "@/models/PhotoSpec";

/**
 * Programmatic SEO landing entries for UAE/GCC document photo pages.
 * Routes resolve to `/spec/[slug]` (e.g. `/spec/uae-passport-photo`).
 */
export type DocumentPageDef = {
  /** Flat SEO slug used in `/spec/[slug]` */
  slug: string;
  /** URL segment grouping, e.g. `uae`, `dubai` */
  country: string;
  /** Document kind label, e.g. `passport`, `emirates-id` */
  document: string;
  /** Short link label for footer / compact nav */
  shortTitle: string;
  specCode: SpecCode;
  /** Page H1 / title stem */
  title: string;
  /** Descriptive SEO anchor text for internal links */
  anchorText: string;
  /** Short meta / intro description */
  description: string;
  /** Spec codes treated as siblings / cross-links */
  relatedSpecCodes: SpecCode[];
  /** Shown in global nav / footer discovery block */
  tier: "primary" | "secondary";
};

export const DOCUMENT_PAGES: DocumentPageDef[] = [
  {
    slug: "uae-passport-photo",
    country: "uae",
    document: "passport",
    shortTitle: "UAE Passport Photo",
    specCode: "uae-passport",
    title: "UAE Passport Photo Online",
    anchorText: "UAE passport photo size & biometric requirements",
    description:
      "Create an ICP-ready UAE passport photo online with correct size, framing, and background for Dubai, Abu Dhabi, and Sharjah applications.",
    relatedSpecCodes: [
      "uae-id-card",
      "dubai-visa",
      "uae-visa",
      "uae-residence",
      "40x60-mm",
    ],
    tier: "primary",
  },
  {
    slug: "emirates-id-photo",
    country: "uae",
    document: "emirates-id",
    shortTitle: "Emirates ID Photo",
    specCode: "uae-id-card",
    title: "Emirates ID Photo Online",
    anchorText: "Emirates ID photo maker for ICP Smart Services",
    description:
      "Generate an Emirates ID card photo that matches ICP Smart Services sizing and white-background rules—ready for typing centres across the UAE.",
    relatedSpecCodes: [
      "uae-passport",
      "dubai-visa",
      "uae-residence",
      "uae-driving-license",
      "40x60-mm",
    ],
    tier: "primary",
  },
  {
    slug: "dubai-visa-photo",
    country: "dubai",
    document: "visa",
    shortTitle: "Dubai Visa Photo",
    specCode: "dubai-visa",
    title: "Dubai Visa Photo (GDRFA)",
    anchorText: "Dubai visa photo size for GDRFA applications",
    description:
      "Get a GDRFA-compliant Dubai / UAE visa photo with the required white background and biometric proportions for residency and visit visas.",
    relatedSpecCodes: [
      "uae-visa",
      "uae-evisa",
      "dubai-evisa",
      "uae-passport",
      "uae-id-card",
      "uae-residence",
    ],
    tier: "primary",
  },
  {
    slug: "uae-visa-photo",
    country: "uae",
    document: "visa",
    shortTitle: "UAE Visa Photo",
    specCode: "uae-visa",
    title: "UAE Visa Photo Online",
    anchorText: "UAE visa photo requirements & online maker",
    description:
      "Make a government-sized UAE visa photo online for residency, visit, and related submissions with AI cropping and white background.",
    relatedSpecCodes: [
      "dubai-visa",
      "uae-evisa",
      "uae-passport",
      "uae-id-card",
      "uae-residence",
    ],
    tier: "primary",
  },
  {
    slug: "uae-residence-photo",
    country: "uae",
    document: "residence",
    shortTitle: "UAE Residence Photo",
    specCode: "uae-residence",
    title: "UAE Residence Photo Online",
    anchorText: "UAE residence visa photo size guide",
    description:
      "Prepare a residence-permit photo that follows UAE biometric sizing so you can submit digitally without a studio visit.",
    relatedSpecCodes: [
      "dubai-visa",
      "uae-visa",
      "uae-id-card",
      "uae-passport",
    ],
    tier: "secondary",
  },
  {
    slug: "uae-evisa-photo",
    country: "uae",
    document: "evisa",
    shortTitle: "UAE eVisa Photo",
    specCode: "uae-evisa",
    title: "UAE eVisa Photo Online",
    anchorText: "UAE eVisa photo online with white background",
    description:
      "Create an eVisa photo sized for UAE digital visa applications with instant AI processing.",
    relatedSpecCodes: ["dubai-visa", "uae-visa", "dubai-evisa", "uae-passport"],
    tier: "secondary",
  },
  {
    slug: "40x60-mm-photo",
    country: "international",
    document: "40x60-mm",
    shortTitle: "40×60 mm Photo",
    specCode: "40x60-mm",
    title: "40×60 mm ID Photo Online",
    anchorText: "40x60 mm passport & ID photo generator",
    description:
      "Download a precise 40×60 mm biometric photo—commonly required for international and GCC document applications.",
    relatedSpecCodes: [
      "uae-passport",
      "uae-id-card",
      "dubai-visa",
      "saudiarabia-passport",
    ],
    tier: "primary",
  },
  {
    slug: "saudi-arabia-passport-photo",
    country: "saudi-arabia",
    document: "passport",
    shortTitle: "Saudi Passport Photo",
    specCode: "saudiarabia-passport",
    title: "Saudi Arabia Passport Photo Online",
    anchorText: "Saudi Arabia passport photo size online",
    description:
      "Make a Saudi passport photo to official size for GCC expatriates and UAE-based applicants.",
    relatedSpecCodes: [
      "saudiarabia-visa",
      "saudiarabia-evisa",
      "uae-passport",
      "40x60-mm",
    ],
    tier: "primary",
  },
  {
    slug: "saudi-arabia-visa-photo",
    country: "saudi-arabia",
    document: "visa",
    shortTitle: "Saudi Visa Photo",
    specCode: "saudiarabia-visa",
    title: "Saudi Arabia Visa Photo Online",
    anchorText: "Saudi visa photo requirements online maker",
    description:
      "Generate a Saudi visa photo with correct proportions for online and embassy submissions from the UAE or GCC.",
    relatedSpecCodes: [
      "saudiarabia-passport",
      "saudiarabia-evisa",
      "dubai-visa",
      "uae-visa",
    ],
    tier: "secondary",
  },
  {
    slug: "bahrain-passport-photo",
    country: "bahrain",
    document: "passport",
    shortTitle: "Bahrain Passport Photo",
    specCode: "bahrain-passport",
    title: "Bahrain Passport Photo Online",
    anchorText: "Bahrain passport photo maker for GCC expats",
    description:
      "Create a Bahrain passport photo to specification—ideal for residents and visitors applying from the UAE.",
    relatedSpecCodes: ["bahrain-visa", "uae-passport", "40x60-mm"],
    tier: "secondary",
  },
  {
    slug: "oman-passport-photo",
    country: "oman",
    document: "passport",
    shortTitle: "Oman Passport Photo",
    specCode: "oman-passport",
    title: "Oman Passport Photo Online",
    anchorText: "Oman passport photo size & online tool",
    description:
      "Get an Oman passport photo with accurate cropping and background for GCC document needs.",
    relatedSpecCodes: ["oman-visa", "uae-passport", "40x60-mm"],
    tier: "secondary",
  },
  {
    slug: "kuwait-passport-photo",
    country: "kuwait",
    document: "passport",
    shortTitle: "Kuwait Passport Photo",
    specCode: "kuwait-passport",
    title: "Kuwait Passport Photo Online",
    anchorText: "Kuwait passport photo online for GCC applicants",
    description:
      "Produce a Kuwait passport photo online with biometric framing for applications from the UAE and wider GCC.",
    relatedSpecCodes: ["kuwait-visa", "uae-passport", "40x60-mm"],
    tier: "secondary",
  },
];

export type DocumentLink = {
  href: string;
  slug: string;
  shortTitle: string;
  anchorText: string;
  title: string;
  specCode: SpecCode;
  country: string;
  document: string;
  tier: DocumentPageDef["tier"];
};

export function documentPath(page: Pick<DocumentPageDef, "slug">): string {
  return `/spec/${page.slug}`;
}

export function makePhotoHref(specCode: SpecCode): string {
  return `/make-photo?specCode=${encodeURIComponent(specCode)}`;
}

export function getDocumentPageBySlug(slug: string): DocumentPageDef | undefined {
  return DOCUMENT_PAGES.find((page) => page.slug === slug);
}

/** @deprecated Prefer getDocumentPageBySlug */
export function getDocumentPage(
  country: string,
  document: string,
): DocumentPageDef | undefined {
  return DOCUMENT_PAGES.find(
    (page) => page.country === country && page.document === document,
  );
}

export function getDocumentPageBySpecCode(
  specCode: string,
): DocumentPageDef | undefined {
  return DOCUMENT_PAGES.find((page) => page.specCode === specCode);
}

export function getPrimaryDocumentLinks(): DocumentLink[] {
  return DOCUMENT_PAGES.filter((page) => page.tier === "primary").map(
    toDocumentLink,
  );
}

export function getAllDocumentLinks(): DocumentLink[] {
  return DOCUMENT_PAGES.map(toDocumentLink);
}

export function getRelatedDocumentLinks(
  current: DocumentPageDef,
  limit = 6,
): DocumentLink[] {
  const bySpec = new Map(
    DOCUMENT_PAGES.map((page) => [page.specCode, page] as const),
  );

  const related: DocumentPageDef[] = [];
  for (const code of current.relatedSpecCodes) {
    const page = bySpec.get(code);
    if (page && page.slug !== current.slug) {
      related.push(page);
    }
  }

  for (const page of DOCUMENT_PAGES) {
    if (
      page.country === current.country &&
      page.slug !== current.slug &&
      !related.some((item) => item.specCode === page.specCode)
    ) {
      related.push(page);
    }
  }

  return related.slice(0, limit).map(toDocumentLink);
}

export function getSpecSnapshot(specCode: SpecCode) {
  return allPhotoSpecs[specCode];
}

export function getStaticDocumentParams(): Array<{ slug: string }> {
  return DOCUMENT_PAGES.map((page) => ({ slug: page.slug }));
}

function toDocumentLink(page: DocumentPageDef): DocumentLink {
  return {
    href: documentPath(page),
    slug: page.slug,
    shortTitle: page.shortTitle,
    anchorText: page.anchorText,
    title: page.title,
    specCode: page.specCode,
    country: page.country,
    document: page.document,
    tier: page.tier,
  };
}
