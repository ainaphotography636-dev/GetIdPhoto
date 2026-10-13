import type { UaePassportPageContent } from "@/data/uaePassportData";
import type { PageSpec } from "@/data/uaePagesData";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

const ALHIND_PHOTO_GUIDE =
  "https://www.cgidubai.gov.in/content/ICAO-Photograph-guideline-for-e-Passport-1.pdf";

export const INDIA_PASSPORT_PATH = "/india-passport-photo";
export const INDIA_PASSPORT_CANONICAL = `${SITE_URL}${INDIA_PASSPORT_PATH}`;
export const INDIA_PASSPORT_TITLE =
  "Indian Passport Photo Maker Online (51x51mm & 630x810px) | UAE & Worldwide";
export const INDIA_PASSPORT_DESCRIPTION =
  "Create official Indian passport & visa photos online for Alhind centers across UAE (Dubai, Abu Dhabi, Sharjah), Indian Consulates worldwide, and Passport Seva digital uploads.";
export const INDIA_PASSPORT_OG_TITLE = INDIA_PASSPORT_TITLE;
export const INDIA_PASSPORT_OG_DESCRIPTION = INDIA_PASSPORT_DESCRIPTION;
export const INDIA_PASSPORT_KEYWORDS = [
  "indian passport photo maker online",
  "51x51mm photo",
  "630x810 pixels",
  "alhind passport photo dubai",
  "alhind abu dhabi",
  "passport seva photo crop",
  "indian visa photo maker",
];
export const INDIA_PASSPORT_OG_IMAGE = "/og/indian-passport-photo.jpg";

const OFFER_PRICE = "20.00";

export const indiaPassportPageSpec: PageSpec = {
  slug: "india-passport-photo",
  h1: "Indian Passport Photo Maker",
  metaTitle: INDIA_PASSPORT_TITLE,
  metaDescription: INDIA_PASSPORT_DESCRIPTION,
  authority:
    "Alhind Tours & Travels · Consulate General of India / Embassy of India",
  dimensions: "51×51 mm Alhind print · 630×810 px CGI portal",
  background: "Plain white background",
  targetAudience:
    "Applicants filing at Alhind Tours & Travels centers in the UAE, or at an Indian consulate, high commission, or VFS Global center worldwide.",
  keyRules: [
    "Chin-to-crown about 25–35 mm",
    "Natural look, mouth closed",
    "Religious headwear only if both face edges show",
  ],
  canonical: INDIA_PASSPORT_CANONICAL,
  overviewLead:
    "Alhind Tours & Travels prints a 51×51 mm square on plain white for a new passport at its UAE centers. The Consulate General of India portal and Passport Seva take a 630×810 pixel JPG, from 20 KB to 100 KB. The digital set is AED 20.",
  areaServed: [
    "United Arab Emirates",
    "Dubai",
    "Abu Dhabi",
    "Al Ain",
    "Sharjah",
    "Ajman",
    "Fujairah",
    "Ras Al Khaimah",
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Singapore",
    "Australia",
  ],
};

export const indiaPassportLocations = {
  heading: "Locations & Compliance",
  globalTitle: "Global coverage",
  globalBody:
    "Compliant with Indian Consulates, High Commissions, and VFS Global centers worldwide, including the USA, UK, Canada, the Gulf and wider GCC, Singapore, and Australia.",
  uaeTitle: "UAE local coverage (Alhind service hubs)",
  hubs: [
    {
      place: "Dubai",
      detail:
        "Alhind Tours & Travels centers in Karama, Deira, and Al Qusais.",
    },
    {
      place: "Abu Dhabi & Al Ain",
      detail: "Official Alhind consular submission branches.",
    },
    {
      place: "Sharjah, Ajman, Fujairah, Ras Al Khaimah",
      detail: "Local submission centers.",
    },
  ],
};

