"use client";

import { useMemo, useState } from "react";
import { MessageCircle } from "lucide-react";
import { constants } from "@/constants";

type HumanVerifiedContactFieldsProps = {
  email: string;
  whatsapp: string;
  onEmailChange: (value: string) => void;
  onWhatsappChange: (value: string) => void;
  /** Compact styling for dark selected package panels */
  variant?: "light" | "dark";
  /** True when the shopper chose the WhatsApp quick-link path instead of typing a number. */
  whatsappQuickLink?: boolean;
  onWhatsappQuickLinkChange?: (preferred: boolean) => void;
};

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Accepts +971… / 05… / digits with spaces; requires at least 8 digits. */
export function isValidWhatsapp(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

/** Empty is allowed (optional). Non-empty values must look like an email. */
export function isOptionalEmailValid(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    return true;
  }
  return isValidEmail(trimmed);
}

/** Empty is allowed (optional). Non-empty values must look like a phone number. */
export function isOptionalWhatsappValid(value: string): boolean {
  const trimmed = value.trim();
  if (!trimmed) {
    return true;
  }
  return isValidWhatsapp(trimmed);
}

function businessWhatsAppDigits(): string {
  const fromConstants = constants.businessLocations[0]?.whatsapp || "";
  const fromEnv = (
    process.env.NEXT_PUBLIC_BUSINESS_WHATSAPP ||
    constants.businessLocations[0]?.phone ||
    ""
  ).replace(/\D/g, "");
  return fromConstants || fromEnv || "971559461415";
}

export default function HumanVerifiedContactFields({
  email,
  whatsapp,
  onEmailChange,
  onWhatsappChange,
  variant = "light",
  whatsappQuickLink = false,
  onWhatsappQuickLinkChange,
}: HumanVerifiedContactFieldsProps) {
  const isDark = variant === "dark";
  const [quickLinkOpened, setQuickLinkOpened] = useState(whatsappQuickLink);
  const studioWhatsApp = useMemo(() => businessWhatsAppDigits(), []);

  const labelClass = isDark ? "text-white" : "text-slate-800";
  const hintClass = isDark ? "text-emerald-50/90" : "text-emerald-800";
  const trustClass = isDark ? "text-emerald-100/90" : "text-emerald-700";

  const openWhatsAppQuickLink = () => {
    const trimmedEmail = email.trim();
    const message = [
      `Hi ${constants.studioName},`,
      "I chose Human Verified and would like review updates on WhatsApp.",
      trimmedEmail ? `My email: ${trimmedEmail}` : "I'll share my email at checkout.",
      "Please use this chat for retakes or review notes. Thanks!",
    ].join("\n");

    const url = studioWhatsApp
      ? `https://wa.me/${studioWhatsApp}?text=${encodeURIComponent(message)}`
      : `https://wa.me/?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
    setQuickLinkOpened(true);
    onWhatsappQuickLinkChange?.(true);
  };

  return (
    <div
      className={`mb-6 rounded-xl border p-5 ${
        isDark
          ? "border-white/30 bg-white/10"
          : "border-emerald-200 bg-emerald-50"
      }`}
    >
      <h4
        className={`mb-1 text-base font-semibold ${
          isDark ? "text-white" : "text-emerald-950"
        }`}
      >
        Contact for human review
      </h4>
      <p className={`mb-4 text-sm ${hintClass}`}>
        Both fields are optional. Share email and/or WhatsApp if you want review
        updates — or use the quick link without typing your number.
      </p>

      <div className="grid gap-4">
        <label className="block text-sm">
          <span className={`mb-1.5 block font-medium ${labelClass}`}>
            Email{" "}
            <span
              className={`font-normal ${
                isDark ? "text-emerald-100/80" : "text-emerald-700/80"
              }`}
            >
              (optional)
            </span>
          </span>
          <input
            type="email"
            name="reviewerEmail"
            autoComplete="email"
            inputMode="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-primary focus:ring-2"
          />
        </label>

        <div className="block text-sm">
          <div className="mb-1.5 flex flex-wrap items-center justify-between gap-2">
            <span className={`font-medium ${labelClass}`}>
              WhatsApp number{" "}
              <span
                className={`font-normal ${
                  isDark ? "text-emerald-100/80" : "text-emerald-700/80"
                }`}
              >
                (optional)
              </span>
            </span>
            <button
              type="button"
              onClick={openWhatsAppQuickLink}
              className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
                isDark
                  ? "border-white/40 bg-white/10 text-white hover:bg-white/20"
                  : "border-emerald-300 bg-white text-emerald-800 hover:bg-emerald-100"
              }`}
            >
              <MessageCircle className="h-3.5 w-3.5" aria-hidden />
              Quick link via WhatsApp
            </button>
          </div>

          {quickLinkOpened || whatsappQuickLink ? (
            <p
              className={`mb-2 rounded-lg border px-3 py-2 text-xs ${
                isDark
                  ? "border-emerald-300/40 bg-emerald-900/30 text-emerald-50"
                  : "border-emerald-200 bg-white text-emerald-800"
              }`}
            >
              WhatsApp opened with a pre-filled message. You can skip the number
              field — we&apos;ll use that chat for review updates.
            </p>
          ) : null}

          <label className="block">
            <span className="sr-only">WhatsApp number (optional)</span>
            <input
              type="tel"
              name="reviewerWhatsapp"
              autoComplete="tel"
              inputMode="tel"
              value={whatsapp}
              onChange={(e) => {
                onWhatsappChange(e.target.value);
                if (e.target.value.trim()) {
                  onWhatsappQuickLinkChange?.(false);
                  setQuickLinkOpened(false);
                }
              }}
              placeholder="+971 50 123 4567"
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-primary focus:ring-2"
            />
          </label>
          <p className={`mt-2 flex items-start gap-1.5 text-xs leading-snug ${trustClass}`}>
            <span aria-hidden>🔒</span>
            <span>
              Used only for review updates or photo retakes. No spam, guaranteed.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
