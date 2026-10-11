"use client";

import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BadgeCheck, FileCheck2, Send, Star } from "lucide-react";
import { emiratesIdData } from "@/data/emiratesIdData";
import type { UaePassportPageContent } from "@/data/uaePassportData";
import { constants } from "@/constants";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/en";
import { makePhotoHref } from "@/lib/document-catalog";
import type { SpecCode } from "@/models/PhotoSpec";
import {
  stageCameraStream,
  stagePhotoUpload,
} from "@/lib/pendingPhotoUpload";
import { formatPrice } from "@/utils/formatPrice";

type HeroContent = UaePassportPageContent;

const ACCEPTED_IMAGE_TYPES =
  "image/png,image/jpeg,image/jpg,image/webp,image/heic,image/heif,.heic,.heif,.webp";

function DropPhotoIcon() {
  return (
    <svg
      viewBox="0 0 72 52"
      className="mx-auto mb-3 h-12 w-16 text-white"
      aria-hidden
    >
      <circle
        cx="20"
        cy="16"
        r="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M6 44c1.2-9 6.4-14 14-14s12.8 5 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <rect
        x="36"
        y="6"
        width="24"
        height="18"
        rx="2.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="2.6 2"
      />
      <circle cx="42" cy="11.5" r="1.3" fill="currentColor" />
      <path d="M40 20.5l5-5 3.2 3.2 2.4-2.2 6.2 6H40z" fill="currentColor" />
      <path d="M52 28.5l8.2 14.2-3-.3 2.2 4.4-2.3 1.2-2.2-4.4-3.4 2.2z" fill="currentColor" />
    </svg>
  );
}

type EmiratesIdHeroProps = {
  locale: Locale;
  hero: Dictionary["hero"];
  content?: HeroContent;
  specCode?: SpecCode;
  title?: string;
};

