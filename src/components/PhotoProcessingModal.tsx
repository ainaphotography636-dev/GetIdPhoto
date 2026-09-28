"use client";

import { useEffect, useState } from "react";
import { Check, X } from "lucide-react";

const STEPS = [
  "Checking face",
  "Cropping",
  "Background removing",
  "Resizing",
] as const;

type PhotoProcessingModalProps = {
  open: boolean;
  previewUrl: string;
  onClose?: () => void;
};

export default function PhotoProcessingModal({
  open,
  previewUrl,
  onClose,
}: PhotoProcessingModalProps) {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    if (!open) {
      setActiveStep(0);
      return;
    }

    setActiveStep(0);
    const timers = [
      window.setTimeout(() => setActiveStep(1), 900),
      window.setTimeout(() => setActiveStep(2), 2200),
      window.setTimeout(() => setActiveStep(3), 3600),
    ];

    return () => timers.forEach((id) => window.clearTimeout(id));
  }, [open]);

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/70 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">
        {onClose ? (
          <button
            type="button"
            onClick={onClose}
            className="absolute right-4 top-4 z-10 rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        ) : null}

        <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center">
          <div>
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-slate-900">
              Preparing your photo
            </h2>

            <ol className="relative">
              {STEPS.map((label, index) => {
                const done = index < activeStep;
                const current = index === activeStep;
                const upcoming = index > activeStep;

                return (
                  <li key={label} className="relative flex gap-4 pb-6 last:pb-0">
                    {index < STEPS.length - 1 ? (
                      <span
                        className={`absolute left-[15px] top-8 h-[calc(100%-1.5rem)] w-px ${
                          done ? "bg-primary" : "bg-slate-200"
                        }`}
                        aria-hidden
                      />
                    ) : null}

                    <span
                      className={`relative z-[1] flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        done
                          ? "bg-primary text-white"
                          : current
                            ? "bg-slate-900 text-white"
                            : "border-2 border-slate-200 bg-white text-slate-400"
                      }`}
                    >
                      {done ? (
                        <Check className="h-4 w-4" strokeWidth={3} />
                      ) : (
                        index + 1
                      )}
                    </span>

                    <span
                      className={`pt-1 text-base ${
                        current
                          ? "font-semibold text-slate-900"
                          : upcoming
                            ? "font-medium text-slate-400"
                            : "font-medium text-slate-500"
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-[280px] overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={previewUrl}
                alt="Photo being processed"
                className="aspect-[3/4] w-full object-cover object-top"
              />

              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="photo-scan-band absolute inset-x-0">
                  <div className="relative h-16 bg-gradient-to-b from-primary/5 via-primary/25 to-primary/5">
                    <div className="absolute inset-x-0 top-0 flex items-center">
                      <span className="h-0 w-0 border-y-[5px] border-l-[7px] border-y-transparent border-l-primary" />
                      <span className="h-px flex-1 border-t border-dashed border-primary" />
                      <span className="h-0 w-0 border-y-[5px] border-r-[7px] border-y-transparent border-r-primary" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
