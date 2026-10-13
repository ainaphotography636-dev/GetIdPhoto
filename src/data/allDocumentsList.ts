import { documentPath, getDocumentPageBySlug } from "@/lib/document-catalog";

/** Catalog buckets for planned document landings. */
export type DocumentCategory =
  | "UAE Documents"
  | "Passport Photos"
  | "Visa Photos";

/** Columns in the popular-requirements block. */
export type PopularGroupId = "uae-gcc" | "expat-passports" | "travel-visas";

export type PlannedDocument = {
  slug: string;
  title: string;
  category: DocumentCategory;
  /** Editor spec used until a dedicated guide page exists. */
  specCode: string;
  popularGroup?: PopularGroupId;
};

export const popularRequirementGroups: Array<{
  id: PopularGroupId;
  title: string;
}> = [
  { id: "uae-gcc", title: "UAE & GCC Documents" },
  { id: "expat-passports", title: "Top Expat Passports" },
  { id: "travel-visas", title: "Global Travel Visas" },
];

export const ALL_VIEW_HREF = "/requirements";
export const ALL_VIEW_LABEL = "View All 200+ Supported Country Photos →";

/**
 * Planned document pages. Live guides resolve through the document catalog;
 * the rest open the photo editor for that official size.
 */
export const allDocumentsList: PlannedDocument[] = [
  {
    slug: "emirates-id-photo",
    title: "Emirates ID Photo",
    category: "UAE Documents",
    specCode: "uae-id-card",
    popularGroup: "uae-gcc",
  },
  {
    slug: "uae-passport-photo",
    title: "UAE Passport Photo",
    category: "UAE Documents",
    specCode: "uae-passport",
  },
  {
    slug: "uae-residence-photo",
    title: "UAE Residence Photo",
    category: "UAE Documents",
    specCode: "uae-residence",
  },
  {
    slug: "40x60-mm-photo",
    title: "40x60mm Photo",
    category: "UAE Documents",
    specCode: "40x60-mm",
    popularGroup: "uae-gcc",
  },
  {
    slug: "saudi-arabia-passport-photo",
    title: "Saudi Passport Photo",
    category: "Passport Photos",
    specCode: "saudiarabia-passport",
  },
  {
    slug: "bahrain-passport-photo",
    title: "Bahrain Passport Photo",
    category: "Passport Photos",
    specCode: "bahrain-passport",
  },
  {
    slug: "oman-passport-photo",
    title: "Oman Passport Photo",
    category: "Passport Photos",
    specCode: "oman-passport",
  },
  {
    slug: "kuwait-passport-photo",
    title: "Kuwait Passport Photo",
    category: "Passport Photos",
    specCode: "kuwait-passport",
  },
  {
    slug: "india-passport-photo",
    title: "Indian Passport Photo",
    category: "Passport Photos",
    specCode: "india-passport",
    popularGroup: "expat-passports",
  },
  {
    slug: "pakistan-passport-photo",
    title: "Pakistani Passport",
    category: "Passport Photos",
    specCode: "pakistan-passport",
    popularGroup: "expat-passports",
  },
  {
    slug: "uk-passport-photo",
    title: "UK Passport",
    category: "Passport Photos",
    specCode: "uk-passport",
    popularGroup: "expat-passports",
  },
  {
    slug: "philippines-passport-photo",
    title: "Philippine Passport",
    category: "Passport Photos",
    specCode: "philippines-passport",
    popularGroup: "expat-passports",
  },
  {
    slug: "uae-visa-photo",
    title: "UAE Visa Photo",
    category: "Visa Photos",
    specCode: "uae-visa",
    popularGroup: "uae-gcc",
  },
  {
    slug: "dubai-visa-photo",
    title: "Dubai Visa Photo",
    category: "Visa Photos",
    specCode: "dubai-visa",
  },
  {
    slug: "uae-evisa-photo",
    title: "UAE eVisa Photo",
    category: "Visa Photos",
    specCode: "uae-evisa",
  },
  {
    slug: "saudi-arabia-visa-photo",
    title: "Saudi Visa Photo",
    category: "Visa Photos",
    specCode: "saudiarabia-visa",
  },
  {
    slug: "schengen-visa-photo",
    title: "Schengen Visa",
    category: "Visa Photos",
    specCode: "schengen-visa",
    popularGroup: "travel-visas",
  },
  {
    slug: "us-visa-photo",
    title: "US Visa",
    category: "Visa Photos",
    specCode: "us-visa",
    popularGroup: "travel-visas",
  },
  {
    slug: "canada-visa-photo",
    title: "Canada Visa",
    category: "Visa Photos",
    specCode: "canada-visa",
    popularGroup: "travel-visas",
  },
];

export function plannedDocumentHref(doc: PlannedDocument): string {
  const page = getDocumentPageBySlug(doc.slug);
  if (page) return documentPath(page);
  return `/make-photo?specCode=${encodeURIComponent(doc.specCode)}`;
}