export default function EmiratesIdHero({
  locale,
  hero,
  content,
  specCode = "uae-id-card",
  title,
}: EmiratesIdHeroProps) {
  const page = content ?? {
    ...emiratesIdData,
    breadcrumbLabel: "Emirates ID Photo",
    beforeAlt: "Before: a casual upper-body selfie in front of a door",
    afterAlt: "After: finished Emirates ID photo, 35 by 45 millimetres",
    afterAspectClass: "aspect-[35/45]",
    afterSizeLabel: "35 × 45 mm",
    afterCaption: "Emirates ID photo",
    trustPills: [
      "ICP Smart Services Compliant",
      "GDRFA Ready",
      hero.badgeInstant,
    ] as [string, string, string],
    howTitle: "",
    howIntro: "",
    specsHeading: "",
    dosHeading: "",
    dosIntro: "",
    faqTitle: "",
    faqSubtitle: "",
    pricingEyebrow: "",
    pricingTitle: "",
    pricingSubtitle: "",
  };
  const editorHref = makePhotoHref(specCode);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cameraError, setCameraError] = useState("");
  const [isOpeningCamera, setIsOpeningCamera] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragDepth = useRef(0);

  const standardDigitalPkg = constants.productPackages.find(
    (pkg) => pkg.id === "basic",
  );
  const humanVerifiedPkg = constants.productPackages.find(
    (pkg) => pkg.id === "standard",
  );

  const openFilePicker = () => {
    setCameraError("");
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) {
      return;
    }

    stagePhotoUpload(file);
    router.push(`${editorHref}&start=upload`);
  };

  const submitPhoto = (file: File | undefined) => {
    if (!file || !file.type.startsWith("image/")) {
      setCameraError("Drop a photo file to continue.");
      return;
    }

    setCameraError("");
    stagePhotoUpload(file);
    router.push(`${editorHref}&start=upload`);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepth.current += 1;
    setIsDragging(true);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepth.current = Math.max(0, dragDepth.current - 1);
    if (dragDepth.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    dragDepth.current = 0;
    setIsDragging(false);
    submitPhoto(event.dataTransfer.files?.[0]);
  };

  const handleTakePhoto = async () => {
    setCameraError("");
    setIsOpeningCamera(true);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      stageCameraStream(stream);
      router.push(`${editorHref}&start=camera`);
    } catch (error) {
      console.error(error);
      setCameraError("Unable to access camera. Please check permissions.");
      setIsOpeningCamera(false);
    }
  };

  return (
    <section
      aria-labelledby="emirates-id-hero-title"
      className="bg-gradient-to-br from-emerald-800 via-emerald-900 to-neutral-950 text-white"
    >
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <nav className="mb-8 text-sm text-emerald-100/80" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/requirements" className="hover:text-white">
                Requirements
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/requirements/uae" className="hover:text-white">
                UAE Documents
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li className="font-medium text-white" aria-current="page">
              {page.breadcrumbLabel}
            </li>
          </ol>
        </nav>

        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col items-start text-start">
            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className="h-5 w-5 fill-current text-yellow-400"
                  />
                ))}
              </div>
              <span className="text-emerald-100">{hero.rating}</span>
            </div>
            <p className="mb-3 text-lg font-semibold tracking-wide text-emerald-200">
              {constants.studioName || "GetIDPhotoAI"}
            </p>
            <h1
              id="emirates-id-hero-title"
              className="font-display mb-6 text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[3.25rem]"
            >
              {title ?? page.title}
            </h1>
            <p className="mb-6 text-lg leading-relaxed text-emerald-50 md:text-xl">
              {page.subtitle}
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept={ACCEPTED_IMAGE_TYPES}
              onChange={handleFileChange}
              className="hidden"
            />

            <div
              onDragEnter={handleDragEnter}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`mb-4 w-full rounded-[1.35rem] border-2 border-dashed bg-transparent px-6 py-7 text-center transition-colors ${
                isDragging ? "border-white bg-white/10" : "border-white/45"
              }`}
            >
              <DropPhotoIcon />
              <p className="text-[1.05rem] font-bold tracking-tight text-white">
                {isDragging ? "Drop your photo" : "Drag & drop your photo"}
              </p>
              <p className="mt-1 text-sm text-emerald-100/80">or</p>
              <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={openFilePicker}
                  className="inline-flex min-w-[9.5rem] items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-emerald-50"
                >
                  Upload photo
                </button>
                <button
                  type="button"
                  onClick={() => {
                    void handleTakePhoto();
                  }}
                  disabled={isOpeningCamera}
                  className="inline-flex min-w-[9.5rem] items-center justify-center rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-primary shadow-sm transition-colors hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isOpeningCamera ? "Opening camera..." : "Take photo"}
                </button>
              </div>
            </div>
            {cameraError ? (
              <p className="mb-3 text-sm text-red-200" role="alert">
                {cameraError}
              </p>
            ) : null}

            <div
              className="mb-8 grid w-full grid-cols-2 gap-3"
              aria-label={hero.pricingAria}
            >
              <div className="flex items-center justify-between gap-2 rounded-xl bg-white px-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-medium leading-tight text-slate-500">
                    {locale === "ar"
                      ? hero.standardLabel
                      : standardDigitalPkg?.name || "Standard Digital"}
                  </p>
                  <p className="font-display text-lg font-bold leading-tight tracking-tight text-emerald-800">
                    {standardDigitalPkg
                      ? formatPrice(
                          standardDigitalPkg.priceCents,
                          standardDigitalPkg.currency,
                        )
                      : "AED 20"}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                  {hero.instantBadge}
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 rounded-xl bg-emerald-700 px-3 py-2.5">
                <div className="min-w-0">
                  <p className="truncate text-[10px] font-medium leading-tight text-emerald-100">
                    {locale === "ar"
                      ? hero.humanLabel
                      : humanVerifiedPkg?.name || "Human Verified"}
                  </p>
                  <p className="font-display text-lg font-bold leading-tight tracking-tight text-white">
                    {humanVerifiedPkg
                      ? formatPrice(
                          humanVerifiedPkg.priceCents,
                          humanVerifiedPkg.currency,
                        )
                      : "AED 30"}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-emerald-800">
                  {hero.bestBadge}
                </span>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2">
                <BadgeCheck className="h-4 w-4 shrink-0 text-emerald-200" />
                <span className="whitespace-nowrap text-sm text-emerald-50">
                  {page.trustPills[0]}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2">
                <FileCheck2 className="h-4 w-4 shrink-0 text-emerald-200" />
                <span className="whitespace-nowrap text-sm text-emerald-50">
                  {page.trustPills[1]}
                </span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-2">
                <Send className="h-4 w-4 shrink-0 text-emerald-200" />
                <span className="whitespace-nowrap text-sm text-emerald-50">
                  {page.trustPills[2]}
                </span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="transform rounded-2xl bg-white p-5 shadow-2xl transition-transform duration-300 hover:scale-105 sm:p-6">
              <div className="grid grid-cols-2 items-end gap-3">
                <figure>
                  <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-100">
                    <Image
                      src={page.beforeSrc ?? "/emirates-id-before.jpg"}
                      alt={page.beforeAlt}
                      fill
                      priority
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 40vw, 220px"
                    />
                  </div>
                  <figcaption className="mt-2 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                      Before
                    </p>
                    <p className="text-sm font-semibold text-gray-600">
                      Your selfie
                    </p>
                  </figcaption>
                </figure>
                <figure>
                  <div className={`relative overflow-hidden rounded-lg bg-white ring-1 ring-slate-200 ${page.afterAspectClass}`}>
                    <Image
                      src={page.afterSrc ?? "/emirates-id-after.jpg"}
                      alt={page.afterAlt}
                      fill
                      priority
                      className="object-cover object-[center_15%]"
                      sizes="(max-width: 1024px) 40vw, 220px"
                    />
                    <span className="absolute inset-x-2 bottom-2 rounded-md bg-white/95 px-2 py-1 text-center text-xs font-bold tracking-wide text-slate-900 shadow-sm">
                      {page.afterSizeLabel}
                    </span>
                  </div>
                  <figcaption className="mt-2 text-center">
                    <p className="text-[11px] font-semibold uppercase tracking-wide text-emerald-700">
                      After
                    </p>
                    <p className="text-sm font-semibold text-gray-600">
                      {page.afterCaption}
                    </p>
                  </figcaption>
                </figure>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
