"use client";

import { Check, X, Clock3, Sparkles, BadgeCheck } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/en";

const featureIcons = {
  fast: Clock3,
  pro: Sparkles,
  compliance: BadgeCheck,
} as const;

const featureStyles: Record<string, string> = {
  fast: "bg-amber-300 text-slate-900",
  pro: "bg-slate-900 text-white",
  compliance: "bg-white text-slate-900 border border-slate-200",
};

type PhotoGuidelinesProps = {
  copy: Dictionary["guidelines"];
};

export default function PhotoGuidelines({ copy }: PhotoGuidelinesProps) {
  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            {copy.title}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
            {copy.subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {copy.examples.map((example) => (
            <article
              key={example.id}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className="relative aspect-square bg-stone-200">
                <img
                  src={example.src}
                  alt={example.alt}
                  className="h-full w-full object-cover object-[center_18%]"
                />
                <span
                  className={`absolute end-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-md ${
                    example.valid ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {example.valid ? (
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  ) : (
                    <X className="h-3.5 w-3.5" strokeWidth={3} />
                  )}
                </span>
              </div>
              <p className="px-2.5 py-2.5 text-center text-sm font-medium text-slate-800">
                {example.title}
              </p>
            </article>
          ))}
        </div>

        <h3 className="mb-8 mt-14 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          {copy.diyTitle}
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {copy.features.map((feature) => {
            const Icon =
              featureIcons[feature.id as keyof typeof featureIcons] ?? Sparkles;
            const className =
              featureStyles[feature.id] ??
              "bg-white text-slate-900 border border-slate-200";
            return (
              <article
                key={feature.id}
                className={`rounded-2xl p-6 shadow-md ${className}`}
              >
                <Icon className="mb-4 h-8 w-8" />
                <h4 className="text-lg font-bold">{feature.title}</h4>
                <p
                  className={`mt-2 text-sm leading-relaxed ${
                    className.includes("text-white")
                      ? "text-slate-200"
                      : "text-slate-700"
                  }`}
                >
                  {feature.body}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
