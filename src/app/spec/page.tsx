import type { Metadata } from "next";
import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import SiteDocumentNav from "@/components/SiteDocumentNav";
import {
  getAllDocumentLinks,
  makePhotoHref,
} from "@/lib/document-catalog";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `UAE & GCC Passport and ID Photo Guides | ${SITE_NAME}`,
  description:
    "Browse official UAE passport, Emirates ID, Dubai visa, and GCC document photo guides with exact sizes and instant AI photo tools.",
  alternates: {
    canonical: absoluteUrl("/spec"),
  },
  openGraph: {
    title: "UAE & GCC Passport and ID Photo Guides",
    description:
      "Internal hub of GetIDPhotoAI document photo landings for UAE and GCC requirements.",
    url: `${SITE_URL}/spec`,
  },
};

export default function SpecIndexPage() {
  const links = getAllDocumentLinks();

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6">
          <Link href="/">
            <BrandLogo height={56} />
          </Link>
          <Link
            href="/make-photo"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
          >
            Make a photo
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <h1 className="font-display text-3xl font-bold text-slate-900 sm:text-4xl">
          UAE &amp; GCC document photo guides
        </h1>
        <p className="mt-3 max-w-2xl text-slate-600">
          Programmatic landings for passport, Emirates ID, Dubai visa, and GCC
          photo requirements—each page links to related document sizes for
          easier discovery.
        </p>

        <ul className="mt-10 grid gap-3 sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block rounded-xl border border-slate-200 bg-white px-5 py-4 transition-colors hover:border-emerald-300 hover:bg-emerald-50/50"
              >
                <span className="block font-semibold text-slate-900">
                  {link.anchorText}
                </span>
                <span className="mt-1 block text-sm text-slate-500">
                  {link.title}
                </span>
              </Link>
              <Link
                href={makePhotoHref(link.specCode)}
                className="mt-1 inline-block text-xs font-medium text-emerald-800 hover:underline"
              >
                Open photo tool →
              </Link>
            </li>
          ))}
        </ul>
      </main>

      <footer className="border-t border-slate-200 bg-slate-900 py-10 text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SiteDocumentNav
            variant="primary"
            heading="Top-tier guides"
            linkClassName="text-slate-400 hover:text-white"
          />
        </div>
      </footer>
    </div>
  );
}
