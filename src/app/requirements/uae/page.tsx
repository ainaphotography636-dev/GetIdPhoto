import type { Metadata } from "next";
import DocumentGuidesIndex from "@/components/DocumentGuidesIndex";
import {
  requirementCards,
  uaeRequirementSlugs,
} from "@/data/requirementCards";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "UAE Document Photo Requirements",
  description:
    "UAE passport, Emirates ID, visa, and residence photo guides.",
  alternates: {
    canonical: absoluteUrl("/requirements/uae"),
  },
  openGraph: {
    title: "UAE Document Photo Requirements",
    description:
      "UAE passport, Emirates ID, visa, and residence photo guides.",
    url: absoluteUrl("/requirements/uae"),
  },
};

export default function UaeRequirementsPage() {
  const slugs = new Set(uaeRequirementSlugs);
  const cards = requirementCards.filter((card) => slugs.has(card.slug));

  return (
    <DocumentGuidesIndex title="UAE documents" cards={cards} />
  );
}
