import type { Metadata } from "next";
import { Outfit, Source_Serif_4, Noto_Sans_Arabic } from "next/font/google";
import "./globals.css";
import JsonLd from "@/components/JsonLd";
import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getDictionary } from "@/i18n/get-dictionary";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_TITLE,
  GEO,
  OG_IMAGE_PATH,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  buildHomeAlternates,
  homeUrlForLocale,
} from "@/lib/seo";
import { getRequestLocale } from "@/i18n/get-request-locale";
import { htmlLang, isRtl } from "@/i18n/config";

const gitVersion = process.env.GIT_COMMIT_SHA;

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: SEO_KEYWORDS,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "photography",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    ...buildHomeAlternates("en"),
  },
  openGraph: {
    type: "website",
    locale: "en_AE",
    alternateLocale: ["ar_AE"],
    url: homeUrlForLocale("en"),
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: "GetIDPhotoAI — UAE passport and Emirates ID photo maker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [OG_IMAGE_PATH],
  },
  verification: {
    google: "LLOX9Tc96M9IY0jfOLpRWQT9whz5s9mxCWjdHJfrLt8",
    other: {
      "msvalidate.01": "83678490EB3452DA1BF2A4E3CD70ABC8",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  other: {
    "geo.region": GEO.region,
    "geo.placename": GEO.placename,
    "geo.position": GEO.position,
    ICBM: GEO.icbm,
    coverage: "United Arab Emirates, GCC",
    distribution: "global",
    rating: "general",
    "revisit-after": "3 days",
    "target-country": "AE,SA,QA,OM,BH,KW",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getRequestLocale();
  const rtl = isRtl(locale);
  const lang = htmlLang(locale);
  const dictionary = await getDictionary(locale);

  return (
    <html lang={lang} dir={rtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <meta name="version" content={gitVersion} />
        <meta
          httpEquiv="content-language"
          content={locale === "ar" ? "ar-AE" : "en-AE"}
        />
        <meta name="geo.region" content={GEO.region} />
        <meta name="geo.placename" content={GEO.placename} />
        <meta name="geo.position" content={GEO.position} />
        <meta name="ICBM" content={GEO.icbm} />
      </head>
      <body
        className={`${outfit.variable} ${sourceSerif.variable} ${notoArabic.variable} antialiased font-sans ${
          rtl ? "font-arabic" : ""
        }`}
      >
        <LocaleProvider locale={locale} dictionary={dictionary}>
          <JsonLd />
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
