import type { FaqItem } from "@/i18n/types";
import type { SpecCode } from "@/models/PhotoSpec";

export type RequirementCopy = {
  title: string;
  description: string;
  detail: string;
};

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    services: string;
    pricing: string;
    testimonials: string;
    faq: string;
    contact: string;
    uploadCta: string;
  };
  language: {
    switchTo: string;
    label: string;
    en: string;
    ar: string;
  };
  hero: {
    rating: string;
    headline: string;
    headlineAccent: string;
    subhead: string;
    standardLabel: string;
    humanLabel: string;
    instantBadge: string;
    bestBadge: string;
    or: string;
    uploadCta: string;
    humanCta: string;
    badgeIcp: string;
    badgeGdrfa: string;
    badgeInstant: string;
    cardTitle: string;
    cardSubtitle: string;
    pricingAria: string;
  };
  services: {
    title: string;
    subtitle: string;
    documentType: string;
    selected: string;
    continueCta: string;
    requirements: Record<
      "uae-passport" | "uae-id-card" | "dubai-visa" | "40x60-mm",
      RequirementCopy
    >;
  };
  guidelines: {
    title: string;
    subtitle: string;
    diyTitle: string;
    examples: Array<{
      id: string;
      title: string;
      alt: string;
      valid: boolean;
      src: string;
    }>;
    features: Array<{
      id: string;
      title: string;
      body: string;
    }>;
  };
  whyUs: {
    title: string;
    subtitle: string;
    items: Array<{ id: string; title: string; description: string }>;
  };
  pricing: {
    eyebrow: string;
    title: string;
    subtitle: string;
    note: string;
    recommended: string;
    digitalDownload: string;
    mostPopular: string;
    oneTime: string;
    continueUpload: string;
    redirecting: string;
    printedPhotos: string;
    packages: {
      basic: { name: string; features: string[]; notice?: string };
      standard: { name: string; features: string[]; notice?: string };
    };
  };
  testimonials: {
    title: string;
    subtitle: string;
    items: Array<{ name: string; location: string; quote: string }>;
  };
  faq: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: FaqItem[];
  };
  cta: {
    title: string;
    subtitle: string;
    createOnline: string;
    humanVerify: string;
    questionsPrefix: string;
    emailLabel: string;
    whatsappLabel: string;
    facebookLabel: string;
  };
  footer: {
    blurb: string;
    reviews: string;
    servicesTitle: string;
    contactTitle: string;
    rights: string;
    poweredBy: string;
    privacy: string;
    terms: string;
    refund: string;
    hours: string;
    whatsappWithPhone: string;
    facebook: string;
    followUs: string;
  };
  makePhoto: {
    title: string;
    stepUpload: string;
    stepPurchase: string;
    searchPlaceholder: string;
    tipsTitle: string;
    tips: string[];
    showProcessed: string;
    showOriginal: string;
    uploadCta: string;
    backHome: string;
  };
};