export const indiaPassportData: UaePassportPageContent = {
  title: "Indian Passport Photo Maker",
  subheading:
    "for a new passport application through Alhind Tours & Travels",
  subtitle:
    "Make an official Indian passport photo that meets Alhind Tours & Travels, Passport Seva, and Consulate General of India standards. Centers in Dubai, Abu Dhabi, Sharjah, Ajman, and Fujairah take a 51 × 51 mm print. The Embassy of India digital file is 630 × 810 px.",
  specifications: [
    {
      id: "size",
      label: "Print size",
      value: "51 × 51 mm at Alhind centers, or 630 × 810 px on the CGI portal",
    },
    {
      id: "background",
      label: "Backdrop",
      value: "Plain white for the Alhind Tours & Travels print",
    },
    {
      id: "headHeight",
      label: "Face height",
      value: "Chin to crown about 25–35 mm",
    },
    {
      id: "ageLimit",
      label: "Capture",
      value: "A new picture, not a scan of the current booklet",
    },
  ],
  lastUpdated: "October 2026",
  reviewedBy: "Consulate General of India photograph notes",
  officialSpecs: [
    {
      id: "size",
      label: "Sizes",
      value: "51 × 51 mm print, or 630 × 810 px upload",
    },
    {
      id: "background",
      label: "Backdrop",
      value: "Plain white",
    },
    {
      id: "headRatio",
      label: "Face height",
      value: "Chin to crown, 25–35 mm",
    },
    {
      id: "expression",
      label: "Pose",
      value: "Front view, eyes open",
    },
  ],
  acceptedExamples: [
    {
      id: "even-light",
      title: "Even light across the square",
      alt: "Indian passport photograph with even light on the face and no shade along the jaw",
      src: "/guidelines/guideline-lighting.jpg",
      accepted: true,
    },
    {
      id: "religious-cover",
      title: "Turban or dupatta, cheeks still in frame",
      alt: "Square booklet photograph with religious headwear and both edges of the face visible",
      src: "/guidelines/guideline-hijab.jpg",
      accepted: true,
    },
    {
      id: "closed-mouth",
      title: "Front view, mouth closed",
      alt: "Indian passport photograph facing the lens with a closed mouth and both eyes open",
      src: "/guidelines/guideline-neutral.jpg",
      accepted: true,
    },
  ],
  rejectedExamples: [
    {
      id: "teeth",
      title: "Teeth showing in the square",
      alt: "Smiling photograph with teeth visible, which an Indian mission desk will not paste",
      src: "/guidelines/guideline-smile.jpg",
      accepted: false,
    },
    {
      id: "jaw-shadow",
      title: "Shade under the jaw",
      alt: "Passport square with a dark shadow under the jaw on an otherwise pale field",
      src: "/guidelines/guideline-shadow.jpg",
      accepted: false,
    },
    {
      id: "tinted",
      title: "Tinted lenses on a booklet print",
      alt: "Dark lenses covering the eyes on a square that an Indian mission will refuse",
      src: "/guidelines/guideline-sunglasses.jpg",
      accepted: false,
    },
  ],
  steps: [
    {
      id: "capture",
      title: "Stand for a square booklet print",
      body: "Face the phone in even light, shoulders down, with a dark top so the pale field can separate from the shirt. Leave a little space above the hair.",
    },
    {
      id: "fit",
      title: "Centre the head in 51 mm",
      body: "Upload the picture. The editor sets a white field and places the chin-to-crown span, about 25–35 mm, inside a 51 × 51 mm square for Alhind Tours & Travels.",
    },
    {
      id: "file",
      title: "Save the print and the portal file",
      body: "AED 20 includes a 4×6 print sheet of 51 × 51 mm photos for Alhind centers, plus a 630 × 810 pixel JPG (20 KB to 100 KB) for Passport Seva and the Consulate General of India portal. The download is ready in under 60 seconds.",
    },
  ],
  faq: [
    {
      id: "print-size",
      question:
        "Which size do Alhind centers print, and which file does the CGI portal take?",
      answer:
        "Alhind Tours & Travels centers in Dubai, Abu Dhabi, Sharjah, Ajman, and Fujairah take a 51 × 51 mm (2 × 2 inch) square on a plain white background. Passport Seva and the Consulate General of India portal take 630 × 810 pixels, a JPG between 20 KB and 100 KB.",
      source: {
        label: "Alhind Tours & Travels passport photo guideline",
        href: ALHIND_PHOTO_GUIDE,
      },
    },
    {
      id: "pale-field",
      question: "What background does an Alhind Tours & Travels print use?",
      answer:
        "The printout is a square on a plain white background. A doorway, a curtain, or a coloured wall is cleared before that 51 × 51 mm file is saved for the center.",
      source: {
        label: "Alhind Tours & Travels passport photo guideline",
        href: ALHIND_PHOTO_GUIDE,
      },
    },
    {
      id: "psk-capture",
      question:
        "Will a Passport Seva Kendra in India use a picture I made at home?",
      answer:
        "Often no. Many fresh and reissue visits are photographed at the kendra. Bring this square when Alhind Tours & Travels asks for a print with a new passport application in the UAE.",
      source: {
        label: "Alhind Tours & Travels passport photo guideline",
        href: ALHIND_PHOTO_GUIDE,
      },
    },
    {
      id: "headwear-glasses",
      question:
        "Can a turban, hijab, or glasses stay in the Indian booklet square?",
      answer:
        "A turban, hijab, or other religious cover may stay when the chin, the forehead, and both edges of the face remain visible. Caps come off. Clear glasses stay only when the frames do not cut across the eyes and the lenses have no bright reflection.",
      source: {
        label: "Alhind Tours & Travels passport photo guideline",
        href: ALHIND_PHOTO_GUIDE,
      },
    },
    {
      id: "face-height",
      question: "What chin-to-crown span belongs in the Indian 51 mm square?",
      answer:
        "Keep about 25–35 mm from the chin to the crown, with the head in the middle of the square. Hair should not cross the eyes, and both sides of the face should stay inside the frame.",
      source: {
        label: "Alhind Tours & Travels passport photo guideline",
        href: ALHIND_PHOTO_GUIDE,
      },
    },
    {
      id: "mission-return",
      question: "Why does a mission desk send an Indian passport print back?",
      answer:
        "Alhind Tours & Travels returns a print that is not the 51 mm square or still shows a patterned wall. A Passport Seva or Consulate General of India upload fails when it is not a 630 × 810 pixel JPG inside 20 KB to 100 KB, or when the eyes are closed.",
      source: {
        label: "Alhind Tours & Travels passport photo guideline",
        href: ALHIND_PHOTO_GUIDE,
      },
    },
    {
      id: "offer-price",
      question: "What does the AED 20 Indian passport photo include?",
      answer:
        "AED 20 is the Standard Digital price. It includes a printed 4×6 sheet of 51 × 51 mm photos for Alhind Tours & Travels and a 630 × 810 px JPG for the Passport Seva and Consulate General of India portal. The file downloads in under 60 seconds.",
      source: {
        label: "Alhind Tours & Travels passport photo guideline",
        href: ALHIND_PHOTO_GUIDE,
      },
    },
  ],
  breadcrumbLabel: "Indian Passport Photo",
  breadcrumbParent: null,
  beforeAlt:
    "Casual upper-body phone picture waiting to become an Indian passport square",
  beforeSrc: "/uae-visa-before-2.jpg",
  afterSrc: "/uae-visa-after-3.jpg",
  afterAlt:
    "Finished Indian passport photograph on a pale field, sized 51 by 51 millimetres",
  afterAspectClass: "aspect-square",
  afterSizeLabel: "51 × 51 mm",
  afterCaption: "Passport square",
  trustPills: [
    "Alhind centers: 51 × 51 mm",
    "CGI portal: 630 × 810 px",
    "Download in under 60 seconds",
  ],
  howTitle: "From a phone picture to a 51 mm square",
  howIntro:
    "Three steps from an even-lit picture to the square Alhind Tours & Travels prints, plus the file the Consulate General of India portal accepts.",
  specsHeading: "MEA photograph measurements",
  dosHeading: "What a mission desk keeps",
  dosIntro:
    "These samples are for an Indian passport square used at Alhind Tours & Travels. Watch the pale field, religious headwear, and whether the mouth stays closed.",
  faqTitle: "Indian passport photograph questions",
  faqSubtitle:
    "Alhind center prints, the Consulate General of India portal, and the AED 20 digital set.",
  pricingEyebrow: "AED 20 offer",
  pricingTitle: "Official Indian passport photos for AED 20",
  pricingSubtitle:
    "Standard Digital is AED 20. That set includes the 51 × 51 mm print sheet for Alhind Tours & Travels and the 630 × 810 px upload for Passport Seva.",
};

