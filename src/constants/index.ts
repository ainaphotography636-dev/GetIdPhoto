import type { BusinessLocation } from "../models/BusinessLocation";
import type { SpecCode } from "../models/PhotoSpec";
import type { ProductPackage } from "../models/ProductPackage";

export const constants = {
  stripePublicKey: `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`,
  studioName: `${process.env.NEXT_PUBLIC_STUDIO_NAME}`,
  studioDescription: `${process.env.NEXT_PUBLIC_STUDIO_DESCRIPTION}`,
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
      name: `${process.env.NEXT_PUBLIC_BASIC_PKG_NAME}`,
      // Hardcoded AED 20 (2000 fils) — must match server CHECKOUT_PACKAGES
      priceCents: 2000,
      currency: "aed",
      description: `${process.env.NEXT_PUBLIC_BASIC_PKG_DESCRIPTION}`
        .split("\n")
        .filter((it) => !!it),
      notice: process.env.NEXT_PUBLIC_BASIC_PKG_NOTICE || undefined,
      printedPhotoNumber: Number(
        `${process.env.NEXT_PUBLIC_BASIC_PKG_PRINTED_PHOTO_NUMBER}`,
      ),
      isPopular: process.env.NEXT_PUBLIC_BASIC_PKG_IS_POPULAR === "true",
      isPickUp: process.env.NEXT_PUBLIC_BASIC_PKG_IS_PICKUP === "true",
    },
    {
      id: "standard",
      name: `${process.env.NEXT_PUBLIC_STANDARD_PKG_NAME}`,
      // Hardcoded AED 30 (3000 fils) — must match server CHECKOUT_PACKAGES
      priceCents: 3000,
      currency: "aed",
      description: `${process.env.NEXT_PUBLIC_STANDARD_PKG_DESCRIPTION}`
        .split("\n")
        .filter((it) => !!it),
      notice: process.env.NEXT_PUBLIC_STANDARD_PKG_NOTICE || undefined,
      printedPhotoNumber: Number(
        `${process.env.NEXT_PUBLIC_STANDARD_PKG_PRINTED_PHOTO_NUMBER}`,
      ),
      isPopular: process.env.NEXT_PUBLIC_STANDARD_PKG_IS_POPULAR === "true",
      isPickUp: process.env.NEXT_PUBLIC_STANDARD_PKG_IS_PICKUP === "true",
    },
  ] satisfies ProductPackage[],
  perAdditionalPhotoPriceInCent: Number(
    `${process.env.NEXT_PUBLIC_PER_ADDITIONAL_PHOTO_PRICE_IN_CENT}`,
  ),
};
