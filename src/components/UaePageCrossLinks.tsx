import RelatedLinks from "@/components/RelatedLinks";
import { getUaeCoreCrossLinks } from "@/lib/document-catalog";

type UaePageCrossLinksProps = {
  currentSlug: string;
};

const crossLinkCopy: Record<string, { heading: string; subtitle: string }> = {
  "emirates-id-photo": {
    heading: "After the ICP card, other UAE filings",
    subtitle:
      "An Emirates ID portrait is not the file GDRFA, MOHRE, or the passport office keeps. Open the guide for the next document.",
  },
  "dubai-visa-photo": {
    heading: "Besides a GDRFA Dubai visa",
    subtitle:
      "Dubai sponsorship stays with GDRFA. Emirates ID, MOHRE residency, and Emirati passports use different sizes.",
  },
  "uae-visa-photo": {
    heading: "Besides a MOHRE residency portrait",
    subtitle:
      "This file is for labour and residency desks outside Dubai. GDRFA, ICP card, and passport renewals are separate guides.",
  },
  "uae-passport-photo": {
    heading: "Besides an Emirati passport portrait",
    subtitle:
      "A booklet photo is for UAE citizens. Residents filing an ICP card, a Dubai visa, or a MOHRE permit need a different page.",
  },
};

/**
 * Links the four UAE document pages to each other.
 * Kept off the homepage so the home nav stays uncluttered.
 */
export default function UaePageCrossLinks({ currentSlug }: UaePageCrossLinksProps) {
  const copy = crossLinkCopy[currentSlug] ?? {
    heading: "Other UAE document photos",
    subtitle: "Open the guide that matches the document you are filing.",
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
      <RelatedLinks
        links={getUaeCoreCrossLinks(currentSlug)}
        heading={copy.heading}
        subtitle={copy.subtitle}
        showMakePhotoCtas={false}
      />
    </div>
  );
}
