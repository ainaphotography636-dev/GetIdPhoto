import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripeInstance, getStripeKeyDiagnostics } from "@/lib/stripe";
import { getCheckoutPackage } from "@/lib/pricing";

function resolveOrigin(req: NextRequest): string {
  const origin = req.headers.get("origin");
  if (origin) {
    return origin;
  }
  const host = req.headers.get("host");
  const proto = req.headers.get("x-forwarded-proto") || "http";
  if (host) {
    return `${proto}://${host}`;
  }
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }
  return "http://localhost:3000";
}

function toErrorMessage(err: unknown): string {
  if (err instanceof Stripe.errors.StripeError) {
    const parts = [
      err.message,
      err.code ? `code=${err.code}` : null,
      err.type ? `type=${err.type}` : null,
    ].filter(Boolean);
    return parts.join(" | ");
  }
  if (err instanceof Error) {
    return err.message;
  }
  return "Unable to create checkout session";
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const keyDiagnostics = getStripeKeyDiagnostics();

  try {
    let body: Record<string, unknown> = {};
    try {
      body = (await req.json()) as Record<string, unknown>;
    } catch {
      return NextResponse.json(
        {
          error: "Invalid JSON body. Expected { packageId: 'basic' | 'standard' }.",
          stripeKeyConfigured: keyDiagnostics.configured,
        },
        { status: 400 },
      );
    }

    const packageId =
      typeof body.packageId === "string" ? body.packageId : undefined;
    const photoUuid =
      typeof body.photoUuid === "string" && body.photoUuid.trim()
        ? body.photoUuid.trim()
        : undefined;
    const specCode =
      typeof body.specCode === "string" && body.specCode.trim()
        ? body.specCode.trim()
        : undefined;

    console.log("[create-checkout-session] request", {
      packageId,
      hasPhotoUuid: Boolean(photoUuid),
      stripeKeyConfigured: keyDiagnostics.configured,
      stripeKeyPrefix: keyDiagnostics.prefix,
    });

    if (!keyDiagnostics.configured) {
      return NextResponse.json(
        {
          error:
            "STRIPE_SECRET_KEY is missing or invalid. Check your .env and restart the Next.js server.",
          stripeKeyConfigured: false,
        },
        { status: 500 },
      );
    }

    const pkg = getCheckoutPackage(packageId);
    if (!pkg) {
      return NextResponse.json(
        {
          error:
            "Invalid package. Use packageId 'basic' (AED 20) or 'standard' (AED 30).",
          receivedPackageId: packageId ?? null,
          stripeKeyConfigured: true,
        },
        { status: 400 },
      );
    }

    // Server-side amounts only — ignore any client-supplied price.
    const unitAmount = pkg.unitAmount;
    const currency = pkg.currency;

    if (
      (pkg.id === "basic" && unitAmount !== 2000) ||
      (pkg.id === "standard" && unitAmount !== 3000)
    ) {
      return NextResponse.json(
        { error: "Pricing configuration mismatch", stripeKeyConfigured: true },
        { status: 500 },
      );
    }

    const stripe = getStripeInstance();
    const origin = resolveOrigin(req);

    const metadata: Record<string, string> = {
      packageId: pkg.id,
      packageName: pkg.name,
    };
    if (photoUuid) {
      metadata.photoUuid = photoUuid;
    }
    if (specCode) {
      metadata.specCode = specCode;
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency,
            unit_amount: unitAmount,
            product_data: {
              name: pkg.name,
              description: pkg.description,
            },
          },
        },
      ],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/?checkout=cancelled#pricing`,
      metadata,
      payment_intent_data: {
        metadata,
      },
    });

    if (!session.url) {
      return NextResponse.json(
        {
          error: "Stripe did not return a checkout URL",
          stripeKeyConfigured: true,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (err) {
    const message = toErrorMessage(err);
    console.error("create-checkout-session error:", err);
    return NextResponse.json(
      {
        error: message,
        stripeKeyConfigured: keyDiagnostics.configured,
        stripeKeyPrefix: keyDiagnostics.prefix,
      },
      { status: 500 },
    );
  }
}
