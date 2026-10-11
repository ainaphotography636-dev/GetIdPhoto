import type { CoverKind } from "@/components/DocumentCover";
import {
  allDocumentsList,
  plannedDocumentHref,
  type PlannedDocument,
} from "@/data/allDocumentsList";

export type RequirementTab = "popular" | "related";

export type RequirementCard = {
  slug: string;
  title: string;
  href: string;
  kind: CoverKind;
  color: string;
  label: string;
  tab: RequirementTab;
};

type CoverStyle = {
  title?: string;
  kind: CoverKind;
  color: string;
  label: string;
  tab: RequirementTab;
};

const coverStyles: Record<string, CoverStyle> = {
  "uae-passport-photo": {
    title: "UAE Passport Photo",
    kind: "passport",
    color: "#0b6b3a",
    label: "UAE",
    tab: "popular",
  },
  "emirates-id-photo": {
    title: "Emirates ID Photo",
    kind: "id",
    color: "#00732f",
    label: "EMIRATES ID",
    tab: "popular",
  },
  "uae-residence-photo": {
    title: "UAE Residence Photo",
    kind: "id",
    color: "#115e59",
    label: "RESIDENCE",
    tab: "popular",
  },
  "40x60-mm-photo": {
    title: "40×60 mm Photo",
    kind: "print",
    color: "#0f766e",
    label: "40 × 60 mm",
    tab: "popular",
  },
  "saudi-arabia-passport-photo": {
    title: "Saudi Passport Photo",
    kind: "passport",
    color: "#14532d",
    label: "KSA",
    tab: "popular",
  },
  "india-passport-photo": {
    title: "Indian Passport Photo",
    kind: "passport",
    color: "#1e3a8a",
    label: "INDIA",
    tab: "popular",
  },
  "pakistan-passport-photo": {
    title: "Pakistani Passport Photo",
    kind: "passport",
    color: "#064e3b",
    label: "PAKISTAN",
    tab: "popular",
  },
  "uk-passport-photo": {
    title: "UK Passport Photo",
    kind: "passport",
    color: "#7f1d1d",
    label: "UK",
    tab: "popular",
  },
  "philippines-passport-photo": {
    title: "Philippine Passport Photo",
    kind: "passport",
    color: "#9f1239",
    label: "PH",
    tab: "popular",
  },
  "uae-visa-photo": {
    title: "UAE Visa Photo",
    kind: "visa",
    color: "#047857",
    label: "UAE VISA",
    tab: "popular",
  },
  "dubai-visa-photo": {
    title: "Dubai Visa Photo",
    kind: "visa",
    color: "#0f766e",
    label: "DUBAI VISA",
    tab: "popular",
  },
  "schengen-visa-photo": {
    title: "Schengen Visa Photo",
    kind: "visa",
    color: "#1d4ed8",
    label: "SCHENGEN",
    tab: "popular",
  },
  "us-visa-photo": {
    title: "US Visa Photo",
    kind: "visa",
    color: "#1e3a5f",
    label: "US VISA",
    tab: "popular",
  },
  "canada-visa-photo": {
    title: "Canada Visa Photo",
    kind: "visa",
    color: "#9f1239",
    label: "CANADA",
    tab: "popular",
  },
  "bahrain-passport-photo": {
    kind: "passport",
    color: "#9f1239",
    label: "BAHRAIN",
    tab: "related",
  },
  "oman-passport-photo": {
    kind: "passport",
    color: "#7f1d1d",
    label: "OMAN",
    tab: "related",
  },
  "kuwait-passport-photo": {
    kind: "passport",
    color: "#1e3a5f",
    label: "KUWAIT",
    tab: "related",
  },
  "uae-evisa-photo": {
    kind: "visa",
    color: "#047857",
    label: "E-VISA",
    tab: "related",
  },
  "saudi-arabia-visa-photo": {
    kind: "visa",
    color: "#166534",
    label: "KSA VISA",
    tab: "related",
  },
};

