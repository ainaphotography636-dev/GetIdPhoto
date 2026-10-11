import type { UaePassportPageContent } from "@/data/uaePassportData";

const GDRFA_SMART = "https://smart.gdrfad.gov.ae/en/";
const GDRFA_HOME = "https://www.gdrfad.gov.ae/en";

export const dubaiVisaData: UaePassportPageContent = {
  title: "Dubai Visa Photo Maker",
  subtitle:
    "Prepare the portrait GDRFA Dubai asks for on an entry permit, a residence renewal, or a family sponsorship. Print size is 43 × 55 mm, and online portals also accept 35 × 45 mm.",
  specifications: [
    {
      id: "size",
      label: "GDRFA print",
      value: "4.3 × 5.5 cm",
    },
    {
      id: "background",
      label: "Backdrop",
      value: "White only. Cream and grey are returned.",
    },
    {
      id: "headHeight",
      label: "Face share",
      value: "Head fills most of the shot",
    },
    {
      id: "ageLimit",
      label: "Age of the shot",
      value: "No older than six months",
    },
  ],
  lastUpdated: "October 2026",
  reviewedBy: "GDRFA submission notes",
  officialSpecs: [
    {
      id: "size",
      label: "GDRFA print",
      value: "4.3 × 5.5 cm",
    },
    {
      id: "background",
      label: "Backdrop",
      value: "White, no tint",
    },
    {
      id: "headRatio",
      label: "Face share",
      value: "Head fills most of the shot",
    },
    {
      id: "expression",
      label: "Manner",
      value: "Calm mouth, direct look",
    },
  ],
  acceptedExamples: [
    {
      id: "finished-white",
      title: "Finished file, white field",
      alt: "Finished Dubai visa portrait on a plain white background with both ears visible",
      src: "/guidelines/dubai-accepted-finished.jpg",
      accepted: true,
    },
    {
      id: "ears-clear",
      title: "Both ears clear of hair",
      alt: "Finished Dubai visa portrait of a man on white with both ears visible",
      src: "/guidelines/dubai-accepted-man.jpg",
      accepted: true,
    },
    {
      id: "mouth-shut",
      title: "Mouth shut, shoulders level",
      alt: "Finished Dubai visa portrait of a woman on white with a closed mouth and both ears visible",
      src: "/guidelines/dubai-accepted-woman.jpg",
      accepted: true,
    },
  ],
  rejectedExamples: [
    {
      id: "face-covered",
      title: "Cloth across the face",
      alt: "Portrait with cloth covering part of the face, which GDRFA will not accept",
      src: "/guidelines/guideline-covered.jpg",
      accepted: false,
    },
    {
      id: "grinning",
      title: "A wide grin",
      alt: "Grinning portrait that fails a Dubai visa expression check",
      src: "/guidelines/guideline-smile.jpg",
      accepted: false,
    },
    {
      id: "shades",
      title: "Shades over the eyes",
      alt: "Portrait in sunglasses, refused for a GDRFA visa photo",
      src: "/guidelines/guideline-sunglasses.jpg",
      accepted: false,
    },
  ],
  steps: [
    {
      id: "balcony",
      title: "Shoot in open shade",
      body: "Take the picture outdoors in open shade or indoors beside a window. Avoid a ceiling lamp that throws a shadow under the eyes.",
    },
    {
      id: "gdrfa-crop",
      title: "Crop for the Dubai portal",
      body: "Upload it here. The editor clears the background to white and frames the head for a 4.3 × 5.5 cm GDRFA portrait.",
    },
    {
      id: "amer",
      title: "Send it to GDRFA or Amer",
      body: "Save the colour file for the GDRFA website, the Dubai Now app, or a printed copy if an Amer centre asks for one.",
    },
  ],
  faq: [
    {
      id: "portal-pixels",
      question: "What pixel size does the GDRFA Dubai upload expect?",
      answer:
        "Typing centres print 4.3 × 5.5 cm. For the online form, keep a colour file at least about 300 × 369 pixels so the face is not soft. A tiny thumbnail fails the portal even when the pose is fine.",
      source: {
        label: "GDRFA smart services",
        href: GDRFA_SMART,
      },
    },
    {
      id: "amer-print",
      question: "Do Amer centres in Dubai still want a printed photo?",
      answer:
        "Many residence steps are digital. If the centre asks for paper, bring a 4.3 × 5.5 cm colour print on photo paper, not a home-printer sheet with a white border added around it.",
      source: {
        label: "GDRFA Dubai",
        href: GDRFA_HOME,
      },
    },
    {
      id: "sponsored",
      question: "Whose picture goes on a family sponsorship in Dubai?",
      answer:
        "Each sponsored person needs their own recent portrait, including a spouse or child. You cannot reuse the sponsor’s photo or an old residence-visa scan.",
      source: {
        label: "GDRFA Dubai",
        href: GDRFA_HOME,
      },
    },
    {
      id: "glasses-dubai",
      question: "Should I remove glasses for a Dubai visa photo?",
      answer:
        "Dubai processing desks usually prefer the glasses off. If you must wear them, the frames cannot cover the eyes and the lenses cannot show a flash reflection.",
      source: {
        label: "GDRFA smart services",
        href: GDRFA_SMART,
      },
    },
    {
      id: "file-weight",
      question: "Why does a small JPEG get rejected on the Dubai form?",
      answer:
        "Portals often want the picture roughly between 200 KB and 600 KB. Compressing it into a tiny file makes the eyes blur. Export a colour JPEG in that range.",
      source: {
        label: "GDRFA smart services",
        href: GDRFA_SMART,
      },
    },
    {
      id: "entry-age",
      question: "Can I reuse last year’s entry-permit photo?",
      answer:
        "No. GDRFA wants a picture taken within six months. An entry-permit photo from a previous trip is too old for a new residence or visit file.",
      source: {
        label: "GDRFA Dubai",
        href: GDRFA_HOME,
      },
    },
  ],
  breadcrumbLabel: "Dubai Visa Photo",
  beforeSrc: "/dubai-visa-before-2.jpg",
  beforeAlt: "Balcony selfie before it is framed for a Dubai visa",
  afterSrc: "/dubai-visa-after-3.jpg",
  afterAlt: "Finished Dubai visa portrait on white at 4.3 by 5.5 centimetres",
  afterAspectClass: "aspect-[43/55]",
  afterSizeLabel: "43 × 55 mm",
  afterCaption: "GDRFA portrait",
  trustPills: [
    "43 × 55 mm, or 35 × 45 mm online",
    "For Amer and Dubai Now",
    "Colour file, not a scan",
  ],
  howTitle: "From a balcony photo to a GDRFA file",
  howIntro:
    "Three steps from an everyday picture to the portrait Dubai residence and visit files ask for.",
  specsHeading: "Dubai visa photo size",
  dosHeading: "Poses Dubai desks keep",
  dosIntro:
    "These are finished files a Dubai desk keeps. The field behind the head is white, both ears stay in frame, and the mouth stays closed.",
  faqTitle: "Dubai visa photo questions",
  faqSubtitle:
    "Portal pixels, Amer prints, family sponsorship, and why a tiny JPEG fails.",
  pricingEyebrow: "Dubai file pricing",
  pricingTitle: "Choose a Dubai visa photo package",
  pricingSubtitle:
    "Pay once in dirhams. You download a colour portrait sized for a GDRFA Dubai application.",
};

export const dubaiVisaPackageCopy = {
  basic: [
    "White crop for a GDRFA 43×55 mm print, or 35×45 mm online",
    "Colour JPEG in the weight Dubai forms usually accept",
    "Ears and shoulders framed for Amer or Dubai Now",
    "Print layout when an Amer centre still wants paper",
  ],
  standard: [
    "The GDRFA file stays available while a reviewer inspects it",
    "A person looks for flash on the lenses and shade under the eyes",
    "Rework if an Amer upload would bounce the portrait",
  ],
  notice:
    "Dubai reviews that land after 5:00 PM start at 8:00 AM. The digital GDRFA file can still be saved overnight. If the portrait would fail an Amer check, the reviewer messages you on WhatsApp or email.",
  note: "Build the Dubai portrait before you pay. The dirham charge shows up only after the GDRFA file is ready.",
};
