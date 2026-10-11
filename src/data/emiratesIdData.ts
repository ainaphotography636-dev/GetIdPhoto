export type EmiratesIdSpecificationId =
  | "size"
  | "background"
  | "headHeight"
  | "ageLimit";

export interface EmiratesIdSpecification {
  id: EmiratesIdSpecificationId;
  label: string;
  value: string;
}

export type EmiratesIdOfficialSpecId =
  | "size"
  | "background"
  | "headRatio"
  | "expression";

export interface EmiratesIdOfficialSpec {
  id: EmiratesIdOfficialSpecId;
  label: string;
  value: string;
}

export interface EmiratesIdGuideExample {
  id: string;
  title: string;
  alt: string;
  src: string;
  accepted: boolean;
}

export interface EmiratesIdStep {
  id: string;
  title: string;
  body: string;
}

export interface EmiratesIdFaqItem {
  id: string;
  question: string;
  answer: string;
  source: {
    label: string;
    href: string;
  };
}

export interface EmiratesIdPageContent {
  title: string;
  subtitle: string;
  specifications: EmiratesIdSpecification[];
  lastUpdated: string;
  reviewedBy: string;
  officialSpecs: EmiratesIdOfficialSpec[];
  acceptedExamples: EmiratesIdGuideExample[];
  rejectedExamples: EmiratesIdGuideExample[];
  steps: EmiratesIdStep[];
  faq: EmiratesIdFaqItem[];
  howTitle?: string;
  howIntro?: string;
  dosHeading?: string;
  dosIntro?: string;
}

