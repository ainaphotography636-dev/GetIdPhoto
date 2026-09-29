import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { DocumentLink } from "@/lib/document-catalog";
import { makePhotoHref } from "@/lib/document-catalog";

type RelatedLinksProps = {
  links: DocumentLink[];
  /** Optional current page title for the section heading */
  currentTitle?: string;
  heading?: string;
  subtitle?: string;
  className?: string;
  /** When true, also show a CTA to the make-photo flow for the first link's siblings */
  showMakePhotoCtas?: boolean;
};

/**
 * Automated internal linking block for document/spec landings.
 * Uses descriptive SEO anchor text from the document catalog.
 */
export default function RelatedLinks({
  links,
  currentTitle,
  heading = "Related passport & ID photo guides",
  subtitle = "Explore sibling UAE and GCC document photo pages to find the exact size you need.",
  className = "",
  showMakePhotoCtas = true,
}: RelatedLinksProps) {
  if (links.length === 0) {
    return null;
  }

  return (
    <section
      className={`rounded-2xl border border-emerald-100 bg-emerald-50/60 p-6 sm:p-8 ${className}`}
      aria-labelledby="related-links-heading"
    >
      <div className="mb-5 max-w-2xl">
        <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-emerald-800">
          Internal guides
        </p>
        <h2
          id="related-links-heading"
          className="font-display text-2xl font-bold text-slate-900 sm:text-3xl"
        >
          {heading}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
          {currentTitle
            ? `${subtitle} Looking beyond ${currentTitle}?`
            : subtitle}
        </p>
      </div>

      <ul className="grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="group flex items-start justify-between gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3.5 transition-colors hover:border-emerald-300 hover:bg-emerald-50/80"
            >
              <span className="min-w-0">
                <span className="block text-sm font-semibold leading-snug text-slate-900 group-hover:text-emerald-800 sm:text-base">
                  {link.anchorText}
                </span>
                <span className="mt-1 block text-xs text-slate-500">
                  {link.title}
                </span>
              </span>
              <ArrowUpRight
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 opacity-70 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100"
                aria-hidden
              />
            </Link>
            {showMakePhotoCtas ? (
              <Link
                href={makePhotoHref(link.specCode)}
                className="mt-1.5 inline-block ps-1 text-xs font-medium text-emerald-800 underline-offset-2 hover:underline"
              >
                Make this photo now →
              </Link>
            ) : null}
          </li>
        ))}
      </ul>
    </section>
  );
}
