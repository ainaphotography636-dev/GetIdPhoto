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
        isSelected ? "bg-emerald-600 text-white" : "bg-white text-slate-900"
      } rounded-xl shadow-lg p-8 relative flex flex-col justify-between`}
    >
      {pkg.isPopular ? (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold">
          RECOMMENDED
        </div>
      ) : null}

      <div className="flex flex-col">
        <h3
          className={`text-xl font-semibold mb-4 ${
            isSelected ? "text-white" : "text-slate-900"
          }`}
        >
          {pkg.name}
        </h3>
        <div
          className={`text-3xl font-bold mb-4 ${
            isSelected ? "text-white" : "text-slate-900"
          }`}
        >
          {formattedPrice}
        </div>
        <ul className="space-y-3 mb-6">
          {descriptions.map((it, i) => (
            <li key={`${i}-${it}`} className="flex items-start space-x-2">
              <CheckCircle
                className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                  isSelected ? "text-white" : "text-emerald-700"
                }`}
              />
              <span
                className={`leading-snug ${
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
            className={`text-sm leading-relaxed mb-8 rounded-lg px-3 py-3 border ${
              isSelected
                ? "bg-emerald-800 border-white/30 text-white"
                : "bg-slate-50 border-slate-200 text-slate-900"
            }`}
          >
            {pkg.notice}
          </p>
        ) : (
          <div className="mb-8" />
        )}
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
