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
  const { pkg, onBuyClick, isLoading } = props;

  const formattedPrice = formatPrice(pkg.priceCents, pkg.currency);

  const descriptions = [
    ...pkg.description,
    pkg.printedPhotoNumber === 0
      ? undefined
      : `${pkg.printedPhotoNumber} printed photos(pick up)`,
  ].filter((it) => it !== undefined);

  return (
    <div className="relative flex flex-col justify-between rounded-xl bg-white p-8 text-slate-900 shadow-lg">
      <div className="flex flex-col">
        <h3 className="mb-4 text-xl font-semibold text-slate-900">{pkg.name}</h3>
        <div className="mb-4 text-3xl font-bold text-slate-900">
          {formattedPrice}
        </div>
        <ul className="mb-6 space-y-3">
          {descriptions.map((it, i) => (
            <li key={`${i}-${it}`} className="flex items-start space-x-2">
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-700" />
              <span className="leading-snug text-slate-900">{it}</span>
            </li>
          ))}
        </ul>
        {pkg.notice ? (
          <p className="mb-8 rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm leading-relaxed text-slate-900">
            {pkg.notice}
          </p>
        ) : (
          <div className="mb-8" />
        )}
      </div>

      <button
        type="button"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-emerald-700 py-3 font-semibold text-emerald-800 transition-colors hover:bg-emerald-700 hover:text-white disabled:cursor-wait disabled:opacity-60"
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
