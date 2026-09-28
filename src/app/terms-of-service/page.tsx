import type { Metadata } from "next";
import { ArrowLeft, Scale } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import NavItem from "@/lib/nav-item";
import { constants } from "@/constants";

export const metadata: Metadata = {
  title: `Terms of Service | ${constants.studioName}`,
  description:
    "Terms of Service for GetIDPhotoAI.ae — rules for using our UAE ID and passport photo platform.",
};

const LAST_UPDATED = "September 28, 2026";
const supportEmail = "support@getidphotoai.ae";
const whatsappDisplay =
  constants.businessLocations[0]?.phone || "+971559461415";
const whatsappDigits = (
  constants.businessLocations[0]?.whatsapp || "971559461415"
).replace(/\D/g, "");

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-emerald-50/40">
      <header className="border-b border-emerald-100 bg-white">
        <div className="mx-auto flex h-24 max-w-4xl items-center justify-between px-4">
          <NavItem href="/">
            <BrandLogo height={56} />
          </NavItem>
          <NavItem
            href="/"
            className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-800 transition-colors hover:bg-emerald-50"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back to home
          </NavItem>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-12">
        <article className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm sm:p-10">
          <p className="text-sm font-medium text-emerald-700">
            Last updated: {LAST_UPDATED}
          </p>
          <h1 className="font-display mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            These Terms of Service (&quot;Terms&quot;) govern your use of{" "}
            <strong>{constants.studioName}</strong> at{" "}
            <a
              href="https://www.getidphotoai.ae/"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              https://www.getidphotoai.ae/
            </a>{" "}
            (&quot;Service&quot;). By accessing or purchasing from the Service,
            you agree to these Terms.
          </p>

          <aside
            className="mt-8 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-5 sm:p-6"
            role="note"
            aria-label="Service summary"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                <Scale className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                  Digital photo service
                </p>
                <p className="mt-2 text-base font-semibold leading-relaxed text-emerald-950">
                  GetIDPhotoAI.ae provides AI-assisted (and optionally human-
                  reviewed) digital ID, passport, and visa photos for use with
                  UAE and related government submissions.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                  Related policies:{" "}
                  <NavItem
                    href="/privacy-policy"
                    className="font-semibold underline underline-offset-2"
                  >
                    Privacy Policy
                  </NavItem>{" "}
                  ·{" "}
                  <NavItem
                    href="/refund-policy"
                    className="font-semibold underline underline-offset-2"
                  >
                    Refund Policy
                  </NavItem>
                </p>
              </div>
            </div>
          </aside>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              1. Who we are
            </h2>
            <p className="leading-relaxed text-slate-700">
              The Service is operated by {constants.studioName} for customers in
              and connected to the United Arab Emirates. Contact details appear
              at the end of these Terms.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              2. Eligibility &amp; accounts
            </h2>
            <p className="leading-relaxed text-slate-700">
              You must be able to form a binding contract under applicable UAE
              law to purchase. If you upload a photo of a minor, you confirm you
              are a parent or legal guardian (or otherwise authorised) to do so
              for official document purposes.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              3. Description of the Service
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>
                <strong>Standard Digital:</strong> automated AI background
                removal, cropping, and digital download (including print sheet
                where offered).
              </li>
              <li>
                <strong>Human Verified:</strong> Standard Digital features plus
                manual compliance review by our team, subject to review hours
                stated on the site.
              </li>
            </ul>
            <p className="leading-relaxed text-slate-700">
              Government acceptance depends on many factors beyond photo
              formatting. We do not guarantee acceptance of any application by
              ICP, GDRFA, or other authorities, except as expressly stated in
              our{" "}
              <NavItem
                href="/refund-policy"
                className="font-medium text-emerald-700 underline underline-offset-2"
              >
                Refund Policy
              </NavItem>
              .
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              4. Your responsibilities
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>
                Upload a clear, recent photo of the correct person that you are
                authorised to use.
              </li>
              <li>
                Choose the correct document specification (passport, Emirates
                ID, visa, etc.).
              </li>
              <li>
                Provide accurate optional contact details if you want review
                updates.
              </li>
              <li>
                Follow all government application rules (forms, fees, biometrics
                appointments, and supporting documents).
              </li>
              <li>
                Do not upload unlawful, infringing, or abusive content, or
                attempt to disrupt or reverse-engineer the Service.
              </li>
            </ul>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              5. Orders, pricing &amp; payment
            </h2>
            <p className="leading-relaxed text-slate-700">
              Prices are shown in AED (or as displayed at checkout) and are
              charged via our payment provider (Stripe). You authorise us to
              charge the selected package amount. Digital delivery begins after
              successful payment. Taxes or bank fees charged by your issuer are
              your responsibility.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              6. Licence to use delivered photos
            </h2>
            <p className="leading-relaxed text-slate-700">
              After payment, we grant you a personal, non-exclusive licence to
              download and use the generated photo(s) for your own official
              identification, passport, visa, or similar applications. You may
              not resell our Service or redistribute our platform software.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              7. Refunds
            </h2>
            <p className="leading-relaxed text-slate-700">
              Digital downloads are generally final. Refund eligibility —
              including the Human Verified official-rejection guarantee — is
              governed solely by our{" "}
              <NavItem
                href="/refund-policy"
                className="font-medium text-emerald-700 underline underline-offset-2"
              >
                Refund Policy
              </NavItem>
              .
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              8. Privacy &amp; photo retention
            </h2>
            <p className="leading-relaxed text-slate-700">
              How we collect and delete personal data (including the 48-hour
              photo deletion practice) is described in our{" "}
              <NavItem
                href="/privacy-policy"
                className="font-medium text-emerald-700 underline underline-offset-2"
              >
                Privacy Policy
              </NavItem>
              . By using the Service you acknowledge that processing.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              9. Disclaimers
            </h2>
            <p className="leading-relaxed text-slate-700">
              The Service is provided on an &quot;as available&quot; basis.
              Except as required by UAE law or expressly stated in our Refund
              Policy, we disclaim warranties of uninterrupted access,
              government acceptance of any application, or fitness for a
              particular non-stated purpose. AI processing may occasionally
              produce imperfect results; Human Verified review reduces but does
              not eliminate all risk.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              10. Limitation of liability
            </h2>
            <p className="leading-relaxed text-slate-700">
              To the fullest extent permitted by UAE law, our total liability
              arising from any order is limited to the amount you paid for that
              order. We are not liable for indirect losses such as visa delays,
              travel costs, or lost opportunity, except where liability cannot
              be excluded by law.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              11. Governing law
            </h2>
            <p className="leading-relaxed text-slate-700">
              These Terms are governed by the laws of the United Arab Emirates.
              Courts of the UAE shall have jurisdiction over disputes, without
              prejudice to mandatory consumer protections that may apply.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              12. Changes
            </h2>
            <p className="leading-relaxed text-slate-700">
              We may update these Terms from time to time. The &quot;Last
              updated&quot; date will change when we do. Continued use after
              changes constitutes acceptance where permitted by law. The Terms
              in force at purchase apply to that order.
            </p>
          </section>

          <section className="mt-10 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-slate-900">13. Contact</h2>
            <ul className="space-y-2 text-slate-700">
              <li>
                <strong>Support:</strong>{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  {supportEmail}
                </a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href={`mailto:${constants.businessLocations[0]?.email || "hello@getidphotoai.ae"}`}
                  className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  {constants.businessLocations[0]?.email ||
                    "hello@getidphotoai.ae"}
                </a>
              </li>
              <li>
                <strong>WhatsApp:</strong>{" "}
                <a
                  href={`https://wa.me/${whatsappDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  {whatsappDisplay}
                </a>
              </li>
            </ul>
          </section>

          <div className="mt-10 flex flex-col gap-3 border-t border-slate-200 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} {constants.studioName}. All rights
              reserved.
            </p>
            <NavItem
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to home
            </NavItem>
          </div>
        </article>
      </main>
    </div>
  );
}