const extraRelated: Array<PlannedDocument & CoverStyle> = [
  {
    slug: "bangladesh-passport-photo",
    title: "Bangladesh Passport Photo",
    category: "Passport Photos",
    specCode: "bangladesh-passport",
    kind: "passport",
    color: "#14532d",
    label: "BD",
    tab: "related",
  },
  {
    slug: "egypt-passport-photo",
    title: "Egypt Passport Photo",
    category: "Passport Photos",
    specCode: "egypt-passport",
    kind: "passport",
    color: "#14532d",
    label: "EGYPT",
    tab: "related",
  },
  {
    slug: "nepal-passport-photo",
    title: "Nepal Passport Photo",
    category: "Passport Photos",
    specCode: "nepal-passport",
    kind: "passport",
    color: "#7f1d1d",
    label: "NEPAL",
    tab: "related",
  },
  {
    slug: "australia-passport-photo",
    title: "Australia Passport Photo",
    category: "Passport Photos",
    specCode: "australia-passport",
    kind: "passport",
    color: "#1e3a5f",
    label: "AUS",
    tab: "related",
  },
  {
    slug: "france-passport-photo",
    title: "France Passport Photo",
    category: "Passport Photos",
    specCode: "france-passport",
    kind: "passport",
    color: "#7f1d1d",
    label: "FRANCE",
    tab: "related",
  },
  {
    slug: "germany-passport-photo",
    title: "Germany Passport Photo",
    category: "Passport Photos",
    specCode: "germany-passport",
    kind: "passport",
    color: "#7f1d1d",
    label: "GERMANY",
    tab: "related",
  },
  {
    slug: "china-visa-photo",
    title: "China Visa Photo",
    category: "Visa Photos",
    specCode: "china-visa",
    kind: "visa",
    color: "#9f1239",
    label: "CHINA",
    tab: "related",
  },
  {
    slug: "india-visa-photo",
    title: "India Visa Photo",
    category: "Visa Photos",
    specCode: "india-visa",
    kind: "visa",
    color: "#1e3a8a",
    label: "INDIA",
    tab: "related",
  },
  {
    slug: "uk-visa-photo",
    title: "UK Visa Photo",
    category: "Visa Photos",
    specCode: "uk-visa",
    kind: "visa",
    color: "#7f1d1d",
    label: "UK VISA",
    tab: "related",
  },
  {
    slug: "philippines-visa-photo",
    title: "Philippines Visa Photo",
    category: "Visa Photos",
    specCode: "philippines-visa",
    kind: "visa",
    color: "#1d4ed8",
    label: "PH VISA",
    tab: "related",
  },
];

function toCard(doc: PlannedDocument, style: CoverStyle): RequirementCard {
  return {
    slug: doc.slug,
    title: style.title ?? doc.title,
    href: plannedDocumentHref(doc),
    kind: style.kind,
    color: style.color,
    label: style.label,
    tab: style.tab,
  };
}

const catalogCards: RequirementCard[] = [
  ...allDocumentsList.map((doc) =>
    toCard(
      doc,
      coverStyles[doc.slug] ?? {
        kind: doc.category === "Visa Photos" ? "visa" : "passport",
        color: "#0f766e",
        label: "DOC",
        tab: doc.popularGroup ? "popular" : "related",
      },
    ),
  ),
  ...extraRelated.map((doc) => toCard(doc, doc)),
];

const popularOrder = [
  "uae-passport-photo",
  "saudi-arabia-passport-photo",
  "india-passport-photo",
  "uk-passport-photo",
  "emirates-id-photo",
  "pakistan-passport-photo",
  "philippines-passport-photo",
  "40x60-mm-photo",
  "uae-visa-photo",
  "dubai-visa-photo",
  "schengen-visa-photo",
  "us-visa-photo",
  "canada-visa-photo",
  "uae-residence-photo",
];

export const requirementCards: RequirementCard[] = [...catalogCards].sort(
  (a, b) => {
    const ai = popularOrder.indexOf(a.slug);
    const bi = popularOrder.indexOf(b.slug);
    if (a.tab !== b.tab) return a.tab === "popular" ? -1 : 1;
    if (ai === -1 && bi === -1) return a.title.localeCompare(b.title);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  },
);

export const uaeRequirementSlugs = [
  "emirates-id-photo",
  "uae-passport-photo",
  "uae-visa-photo",
  "uae-residence-photo",
  "uae-evisa-photo",
  "dubai-visa-photo",
];
