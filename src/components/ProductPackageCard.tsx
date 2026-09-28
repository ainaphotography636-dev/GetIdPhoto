import type { JSX } from "react";
import type { ProductPackage } from "../models/ProductPackage";
import { CheckCircle, LoaderCircle, Sparkles } from "lucide-react";
import { formatPrice } from "../utils/formatPrice";

interface Props {
  pkg: ProductPackage;
  onBuyClick: (pkg: ProductPackage) => void | Promise<void>;
  isSelected?: boolean;
  isLoading?: boolean;
}

export default function ProductPackageCard(props: Props): JSX.Element {
  const { pkg, onBuyClick, isLoading } = props;
  const isFeatured = Boolean(pkg.isPopular);

  const formattedPrice = formatPrice(pkg.priceCents, pkg.currency);

  const descriptions = [
    ...pkg.description,
    pkg.printedPhotoNumber === 0
      ? undefined
      : `${pkg.printedPhotoNumber} printed photos (pick up)`,
  ].filter((it): it is string => it !== undefined);

  return (
    <div
      className={`relative flex h-full flex-col overflow-hidden rounded-2xl border-2 bg-white p-7 shadow-sm transition-shadow duration-200 sm:p-8 ${
        isFeatured
          ? "border-primary shadow-md shadow-emerald-900/10 ring-1 ring-primary/15"
          : "border-emerald-100 hover:border-emerald-200 hover:shadow-md"
      }`}
    >
      {isFeatured ? (
        <div className="absolute inset-x-0 top-0 h-1.5 bg-primary" aria-hidden />
      ) : null}

      <div className="mb-5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            className={`text-xs font-bold uppercase tracking-wide ${
              isFeatured ? "text-primary" : "text-emerald-700/80"
            }`}
          >
            {isFeatured ? "Recommended" : "Digital download"}
          </p>
          <h3 className="mt-1 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
            {pkg.name}
          </h3>
        </div>
        {isFeatured ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-white">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Most popular
          </span>
        ) : null}
      </div>

      <div className="mb-6">
        <p className="flex items-baseline gap-1.5">
          <span className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {formattedPrice}
          </span>
        </p>
        <p className="mt-1 text-sm text-slate-500">One-time payment · AED</p>
      </div>

      <ul className="mb-6 flex-1 space-y-3">
        {descriptions.map((it, i) => (
          <li key={`${i}-${it}`} className="flex items-start gap-2.5">
            <CheckCircle
              className={`mt-0.5 h-5 w-5 shrink-0 ${
                isFeatured ? "text-primary" : "text-emerald-600"
              }`}
              aria-hidden
            />
            <span className="text-sm leading-snug text-slate-700 sm:text-[0.95rem]">
              {it}
            </span>
          </li>
        ))}
      </ul>

      {pkg.notice ? (
        <p className="mb-6 rounded-xl border border-emerald-200 bg-emerald-50/80 px-3.5 py-3 text-sm leading-relaxed text-emerald-950">
          {pkg.notice}
        </p>
      ) : (
        <div className="mb-6 hidden md:block md:min-h-[1px]" aria-hidden />
      )}

      <button
        type="button"
        disabled={isLoading}
        className={`mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-base font-semibold transition-all duration-200 disabled:cursor-wait disabled:opacity-60 ${
          isFeatured
            ? "bg-primary text-white shadow-sm hover:bg-primary-hover hover:shadow"
            : "border-2 border-primary bg-white text-primary hover:bg-primary hover:text-white"
        }`}
        onClick={() => onBuyClick(pkg)}
      >
        {isLoading ? (
          <>
            <LoaderCircle className="h-5 w-5 animate-spin" />
            Redirecting to Stripe…
          </>
        ) : (
          `Continue — Upload photo`
        )}
      </button>
    </div>
  );
}
