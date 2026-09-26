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
import { useRef, useState, type ReactNode } from "react";
import NavItem from "../lib/nav-item";
import { startStripeCheckout } from "../lib/startStripeCheckout";
import type { ProductPackage } from "../models/ProductPackage";

const testimonials = [
  {
    name: "Sara Al Mansoori",
    location: "Dubai",
    quote:
      "Got my Emirates ID photo ready in under a minute. Accepted on the first try at the typing centre—no mall trip needed.",
  },
  {
    name: "James Okonkwo",
    location: "Abu Dhabi",
    quote:
      "Used Human Verified for my residency visa. The reviewer caught a lighting issue and fixed it before I submitted to GDRFA.",
  },
  {
    name: "Fatima Rahman",
    location: "Sharjah",
    quote:
      "Clear pricing, instant download, and the print sheet worked perfectly at home. GetIDPhotoAI.ae saved me a whole afternoon.",
  },
];

const photoRequirements: {
  id: SpecCode;
  title: string;
  description: string;
  detail: string;
  icon: ReactNode;
}[] = [
  {
    id: "uae-passport",
    title: "UAE Passport",
    description: "Standard biometric dimensions",
    detail: "Official UAE passport photo sizing and biometric framing",
    icon: <Camera className="h-6 w-6" />,
  },
  {
    id: "uae-id-card",
    title: "Emirates ID",
    description: "ICP specifications",
    detail: "Meets ICP Smart Services Emirates ID photo requirements",
    icon: <CreditCard className="h-6 w-6" />,
  },
  {
    id: "dubai-visa",
    title: "Dubai Tourist / Residency Visa",
    description: "GDRFA dimensions & white background",
    detail: "GDRFA-compliant sizing with required white background",
    icon: <Plane className="h-6 w-6" />,
  },
  {
    id: "40x60-mm",
    title: "Standard International",
    description: "40×60 mm format",
    detail: "Common international 40×60 mm photo format",
    icon: <Ruler className="h-6 w-6" />,
  },
];

