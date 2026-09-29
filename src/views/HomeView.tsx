"use client";

import Image from "next/image";
import {
  Camera,
  Star,
  Users,
  Award,
  Shield,
  ShieldCheck,
  Zap,
  BadgeCheck,
  FileCheck2,
  Send,
  CreditCard,
  Plane,
  Ruler,
  Check,
  ArrowRight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { constants } from "../constants";
import type { SpecCode } from "../models/PhotoSpec";
import ProductPackageCard from "../components/ProductPackageCard";
import PhotoGuidelines from "../components/PhotoGuidelines";
import BrandLogo from "../components/BrandLogo";
import FaqSection from "../components/FaqSection";
import LanguageSwitcher from "../components/LanguageSwitcher";
import SiteFooter from "../components/SiteFooter";
import { useRef, useState, type ReactNode } from "react";
import NavItem from "../lib/nav-item";
import type { ProductPackage } from "../models/ProductPackage";
import { formatPrice } from "../utils/formatPrice";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";

type HomeViewProps = {
  locale: Locale;
  dictionary: Dictionary;
};

const photoRequirementIds = [
  "uae-passport",
  "uae-id-card",
  "dubai-visa",
  "40x60-mm",
] as const;

const photoRequirementIcons: Record<
  (typeof photoRequirementIds)[number],
  ReactNode
> = {
  "uae-passport": <Camera className="h-6 w-6" />,
  "uae-id-card": <CreditCard className="h-6 w-6" />,
  "dubai-visa": <Plane className="h-6 w-6" />,
  "40x60-mm": <Ruler className="h-6 w-6" />,
};

const whyUsIcons = {
  guarantee: <Shield className="h-12 w-12" />,
  fast: <Zap className="h-12 w-12" />,
  compliant: <Award className="h-12 w-12" />,
  experts: <Users className="h-12 w-12" />,
} as const;

function HomeView({ locale, dictionary }: HomeViewProps) {
  const router = useRouter();
  const t = dictionary;
  const [selectedRequirement, setSelectedRequirement] = useState<SpecCode>(
    photoRequirementIds[0],
  );

  const photoRequirements = photoRequirementIds.map((id) => ({
    id: id as SpecCode,
    ...t.services.requirements[id],
    icon: photoRequirementIcons[id],
  }));

  const servicesSectionRef = useRef<HTMLDivElement | null>(null);
  const pricingSectionRef = useRef<HTMLDivElement | null>(null);
  const testimonialsSectionRef = useRef<HTMLDivElement | null>(null);
  const faqSectionRef = useRef<HTMLDivElement | null>(null);
  const contactSectionRef = useRef<HTMLElement | null>(null);

  const navItems = [
    {
      label: t.nav.services,
      handler: () => {
        servicesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: t.nav.pricing,
      handler: () => {
        pricingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: t.nav.testimonials,
      handler: () => {
        testimonialsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: t.nav.faq,
      handler: () => {
        faqSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: t.nav.contact,
      handler: () => {
        contactSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  const selectedRequirementMeta = photoRequirements.find(
    (item) => item.id === selectedRequirement,
  );

  const standardDigitalPkg = constants.productPackages.find(
    (pkg) => pkg.id === "basic",
  );
  const humanVerifiedPkg = constants.productPackages.find(
    (pkg) => pkg.id === "standard",
  );

  const handlePricingCheckout = (pkg: ProductPackage) => {
    const params = new URLSearchParams({
      pkgId: pkg.id,
      specCode: selectedRequirement,
    });
    router.push(`/make-photo?${params.toString()}`);
  };

  const homeHref = locale === "ar" ? "/ar" : "/";
  const phone = constants.businessLocations[0]?.phone || "+971559461415";
  const whatsapp =
    constants.businessLocations[0]?.whatsapp || "971559461415";
  const email = constants.businessLocations[0]?.email;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 items-center justify-between gap-3">
            <BrandLogo height={68} />
            <nav className="hidden items-center gap-6 md:flex lg:gap-8">
              {navItems.map((it, index) => (
                <button
                  key={index}
                  className="font-medium text-gray-600 transition-colors hover:text-emerald-600"
                  onClick={() => {
                    it.handler();
                  }}
                >
                  {it.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher
                locale={locale}
                switchLabel={t.language.switchTo}
                ariaLabel={t.language.label}
              />
              <NavItem href="/make-photo" className="hidden md:block">
                <button className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-primary-hover lg:px-6">
                  {t.nav.uploadCta}
                </button>
              </NavItem>
              <button type="button" className="md:hidden" aria-label="Menu">
                <div className="flex h-5 w-6 flex-col justify-between">
                  <span className="h-0.5 w-full bg-gray-700"></span>
                  <span className="h-0.5 w-full bg-gray-700"></span>
                  <span className="h-0.5 w-full bg-gray-700"></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-neutral-950 pt-24 text-white">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col items-start text-start">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-current text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-emerald-100">{t.hero.rating}</span>
              </div>
              <p className="mb-3 text-lg font-semibold tracking-wide text-emerald-200">
                {constants.studioName || "GetIDPhotoAI"}
              </p>
              <h1 className="font-display mb-6 max-w-xl text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
                {t.hero.headline}
                <span className="block">{t.hero.headlineAccent}</span>
              </h1>
              <p className="mb-6 max-w-xl text-lg leading-relaxed text-emerald-50 md:text-xl">
                {t.hero.subhead}
              </p>

              {/* Hero pricing badge — ticket-style dual cards */}
              <div
                className="mb-6 grid w-full max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-[1fr_auto_1fr] sm:items-center"
                aria-label={t.hero.pricingAria}
              >
                <div className="relative overflow-hidden rounded-xl border border-emerald-200/80 bg-white shadow-md">
                  <div
                    className="absolute inset-y-0 start-0 w-1 bg-emerald-500"
                    aria-hidden
                  />
                  <div className="flex items-center justify-between gap-3 py-3 ps-4 pe-3">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-slate-500">
                        {locale === "ar"
                          ? t.hero.standardLabel
                          : standardDigitalPkg?.name || "Standard Digital"}
                      </p>
                      <p className="mt-0.5 font-display text-2xl font-bold tracking-tight text-emerald-800">
                        {standardDigitalPkg
                          ? formatPrice(
                              standardDigitalPkg.priceCents,
                              standardDigitalPkg.currency,
                            )
                          : "AED 20"}
                      </p>
                    </div>
                    <span className="rounded-md bg-emerald-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-700">
                      {t.hero.instantBadge}
                    </span>
                  </div>
                </div>

                <span className="hidden text-center text-xs font-semibold uppercase tracking-widest text-emerald-100/80 sm:block">
                  {t.hero.or}
                </span>

                <div className="relative overflow-hidden rounded-xl border border-white/40 bg-gradient-to-br from-emerald-700 to-emerald-900 shadow-md shadow-emerald-950/30">
                  <div className="flex items-center justify-between gap-3 px-3 py-3 ps-4">
                    <div className="min-w-0">
                      <p className="truncate text-xs font-medium text-emerald-100/90">
                        {locale === "ar"
                          ? t.hero.humanLabel
                          : humanVerifiedPkg?.name || "Human Verified"}
                      </p>
                      <p className="mt-0.5 font-display text-2xl font-bold tracking-tight text-white">
                        {humanVerifiedPkg
                          ? formatPrice(
                              humanVerifiedPkg.priceCents,
                              humanVerifiedPkg.currency,
                            )
                          : "AED 30"}
                      </p>
                    </div>
                    <span className="rounded-md bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                      {t.hero.bestBadge}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-8 flex w-full max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch">
                <NavItem
                  href="/make-photo"
                  className="inline-flex flex-1 items-center justify-center whitespace-nowrap rounded-lg bg-white px-6 py-4 text-center text-base font-bold text-primary shadow-lg transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-50 sm:text-lg"
                >
                  {t.hero.uploadCta}
                </NavItem>
                <NavItem
                  href="/make-photo"
                  className="inline-flex flex-1 items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-white px-6 py-4 text-center text-base font-bold text-white transition-all duration-200 hover:bg-white hover:text-primary sm:text-lg"
                >
                  <ShieldCheck className="h-5 w-5 shrink-0" />
                  {t.hero.humanCta}
                </NavItem>
              </div>
              <div className="flex w-full max-w-xl flex-wrap gap-2">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2">
                  <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-200" />
                  <span className="whitespace-nowrap text-sm text-emerald-50">
                    {t.hero.badgeIcp}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2">
                  <FileCheck2 className="h-4 w-4 shrink-0 text-emerald-200" />
                  <span className="whitespace-nowrap text-sm text-emerald-50">
                    {t.hero.badgeGdrfa}
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2">
                  <Send className="h-4 w-4 shrink-0 text-emerald-200" />
                  <span className="whitespace-nowrap text-sm text-emerald-50">
                    {t.hero.badgeInstant}
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="transform rounded-2xl bg-white p-8 shadow-2xl transition-transform duration-300 hover:scale-105">
                <div className="relative mb-4 aspect-square overflow-hidden rounded-lg">
                  <Image
                    src="/hero-uae.jpg"
                    alt="Customer with digital and printed passport photos"
                    fill
                    className="object-cover object-center"
                    priority
                    sizes="(max-width: 1024px) 90vw, 480px"
                  />
                </div>
                <div className="text-center">
                  <p className="font-semibold text-gray-600">
                    {t.hero.cardTitle}
                  </p>
                  <p className="text-sm text-gray-500">{t.hero.cardSubtitle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirement Selector Section */}
      <section ref={servicesSectionRef} className="bg-emerald-50 py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t.services.title}
            </h2>
            <p className="text-xl text-gray-600">{t.services.subtitle}</p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="photo-requirement"
              className="mb-2 block text-sm font-semibold text-gray-700"
            >
              {t.services.documentType}
            </label>
            <select
              id="photo-requirement"
              value={selectedRequirement}
              onChange={(e) =>
                setSelectedRequirement(e.target.value as SpecCode)
              }
              className="w-full rounded-xl border border-emerald-200 bg-white px-4 py-3 text-gray-900 shadow-sm focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
            >
              {photoRequirements.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.title} — {item.description}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-8 grid gap-4 sm:grid-cols-2">
            {photoRequirements.map((item) => {
              const isSelected = selectedRequirement === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedRequirement(item.id)}
                  className={`flex h-full min-w-0 flex-col rounded-xl border-2 p-5 text-start transition-all duration-200 ${
                    isSelected
                      ? "border-emerald-600 bg-white shadow-md ring-2 ring-emerald-600/20"
                      : "border-transparent bg-white/80 hover:border-emerald-200 hover:shadow-sm"
                  }`}
                >
                  <div className="mb-3 flex items-start justify-between gap-3">
                    <div
                      className={`shrink-0 rounded-lg p-2 ${
                        isSelected
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {item.icon}
                    </div>
                    {isSelected ? (
                      <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : (
                      <span className="h-6 w-6 shrink-0" aria-hidden />
                    )}
                  </div>
                  <h3 className="mb-1 text-lg font-semibold leading-snug text-balance text-gray-900">
                    {item.title}
                  </h3>
                  <p className="mb-2 text-sm font-medium text-emerald-700">
                    {item.description}
                  </p>
                  <p className="text-sm leading-relaxed text-gray-600">
                    {item.detail}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 rounded-xl border border-emerald-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className="text-sm text-gray-500">{t.services.selected}</p>
              <p className="text-lg font-semibold leading-snug text-balance text-gray-900">
                {selectedRequirementMeta?.title}
              </p>
              <p className="text-sm text-gray-600">
                {selectedRequirementMeta?.description}
              </p>
            </div>
            <button
              type="button"
              onClick={() =>
                router.push(`/make-photo?specCode=${selectedRequirement}`)
              }
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-emerald-700"
            >
              {t.services.continueCta}
              <ArrowRight className="h-5 w-5 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </section>

      <PhotoGuidelines copy={t.guidelines} />

      {/* Why Choose Us Section */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t.whyUs.title}
            </h2>
            <p className="text-xl text-gray-600">{t.whyUs.subtitle}</p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {t.whyUs.items.map((feature) => (
              <div key={feature.id} className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100">
                  <div className="text-emerald-600">
                    {whyUsIcons[feature.id as keyof typeof whyUsIcons]}
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        ref={pricingSectionRef}
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
              {t.pricing.eyebrow}
            </p>
            <h2 className="font-display mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t.pricing.title}
            </h2>
            <p className="mx-auto max-w-xl text-lg text-gray-600 md:text-xl">
              {t.pricing.subtitle}
            </p>
          </div>

          <div className="mx-auto grid max-w-3xl items-stretch gap-6 md:grid-cols-2 md:gap-8">
            {constants.productPackages.map((pkg) => (
              <ProductPackageCard
                key={pkg.id}
                pkg={pkg}
                onBuyClick={handlePricingCheckout}
                locale={locale}
                pricingCopy={t.pricing}
              />
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">
            {t.pricing.note}
          </p>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsSectionRef} className="bg-white py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
              {t.testimonials.title}
            </h2>
            <p className="text-xl text-gray-600">{t.testimonials.subtitle}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {t.testimonials.items.map((item) => (
              <blockquote
                key={item.name}
                className="flex flex-col rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6"
              >
                <div className="mb-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-current text-amber-400"
                    />
                  ))}
                </div>
                <p className="mb-6 flex-1 leading-relaxed text-slate-800">
                  “{item.quote}”
                </p>
                <footer>
                  <p className="font-semibold text-slate-900">{item.name}</p>
                  <p className="text-sm text-emerald-800">{item.location}</p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      <div ref={faqSectionRef}>
        <FaqSection
          items={t.faq.items}
          eyebrow={t.faq.eyebrow}
          title={t.faq.title}
          subtitle={t.faq.subtitle}
        />
      </div>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-emerald-800 via-emerald-900 to-neutral-950 py-20 text-white">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="font-display mb-4 text-3xl font-bold text-white md:text-4xl">
            {t.cta.title}
          </h2>
          <p className="mb-8 text-xl text-emerald-50">{t.cta.subtitle}</p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <NavItem
              href="/make-photo"
              className="rounded-lg bg-white px-8 py-4 text-center text-lg font-bold text-emerald-800 transition-colors hover:bg-emerald-50"
            >
              {t.cta.createOnline}
            </NavItem>
            <NavItem
              href="/make-photo"
              className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-center text-lg font-bold text-white transition-colors hover:bg-white hover:text-emerald-800"
            >
              <ShieldCheck className="h-5 w-5" />
              {t.cta.humanVerify}
            </NavItem>
          </div>

          <div className="mt-8 text-emerald-50">
            <p>
              {t.cta.questionsPrefix} {t.cta.emailLabel}{" "}
              <a
                href={`mailto:${email}`}
                className="font-semibold text-white underline underline-offset-2"
              >
                {email}
              </a>{" "}
              · {t.cta.whatsappLabel}{" "}
              <a
                href={`https://wa.me/${whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-white underline underline-offset-2"
              >
                {phone}
              </a>
            </p>
          </div>
        </div>
      </section>

      <SiteFooter
        locale={locale}
        dictionary={dictionary}
        contactRef={contactSectionRef}
        homeHref={homeHref}
      />
    </div>
  );
}

export default HomeView;
