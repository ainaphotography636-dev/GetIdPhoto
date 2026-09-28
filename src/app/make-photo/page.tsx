import type { Metadata } from "next";
import React, { Suspense } from "react";
import MakePhotoView from "@/views/MakePhotoView";

export const metadata: Metadata = {
  title: "Make Passport & ID Photo Online",
  description:
    "Upload a selfie and get an ICP/GDRFA-compliant UAE passport, Emirates ID, or GCC visa photo in seconds. AI processing with optional human verification.",
  alternates: {
    canonical: "/make-photo",
  },
  openGraph: {
    title: "Make Passport & ID Photo Online | GetIDPhotoAI",
    description:
      "Upload a selfie and get government-compliant biometric photos for UAE and GCC documents instantly.",
    url: "/make-photo",
  },
};

export default function MakePhotoPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MakePhotoView />
    </Suspense>
  );
}
