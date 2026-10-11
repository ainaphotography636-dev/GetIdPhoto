"use client";

import { useRouter } from "next/navigation";
import ProductPackageCard from "@/components/ProductPackageCard";
import { constants } from "@/constants";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import type { ProductPackage } from "@/models/ProductPackage";

type EmiratesIdPricingProps = {
  locale: Locale;
  pricing: Dictionary["pricing"];
  specCode?: string;
  heading?: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  packageCopy?: {
    basic: string[];
    standard: string[];
    notice: string;
    note: string;
  };
};

export default function EmiratesIdPricing({
  locale,
  pricing,
  specCode = "uae-id-card",
  heading,
  packageCopy,
}: EmiratesIdPricingProps) {
  const router = useRouter();

  const handlePricingCheckout = (pkg: ProductPackage) => {
    const params = new URLSearchParams({
      pkgId: pkg.id,
      specCode,
    });
    router.push(`/make-photo?${params.toString()}`);
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-20"
      style={{
        background:
          "linear-gradient(180deg, #f0f7f3 0%, #ffffff 48%, #f0f7f3 100%)",
      }}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-[radial-gradient(ellipse_at_top,_rgba(0,115,47,0.08),_transparent_70%)]" />
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-primary">
            {heading?.eyebrow ?? pricing.eyebrow}
          </p>
          <h2 className="font-display mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            {heading?.title ?? pricing.title}
          </h2>
          <p className="mx-auto max-w-xl text-lg text-gray-600 md:text-xl">
            {heading?.subtitle ?? pricing.subtitle}
          </p>
        </div>

        <div className="mx-auto grid max-w-3xl items-stretch gap-6 md:grid-cols-2 md:gap-8">
          {constants.productPackages.map((pkg) => (
            <ProductPackageCard
              key={pkg.id}
              pkg={pkg}
              onBuyClick={handlePricingCheckout}
              locale={locale}
              pricingCopy={pricing}
              featureLines={
                packageCopy
                  ? pkg.id === "standard"
                    ? packageCopy.standard
                    : packageCopy.basic
                  : undefined
              }
              noticeText={
                packageCopy && pkg.id === "standard" ? packageCopy.notice : undefined
              }
            />
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-slate-600">
          {packageCopy?.note ?? pricing.note}
        </p>
      </div>
    </section>
  );
}
