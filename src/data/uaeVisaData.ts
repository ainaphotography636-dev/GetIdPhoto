import type { UaePassportPageContent } from "@/data/uaePassportData";

const MOHRE_HOME = "https://www.mohre.gov.ae/";
const ICP_PORTAL = "https://smartservices.icp.gov.ae/";

export const uaeVisaData: UaePassportPageContent = {
  title: "UAE Visa Photo Maker",
  subtitle:
    "Build a residency visa portrait for Abu Dhabi, Sharjah, and the northern emirates. Portals accept 35 × 45 mm or 40 × 60 mm, on white or light grey.",
  specifications: [
    {
      id: "size",
      label: "MOHRE frame",
      value: "35 × 45 mm or 40 × 60 mm, whichever the form lists",
    },
    {
      id: "background",
      label: "Field behind you",
      value: "White or light grey, matched to the portal",
    },
    {
      id: "headHeight",
      label: "Eyes",
      value: "Both eyes open and level with the lens",
    },
    {
      id: "ageLimit",
      label: "How recent",
      value: "Taken for this contract, not copied from an old sticker",
    },
  ],
  lastUpdated: "October 2026",
  reviewedBy: "MOHRE filing notes",
  officialSpecs: [
    {
      id: "size",
      label: "MOHRE frame",
      value: "35 × 45 mm or 40 × 60 mm",
    },
    {
      id: "background",
      label: "Field behind you",
      value: "White or light grey",
    },
    {
      id: "headRatio",
      label: "Eyes",
      value: "Open and level",
    },
    {
      id: "expression",
      label: "Look",
      value: "Closed lips, even light",
    },
  ],
  acceptedExamples: [
    {
      id: "flat-light",
      title: "Even light for a labour file",
      alt: "MOHRE work-permit portrait with even light and no patch under the chin",
      src: "/guidelines/guideline-lighting.jpg",
      accepted: true,
    },
    {
      id: "scarf-clear",
      title: "Scarf clear of the cheeks",
      alt: "Woman in a headscarf whose cheeks stay visible on a MOHRE residency portrait",
      src: "/guidelines/guideline-hijab.jpg",
      accepted: true,
    },
    {
      id: "closed-lips",
      title: "Level eyes, lips closed",
      alt: "Residency portrait for a northern-emirate filing with level eyes and closed lips",
      src: "/guidelines/guideline-neutral.jpg",
      accepted: true,
    },
  ],
  rejectedExamples: [
    {
      id: "open-smile",
      title: "Teeth in a work-permit photo",
      alt: "Smiling portrait that a MOHRE work-permit upload should not use",
      src: "/guidelines/guideline-smile.jpg",
      accepted: false,
    },
    {
      id: "half-shade",
      title: "Office shade on one cheek",
      alt: "Labour-file portrait with office shade covering one cheek",
      src: "/guidelines/guideline-shadow.jpg",
      accepted: false,
    },
    {
      id: "dark-lenses",
      title: "Tinted lenses on a labour file",
      alt: "Tinted glasses hiding the eyes on a portrait for a MOHRE permit",
      src: "/guidelines/guideline-sunglasses.jpg",
      accepted: false,
    },
  ],
  steps: [
    {
      id: "phone",
      title: "Use a phone in daylight",
      body: "Stand facing a window. Keep the camera at eye height and leave the wall behind you plain if you can.",
    },
    {
      id: "resize",
      title: "Resize to the visa frame",
      body: "Upload that picture. GetIDPhotoAI sets the frame to 35 × 45 mm or 40 × 60 mm and matches the backdrop to the portal, white or light grey.",
    },
    {
      id: "attach",
      title: "Attach it to the visa request",
      body: "Download the JPEG for a visit visa, an employment entry permit, or a family visa filed through a typing centre outside a Dubai-only desk.",
    },
  ],
  faq: [
    {
      id: "not-id-size",
      question: "Which frame does a MOHRE work-permit form list?",
      answer:
        "Labour and residency forms outside Dubai ask for either 35×45 mm or 40×60 mm. Read the dropdown on that form. A 40×60 mm slot will not take the smaller Emirates ID crop.",
      source: {
        label: "MOHRE",
        href: MOHRE_HOME,
      },
    },
    {
      id: "which-emirates",
      question: "Which emirates use this portrait instead of a Dubai sponsorship file?",
      answer:
        "Use it for Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Those desks follow MOHRE for the work permit and the local residency portal for the visa. Dubai family sponsorship is a different authority.",
      source: {
        label: "MOHRE",
        href: MOHRE_HOME,
      },
    },
    {
      id: "file-type",
      question: "What should I attach to a MOHRE or northern-emirate visa form?",
      answer:
        "Attach a colour JPEG at the size that form names. A photocopy, a black-and-white scan, or a blurry thumbnail is returned by the typing centre.",
      source: {
        label: "ICP residency services",
        href: ICP_PORTAL,
      },
    },
    {
      id: "national-dress",
      question: "Can national dress stay on for a MOHRE portrait?",
      answer:
        "A ghutra or hijab can stay when both cheeks, the chin, and the forehead remain in view for the labour file. A cap brim or cloth over the eyes is removed.",
      source: {
        label: "MOHRE",
        href: MOHRE_HOME,
      },
    },
    {
      id: "child-visa",
      question: "How do I photograph a child for a family residency file outside Dubai?",
      answer:
        "Sit the child so the eyes meet the lens. Keep a parent’s hands below the frame. The field behind the child can be white or light grey, matching the portal that asked for the picture.",
      source: {
        label: "ICP residency services",
        href: ICP_PORTAL,
      },
    },
    {
      id: "cream-wall",
      question: "Will a cream office wall pass a MOHRE upload?",
      answer:
        "No. Finished labour files need white or light grey, with no cream cast and no shadow on the shoulder. A dark curtain or a coloured wall is replaced before you download.",
      source: {
        label: "MOHRE",
        href: MOHRE_HOME,
      },
    },
  ],
  breadcrumbLabel: "UAE Visa Photo",
  beforeSrc: "/uae-visa-before-2.jpg",
  beforeAlt: "Daylight selfie of a man before it is cropped for a UAE visa",
  afterSrc: "/uae-visa-after-3.jpg",
  afterAlt: "Finished UAE visa portrait on white at 35 by 45 millimetres",
  afterAspectClass: "aspect-[35/45]",
  afterSizeLabel: "35 × 45 mm",
  afterCaption: "Visa portrait",
  trustPills: [
    "35 × 45 mm or 40 × 60 mm",
    "White or light grey field",
    "MOHRE and ICP portals",
  ],
  howTitle: "How a UAE visa portrait is made",
  howIntro:
    "A daylight phone picture becomes a 35 × 45 mm or 40 × 60 mm file you can attach to a residency visa outside Dubai.",
  specsHeading: "Visa portrait measurements",
  dosHeading: "What a visa upload accepts",
  dosIntro:
    "Match your picture to these visa examples. Watch the backdrop, the mouth, and whether both eyes are clear.",
  faqTitle: "UAE visa photo questions",
  faqSubtitle:
    "Work-permit frames, which emirates use them, and which office walls fail a MOHRE upload.",
  pricingEyebrow: "MOHRE file pricing",
  pricingTitle: "Pick a residency photo package",
  pricingSubtitle:
    "One payment in dirhams. The download is a 35×45 mm or 40×60 mm portrait for a labour or residency form outside Dubai.",
};

export const uaeVisaPackageCopy = {
  basic: [
    "Frame set to 35×45 mm or 40×60 mm for the form you opened",
    "Field set to white or light grey for that portal",
    "Colour file for a work permit or a northern-emirate residency upload",
    "Print sheet for a typing centre in Abu Dhabi, Sharjah, or Ajman",
  ],
  standard: [
    "The MOHRE-sized file is ready while a reviewer checks the eyes and the field",
    "A person confirms the grey-or-white backdrop matches the form",
    "Rework if a labour desk would send the portrait back",
  ],
  notice:
    "Labour-file reviews that arrive after 5:00 PM begin at 8:00 AM. The digital residency portrait can still be downloaded overnight. If it misses the MOHRE frame, the reviewer contacts you on WhatsApp or email.",
  note: "Finish the residency portrait first. Payment appears only after that MOHRE-sized file is ready.",
};