function HomeView() {
  const router = useRouter();
  const [selectedRequirement, setSelectedRequirement] = useState<SpecCode>(
    photoRequirements[0].id,
  );
  const [checkoutPackageId, setCheckoutPackageId] = useState<string | null>(
    null,
  );
  const [checkoutError, setCheckoutError] = useState("");

  const servicesSectionRef = useRef<HTMLDivElement | null>(null);
  const pricingSectionRef = useRef<HTMLDivElement | null>(null);
  const testimonialsSectionRef = useRef<HTMLDivElement | null>(null);
  const contactSectionRef = useRef<HTMLDivElement | null>(null);

  const navItems = [
    {
      label: "Services",
      handler: () => {
        servicesSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: "Pricing",
      handler: () => {
        pricingSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: "Testimonials",
      handler: () => {
        testimonialsSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      label: "Contact",
      handler: () => {
        contactSectionRef.current?.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  const selectedRequirementMeta = photoRequirements.find(
    (item) => item.id === selectedRequirement,
  );

  const handlePricingCheckout = async (pkg: ProductPackage) => {
    setCheckoutError("");
    setCheckoutPackageId(pkg.id);
    try {
      await startStripeCheckout({ packageId: pkg.id });
    } catch (err) {
      console.error("[pricing] Checkout failed", err);
      const message =
        err instanceof Error
          ? err.message
          : "Unable to start checkout. Please try again.";
      const details =
        err && typeof err === "object" && "details" in err
          ? (err as { details?: Record<string, unknown> }).details
          : undefined;
      if (details) {
        console.error("[pricing] Checkout error details", details);
      }
      setCheckoutError(message);
      setCheckoutPackageId(null);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            <BrandLogo height={68} />
            <nav className="hidden md:flex space-x-8">
              {navItems.map((it, index) => (
                <button
                  key={index}
                  className="text-gray-600 hover:text-emerald-600 font-medium transition-colors"
                  onClick={() => {
                    it.handler();
                  }}
                >
                  {it.label}
                </button>
              ))}
            </nav>

            <NavItem href="/make-photo">
              <button className="bg-emerald-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors hidden md:block">
                Make Photo Online
              </button>
            </NavItem>

            <button className="md:hidden">
              <div className="w-6 h-5 flex flex-col justify-between">
                <span className="w-full h-0.5 bg-gray-700"></span>
                <span className="w-full h-0.5 bg-gray-700"></span>
                <span className="w-full h-0.5 bg-gray-700"></span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 bg-gradient-to-br from-emerald-800 via-emerald-900 to-neutral-950 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-emerald-100">
                  Rated 4.9/5 by 2,500+ customers
                </span>
              </div>
              <p className="text-lg font-semibold tracking-wide text-emerald-200 mb-3">
                {constants.studioName || "GetIDPhotoAI"}
              </p>
              <h1 className="font-display text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] tracking-tight text-white mb-6">
                UAE Passport, Visa &amp; Emirates ID
                <span className="block text-white">Photo Maker</span>
              </h1>
              <p className="text-xl text-emerald-50 mb-8 leading-relaxed">
                100% compliant with ICP and GDRFA specifications. Get your
                digital photo ready in under 30 seconds—no trip to the mall
                required.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <NavItem
                  href="/make-photo"
                  className="bg-white text-emerald-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transform hover:scale-105 transition-all duration-200 shadow-lg text-center"
                >
                  Create Photos Online
                </NavItem>
                <NavItem
                  href="/make-photo"
                  className="border-2 border-red-400 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-600 hover:border-red-600 transition-all duration-200 text-center inline-flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="h-5 w-5" />
                  Human Verification
                </NavItem>
              </div>
              <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3">
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-2">
                  <BadgeCheck className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-emerald-50">
                    ICP Smart Services Compliant
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-2">
                  <FileCheck2 className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-emerald-50">
                    GDRFA Approved Formats
                  </span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 border border-white/20 px-3 py-2">
                  <Send className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm text-emerald-50">
                    Instant Digital Delivery
                  </span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <div className="relative aspect-square overflow-hidden rounded-lg mb-4">
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
                  <p className="text-gray-600 font-semibold">
                    Government Compliant
                  </p>
                  <p className="text-gray-500 text-sm">
                    Meets all official requirements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirement Selector Section */}
      <section ref={servicesSectionRef} className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Choose Your Official Requirement
            </h2>
            <p className="text-xl text-gray-600">
              Select the exact document type before uploading your photo
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="photo-requirement"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Document type
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

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {photoRequirements.map((item) => {
              const isSelected = selectedRequirement === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedRequirement(item.id)}
                  className={`text-left rounded-xl border-2 p-5 transition-all duration-200 ${
                    isSelected
                      ? "border-emerald-600 bg-white shadow-md ring-2 ring-emerald-600/20"
                      : "border-transparent bg-white/80 hover:border-emerald-200 hover:shadow-sm"
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div
                      className={`rounded-lg p-2 ${
                        isSelected
                          ? "bg-emerald-600 text-white"
                          : "bg-emerald-100 text-emerald-700"
                      }`}
                    >
                      {item.icon}
                    </div>
                    {isSelected ? (
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-emerald-600 text-white">
                        <Check className="h-4 w-4" />
                      </span>
                    ) : null}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm font-medium text-emerald-700 mb-2">
                    {item.description}
                  </p>
                  <p className="text-sm text-gray-600">{item.detail}</p>
                </button>
              );
            })}
          </div>

          <div className="rounded-xl bg-white border border-emerald-100 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Selected requirement</p>
              <p className="text-lg font-semibold text-gray-900">
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
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
            >
              Continue to Upload
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </section>

      <PhotoGuidelines />

      {/* Why Choose Us Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose {constants.studioName}?
            </h2>
            <p className="text-xl text-gray-600">
              Professional service you can trust
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Shield className="h-12 w-12" />,
                title: "100% Guarantee",
                description:
                  "If your photos are rejected, we'll retake them for free or refund your money",
              },
              {
                icon: <Zap className="h-12 w-12" />,
                title: "10-Minute Service",
                description:
                  "Walk in and walk out with professional photos in just 10 minutes",
              },
              {
                icon: <Award className="h-12 w-12" />,
                title: "Government Compliant",
                description:
                  "All photos meet strict government standards and requirements",
              },
              {
                icon: <Users className="h-12 w-12" />,
                title: "Expert Staff",
                description:
                  "Trained professionals with years of experience in official photography",
              },
            ].map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-emerald-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <div className="text-emerald-600">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section ref={pricingSectionRef} className="py-20 bg-emerald-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              No hidden fees, no surprises.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto pt-4">
            {constants.productPackages.map((pkg) => (
              <ProductPackageCard
                key={pkg.id}
                pkg={pkg}
                isLoading={checkoutPackageId === pkg.id}
                onBuyClick={handlePricingCheckout}
              />
            ))}
          </div>
          {checkoutError ? (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center">
              <p className="text-red-800 text-sm font-semibold">
                Checkout error
              </p>
              <p className="text-red-700 text-sm mt-1 break-words">
                {checkoutError}
              </p>
              <p className="text-red-600/80 text-xs mt-2">
                Open the browser console for full Stripe diagnostics.
              </p>
            </div>
          ) : null}
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsSectionRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Trusted Across the UAE
            </h2>
            <p className="text-xl text-gray-600">
              Real customers. Real ICP &amp; GDRFA-ready photos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((item) => (
              <blockquote
                key={item.name}
                className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-6 flex flex-col"
              >
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-amber-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-slate-800 leading-relaxed flex-1 mb-6">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 via-emerald-900 to-neutral-950 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Get Your Photos?
          </h2>
          <p className="text-xl text-emerald-50 mb-8">
            Skip the mall. Get ICP and GDRFA-compliant digital photos online at
            GetIDPhotoAI.ae.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavItem
              href="/make-photo"
              className="bg-white text-emerald-800 px-8 py-4 rounded-lg font-bold text-lg hover:bg-emerald-50 transition-colors text-center"
            >
              Create Photos Online
            </NavItem>
            <NavItem
              href="/make-photo"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-white hover:text-emerald-800 transition-colors text-center inline-flex items-center justify-center gap-2"
            >
              <ShieldCheck className="h-5 w-5" />
              Human Verification
            </NavItem>
          </div>

          <div className="mt-8 text-emerald-50">
            <p>
              Questions? Email{" "}
              <a
                href={`mailto:${constants.businessLocations[0]?.email}`}
                className="font-semibold text-white underline underline-offset-2"
              >
                {constants.businessLocations[0]?.email}
              </a>{" "}
              ·{" "}
              <a
                href="https://getidphotoai.ae"
                className="font-semibold text-white underline underline-offset-2"
              >
                GetIDPhotoAI.ae
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer ref={contactSectionRef} className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="mb-4">
                <BrandLogo height={64} variant="light" />
              </div>
              <p className="text-gray-400 leading-relaxed mb-4">
                UAE passport, visa, and Emirates ID photos online — ICP and
                GDRFA compliant. Instant digital delivery at GetIDPhotoAI.ae.
              </p>
              <div className="flex space-x-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <span className="text-gray-400 text-sm">
                  4.9/5 from 2,500+ reviews
                </span>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#services" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); servicesSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>
                    UAE Passport Photos
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); servicesSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>
                    Emirates ID Photos
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); servicesSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>
                    Dubai Visa Photos
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-white transition-colors" onClick={(e) => { e.preventDefault(); servicesSectionRef.current?.scrollIntoView({ behavior: "smooth" }); }}>
                    Standard International
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Info</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a
                    href="https://getidphotoai.ae"
                    className="hover:text-white transition-colors"
                  >
                    GetIDPhotoAI.ae
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${constants.businessLocations[0]?.email}`}
                    className="hover:text-white transition-colors"
                  >
                    {constants.businessLocations[0]?.email}
                  </a>
                </li>
                <li>{constants.businessLocations[0]?.hours}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col items-center md:items-start gap-2">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} {constants.studioName}. All
                rights reserved.
              </p>
              <a
                href="https://getidphoto.ae"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Power by getidphoto.ae
              </a>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Refund Policy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomeView;
