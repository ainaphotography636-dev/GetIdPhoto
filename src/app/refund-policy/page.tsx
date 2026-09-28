import type { Metadata } from "next";
import { ArrowLeft, BadgeCheck } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import NavItem from "@/lib/nav-item";
import { constants } from "@/constants";

export const metadata: Metadata = {
  title: `Refund Policy | ${constants.studioName}`,
  description:
    "Refund Policy for GetIDPhotoAI.ae — including our official government rejection money-back guarantee for Human Verified photos.",
};

const LAST_UPDATED = "September 28, 2026";
const supportEmail = "support@getidphotoai.ae";
const whatsappDisplay =
  constants.businessLocations[0]?.phone || "+971559461415";
const whatsappDigits = (
  constants.businessLocations[0]?.whatsapp || "971559461415"
).replace(/\D/g, "");

export default function RefundPolicyPage() {
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
            Refund Policy
          </h1>
          <p className="mt-4 text-base leading-relaxed text-slate-700">
            This Refund Policy explains when{" "}
            <strong>{constants.studioName}</strong> (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;), operating at{" "}
            <a
              href="https://www.getidphotoai.ae/"
              className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
            >
              https://www.getidphotoai.ae/
            </a>
            , issues refunds for digital ID and passport photo purchases in the
            United Arab Emirates.
          </p>

          <aside
            className="mt-8 rounded-xl border-2 border-emerald-500 bg-emerald-50 p-5 sm:p-6"
            role="note"
            aria-label="Official Rejection Refund Guarantee"
          >
            <div className="flex items-start gap-3">
              <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                <BadgeCheck className="h-5 w-5" aria-hidden />
              </span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                  Official Rejection Refund Guarantee
                </p>
                <p className="mt-2 text-base font-semibold leading-relaxed text-emerald-950">
                  If a Human Verified photo from our platform is officially
                  rejected by a government authority (such as ICP, GDRFA, or a
                  passport/visa office) due to a formatting or compliance error
                  on our part, we will issue a <strong>full refund</strong>.
                </p>
                <p className="mt-2 text-sm leading-relaxed text-emerald-900">
                  You must submit official written proof or a rejection receipt
                  stating the photo did not meet specifications, together with
                  your order number, to{" "}
                  <a
                    href={`mailto:${supportEmail}`}
                    className="font-semibold underline underline-offset-2"
                  >
                    {supportEmail}
                  </a>
                  .
                </p>
              </div>
            </div>
          </aside>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              1. Overview &amp; nature of digital goods
            </h2>
            <p className="leading-relaxed text-slate-700">
              GetIDPhotoAI.ae delivers <strong>instant digital downloads</strong>{" "}
              and automated photo-processing files. Because these are digital
              goods that can be accessed immediately after payment,{" "}
              <strong>
                standard digital product sales are generally final once
                downloaded
              </strong>
              .
            </p>
            <p className="leading-relaxed text-slate-700">
              This Policy describes the limited exceptions — especially our
              money-back guarantee for official government rejections of Human
              Verified photos — and how to request a refund.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              2. The 100% refund guarantee (official rejection rule)
            </h2>
            <p className="leading-relaxed text-slate-700">
              We stand behind the compliance quality of our{" "}
              <strong>Human Verified</strong> tier. If your photo processed
              through our platform under Human Verified is{" "}
              <strong>officially rejected</strong> by a government authority
              (for example ICP Smart Services, GDRFA, or a relevant
              passport/visa office){" "}
              <strong>
                because of a formatting or compliance error on our part
              </strong>
              , we will issue a <strong>full refund</strong> of the amount paid
              for that order.
            </p>
            <h3 className="text-lg font-semibold text-slate-900">
              Mandatory proof to claim a full refund
            </h3>
            <p className="leading-relaxed text-slate-700">
              To claim under this guarantee, you <strong>must</strong> provide:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>
                <strong>Official written proof or a rejection receipt</strong>{" "}
                from the government authority that explicitly states the photo
                did not meet specifications / formatting / biometric
                requirements; and
              </li>
              <li>
                Your <strong>order number</strong> (or Stripe checkout session /
                payment reference) so we can verify the purchase.
              </li>
            </ul>
            <p className="leading-relaxed text-slate-700">
              Claims without official rejection documentation cannot be
              processed under this guarantee.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              3. Exclusions / non-refundable scenarios
            </h2>
            <p className="leading-relaxed text-slate-700">
              Refunds will <strong>not</strong> be granted in the following
              situations:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-slate-700">
              <li>
                Rejection is due to reasons{" "}
                <strong>unrelated to photo formatting or compliance</strong>{" "}
                (for example incomplete visa applications, incorrect personal
                data submitted to the government, missing documents, or failure
                to follow general government submission rules).
              </li>
              <li>
                <strong>Standard Digital</strong> tier purchases where you
                simply changed your mind after downloading the files. These
                sales remain final; however, our support team can assist with
                reasonable manual re-adjustments where feasible.
              </li>
              <li>
                User error in upload quality (for example extreme blur, wrong
                person, or cropped faces) that was already flagged in on-site
                quality feedback and proceeded by the customer anyway.
              </li>
              <li>
                Duplicate purchases, currency conversion fees charged by your
                bank/card issuer, or chargebacks initiated without contacting
                support first.
              </li>
            </ul>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              4. Refund request timeline &amp; process
            </h2>
            <ol className="list-decimal space-y-3 pl-5 text-slate-700">
              <li>
                <strong>Timeframe:</strong> Submit your refund request{" "}
                <strong>within 14 days of purchase</strong>.
              </li>
              <li>
                <strong>Where to send:</strong> Email{" "}
                <a
                  href={`mailto:${supportEmail}?subject=Refund%20Request`}
                  className="font-medium text-emerald-700 underline underline-offset-2 hover:text-emerald-800"
                >
                  {supportEmail}
                </a>{" "}
                with subject line &quot;Refund Request&quot;, your order
                number, and official rejection proof (PDF, screenshot, or clear
                photo of the written notice).
              </li>
              <li>
                <strong>Verification:</strong> Our team reviews the
                documentation and confirms whether the rejection relates to a
                formatting/compliance issue on our part.
              </li>
              <li>
                <strong>Processing time:</strong> Once approved, refunds are
                returned to the <strong>original payment method</strong> within{" "}
                <strong>5–7 business days</strong> after verification. Card
                issuers may take additional time to post the credit to your
                statement.
              </li>
            </ol>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              5. Partial refunds &amp; goodwill adjustments
            </h2>
            <p className="leading-relaxed text-slate-700">
              In limited cases not covered above, we may offer a goodwill
              credit, free re-process, or partial refund at our discretion —
              especially when Human Verified review identifies an issue before
              government submission. Contacting support early helps us resolve
              problems faster than a chargeback.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              6. Chargebacks
            </h2>
            <p className="leading-relaxed text-slate-700">
              Please contact us before filing a card dispute. Unresolved
              chargebacks may delay or prevent us from assisting with replacement
              files or review support on the same order while the dispute is
              open.
            </p>
          </section>

          <section className="mt-10 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">
              7. Changes to this Policy
            </h2>
            <p className="leading-relaxed text-slate-700">
              We may update this Refund Policy from time to time. The
              &quot;Last updated&quot; date at the top of this page will change
              when we do. The version in force at the time of your purchase
              applies to that order.
            </p>
          </section>

          <section className="mt-10 space-y-4 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
            <h2 className="text-xl font-bold text-slate-900">
              8. Contact for refund requests
            </h2>
            <p className="leading-relaxed text-slate-700">
              For refund claims, rejection proof, or order help:
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
