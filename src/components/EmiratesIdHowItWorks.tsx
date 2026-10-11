import { Camera, Download, Upload } from "lucide-react";
import {
  emiratesIdData,
  type EmiratesIdPageContent,
} from "@/data/emiratesIdData";
import type { UaePassportPageContent } from "@/data/uaePassportData";

const stepIcons = [Camera, Upload, Download] as const;

type EmiratesIdHowItWorksProps = {
  content?: EmiratesIdPageContent &
    Partial<Pick<UaePassportPageContent, "howIntro" | "howTitle">>;
};

export default function EmiratesIdHowItWorks({
  content,
}: EmiratesIdHowItWorksProps) {
  const page = content ?? emiratesIdData;
  const intro =
    content && "howIntro" in content && content.howIntro
      ? content.howIntro
      : "A 3-step process from smartphone selfie to an ICP-ready Emirates ID photo.";

  return (
    <section
      aria-labelledby="how-it-works-title"
      className="border-t border-slate-200 bg-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <h2
          id="how-it-works-title"
          className="font-display text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl"
        >
          {content?.howTitle ?? "How It Works"}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-600">
          {intro}
        </p>

        <ol className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {page.steps.map((step, index) => {
            const Icon = stepIcons[index] ?? Camera;
            return (
              <li
                key={step.id}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm sm:p-6"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <Icon className="h-5 w-5 text-emerald-700" aria-hidden />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