export const indiaPassportPackageCopy = {
  basic: [
    "AED 20 digital set for a new Indian passport",
    "4×6 print sheet of 51×51 mm photos for Alhind Tours & Travels",
    "630×810 px JPG for Passport Seva and the CGI portal",
    "Instant download in under 60 seconds",
  ],
  standard: [
    "The same print sheet and portal file, checked by a person",
    "A reviewer looks at open eyes, face edges, and jaw shadow",
    "Full refund if Alhind centers or CGI Dubai reject the formatting",
  ],
  notice:
    "Human checks of this square begin the morning after any upload that arrives past 17:00 Gulf time. Night downloads stay available. A miss on face height or the pale field is explained in a WhatsApp or email note.",
  note: "The AED 20 price is Standard Digital. Human Verified is shown beside it when you want a person to check the Alhind square.",
};

type IndiaFaqItem = (typeof indiaPassportData.faq)[number];

export function indiaPassportJsonLd(faq: IndiaFaqItem[]) {
  const page = indiaPassportPageSpec;
  const areas = page.areaServed.map((name) => ({
    "@type": "AdministrativeArea",
    name,
  }));
  const organization = { "@id": `${SITE_URL}/#organization` };
  const image = `${SITE_URL}${INDIA_PASSPORT_OG_IMAGE}`;
  const digitalOffer = {
    "@type": "Offer",
    name: "Standard Digital",
    price: OFFER_PRICE,
    priceCurrency: "AED",
    availability: "https://schema.org/InStock",
    url: INDIA_PASSPORT_CANONICAL,
  };
  const verifiedOffer = {
    "@type": "Offer",
    name: "Human Verified",
    price: "30.00",
    priceCurrency: "AED",
    availability: "https://schema.org/InStock",
    url: `${SITE_URL}/make-photo?specCode=india-passport&pkgId=standard`,
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${INDIA_PASSPORT_CANONICAL}#webpage`,
        url: INDIA_PASSPORT_CANONICAL,
        name: INDIA_PASSPORT_TITLE,
        description: INDIA_PASSPORT_DESCRIPTION,
        inLanguage: "en-AE",
        isPartOf: { "@id": `${SITE_URL}/#website` },
        about: { "@id": `${INDIA_PASSPORT_CANONICAL}#service` },
        primaryImageOfPage: image,
        breadcrumb: { "@id": `${INDIA_PASSPORT_CANONICAL}#breadcrumb` },
        dateModified: "2026-10-13",
        mainEntity: { "@id": `${INDIA_PASSPORT_CANONICAL}#app` },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${INDIA_PASSPORT_CANONICAL}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${SITE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Requirements",
            item: `${SITE_URL}/requirements`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Indian Passport Photo",
            item: INDIA_PASSPORT_CANONICAL,
          },
        ],
      },
      {
        "@type": "Service",
        "@id": `${INDIA_PASSPORT_CANONICAL}#service`,
        name: "Indian passport photo for Alhind Tours & Travels",
        serviceType: "Indian passport and consular photograph",
        url: INDIA_PASSPORT_CANONICAL,
        description: INDIA_PASSPORT_DESCRIPTION,
        provider: organization,
        areaServed: areas,
        audience: {
          "@type": "Audience",
          audienceType: page.targetAudience,
        },
        offers: [digitalOffer, verifiedOffer],
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${INDIA_PASSPORT_CANONICAL}#app`,
        name: "GetIDPhotoAI Indian Passport Photo Maker",
        applicationCategory: "BusinessApplication",
        applicationSubCategory: page.authority,
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript and a modern browser",
        url: INDIA_PASSPORT_CANONICAL,
        image,
        description: INDIA_PASSPORT_DESCRIPTION,
        featureList: [page.dimensions, page.background, ...page.keyRules],
        offers: digitalOffer,
        areaServed: [
          { "@type": "Country", name: "United Arab Emirates" },
          { "@type": "Country", name: "India" },
          { "@type": "AdministrativeArea", name: "Worldwide" },
        ],
        provider: organization,
      },
      {
        "@type": "LocalBusiness",
        "@id": `${INDIA_PASSPORT_CANONICAL}#local`,
        name: "GetIDPhotoAI UAE",
        url: INDIA_PASSPORT_CANONICAL,
        image,
        description:
          "Online Indian passport and visa photo generator compliant with Alhind Tours & Travels centers and CGI Dubai.",
        telephone: "+971559461415",
        email: "hello@getidphotoai.ae",
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
        areaServed: [
          "Dubai",
          "Abu Dhabi",
          "Sharjah",
          "Ajman",
          "Fujairah",
          "Ras Al Khaimah",
          "Al Ain",
        ],
        parentOrganization: organization,
      },
      {
        "@type": "Product",
        "@id": `${INDIA_PASSPORT_CANONICAL}#product`,
        name: "GetIDPhotoAI Indian Passport Photo",
        description: INDIA_PASSPORT_DESCRIPTION,
        image,
        brand: {
          "@type": "Brand",
          name: SITE_NAME,
        },
        category: "Indian passport photograph",
        offers: {
          "@type": "AggregateOffer",
          lowPrice: OFFER_PRICE,
          highPrice: "30.00",
          priceCurrency: "AED",
          offerCount: 2,
          availability: "https://schema.org/InStock",
          url: INDIA_PASSPORT_CANONICAL,
          offers: [digitalOffer, verifiedOffer],
        },
      },
      {
        "@type": "HowTo",
        "@id": `${INDIA_PASSPORT_CANONICAL}#howto`,
        name: indiaPassportData.howTitle,
        description: indiaPassportData.howIntro,
        totalTime: "PT1M",
        inLanguage: "en-AE",
        step: indiaPassportData.steps.map((step, index) => ({
          "@type": "HowToStep",
          position: index + 1,
          name: step.title,
          text: step.body,
          url: INDIA_PASSPORT_CANONICAL,
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${INDIA_PASSPORT_CANONICAL}#faq`,
        url: INDIA_PASSPORT_CANONICAL,
        name: page.h1,
        inLanguage: "en-AE",
        areaServed: areas,
        about: {
          "@type": "GovernmentOrganization",
          name: page.authority,
          description: page.dimensions,
        },
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${item.answer} Official source: ${item.source.label} (${item.source.href})`,
          },
        })),
      },
    ],
  };
}
