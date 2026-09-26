import { Check, X, Clock3, Sparkles, BadgeCheck } from "lucide-react";

type Example = {
  title: string;
  valid: boolean;
  src: string;
  alt: string;
};

const examples: Example[] = [
  {
    title: "Proper lighting",
    valid: true,
    src: "/guidelines/guideline-lighting.jpg",
    alt: "Evenly lit passport portrait with no shadows on the face",
  },
  {
    title: "Face visible with a religious headgear",
    valid: true,
    src: "/guidelines/guideline-hijab.jpg",
    alt: "Passport portrait of a woman in a hijab with her full face visible",
  },
  {
    title: "Neutral facial expression",
    valid: true,
    src: "/guidelines/guideline-neutral.jpg",
    alt: "Passport portrait with a closed mouth and a neutral expression",
  },
  {
    title: "Shadow across the face",
    valid: false,
    src: "/guidelines/guideline-shadow.jpg",
    alt: "Portrait with a dark shadow covering one side of the face",
  },
  {
    title: "Religious headgear covering the face",
    valid: false,
    src: "/guidelines/guideline-covered.jpg",
    alt: "Portrait where religious headgear covers the nose and mouth",
  },
  {
    title: "Smile",
    valid: false,
    src: "/guidelines/guideline-smile.jpg",
    alt: "Portrait of a person smiling, which is not accepted for a passport photo",
  },
];

const features = [
  {
    title: "3-Minute Passport Photo",
    body: "Take your photo at home. No driving or waiting in line.",
    icon: Clock3,
    className: "bg-amber-300 text-slate-900",
  },
  {
    title: "Professional Service",
    body: "AI technology and passport photo experts, with instant feedback.",
    icon: Sparkles,
    className: "bg-slate-900 text-white",
  },
  {
    title: "100% Compliance",
    body: "Acceptance, or a double money-back guarantee.",
    icon: BadgeCheck,
    className: "bg-white text-slate-900 border border-slate-200",
  },
];

export default function PhotoGuidelines() {
  return (
    <section className="bg-stone-50 py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Emirates ID &amp; Visa Photo Guidelines: Dos and Don&apos;ts
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-slate-600 sm:text-lg">
            Match the accepted examples before you upload. A compliant photo is more likely to pass ICP and GDRFA checks.
          </p>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
          {examples.map((example) => (
            <article
              key={example.title}
              className="overflow-hidden rounded-xl bg-white shadow-sm"
            >
              <div className="relative aspect-square bg-stone-200">
                <img
                  src={example.src}
                  alt={example.alt}
                  className="h-full w-full object-cover object-[center_18%]"
                />
                <span
                  className={`absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full text-white shadow-md ${
                    example.valid ? "bg-emerald-500" : "bg-red-500"
                  }`}
                >
                  {example.valid ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : <X className="h-3.5 w-3.5" strokeWidth={3} />}
                </span>
              </div>
              <p className="px-2.5 py-2.5 text-center text-sm font-medium text-slate-800">
                {example.title}
              </p>
            </article>
          ))}
        </div>

        <h3 className="mb-8 mt-14 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
          Can I Take My Own Emirati Passport Photo?
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <article
                key={feature.title}
                className={`rounded-2xl p-6 shadow-md ${feature.className}`}
              >
                <Icon className="mb-4 h-8 w-8" />
                <h4 className="text-lg font-bold">{feature.title}</h4>
                <p className={`mt-2 text-sm leading-relaxed ${feature.className.includes("text-white") ? "text-slate-200" : "text-slate-700"}`}>
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
