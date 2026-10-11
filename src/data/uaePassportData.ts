import type { EmiratesIdPageContent } from "@/data/emiratesIdData";

export interface UaePassportPageContent extends EmiratesIdPageContent {
  breadcrumbLabel: string;
  beforeAlt: string;
  beforeSrc?: string;
  afterSrc?: string;
  afterAlt: string;
  afterAspectClass: string;
  afterSizeLabel: string;
  afterCaption: string;
  trustPills: [string, string, string];
  howTitle: string;
  howIntro: string;
  specsHeading: string;
  dosHeading: string;
  dosIntro: string;
  faqTitle: string;
  faqSubtitle: string;
  pricingEyebrow: string;
  pricingTitle: string;
  pricingSubtitle: string;
}

const PASSPORT_GUIDE =
  "https://u.ae/en/information-and-services/passports-and-traveling/emirati-passport";

export const uaePassportData: UaePassportPageContent = {
  title: "UAE Passport Photo Maker",
  subtitle:
    "Prepare a white-background portrait for an Emirati passport renewal. The biometric size is 40 × 60 mm, with open eyes and a face crop you can download the same day.",
  specifications: [
    {
      id: "size",
      label: "Print size",
      value: "40 × 60 mm",
    },
    {
      id: "background",
      label: "Backdrop",
      value: "Plain white, with no border or printed frame",
    },
    {
      id: "headHeight",
      label: "Face height",
      value: "Chin-to-crown about 42–48 mm",
    },
    {
      id: "ageLimit",
      label: "Recency",
      value: "Taken in the last 6 months",
    },
  ],
  lastUpdated: "October 2026",
  reviewedBy: "Federal Passport Authority notes",
  officialSpecs: [
    {
      id: "size",
      label: "Print size",
      value: "40 × 60 mm",
    },
    {
      id: "background",
      label: "Backdrop",
      value: "White, unframed",
    },
    {
      id: "headRatio",
      label: "Face height",
      value: "Chin to crown, 42–48 mm",
    },
    {
      id: "expression",
      label: "Pose",
      value: "Square on, eyes open",
    },
  ],
  acceptedExamples: [
    {
      id: "daylight",
      title: "Booklet light, no chin shade",
      alt: "Emirati passport portrait with daylight across the face and no shade under the chin",
      src: "/guidelines/guideline-lighting.jpg",
      accepted: true,
    },
    {
      id: "hijab-edges",
      title: "Ghutra or hijab, face outline clear",
      alt: "Citizen passport portrait in a hijab with the chin, cheeks, and forehead still visible",
      src: "/guidelines/guideline-hijab.jpg",
      accepted: true,
    },
    {
      id: "straight-gaze",
      title: "Square to the booklet camera",
      alt: "Emirati passport portrait facing square on, mouth closed, both eyes open",
      src: "/guidelines/guideline-neutral.jpg",
      accepted: true,
    },
  ],
  rejectedExamples: [
    {
      id: "grin",
      title: "A grin in the booklet",
      alt: "Grinning portrait that an Emirati passport renewal will not accept",
      src: "/guidelines/guideline-smile.jpg",
      accepted: false,
    },
    {
      id: "cheek-shade",
      title: "One cheek lost in shade",
      alt: "Passport portrait with shade across one cheek, which a booklet counter returns",
      src: "/guidelines/guideline-shadow.jpg",
      accepted: false,
    },
    {
      id: "tinted-lenses",
      title: "Sunglasses in a passport file",
      alt: "Sunglasses covering the eyes on a portrait that cannot go into an Emirati passport",
      src: "/guidelines/guideline-sunglasses.jpg",
      accepted: false,
    },
  ],
  steps: [
    {
      id: "capture",
      title: "Stand for a citizen renewal",
      body: "Face the phone in daylight, hands below the shoulders, with a little space above the head for the 40×60 mm booklet crop.",
    },
    {
      id: "fit",
      title: "Set the chin-to-crown crop",
      body: "Upload the picture. The editor lays a white field, drops any printed border, and places the chin-to-crown span inside a 40×60 mm frame.",
    },
    {
      id: "file",
      title: "Take it to the passport office",
      body: "Download the portrait for a Federal Passport Authority counter, a citizen typing centre, or a UAE embassy renewal.",
    },
  ],
  faq: [
    {
      id: "print-size",
      question: "What does the Federal Passport Authority print for an Emirati booklet?",
      answer:
        "Citizen renewals use a 40×60 mm portrait. The field is white and the file has no printed border around the head.",
      source: {
        label: "UAE government passport service",
        href: PASSPORT_GUIDE,
      },
    },
    {
      id: "hands-backdrop",
      question: "Can a kandora, ghutra, or the room behind me stay in the booklet photo?",
      answer:
        "A kandora and ghutra may stay when the face outline is clear. Hands stay below the shoulders. A doorway or patterned wall is replaced with white before the passport office sees the file.",
      source: {
        label: "UAE government passport service",
        href: PASSPORT_GUIDE,
      },
    },
    {
      id: "how-recent",
      question: "Can I scan the portrait already inside my Emirati passport?",
      answer:
        "No. A renewal needs a new capture. The picture printed in the current booklet is too old, and a scan of it looks soft at the passport counter.",
      source: {
        label: "UAE government passport service",
        href: PASSPORT_GUIDE,
      },
    },
    {
      id: "headwear",
      question: "Are sunglasses or a cap allowed on a citizen passport portrait?",
      answer:
        "No. Sunglasses and caps come off. Everyday clear glasses stay only when both irises are visible and the lenses carry no flash spot. A hijab is fine when the forehead and chin stay in frame.",
      source: {
        label: "UAE government passport service",
        href: PASSPORT_GUIDE,
      },
    },
    {
      id: "face-fill",
      question: "How tall should the head be inside the 40×60 mm passport frame?",
      answer:
        "Measure about 42–48 mm from the chin to the crown inside the 40×60 mm frame. Face the lens squarely, with both edges of the face visible and no hair across the eyes.",
      source: {
        label: "UAE government passport service",
        href: PASSPORT_GUIDE,
      },
    },
    {
      id: "passport-rejection",
      question: "Why does a passport counter return a citizen portrait?",
      answer:
        "Counters return a file that still has a border, closed eyes, red-eye, or a coloured wall. That check belongs to the passport office, not to an Emirates ID card renewal.",
      source: {
        label: "UAE government passport service",
        href: PASSPORT_GUIDE,
      },
    },
  ],
  breadcrumbLabel: "UAE Passport Photo",
  beforeAlt: "Phone selfie of the upper body before it is cropped for a UAE passport",
  afterAlt: "Finished UAE passport portrait on white, sized 40 by 60 millimetres",
  afterAspectClass: "aspect-[40/60]",
  afterSizeLabel: "40 × 60 mm",
  afterCaption: "Passport portrait",
  trustPills: [
    "Size: 40 × 60 mm",
    "White backdrop, no frame",
    "ICAO face crop",
  ],
  howTitle: "From selfie to passport file",
  howIntro:
    "Three moves from a daylight picture to the 40×60 mm portrait a Federal Passport Authority counter accepts.",
  specsHeading: "Passport photo measurements",
  dosHeading: "What a passport counter accepts",
  dosIntro:
    "These examples are for an Emirati booklet, not an ID card. Look at chin shade, national dress, and whether the eyes stay open.",
  faqTitle: "Emirati passport photo questions",
  faqSubtitle:
    "Booklet size, kandora and ghutra, and the mistakes a passport counter sends back.",
  pricingEyebrow: "Passport file pricing",
  pricingTitle: "Choose an Emirati passport photo package",
  pricingSubtitle:
    "A one-time payment in dirhams. You leave with a 40×60 mm portrait for a citizen passport renewal.",
};

export const uaePassportPackageCopy = {
  basic: [
    "40×60 mm white portrait for an Emirati booklet",
    "Printed border removed and the chin-to-crown crop set",
    "Digital file for a passport office or an embassy renewal",
    "Print sheet if the counter still asks for paper",
  ],
  standard: [
    "The booklet file is ready while a reviewer inspects it",
    "A person checks kandora or ghutra edges, open eyes, and cheek shade",
    "Rework if a passport counter would refuse the portrait",
  ],
  notice:
    "Passport reviews that arrive after 5:00 PM start at 8:00 AM. You can still download the booklet file overnight. If it misses the 40×60 mm rules, the reviewer writes on WhatsApp or email.",
  note: "Prepare the passport portrait first. The dirham charge appears only after that booklet file is ready.",
};
