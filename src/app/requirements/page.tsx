import type { Metadata } from "next";
import DocumentGuidesIndex from "@/components/DocumentGuidesIndex";
import { requirementCards } from "@/data/requirementCards";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Photo Requirements",
  description:
    "Choose a UAE, GCC, passport, or visa photo and start with the official size.",
  alternates: {
    canonical: absoluteUrl("/requirements"),
  },
  openGraph: {
    title: "Photo Requirements",
    description:
      "Choose a UAE, GCC, passport, or visa photo and start with the official size.",
    url: absoluteUrl("/requirements"),
  },
};

export default function RequirementsPage() {
  return (
    <DocumentGuidesIndex
      title="Choose your document"
      cards={requirementCards}
      showTabs
    />
  );
}
