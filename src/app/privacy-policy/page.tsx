import type { Metadata } from "next";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import NavItem from "@/lib/nav-item";
import { constants } from "@/constants";

export const metadata: Metadata = {
  title: `Privacy Policy | ${constants.studioName}`,
  description:
    "How GetIDPhotoAI.ae collects, uses, and deletes your personal data under UAE PDPL, including our 48-hour photo deletion guarantee.",
};

const LAST_UPDATED = "September 28, 2026";

const supportEmail = "support@getidphotoai.ae";
const whatsappDisplay =
  constants.businessLocations[0]?.phone || "+971559461415";
const whatsappDigits = (
  constants.businessLocations[0]?.whatsapp || "971559461415"
).replace(/\D/g, "");

export default function PrivacyPolicyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            This Privacy Policy explains how{" "}
            <strong>{constants.studioName}</strong> (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;), operating at{" "}
            <a
              href="https://www.getidphotoai.ae/"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              https://www.getidphotoai.ae/
            </a>
            , collects, uses, stores, and deletes personal data when you use our
            online ID and passport photo services in the United Arab Emirates.
          </p>

          <aside
            className="mt-8 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-5 sm:p-6"
            role="note"
            aria-label="48-Hour Deletion Guarantee"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                <ShieldCheck className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                  48-Hour Deletion Guarantee
                </p>
                <p className="mt-2 text-base font-semibold leading-relaxed text-emerald-950">
                  All uploaded user photos and edited output files are
                  automatically and permanently deleted from our secure servers
                  within 48 hours of upload/processing.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                  Your photos are <strong>never</strong> sold, shared with third
                  parties for marketing, or used to train public AI models.
                </p>
              </div>
            </div>
          </aside>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              1. Compliance with UAE law
            </h2>
            <p className="leading-relaxed text-slate-700">
              We process personal data in accordance with the{" "}
              <strong>
                UAE Personal Data Protection Law (Federal Decree-Law No. 45 of
                2021 on Personal Data Protection — PDPL)
              </strong>{" "}
              and applicable local data governance standards in the United Arab
              Emirates. We take reasonable technical and organisational measures
              to protect your personal data and to honour the rights granted to
              you under the PDPL.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              2. Strict photo retention policy
            </h2>
            <p className="leading-relaxed text-slate-700">
              Photo files are the most sensitive data we handle. Our retention
              rules are designed to minimise risk:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>
                Uploaded originals and AI-edited outputs are retained only for
                the short window needed to deliver your order (preview,
                payment, download, and optional human review).
              </li>
              <li>
                <strong>
                  Automatic permanent deletion occurs within 48 hours
                </strong>{" "}
                of upload or processing, whichever applies to your session.
              </li>
              <li>
                You may request <strong>immediate manual deletion</strong>{" "}
                before the 48-hour window ends (see Your rights below).
              </li>
              <li>
                We do <strong>not</strong> sell photo data, license it to third
                parties, or use it to train public or commercial AI models.
              </li>
            </ul>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              3. Data we collect
            </h2>

            <h3 className="text-lg font-semibold text-slate-900">
              3.1 Image data
            </h3>
            <p className="leading-relaxed text-slate-700">
              When you upload a photo, we receive the image file so our systems
              can crop, adjust, and generate a compliant ID/passport photo.
              Processing is automated via AI. A human reviewer may view your
              photo <strong>only</strong> if you select the{" "}
              <strong>Human Verified</strong> tier.
            </p>

            <h3 className="text-lg font-semibold text-slate-900">
              3.2 Contact information
            </h3>
            <p className="leading-relaxed text-slate-700">
              Email address and optional WhatsApp phone number may be provided
              at checkout. These details are used strictly for order fulfilment,
              payment receipts, and human-verification or retake alerts — not
              for spam or unrelated marketing.
            </p>

            <h3 className="text-lg font-semibold text-slate-900">
              3.3 Technical and analytics data
            </h3>
            <p className="leading-relaxed text-slate-700">
              We may collect IP address, browser type, device information, and
              standard cookies. Where enabled, we use{" "}
              <strong>Google Analytics 4</strong> to understand site usage,
              improve platform functionality, and support security monitoring.
              Analytics data is aggregated where practicable and is not used to
              sell your personal identity.
            </p>

            <h3 className="text-lg font-semibold text-slate-900">
              3.4 Payment data
            </h3>
            <p className="leading-relaxed text-slate-700">
              Card payments are processed by our payment provider (Stripe). We
              do not store full card numbers on our servers. Stripe may process
              payment data under its own privacy terms as an independent
              processor/controller for payment services.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              4. How we use your data
            </h2>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>Create and deliver compliant digital ID/passport photos</li>
              <li>Process payments and send confirmations</li>
              <li>
                Perform optional human compliance review when you choose that
                package
              </li>
              <li>Respond to support, privacy, or deletion requests</li>
              <li>
                Maintain security, prevent abuse, and improve service reliability
              </li>
            </ul>
            <p className="leading-relaxed text-slate-700">
              We process personal data based on performance of a contract (to
              provide the service you request), legitimate interests in securing
              and improving the platform, and — where required — your consent
              (for example, optional contact details or analytics cookies where
              applicable).
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              5. Your rights under UAE PDPL
            </h2>
            <p className="leading-relaxed text-slate-700">
              Subject to applicable law and limited exceptions, you have the
              following rights:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>
                <strong>Right to Access</strong> — request confirmation of
                whether we process your personal data and obtain a copy.
              </li>
              <li>
                <strong>Right to Erasure / Right to be Forgotten</strong> —
                request immediate deletion of your photos and related personal
                data before the automatic 48-hour deletion.
              </li>
              <li>
                <strong>Right to Object</strong> — object to certain processing
                of your personal data where permitted by law.
              </li>
              <li>
                <strong>Data Portability</strong> — request a machine-readable
                copy of personal data you provided to us, where technically
                feasible.
              </li>
              <li>
                <strong>Right to Rectification</strong> — ask us to correct
                inaccurate contact details we hold about you.
              </li>
            </ul>
            <p className="leading-relaxed text-slate-700">
              To exercise these rights, email{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                {supportEmail}
              </a>{" "}
              with the subject line &quot;Privacy Request&quot; and enough
              detail for us to locate your order (for example, checkout email or
              session/order reference).
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              6. Data security and storage
            </h2>
            <p className="leading-relaxed text-slate-700">
              We use industry-standard safeguards during the temporary retention
              window:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>
                <strong>HTTPS/TLS</strong> encryption for data in transit
                between your browser and our services (end-to-end encrypted
                transport).
              </li>
              <li>
                <strong>AES-256</strong> (or equivalent) encrypted storage for
                photo files while they remain on our secure servers during the
                up-to-48-hour retention period.
              </li>
              <li>
                Access controls limiting photo access to systems and, for Human
                Verified orders only, authorised reviewers needed to deliver the
                service.
              </li>
            </ul>
            <p className="leading-relaxed text-slate-700">
              No method of transmission or storage is 100% secure. We continuously
              improve our controls, but we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              7. Sharing and processors
            </h2>
            <p className="leading-relaxed text-slate-700">
              We may share limited personal data with trusted service providers
              who help us operate the platform (for example, cloud hosting,
              payment processing, and photo-processing APIs). These providers
              are engaged to process data on our instructions for service
              delivery and security — not to sell your photos or train public AI
              models on your behalf. We do not sell personal data.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              8. International transfers
            </h2>
            <p className="leading-relaxed text-slate-700">
              Some processors may store or process data outside the UAE. Where
              this occurs, we take steps consistent with UAE PDPL requirements
              to ensure appropriate safeguards for your personal data.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              9. Children&apos;s privacy
            </h2>
            <p className="leading-relaxed text-slate-700">
              Our service may be used by parents or guardians to create official
              photos for minors. We do not knowingly market to children or use
              children&apos;s photos beyond fulfilling the requested order under
              this Policy.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              10. Changes to this Policy
            </h2>
            <p className="leading-relaxed text-slate-700">
              We may update this Privacy Policy from time to time. The
              &quot;Last updated&quot; date at the top of this page will change
              when we do. Continued use of{" "}
              <a
                href="https://www.getidphotoai.ae/"
                className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
              >
                getidphotoai.ae
              </a>{" "}
              after updates constitutes acceptance of the revised Policy where
              permitted by law.
            </p>
          </section>

          <section className="mt-10 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-slate-900">
              11. Contact for privacy concerns
            </h2>
            <p className="leading-relaxed text-slate-700">
              For privacy questions, data-removal requests, or PDPL rights
              requests, contact:
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>
                <strong>Support email:</strong>{" "}
                <a
                  href={`mailto:${supportEmail}`}
                  className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  {supportEmail}
                </a>
              </li>
              <li>
                <strong>Business email:</strong>{" "}
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
              <li>
                <strong>Website:</strong>{" "}
                <a
                  href="https://www.getidphotoai.ae/"
                  className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  https://www.getidphotoai.ae/
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
