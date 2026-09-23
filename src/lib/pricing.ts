/**
 * Server-authoritative Stripe pricing for GetIDPhotoAI.
 * Never trust client-sent amounts — only packageId is accepted from the client.
 */

export type CheckoutPackageId = "basic" | "standard";

export interface CheckoutPackage {
  id: CheckoutPackageId;
  name: string;
  description: string;
  /** Stripe unit amount in fils for AED (2000 = AED 20.00) */
  unitAmount: number;
  currency: "aed";
}

export const CHECKOUT_PACKAGES: Record<CheckoutPackageId, CheckoutPackage> = {
  basic: {
    id: "basic",
    name: "Standard Digital",
    description:
      "AI background removal, precise cropping, lighting correction, and instant high-resolution digital download.",
    unitAmount: 2000,
    currency: "aed",
  },
  standard: {
    id: "standard",
    name: "Human Verified",
    description:
      "Everything in Standard Digital plus manual compliance inspection by an expert reviewer.",
    unitAmount: 3000,
    currency: "aed",
  },
};

export function getCheckoutPackage(
  packageId: string | undefined | null,
): CheckoutPackage | undefined {
  if (!packageId) {
    return undefined;
  }
  if (packageId === "basic" || packageId === "standard") {
    return CHECKOUT_PACKAGES[packageId];
  }
  return undefined;
}
