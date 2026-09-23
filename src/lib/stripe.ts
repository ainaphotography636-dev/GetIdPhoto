import Stripe from "stripe";

let stripeInstance: Stripe | null = null;

function readSecretKey(): string {
  return (process.env.STRIPE_SECRET_KEY || "").replace(/\0/g, "").trim();
}

export function getStripeKeyDiagnostics(): {
  configured: boolean;
  prefix: string;
  length: number;
} {
  const secretKey = readSecretKey();
  return {
    configured:
      Boolean(secretKey) &&
      secretKey.startsWith("sk_") &&
      !secretKey.includes("your_stripe"),
    prefix: secretKey ? `${secretKey.slice(0, 8)}…` : "(empty)",
    length: secretKey.length,
  };
}

export const getStripeInstance = (): Stripe => {
  if (!stripeInstance) {
    const secretKey = readSecretKey();
    const diagnostics = getStripeKeyDiagnostics();

    console.log("[stripe] Initializing SDK", {
      configured: diagnostics.configured,
      prefix: diagnostics.prefix,
      length: diagnostics.length,
    });

    if (!diagnostics.configured) {
      throw new Error(
        "STRIPE_SECRET_KEY environment variable is not set or invalid (expected sk_live_… or sk_test_…)",
      );
    }

    stripeInstance = new Stripe(secretKey);
  }
  return stripeInstance;
};
