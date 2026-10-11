import Link from "next/link";
import BrandLogo from "@/components/BrandLogo";
import RequirementsCatalog from "@/components/RequirementsCatalog";
import ServicesMenu from "@/components/ServicesMenu";
import SiteDocumentNav from "@/components/SiteDocumentNav";
import type { RequirementCard } from "@/data/requirementCards";

type DocumentGuidesIndexProps = {
  title: string;
  cards: RequirementCard[];
  showTabs?: boolean;
};

export default function DocumentGuidesIndex({
  title,
  cards,
  showTabs = false,
}: DocumentGuidesIndexProps) {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="GetIDPhotoAI home">
            <BrandLogo height={56} />
          </Link>
          <div className="flex items-center gap-4">
            <ServicesMenu label="Services" className="hidden sm:block" />
            <Link
              href="/make-photo"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover"
            >
              Make a photo
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <h1 className="font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {title}
        </h1>
        <RequirementsCatalog cards={cards} showTabs={showTabs} />
      </main>

      <footer className="mt-8 border-t border-slate-200 bg-slate-900 py-10 text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SiteDocumentNav
            variant="primary"
            heading="Document photo guides"
            linkClassName="text-slate-400 hover:text-white"
          />
        </div>
      </footer>
    </div>
  );
}
