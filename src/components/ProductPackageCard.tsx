import type { JSX } from "react";
import type { ProductPackage } from "../models/ProductPackage";
import { CheckCircle, LoaderCircle } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";

interface Props {
  pkg: ProductPackage;
  onBuyClick: (pkg: ProductPackage) => void | Promise<void>;
  isSelected?: boolean;
  isLoading?: boolean;
}

export default function ProductPackageCard(props: Props): JSX.Element {
  const { pkg, onBuyClick, isSelected, isLoading } = props;

  const formattedPrice = formatPrice(pkg.priceCents, pkg.currency);

  const descriptions = [
    ...pkg.description,
    pkg.printedPhotoNumber === 0
      ? undefined
      : `${pkg.printedPhotoNumber} printed photos(pick up)`,
  ].filter((it) => it !== undefined);

  return (
    <div
      className={`${
        isSelected ? "bg-emerald-600 text-white" : "bg-gray-50 text-gray-900"
      } rounded-lg p-6 relative flex flex-col justify-between`}
    >
      <div className="flex flex-col">
        <h3
          className={`${isSelected ? "text-white" : "text-gray-900"} text-lg font-semibold mb-4`}
        >
          {pkg.name}
        </h3>
        <div
          className={`${isSelected ? "text-white" : "text-gray-900"} text-3xl font-bold mb-4`}
        >
          {formattedPrice}
        </div>
        <ul className="space-y-2 mb-4">
          {descriptions.map((it, i) => (
            <li key={`${i}-${it}`} className="flex items-start space-x-2">
              <CheckCircle
                className={`h-4 w-4 mt-0.5 flex-shrink-0 ${
                  isSelected ? "text-white" : "text-emerald-700"
                }`}
              />
              <span
                className={`text-sm leading-snug ${
                  isSelected ? "text-white" : "text-slate-900"
                }`}
              >
                {it}
              </span>
            </li>
          ))}
        </ul>
        {pkg.notice ? (
          <p
            className={`text-xs leading-relaxed mb-4 rounded-md px-2.5 py-2 border ${
              isSelected
                ? "bg-emerald-800 border-white/30 text-white"
                : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
          >
            {pkg.notice}
          </p>
        ) : null}
      </div>

      <button
        type="button"
        disabled={isLoading}
        className={`${
          isSelected
            ? "bg-white text-emerald-800 hover:bg-slate-100 border-white"
            : "border-emerald-700 text-emerald-800 hover:bg-emerald-700 hover:text-white"
        } w-full border-2 py-3 rounded-lg font-semibold transition-colors disabled:opacity-60 disabled:cursor-wait inline-flex items-center justify-center gap-2`}
        onClick={() => onBuyClick(pkg)}
      >
        {isLoading ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Redirecting to Stripe…
          </>
        ) : (
          `Choose ${pkg.name}`
        )}
      </button>
    </div>
  );
}