export const en: Dictionary = {
  meta: {
    title:
      "GetIDPhotoAI | Instant AI Passport & Visa Photo Maker UAE & GCC",
    description:
      "Get government-compliant biometric photos for UAE passports, Emirates ID, Dubai visas, and GCC documents in seconds. Instant AI processing with optional human verification.",
  },
  nav: {
    services: "Services",
    pricing: "Pricing",
    testimonials: "Testimonials",
    faq: "FAQ",
    contact: "Contact",
    uploadCta: "Upload Your Photo",
  },
  language: {
    switchTo: "العربية",
    label: "Language",
    en: "EN",
    ar: "ع",
  },
  hero: {
    rating: "Rated 4.9/5 by 2,500+ customers",
    headline: "UAE Passport, Visa & Emirates ID",
    headlineAccent: "Photo Maker",
    subhead:
      "Get government-compliant biometric photos for your UAE documents in seconds. Skip the studio—our AI automatically adjusts your photo to exact UAE specifications with a clean white background.",
    standardLabel: "Standard Digital",
    humanLabel: "Human Verified",
    instantBadge: "Instant",
    bestBadge: "Best",
    or: "or",
    uploadCta: "Upload Your Photo",
    humanCta: "Human Verification",
    badgeIcp: "ICP Smart Services Compliant",
    badgeGdrfa: "GDRFA Approved Formats",
    badgeInstant: "Instant Digital Delivery",
    cardTitle: "Government Compliant",
    cardSubtitle: "Meets all official requirements",
    pricingAria: "Service pricing",
  },
  services: {
    title: "Choose Your Official Requirement",
    subtitle: "Select the exact document type before uploading your photo",
    documentType: "Document type",
    selected: "Selected requirement",
    continueCta: "Continue to Upload",
    requirements: {
      "uae-passport": {
        title: "UAE Passport Photo",
        description: "Standard biometric dimensions",
        detail: "Official UAE passport photo sizing and biometric framing",
      },
      "uae-id-card": {
        title: "UAE ID Card Photo",
        description: "ICP specifications",
        detail: "Meets ICP Smart Services Emirates ID photo requirements",
      },
      "dubai-visa": {
        title: "Dubai Visa Photo",
        description: "GDRFA size for Dubai filings",
        detail: "GDRFA Dubai portrait for Amer and Dubai Now, separate from a MOHRE work permit",
      },
      "40x60-mm": {
        title: "40x60 mm Photo",
        description: "40×60 mm format",
        detail: "Common international 40×60 mm photo format",
      },
    },
  },
  guidelines: {
    title: "Home checklist before you pick a document",
    subtitle:
      "These samples show light, headwear, and expression only. The size and the authority live on the document page you open next.",
    diyTitle: "Can I Take My Own Emirati Passport Photo?",
    examples: [
      {
        id: "lighting",
        title: "Light across the whole face",
        alt: "Sample portrait with light across the whole face, before a document size is chosen",
        valid: true,
        src: "/guidelines/guideline-lighting.jpg",
      },
      {
        id: "hijab",
        title: "Headwear that leaves the face clear",
        alt: "Sample of religious headwear that leaves the face clear, before a document is selected",
        valid: true,
        src: "/guidelines/guideline-hijab.jpg",
      },
      {
        id: "neutral",
        title: "Relaxed mouth",
        alt: "Sample portrait with a relaxed closed mouth, not tied to one document",
        valid: true,
        src: "/guidelines/guideline-neutral.jpg",
      },
      {
        id: "shadow",
        title: "Shade on one side",
        alt: "Sample portrait with shade on one side of the face, shown before any document crop",
        valid: false,
        src: "/guidelines/guideline-shadow.jpg",
      },
      {
        id: "covered",
        title: "Religious headgear covering the face",
        alt: "Portrait where religious headgear covers the nose and mouth",
        valid: false,
        src: "/guidelines/guideline-covered.jpg",
      },
      {
        id: "smile",
        title: "An open smile",
        alt: "Sample of an open smile, shown as a general mistake before you pick a document",
        valid: false,
        src: "/guidelines/guideline-smile.jpg",
      },
    ],
    features: [
      {
        id: "fast",
        title: "3-Minute Passport Photo",
        body: "Take your photo at home. No driving or waiting in line.",
      },
      {
        id: "pro",
        title: "Professional Service",
        body: "AI technology and passport photo experts, with instant feedback.",
      },
      {
        id: "compliance",
        title: "100% Compliance",
        body: "Acceptance, or a double money-back guarantee.",
      },
    ],
  },
  whyUs: {
    title: "Why Choose GetIDPhotoAI?",
    subtitle: "Professional service you can trust",
    items: [
      {
        id: "guarantee",
        title: "100% Guarantee",
        description:
          "If your photos are rejected, we'll retake them for free or refund your money",
      },
      {
        id: "fast",
        title: "10-Minute Service",
        description:
          "Walk in and walk out with professional photos in just 10 minutes",
      },
      {
        id: "compliant",
        title: "Government Compliant",
        description:
          "All photos meet strict government standards and requirements",
      },
      {
        id: "experts",
        title: "Expert Staff",
        description:
          "Trained professionals with years of experience in official photography",
      },
    ],
  },
  pricing: {
    eyebrow: "Pricing",
    title: "Simple, Transparent Pricing",
    subtitle: "No hidden fees, no surprises. Instant download after payment.",
    note: "You'll upload and process your photo first. Payment appears only after your ID photo is ready.",
    recommended: "Recommended",
    digitalDownload: "Digital download",
    mostPopular: "Most popular",
    oneTime: "One-time payment · AED",
    continueUpload: "Continue — Upload photo",
    redirecting: "Redirecting to Stripe…",
    printedPhotos: "{count} printed photos (pick up)",
    packages: {
      basic: {
        name: "Standard Digital",
        features: [
          "Instant AI background removal & lighting correction",
          "Precise cropping to official requested size",
          "Immediate high-resolution digital download (Single photo)",
          "Includes a 4-photo print layout sheet optimized for home printers",
        ],
      },
      standard: {
        name: "Human Verified",
        features: [
          "Everything in Standard Digital, instantly available",
          "Manual compliance inspection by our expert reviewer",
          "Guaranteed official guidelines compliance",
        ],
        notice:
          "Orders placed between 5:00 PM and 8:00 AM are queued for priority morning review at 8:00 AM. You can still download your digital photo instantly. If the photo does not meet official guidelines, our editor will contact you via WhatsApp or email.",
      },
    },
  },
  testimonials: {
    title: "Trusted Across the UAE",
    subtitle: "Real customers. Real ICP & GDRFA-ready photos.",
    items: [
      {
        name: "Sara Al Mansoori",
        location: "Dubai",
        quote:
          "Got my Emirates ID photo ready in under a minute. Accepted on the first try at the typing centre—no mall trip needed.",
      },
      {
        name: "James Okonkwo",
        location: "Abu Dhabi",
        quote:
          "Used Human Verified for my residency visa. The reviewer caught a lighting issue and fixed it before I submitted to GDRFA.",
      },
      {
        name: "Fatima Rahman",
        location: "Sharjah",
        quote:
          "Clear pricing, instant download, and the print sheet worked perfectly at home. GetIDPhotoAI.ae saved me a whole afternoon.",
      },
    ],
  },
  faq: {
    eyebrow: "FAQ · UAE & GCC",
    title: "Passport & ID Photo Questions",
    subtitle:
      "Clear answers for Dubai, Abu Dhabi, Sharjah, and GCC expats needing ICP-, GDRFA-, and visa-ready photos online.",
    items: [
      {
        id: "which-page",
        question: "Which page should I open for my document?",
        answer:
          "Start here only to choose the document. Emirati passports, the ICP Emirates ID card, GDRFA Dubai visas, and MOHRE residency files each have their own page with that authority’s size and background. Do not use one page’s portrait for another filing.",
      },
      {
        id: "emirates-id-smartphone",
        question: "Can I start from a phone picture on this site?",
        answer:
          "Yes. Upload a front-facing phone picture here, then continue on the document page that matches your filing. The crop, the field colour, and the authority check are explained on that page, not in this homepage answer.",
      },
      {
        id: "dubai-visa-gdrfa",
        question: "Is a Dubai visa photo the same as a MOHRE work-permit photo?",
        answer:
          "No. Dubai entry permits and residence files are reviewed by GDRFA. Work permits and residency files in the other emirates follow MOHRE and the local portal. Open the Dubai page or the UAE residency page, not both for the same form.",
      },
      {
        id: "background-removal",
        question: "What does the editor change in the picture I upload?",
        answer:
          "It lifts you off the room behind you and places the field colour that the document page names. It also frames the head for that document. It does not invent a second set of rules on the homepage.",
      },
      {
        id: "instant-delivery",
        question: "How fast do I get my passport or ID photo after uploading?",
        answer:
          "Most Standard Digital photos are ready in seconds after upload and payment. You can download your compliant digital file immediately for UAE passport, Emirates ID, Dubai visa, or 40×60 mm formats. Optional Human Verified photos include a quick expert review—still far faster than booking a studio walk-in.",
      },
      {
        id: "gcc-expat-photos",
        question:
          "Can GCC expatriates in Saudi Arabia, Qatar, Oman, Bahrain, or Kuwait use GetIDPhotoAI?",
        answer:
          "Absolutely. GetIDPhotoAI.ae serves UAE residents and GCC expatriates who need passport, visa, and ID photos that follow regional biometric rules. Choose the matching document size (including common 40×60 mm formats) whether you are applying from Dubai or elsewhere in the GCC.",
      },
      {
        id: "human-verified-vs-standard",
        question:
          "What is the difference between Standard Digital (AED 20) and Human Verified (AED 30)?",
        answer:
          "Standard Digital (AED 20) gives you instant AI processing and download of a government-sized photo. Human Verified (AED 30) adds optional expert review via WhatsApp for higher-stakes submissions such as residency visas or Emirates ID renewals, with a rejection money-back guarantee as described in our Refund Policy.",
      },
      {
        id: "rejection-guarantee",
        question:
          "What if my photo is rejected by ICP, GDRFA, or a UAE typing centre?",
        answer:
          "Human Verified orders include our official government rejection money-back guarantee when the photo was prepared to the selected specification and still rejected by the authority. Contact support with the rejection notice and we will reprocess or refund according to our Refund Policy. Always double-check the exact requirements on the government portal before submitting.",
      },
    ],
  },
  cta: {
    title: "Ready to Get Your Photos?",
    subtitle:
      "Skip the mall. Get ICP and GDRFA-compliant digital photos online at GetIDPhotoAI.ae.",
    createOnline: "Create Photos Online",
    humanVerify: "Human Verification",
    questionsPrefix: "Questions?",
    emailLabel: "Email",
    whatsappLabel: "WhatsApp",
    facebookLabel: "Facebook",
  },
  footer: {
    blurb:
      "UAE passport, visa, and Emirates ID photos online — ICP and GDRFA compliant. Instant digital delivery at GetIDPhotoAI.ae.",
    reviews: "4.9/5 from 2,500+ reviews",
    servicesTitle: "Services",
    contactTitle: "Contact Info",
    rights: "All rights reserved.",
    poweredBy: "Power by getidphoto.ae",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    refund: "Refund Policy",
    hours: "Online 24/7 — Human review: 8:00 AM – 5:00 PM GST",
    whatsappWithPhone: "WhatsApp {phone}",
    facebook: "Facebook",
    followUs: "Follow us",
  },
  makePhoto: {
    title: "Make Your ID Photo",
    stepUpload: "Upload & Preview",
    stepPurchase: "Place Order",
    searchPlaceholder:
      "Search for other photo types (e.g., China Visa, UK Passport)...",
    tipsTitle: "Quick tips",
    tips: [
      "Full head and shoulders in frame",
      "Even lighting on the face",
      "Simple, plain background",
    ],
    showProcessed: "Show passport photo",
    showOriginal: "Show original photo",
    uploadCta: "Upload Your Photo",
    backHome: "Back to home",
  },
};

/** Helper so TS still knows requirement keys are SpecCodes. */
export type RequirementId = keyof Dictionary["services"]["requirements"];

export function isRequirementId(value: string): value is RequirementId {
  return value in en.services.requirements;
}

export type { SpecCode };
