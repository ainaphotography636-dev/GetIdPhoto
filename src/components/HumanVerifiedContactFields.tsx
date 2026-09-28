"use client";

type HumanVerifiedContactFieldsProps = {
  email: string;
  whatsapp: string;
  onEmailChange: (value: string) => void;
  onWhatsappChange: (value: string) => void;
  /** Compact styling for dark selected package panels */
  variant?: "light" | "dark";
};

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Accepts +971… / 05… / digits with spaces; requires at least 8 digits. */
export function isValidWhatsapp(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 8 && digits.length <= 15;
}

export default function HumanVerifiedContactFields({
  email,
  whatsapp,
  onEmailChange,
  onWhatsappChange,
  variant = "light",
}: HumanVerifiedContactFieldsProps) {
  const isDark = variant === "dark";

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
      <p
        className={`mb-4 text-sm ${
          isDark ? "text-emerald-50" : "text-emerald-900"
        }`}
      >
        Our reviewer will contact you by email or WhatsApp if your photo needs
        changes.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span
            className={`mb-1.5 block font-medium ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            Email
          </span>
          <input
            type="email"
            name="reviewerEmail"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-primary focus:ring-2"
          />
        </label>
        <label className="block text-sm">
          <span
            className={`mb-1.5 block font-medium ${
              isDark ? "text-white" : "text-slate-800"
            }`}
          >
            WhatsApp number
          </span>
          <input
            type="tel"
            name="reviewerWhatsapp"
            autoComplete="tel"
            required
            value={whatsapp}
            onChange={(e) => onWhatsappChange(e.target.value)}
            placeholder="+971 50 123 4567"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-slate-900 outline-none ring-primary focus:ring-2"
          />
        </label>
      </div>
    </div>
  );
}
