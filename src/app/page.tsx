import type { Metadata } from "next";
import HomeView from "@/views/HomeView";
import FaqJsonLd from "@/components/FaqJsonLd";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  OG_IMAGE_PATH,
  SITE_URL,
} from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: DEFAULT_TITLE,
  },
  description: DEFAULT_DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
    images: [{ url: OG_IMAGE_PATH }],
  },
};

export default function Home() {
  return (
    <>
      <FaqJsonLd />
      <HomeView />
    </>
  );
}
