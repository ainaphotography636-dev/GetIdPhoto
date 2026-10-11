"use client";

import { useState } from "react";
import Link from "next/link";
import DocumentCover from "@/components/DocumentCover";
import type { RequirementCard, RequirementTab } from "@/data/requirementCards";

const tabs: Array<{ id: RequirementTab; label: string }> = [
  { id: "popular", label: "Popular documents" },
  { id: "related", label: "Related documents" },
];

type RequirementsCatalogProps = {
  cards: RequirementCard[];
  showTabs?: boolean;
};

export default function RequirementsCatalog({
  cards,
  showTabs = false,
}: RequirementsCatalogProps) {
  const [tab, setTab] = useState<RequirementTab>("popular");
  const visible = showTabs ? cards.filter((card) => card.tab === tab) : cards;

  return (
    <div>
      {showTabs ? (
        <div className="mt-8 flex gap-8 border-b border-slate-200">
          {tabs.map((item) => {
            const active = tab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setTab(item.id)}
                className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors sm:text-base ${
                  active
                    ? "border-primary text-slate-900"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      ) : null}

      <ul
        className={`grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4 ${
          showTabs ? "mt-8" : "mt-10"
        }`}
      >
        {visible.map((card) => (
          <li key={card.slug}>
            <Link
              href={card.href}
              className="group flex h-full flex-col items-center rounded-2xl bg-slate-50 px-3 pb-5 pt-6 shadow-[0_1px_2px_rgba(15,23,42,0.05)] ring-1 ring-slate-100 transition duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-slate-200"
            >
              <span className="flex h-36 w-full items-center justify-center sm:h-40">
                <span
                  className={
                    card.kind === "passport" || card.kind === "print"
                      ? "h-32 w-[4.6rem] sm:h-36 sm:w-20"
                      : "w-[88%] max-w-[11rem]"
                  }
                >
                  <DocumentCover
                    kind={card.kind}
                    color={card.color}
                    label={card.label}
                  />
                </span>
              </span>
              <span className="mt-4 min-h-10 text-center text-sm font-medium leading-snug text-slate-800">
                {card.title}
              </span>
              <span className="mt-3 inline-flex rounded-full border border-slate-300 bg-white px-4 py-1.5 text-sm font-medium text-slate-800 transition-colors group-hover:border-primary group-hover:text-primary">
                Get started
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
