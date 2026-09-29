"use client";

import { useId, useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { FAQ_ITEMS, type FaqItem } from "@/data/faq";

type FaqSectionProps = {
  items?: FaqItem[];
};

export default function FaqSection({ items = FAQ_ITEMS }: FaqSectionProps) {
  const baseId = useId();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <section
      id="faq"
      aria-labelledby={`${baseId}-heading`}
      className="relative overflow-hidden py-16 sm:py-20"
      style={{
        background:
          "linear-gradient(180deg, #f8fafc 0%, #ffffff 42%, #f0f7f3 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-[radial-gradient(ellipse_at_top,_rgba(15,23,42,0.06),_transparent_70%)]" />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
            <HelpCircle className="h-4 w-4" aria-hidden />
            FAQ · UAE &amp; GCC
          </p>
          <h2
            id={`${baseId}-heading`}
            className="font-display mb-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            Passport &amp; ID Photo Questions
          </h2>
          <p className="mx-auto max-w-xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Clear answers for Dubai, Abu Dhabi, Sharjah, and GCC expats needing
            ICP-, GDRFA-, and visa-ready photos online.
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          {items.map((item) => {
            const isOpen = openId === item.id;
            const panelId = `${baseId}-panel-${item.id}`;
            const buttonId = `${baseId}-button-${item.id}`;

            return (
              <div
                key={item.id}
                className={`rounded-2xl border bg-white shadow-sm transition-[border-color,box-shadow] duration-200 ${
                  isOpen
                    ? "border-emerald-200 shadow-emerald-900/5"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <h3 className="text-base font-semibold text-slate-900 sm:text-lg">
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() =>
                      setOpenId((current) =>
                        current === item.id ? null : item.id,
                      )
                    }
                    className="flex w-full items-start gap-3 px-4 py-4 text-left sm:gap-4 sm:px-5 sm:py-5"
                  >
                    <span className="min-w-0 flex-1 leading-snug text-balance">
                      {item.question}
                    </span>
                    <span
                      className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-200 ${
                        isOpen
                          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                      aria-hidden
                    >
                      <ChevronDown
                        className={`h-4 w-4 transition-transform duration-300 ease-out ${
                          isOpen ? "rotate-180" : "rotate-0"
                        }`}
                      />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="border-t border-slate-100 px-4 pb-4 pt-3 text-sm leading-relaxed text-slate-600 sm:px-5 sm:pb-5 sm:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
