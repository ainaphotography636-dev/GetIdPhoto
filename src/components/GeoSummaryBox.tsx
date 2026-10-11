import { Check } from "lucide-react";
import type { PageSpec } from "@/data/uaePagesData";

const specRows = [
  { label: "Governing Body", key: "authority" },
  { label: "Photo Dimensions", key: "dimensions" },
  { label: "Background Requirements", key: "background" },
  { label: "Target Application", key: "targetAudience" },
] as const;

export default function GeoSummaryBox({ pageData }: { pageData: PageSpec }) {
  return (
    <section
      aria-labelledby="official-requirements-overview"
      className="bg-slate-50 text-slate-900"
    >
      <div className="mx-auto max-w-6xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm">
          <div className="border-s-4 border-primary px-4 py-3.5 sm:px-5">
            <h2
              id="official-requirements-overview"
              className="text-base font-semibold tracking-tight text-slate-900 sm:text-lg"
            >
              Official Requirements Overview
            </h2>
            <p className="mt-1 max-w-4xl text-sm leading-snug text-slate-600">
              {pageData.overviewLead}
            </p>
          </div>

          <dl className="grid gap-px border-t border-slate-100 bg-slate-100 sm:grid-cols-2 lg:grid-cols-4">
            {specRows.map((row) => (
              <div key={row.key} className="bg-white px-4 py-2.5">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-emerald-700">
                  {row.label}
                </dt>
                <dd className="mt-1 text-sm font-medium leading-snug text-slate-900">
                  {pageData[row.key]}
                </dd>
              </div>
            ))}
          </dl>

          <ul className="flex flex-wrap gap-2 border-t border-slate-100 bg-emerald-50/60 px-4 py-3 sm:px-5">
            {pageData.keyRules.map((rule) => (
              <li
                key={rule}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-800"
              >
                <Check
                  className="h-3.5 w-3.5 shrink-0 text-emerald-600"
                  strokeWidth={3}
                  aria-hidden
                />
                {rule}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
