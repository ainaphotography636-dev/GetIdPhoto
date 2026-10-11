import Link from "next/link";
import {
  ALL_VIEW_HREF,
  ALL_VIEW_LABEL,
  allDocumentsList,
  plannedDocumentHref,
  popularRequirementGroups,
  type PlannedDocument,
} from "@/data/allDocumentsList";

type RelatedDocumentsProps = {
  /** Slug of the page being viewed, omitted from the link list. */
  currentSlug?: string;
  className?: string;
};

function linksForGroup(groupId: (typeof popularRequirementGroups)[number]["id"], currentSlug?: string) {
  return allDocumentsList.filter(
    (doc) => doc.popularGroup === groupId && doc.slug !== currentSlug,
  );
}

function DocumentLinkItem({ doc }: { doc: PlannedDocument }) {
  return (
    <li>
      <Link
        href={plannedDocumentHref(doc)}
        className="text-sm font-medium text-slate-800 underline-offset-4 transition-colors hover:text-emerald-800 hover:underline focus-visible:text-emerald-800 focus-visible:underline focus-visible:outline-none"
      >
        {doc.title}
      </Link>
    </li>
  );
}

/**
 * Compact popular-document links at the bottom of document pages.
 */
export default function RelatedDocuments({
  currentSlug,
  className = "",
}: RelatedDocumentsProps) {
  return (
    <section
      aria-labelledby="related-documents-heading"
      className={`bg-slate-50 ${className}`}
    >
      <div className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="border-s-4 border-primary px-4 py-3 sm:px-5">
            <h2
              id="related-documents-heading"
              className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg"
            >
              Popular Photo Requirements for UAE Residents
            </h2>
          </div>

          <div className="grid gap-px border-t border-slate-100 bg-slate-100 sm:grid-cols-3">
            {popularRequirementGroups.map((group) => {
              const documents = linksForGroup(group.id, currentSlug);
              if (documents.length === 0) return null;

              return (
                <div key={group.id} className="bg-white px-4 py-3 sm:px-5">
                  <h3 className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                    {group.title}
                  </h3>
                  <ul className="mt-2 space-y-1.5">
                    {documents.map((doc) => (
                      <DocumentLinkItem key={doc.slug} doc={doc} />
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="border-t border-slate-100 bg-emerald-50/60 px-4 py-2.5 sm:px-5">
            <Link
              href={ALL_VIEW_HREF}
              className="text-sm font-semibold text-emerald-800 underline-offset-4 transition-colors hover:text-emerald-950 hover:underline focus-visible:outline-none"
            >
              {ALL_VIEW_LABEL}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
