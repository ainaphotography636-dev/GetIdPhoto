export type CheckoutStartResult = {
  url: string;
  sessionId?: string;
};

export class StripeCheckoutError extends Error {
  status: number;
  details: Record<string, unknown>;

  constructor(
    message: string,
    status: number,
    details: Record<string, unknown> = {},
  ) {
    super(message);
    this.name = "StripeCheckoutError";
    this.status = status;
    this.details = details;
  }
}

export async function startStripeCheckout(options: {
  packageId: string;
  photoUuid?: string;
  specCode?: string;
}): Promise<CheckoutStartResult> {
  console.log("[checkout] Starting Stripe Checkout", options);

  let res: Response;
  try {
    res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    });
  } catch (err) {
    const message =
      err instanceof Error
        ? `Network error starting checkout: ${err.message}`
        : "Network error starting checkout";
    console.error("[checkout] fetch failed", err);
    throw new StripeCheckoutError(message, 0);
  }

  const rawText = await res.text();
  let data: {
    url?: string;
    sessionId?: string;
    error?: string;
    stripeKeyConfigured?: boolean;
    stripeKeyPrefix?: string;
    receivedPackageId?: string | null;
  } = {};

  try {
    data = rawText ? (JSON.parse(rawText) as typeof data) : {};
  } catch {
    console.error("[checkout] Non-JSON response", {
      status: res.status,
      body: rawText.slice(0, 500),
    });
    throw new StripeCheckoutError(
      `Checkout API returned non-JSON (HTTP ${res.status}): ${rawText.slice(0, 180)}`,
      res.status,
      { rawText: rawText.slice(0, 500) },
    );
  }

  if (!res.ok || !data.url) {
    const message =
      data.error ||
      `Unable to start Stripe Checkout (HTTP ${res.status})`;
    console.error("[checkout] API error", {
      status: res.status,
      data,
    });
    throw new StripeCheckoutError(message, res.status, {
      ...data,
    });
  }

  console.log("[checkout] Redirecting to Stripe", {
    sessionId: data.sessionId,
  });
  window.location.assign(data.url);
  return { url: data.url, sessionId: data.sessionId };
}
