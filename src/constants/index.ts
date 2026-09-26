import type { BusinessLocation } from "../models/BusinessLocation";
import type { SpecCode } from "../models/PhotoSpec";
import type { ProductPackage } from "../models/ProductPackage";

function envText(value: string | undefined, fallback: string): string {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "undefined") {
    return fallback;
  }
  return trimmed;
}

function envLines(value: string | undefined, fallback: string[]): string[] {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "undefined") {
    return fallback;
  }
  const lines = trimmed
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && line !== "undefined");
  return lines.length > 0 ? lines : fallback;
}

function envCount(value: string | undefined, fallback: number): number {
  const trimmed = value?.trim();
  if (!trimmed || trimmed === "undefined") {
    return fallback;
  }
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : fallback;
}

const standardDigitalFeatures = [
  "Instant AI background removal & lighting correction",
  "Precise cropping to official requested size",
  "Immediate high-resolution digital download (Single photo)",
  "Includes a 4-photo print layout sheet optimized for home printers",
];

const humanVerifiedFeatures = [
  "Everything in Standard Digital, instantly available",
  "Manual compliance inspection by our expert reviewer",
  "Guaranteed official guidelines compliance",
];

export const constants = {
  stripePublicKey: `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
  studioName: process.env.NEXT_PUBLIC_STUDIO_NAME || "GetIDPhotoAI",
  studioDescription: envText(
    process.env.NEXT_PUBLIC_STUDIO_DESCRIPTION,
    "Get government-compliant biometric photos for your UAE documents in seconds. Skip the studio—our AI automatically adjusts your photo to exact UAE specifications with a clean white background.",
  ),
  defaultSpecCodes: [
    "uae-passport",
    "uae-id-card",
    "dubai-visa",
    "40x60-mm",
  ] satisfies SpecCode[],
  businessLocations: [
    {
      address: `${process.env.NEXT_PUBLIC_BUSINESS_ADDRESS}`,
      phone: `${process.env.NEXT_PUBLIC_BUSINESS_PHONE}`,
      email: `${process.env.NEXT_PUBLIC_BUSINESS_EMAIL}`,
      hours: `${process.env.NEXT_PUBLIC_BUSINESS_HOURS}`,
    },
  ] satisfies BusinessLocation[],
  productPackages: [
    {
      id: "basic",
      name: envText(process.env.NEXT_PUBLIC_BASIC_PKG_NAME, "Standard Digital"),
      // Hardcoded AED 20 (2000 fils) — must match server CHECKOUT_PACKAGES
      priceCents: 2000,
      currency: "aed",
      description: envLines(
        process.env.NEXT_PUBLIC_BASIC_PKG_DESCRIPTION,
        standardDigitalFeatures,
      ),
      notice: process.env.NEXT_PUBLIC_BASIC_PKG_NOTICE || undefined,
      printedPhotoNumber: envCount(
        process.env.NEXT_PUBLIC_BASIC_PKG_PRINTED_PHOTO_NUMBER,
        0,
      ),
      isPopular: process.env.NEXT_PUBLIC_BASIC_PKG_IS_POPULAR === "true",
      isPickUp: process.env.NEXT_PUBLIC_BASIC_PKG_IS_PICKUP === "true",
    },
    {
      id: "standard",
      name: envText(
        process.env.NEXT_PUBLIC_STANDARD_PKG_NAME,
        "Human Verified",
      ),
      // Hardcoded AED 30 (3000 fils) — must match server CHECKOUT_PACKAGES
      priceCents: 3000,
      currency: "aed",
      description: envLines(
        process.env.NEXT_PUBLIC_STANDARD_PKG_DESCRIPTION,
        humanVerifiedFeatures,
      ),
      notice:
        process.env.NEXT_PUBLIC_STANDARD_PKG_NOTICE ||
        "Orders placed between 5:00 PM and 8:00 AM are queued for priority morning review at 8:00 AM. You can still download your digital photo instantly. If the photo does not meet official guidelines, our editor will contact you via WhatsApp or email.",
      printedPhotoNumber: envCount(
        process.env.NEXT_PUBLIC_STANDARD_PKG_PRINTED_PHOTO_NUMBER,
        0,
      ),
      isPopular: process.env.NEXT_PUBLIC_STANDARD_PKG_IS_POPULAR === "true",
      isPickUp: process.env.NEXT_PUBLIC_STANDARD_PKG_IS_PICKUP === "true",
    },
  ] satisfies ProductPackage[],
  perAdditionalPhotoPriceInCent: envCount(
    process.env.NEXT_PUBLIC_PER_ADDITIONAL_PHOTO_PRICE_IN_CENT,
    1000,
  ),
};
