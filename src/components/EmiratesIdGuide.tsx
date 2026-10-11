import Image from "next/image";
import { Check, Eye, Ruler, Square, UserRound, X } from "lucide-react";
import {
  emiratesIdData,
  type EmiratesIdGuideExample,
  type EmiratesIdOfficialSpecId,
  type EmiratesIdPageContent,
} from "@/data/emiratesIdData";
import type { UaePassportPageContent } from "@/data/uaePassportData";
import type { PageSpec } from "@/data/uaePagesData";

const specIcons: Record<
  EmiratesIdOfficialSpecId,
  typeof Ruler
> = {
  size: Ruler,
  background: Square,
  headRatio: UserRound,
  expression: Eye,
};

function ExampleCard({ example }: { example: EmiratesIdGuideExample }) {
  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="relative aspect-[35/45] bg-slate-100">
        <Image
          src={example.src}
          alt={example.alt}
          fill
          className="object-cover object-center"
          sizes="(max-width: 640px) 50vw, 360px"
        />
        <span
          className={`absolute end-2 top-2 flex h-7 w-7 items-center justify-center rounded-full text-white shadow-md ${
            example.accepted ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {example.accepted ? (
            <Check className="h-4 w-4" strokeWidth={3} aria-hidden />
          ) : (
            <X className="h-4 w-4" strokeWidth={3} aria-hidden />
          )}
          <span className="sr-only">
            {example.accepted ? "Accepted" : "Rejected"}
          </span>
        </span>
      </div>
      <div className="px-3 py-3 text-center">
        <p className="text-sm font-semibold leading-snug text-slate-900">
          {example.title}
        </p>
        <p
          className={`mt-1 text-xs font-semibold uppercase tracking-wide ${
            example.accepted ? "text-emerald-700" : "text-red-600"
          }`}
        >
          {example.accepted ? "Accepted" : "Rejected"}
        </p>
      </div>
    </article>
  );
}

type EmiratesIdGuideProps = {
  content?: EmiratesIdPageContent &
    Partial<Pick<UaePassportPageContent, "dosIntro" | "specsHeading" | "dosHeading">>;
  pageSpec?: PageSpec;
  showOfficialSpecs?: boolean;
};

export default function EmiratesIdGuide({
  content,
  pageSpec,
  showOfficialSpecs = true,
}: EmiratesIdGuideProps) {
  const page = content ?? emiratesIdData;
  const dosIntro =
    content && "dosIntro" in content && content.dosIntro
      ? content.dosIntro
      : "Check lighting, expression, headwear, and background against these examples before you upload.";

  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      {showOfficialSpecs ? (
      <section aria-labelledby="official-specifications-title">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="official-specifications-title"
            className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
          >
            {content?.specsHeading ?? "Official Specifications"}
          </h2>
          <p className="flex flex-col gap-1 text-sm text-slate-500 sm:items-end">
            <span>Last Updated: {page.lastUpdated}</span>
            <span>Reviewed by {page.reviewedBy}</span>
          </p>
        </div>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.officialSpecs.map((spec) => {
            const Icon = specIcons[spec.id];
            const value =
              pageSpec && spec.id === "size"
                ? pageSpec.dimensions
                : pageSpec && spec.id === "background"
                  ? pageSpec.background
                  : spec.value;
            return (
              <li
                key={spec.id}
                className="rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm"
              >
                <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
                  <Icon className="h-5 w-5" aria-hidden />
                </span>
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  {spec.label}
                </p>
                <p className="mt-1 text-base font-semibold text-slate-900">
                  {value}
                </p>
              </li>
            );
          })}
        </ul>
        {pageSpec ? (
          <div className="mt-6 max-w-4xl rounded-2xl border border-emerald-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold text-emerald-800">
              {pageSpec.authority}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {pageSpec.targetAudience}
            </p>
            <ul className="mt-4 grid gap-2 sm:grid-cols-3">
              {pageSpec.keyRules.map((rule) => (
                <li
                  key={rule}
                  className="rounded-xl bg-emerald-50 px-3 py-2 text-sm font-medium text-slate-800"
                >
                  {rule}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </section>
      ) : null}

      <section aria-labelledby="dos-donts-title">
        <h2
          id="dos-donts-title"
          className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          {content?.dosHeading ?? "Visual Dos & Don'ts Guide"}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          {dosIntro}
        </p>

        <h3 className="mb-4 mt-8 text-lg font-semibold text-emerald-800">
          Accepted
        </h3>
        <ul className="grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
          {page.acceptedExamples.map((example) => (
            <li key={example.id}>
              <ExampleCard example={example} />
            </li>
          ))}
        </ul>

        <h3 className="mb-4 mt-10 text-lg font-semibold text-red-700">
          Rejected
        </h3>
        <ul className="grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
          {page.rejectedExamples.map((example) => (
            <li key={example.id}>
              <ExampleCard example={example} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
