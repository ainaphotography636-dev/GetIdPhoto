"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Camera, CheckCircle, Download, LoaderCircle } from "lucide-react";
import NavItem from "@/lib/nav-item";
import { constants } from "@/constants";
import { formatPrice } from "@/utils/formatPrice";

type SessionResult = {
  paid: boolean;
  paymentStatus?: string;
  packageName?: string | null;
  amountTotal?: number | null;
  currency?: string | null;
  photoUuid?: string | null;
  downloadUrl?: string | null;
  downloadError?: string | null;
  customerEmail?: string | null;
  error?: string;
};

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<SessionResult | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setResult({ paid: false, error: "Missing checkout session." });
      setLoading(false);
      return;
    }

    let cancelled = false;

    (async () => {
      try {
        const res = await fetch(
          `/api/checkout/session?session_id=${encodeURIComponent(sessionId)}`,
        );
        const data = (await res.json()) as SessionResult;
        if (!cancelled) {
          setResult(data);
        }
      } catch {
        if (!cancelled) {
          setResult({
            paid: false,
            error: "Unable to verify payment. Please contact support.",
          });
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [sessionId]);

  const formattedAmount =
    result?.amountTotal != null && result.currency
      ? formatPrice(result.amountTotal, result.currency)
      : null;

  return (
    <div className="min-h-screen bg-emerald-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center">
          <NavItem href="/" className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-900">
              {constants.studioName}
            </span>
          </NavItem>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg border border-emerald-100 p-8 text-center">
          {loading ? (
            <div className="flex flex-col items-center gap-4 py-8">
              <LoaderCircle className="h-10 w-10 text-emerald-600 animate-spin" />
              <p className="text-slate-700">Confirming your payment…</p>
            </div>
          ) : result?.paid ? (
            <>
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100">
                <CheckCircle className="h-8 w-8 text-emerald-700" />
              </div>
              <h1 className="font-display text-3xl font-bold text-slate-900 mb-2">
                Payment successful
              </h1>
              <p className="text-slate-700 mb-6">
                Thank you for choosing {constants.studioName}
                {result.packageName ? ` — ${result.packageName}` : ""}.
                {formattedAmount ? ` Charged ${formattedAmount}.` : ""}
              </p>

              {sessionId && result.photoUuid ? (
                <div className="flex flex-col gap-3 mb-4">
                  <a
                    href={`/api/photo/print-pack?session_id=${encodeURIComponent(sessionId)}&kind=single`}
                    className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download single photo (600 DPI)
                  </a>
                  <a
                    href={`/api/photo/print-pack?session_id=${encodeURIComponent(sessionId)}&kind=sheet`}
                    className="inline-flex items-center justify-center gap-2 w-full border-2 border-emerald-700 text-emerald-800 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors"
                  >
                    <Download className="h-5 w-5" />
                    Download 4×6 postcard (four photos, 600 DPI)
                  </a>
                </div>
              ) : result.downloadUrl ? (
                <a
                  href={result.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors mb-4"
                >
                  <Download className="h-5 w-5" />
                  Download unwatermarked photo
                </a>
              ) : (
                <div className="mb-6 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-left text-sm text-slate-800">
                  {result.downloadError ? (
                    <p>{result.downloadError}</p>
                  ) : (
                    <p>
                      Your payment is confirmed. Create or finish your photo to
                      unlock the unwatermarked download — we’ll attach it to
                      this order when a photo ID is included at checkout.
                    </p>
                  )}
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <NavItem
                  href="/make-photo"
                  className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors text-center"
                >
                  {result.downloadUrl
                    ? "Make another photo"
                    : "Create your photo now"}
                </NavItem>
                <NavItem
                  href="/"
                  className="border-2 border-emerald-700 text-emerald-800 px-6 py-3 rounded-lg font-semibold hover:bg-emerald-50 transition-colors text-center"
                >
                  Back to home
                </NavItem>
              </div>

              {sessionId ? (
                <p className="mt-6 text-xs text-slate-500 break-all">
                  Session: {sessionId}
                </p>
              ) : null}
            </>
          ) : (
            <>
              <h1 className="font-display text-2xl font-bold text-slate-900 mb-2">
                Payment not confirmed
              </h1>
              <p className="text-slate-700 mb-6">
                {result?.error ||
                  "We could not confirm this payment yet. If you were charged, email hello@getidphotoai.ae with your receipt."}
              </p>
              <NavItem
                href="/#pricing"
                className="inline-flex bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Return to pricing
              </NavItem>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-emerald-50">
          <LoaderCircle className="h-10 w-10 text-emerald-600 animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
