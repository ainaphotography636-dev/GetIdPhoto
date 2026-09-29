import type { Metadata } from "next";
import HomeView from "@/views/HomeView";
import FaqJsonLd from "@/components/FaqJsonLd";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  OG_IMAGE_PATH,
  buildHomeAlternates,
  homeUrlForLocale,
} from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const dictionary = await getDictionary("ar");
  const pageUrl = homeUrlForLocale("ar");

  return {
    title: {
      absolute: dictionary.meta.title,
    },
    description: dictionary.meta.description,
    alternates: buildHomeAlternates("ar"),
    openGraph: {
      locale: "ar_AE",
      alternateLocale: ["en_AE"],
      title: dictionary.meta.title,
      description: dictionary.meta.description,
      url: pageUrl,
      images: [{ url: OG_IMAGE_PATH }],
    },
  };
}

export default async function ArabicHome() {
  const dictionary = await getDictionary("ar");

  return (
    <>
      <FaqJsonLd items={dictionary.faq.items} locale="ar" />
      <HomeView locale="ar" dictionary={dictionary} />
    </>
  );
}