export const emiratesIdData: EmiratesIdPageContent = {
  title: "UAE Emirates ID Photo Maker",
  subtitle:
    "Create official ICP Smart Services compliant Emirates ID photos online in seconds with AI. Guaranteed 100% acceptance.",
  specifications: [
    {
      id: "size",
      label: "Size",
      value: "35 x 45 mm (DPI 600 / 413x531 px)",
    },
    {
      id: "background",
      label: "Background",
      value: "Plain White",
    },
    {
      id: "headHeight",
      label: "Head height",
      value: "70–80% of the frame",
    },
    {
      id: "ageLimit",
      label: "Age limit",
      value: "Photo taken within the last 6 months",
    },
  ],
  lastUpdated: "October 2026",
  reviewedBy: "ICP Biometric Specialist",
  officialSpecs: [
    {
      id: "size",
      label: "Size",
      value: "35 × 45 mm",
    },
    {
      id: "background",
      label: "Background",
      value: "Plain White",
    },
    {
      id: "headRatio",
      label: "Head Ratio",
      value: "70–80% fill",
    },
    {
      id: "expression",
      label: "Expression",
      value: "Neutral, mouth closed, eyes visible",
    },
  ],
  acceptedExamples: [
    {
      id: "lighting",
      title: "Flat light for the ID card",
      alt: "ICP Emirates ID portrait with flat light and no hot spot on the forehead",
      src: "/guidelines/guideline-lighting.jpg",
      accepted: true,
    },
    {
      id: "hijab",
      title: "Hijab stops at the jaw",
      alt: "Woman in a hijab whose chin and forehead stay clear for an ICP Emirates ID card",
      src: "/guidelines/guideline-hijab.jpg",
      accepted: true,
    },
    {
      id: "neutral",
      title: "Mouth shut for ICP",
      alt: "Emirates ID card portrait with lips together and both eyes open for ICP Smart Services",
      src: "/guidelines/guideline-neutral.jpg",
      accepted: true,
    },
  ],
  rejectedExamples: [
    {
      id: "smile",
      title: "A smile on the card",
      alt: "Smiling portrait that ICP Smart Services will not place on an Emirates ID card",
      src: "/guidelines/guideline-smile.jpg",
      accepted: false,
    },
    {
      id: "shadow",
      title: "A dark half of the card",
      alt: "Emirates ID portrait with one side of the face in shade, which fails an ICP check",
      src: "/guidelines/guideline-shadow.jpg",
      accepted: false,
    },
    {
      id: "sunglasses",
      title: "Lenses hiding the iris",
      alt: "Sunglasses covering the eyes on a portrait that cannot be used for an Emirates ID card",
      src: "/guidelines/guideline-sunglasses.jpg",
      accepted: false,
    },
  ],
  steps: [
    {
      id: "snap",
      title: "Face the phone for the card",
      body: "Hold the phone at eye level in front of a plain wall. ICP reads the card portrait, so keep hair off the eyebrows.",
    },
    {
      id: "upload",
      title: "Scale the head for Smart Services",
      body: "Upload that picture. The editor clears the wall to white and sets the head to about 70–80% of a 35×45 mm Emirates ID frame.",
    },
    {
      id: "download",
      title: "Send the file to ICP",
      body: "Download the colour file for ICP Smart Services, or hand it to a typing centre that is renewing or issuing the card.",
    },
  ],
  howTitle: "From a phone picture to an ICP card file",
  howIntro:
    "Three moves from a front-facing picture to the 35×45 mm portrait ICP Smart Services stores on an Emirates ID.",
  dosHeading: "Poses the ICP card keeps",
  dosIntro:
    "These examples are for the Emirates ID card only. Watch the jawline under a hijab, the closed mouth, and whether one side of the face falls into shade.",
  faq: [
    {
      id: "official-size",
      question: "What pixel file does ICP Smart Services store on the card?",
      answer:
        "ICP lists the Emirates ID portrait as 35×45 mm, which is 827×1063 pixels when the upload is prepared at 600 DPI. The head sits in the middle and covers roughly 70–80% of that card frame.",
      source: {
        label: "ICP Smart Services Portal",
        href: "https://smartservices.icp.gov.ae/",
      },
    },
    {
      id: "background",
      question: "Will ICP accept a grey or cream field behind the card portrait?",
      answer:
        "No. The card field has to be uniform white. A cream wall, a grey office backdrop, or a shadow along the collar is stripped out before the file goes to Smart Services.",
      source: {
        label: "ICP photo guidance",
        href: "https://icp.gov.ae/wp-content/uploads/2021/11/icao_english.pdf",
      },
    },
    {
      id: "card-renewal",
      question: "Can I reuse the portrait already printed on my current Emirates ID?",
      answer:
        "No. A renewal through ICP Smart Services needs a new capture. Scanning the picture on the plastic card makes the eyes soft, and typing centres send that scan back.",
      source: {
        label: "ICP Smart Services Portal",
        href: "https://smartservices.icp.gov.ae/",
      },
    },
    {
      id: "hijab",
      question: "Where must a hijab stop for an ICP card portrait?",
      answer:
        "A hijab can stay on. The cloth has to leave a clear line from the chin up to the forehead so the card reader sees the whole face. Fabric across the cheeks or eyebrows is refused.",
      source: {
        label: "ICP photo guidance",
        href: "https://icp.gov.ae/wp-content/uploads/2021/11/icao_english.pdf",
      },
    },
    {
      id: "glasses-smile",
      question: "Does ICP allow glasses or a smile on the Emirates ID?",
      answer:
        "The mouth stays closed. Clear medical lenses are tolerated only when the iris is fully visible and the glass shows no reflection. Sunglasses and a grin are both refused on the card.",
      source: {
        label: "ICP Smart Services Portal",
        href: "https://smartservices.icp.gov.ae/",
      },
    },
    {
      id: "rejection",
      question: "Why does a typing centre send an Emirates ID portrait back to ICP?",
      answer:
        "Centres return files when the head is too small for the 35×45 mm card, the field is not white, or the picture looks older than the current application. That is an ICP card check, separate from a Dubai visa desk.",
      source: {
        label: "ICP Smart Services Portal",
        href: "https://smartservices.icp.gov.ae/",
      },
    },
  ],
};

export const emiratesIdPackageCopy = {
  basic: [
    "White field cropped to the 35×45 mm ICP card",
    "Head scaled so it fills most of that card frame",
    "Colour download for ICP Smart Services or a typing centre",
    "A home print sheet if the centre still asks for paper",
  ],
  standard: [
    "The ICP card file is ready while a reviewer looks at it",
    "A person checks the hijab line, lens glare, and the closed mouth",
    "Rework when the portrait would fail an ICP card upload",
  ],
  notice:
    "ICP card reviews that arrive after 5:00 PM wait until 8:00 AM. You can still download the digital card file the same night. If the portrait misses the Smart Services rules, the reviewer writes on WhatsApp or email.",
  note: "You prepare the Emirates ID portrait first. The AED charge appears only after that ICP file is ready.",
};
