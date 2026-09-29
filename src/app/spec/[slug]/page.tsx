import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  documentPath,
  getDocumentPageBySlug,
  getRelatedDocumentLinks,
  getSpecSnapshot,
  getStaticDocumentParams,
  makePhotoHref,
} from "@/lib/document-catalog";
import RelatedLinks from "@/components/RelatedLinks";
import BrandLogo from "@/components/BrandLogo";
import SiteDocumentNav from "@/components/SiteDocumentNav";
import { SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";
import { Ruler, CheckCircle2, Camera } from "lucide-react";

type SpecPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getStaticDocumentParams();
}

export async function generateMetadata({
  params,
}: SpecPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getDocumentPageBySlug(slug);
  if (!page) {
    return { title: "Document photo guide" };
  }

  const canonical = absoluteUrl(documentPath(page));

  return {
    title: `${page.title} | ${SITE_NAME}`,
    description: page.description,
    alternates: {
      canonical,
    },
    openGraph: {
      title: page.title,
      description: page.description,
      url: canonical,
      siteName: SITE_NAME,
      type: "article",
      locale: "en_AE",
    },
  };
}

export default async function SpecDocumentPage({ params }: SpecPageProps) {
  const { slug } = await params;
  const page = getDocumentPageBySlug(slug);
  if (!page) {
    notFound();
  }

  const spec = getSpecSnapshot(page.specCode);
  if (!spec) {
    notFound();
  }

  const related = getRelatedDocumentLinks(page);
  const makeHref = makePhotoHref(page.specCode);
  const pageUrl = `${SITE_URL}${documentPath(page)}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: SITE_NAME, url: SITE_URL },
    about: {
      "@type": "Service",
      name: page.title,
      areaServed: "United Arab Emirates",
    },
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="GetIDPhotoAI home">
            <BrandLogo height={56} />
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 md:flex">
            <Link href="/" className="hover:text-emerald-700">
              Home
            </Link>
            <Link href="/make-photo" className="hover:text-emerald-700">
              Make photo
            </Link>
            <Link
              href={makeHref}
              className="rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:bg-primary-hover"
            >
              Create this photo
            </Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <nav className="mb-6 text-sm text-slate-500" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-emerald-700">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/spec" className="hover:text-emerald-700">
                Document guides
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-slate-800">{page.shortTitle}</li>
          </ol>
        </nav>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-wide text-emerald-800">
            {page.country.replace(/-/g, " ")} ·{" "}
            {page.document.replace(/-/g, " ")}
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-slate-600 sm:text-lg">
            {page.description}
          </p>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
              <Camera className="mb-2 h-5 w-5 text-emerald-700" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Spec code
              </p>
              <p className="mt-1 font-medium text-slate-900">
                {spec.specCodeInEnglish}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
              <Ruler className="mb-2 h-5 w-5 text-emerald-700" aria-hidden />
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Print size
              </p>
              <p className="mt-1 font-medium text-slate-900">
                {spec.widthUnit} × {spec.heightUnit} {spec.unit}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-4">
              <CheckCircle2
                className="mb-2 h-5 w-5 text-emerald-700"
                aria-hidden
              />
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Background
              </p>
              <p className="mt-1 font-medium capitalize text-slate-900">
                {spec.bgColorText}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={makeHref}
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-primary-hover"
            >
              Make {spec.specCodeInEnglish} photo now
            </Link>
            <Link
              href="/make-photo"
              className="inline-flex items-center justify-center rounded-lg border-2 border-emerald-700 px-6 py-3 text-center text-base font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
            >
              Browse all photo types
            </Link>
          </div>
        </article>

        <div className="mt-10">
          <RelatedLinks
            links={related}
            currentTitle={page.title}
            heading="Related UAE & GCC photo guides"
            subtitle="Cross-link to sibling document pages so you can compare official photo requirements."
          />
        </div>
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-slate-900 py-12 text-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <BrandLogo height={48} variant="light" />
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-400">
              Government-compliant UAE passport, Emirates ID, Dubai visa, and
              GCC document photos online at GetIDPhotoAI.ae.
            </p>
          </div>
          <SiteDocumentNav
            variant="primary"
            heading="Top document guides"
            linkClassName="rounded-sm text-slate-400 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          />
        </div>
      </footer>
    </div>
  );
}
