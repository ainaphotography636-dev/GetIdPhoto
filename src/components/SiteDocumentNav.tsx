import Link from "next/link";
import {
  getAllDocumentLinks,
  getPrimaryDocumentLinks,
  type DocumentLink,
} from "@/lib/document-catalog";

type SiteDocumentNavProps = {
  /** `primary` for header/footer top-tier; `all` for fuller discovery */
  variant?: "primary" | "all";
  className?: string;
  linkClassName?: string;
  /** Optional heading for footer blocks */
  heading?: string;
  /** Limit number of links (useful in compact headers) */
  limit?: number;
  /** Prefer short titles in compact footers */
  useShortTitle?: boolean;
};

/**
 * Dynamic map of core document landings for crawler discovery
 * from global navigation and footer.
 */
export default function SiteDocumentNav({
  variant = "primary",
  className = "",
  linkClassName = "rounded-sm text-gray-400 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900",
  heading,
  limit,
  useShortTitle = true,
}: SiteDocumentNavProps) {
  const links: DocumentLink[] =
    variant === "all" ? getAllDocumentLinks() : getPrimaryDocumentLinks();
  const items = typeof limit === "number" ? links.slice(0, limit) : links;

  return (
    <nav className={className} aria-label={heading || "Document photo guides"}>
      {heading ? (
        <h4 className="mb-4 font-semibold text-white">{heading}</h4>
      ) : null}
      <ul className="space-y-2">
        {items.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={linkClassName}
              title={link.title}
              aria-label={`${link.shortTitle}: ${link.anchorText}`}
            >
              {useShortTitle ? link.shortTitle : link.anchorText}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
