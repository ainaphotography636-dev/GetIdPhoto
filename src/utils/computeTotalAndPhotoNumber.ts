import { ProductPackage } from "@/models/ProductPackage";
import { constants } from "@/constants";
import { amountInCentToStripeAmount } from "./amountInCentToStripeAmount";

interface ComputeResult {
  totalAmount: number;
  stripeAmount: number;
  photoNumber: number;
}

export function computeTotalAndPhotoNumber(
  pkg: ProductPackage,
  additionalPhotoNumber: number,
): ComputeResult {
  const includedPrints = Number.isFinite(pkg.printedPhotoNumber)
    ? pkg.printedPhotoNumber
    : 0;
  const extraPrintPrice = Number.isFinite(constants.perAdditionalPhotoPriceInCent)
    ? constants.perAdditionalPhotoPriceInCent
    : 0;
  const totalAmount =
    includedPrints <= 0
      ? pkg.priceCents
      : pkg.priceCents + additionalPhotoNumber * extraPrintPrice;

  const stripeAmount = amountInCentToStripeAmount(totalAmount, pkg.currency);

  const photoNumber =
    includedPrints <= 0 ? 0 : includedPrints + additionalPhotoNumber;

  return {
    totalAmount,
    stripeAmount,
    photoNumber,
  };
}
