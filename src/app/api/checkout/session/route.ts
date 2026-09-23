import { NextRequest, NextResponse } from "next/server";
import { getStripeInstance } from "@/lib/stripe";
import { forwardRequest } from "@/lib/api";

/**
 * Retrieves a completed Checkout Session and, when photoUuid is present,
 * fetches the unwatermarked photo URL after verifying payment.
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const sessionId = req.nextUrl.searchParams.get("session_id");
  if (!sessionId) {
    return NextResponse.json(
      { error: "session_id is required" },
      { status: 400 },
    );
  }

  try {
    const stripe = getStripeInstance();
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["payment_intent"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json({
        paid: false,
        paymentStatus: session.payment_status,
        packageName: session.metadata?.packageName ?? null,
        amountTotal: session.amount_total,
        currency: session.currency,
      });
    }

    const paymentIntent =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : session.payment_intent?.id;

    const photoUuid = session.metadata?.photoUuid;
    let downloadUrl: string | null = null;
    let downloadError: string | null = null;

    if (photoUuid && paymentIntent) {
      try {
        const intent = await stripe.paymentIntents.retrieve(paymentIntent);
        if (intent.status === "succeeded") {
          await forwardRequest("POST", "/v2/updateIdPhotoUserMetadata", {
            photoUuid,
            userMetadata: {
              paymentIntentId: paymentIntent,
              amountInCents: intent.amount,
              currency: intent.currency,
              paymentStatus: intent.status,
              checkoutSessionId: session.id,
            },
          });

          const photoRes = await forwardRequest(
            "POST",
            "/v2/getIdPhotoNoWatermark",
            { photoUuid },
          );
          if (photoRes.ok) {
            const data = await photoRes.json();
            downloadUrl =
              data.idPhotoUrl || data.idPhotoTempResultPhotoUrl || null;
          } else {
            const text = await photoRes.text();
            downloadError = text || "Could not retrieve photo download";
          }
        }
      } catch (err) {
        console.error("Post-checkout photo unlock error:", err);
        downloadError =
          "Payment succeeded, but the download link is not ready yet. Please contact support with your session ID.";
      }
    }

    return NextResponse.json({
      paid: true,
      paymentStatus: session.payment_status,
      packageId: session.metadata?.packageId ?? null,
      packageName: session.metadata?.packageName ?? null,
      amountTotal: session.amount_total,
      currency: session.currency,
      photoUuid: photoUuid ?? null,
      paymentIntentId: paymentIntent ?? null,
      downloadUrl,
      downloadError,
      customerEmail: session.customer_details?.email ?? null,
    });
  } catch (error) {
    console.error("checkout session lookup error:", error);
    return NextResponse.json(
      { error: "Invalid or expired checkout session" },
      { status: 400 },
    );
  }
}
