import type { NextConfig } from "next";
import { getGitVersion } from "./src/lib/getGitVersion";

/** Old nested `/spec/{country}/{document}` → flat `/spec/{slug}` */
const LEGACY_SPEC_REDIRECTS: Array<[string, string, string]> = [
  ["uae", "passport", "uae-passport-photo"],
  ["uae", "emirates-id", "emirates-id-photo"],
  ["dubai", "visa", "dubai-visa-photo"],
  ["uae", "visa", "uae-visa-photo"],
  ["uae", "residence", "uae-residence-photo"],
  ["uae", "evisa", "uae-evisa-photo"],
  ["international", "40x60-mm", "40x60-mm-photo"],
  ["saudi-arabia", "passport", "saudi-arabia-passport-photo"],
  ["saudi-arabia", "visa", "saudi-arabia-visa-photo"],
  ["bahrain", "passport", "bahrain-passport-photo"],
  ["oman", "passport", "oman-passport-photo"],
  ["kuwait", "passport", "kuwait-passport-photo"],
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ["heic-convert", "heic-decode", "libheif-js"],
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  env: {
    GIT_COMMIT_SHA: getGitVersion(),
  },
  async redirects() {
    return [
      ...LEGACY_SPEC_REDIRECTS.filter(
        ([country, document]) =>
          document !== "emirates-id" &&
          !(country === "uae" && (document === "passport" || document === "visa")) &&
          !(country === "dubai" && document === "visa"),
      ).map(([country, document, slug]) => ({
        source: `/spec/${country}/${document}`,
        destination: `/spec/${slug}`,
        permanent: true,
      })),
      {
        source: "/spec/uae/emirates-id",
        destination: "/uae-emirates-id-photo",
        permanent: true,
      },
      {
        source: "/spec/emirates-id-photo",
        destination: "/uae-emirates-id-photo",
        permanent: true,
      },
      {
        source: "/spec/uae/passport",
        destination: "/uae-passport-photo",
        permanent: true,
      },
      {
        source: "/spec/uae-passport-photo",
        destination: "/uae-passport-photo",
        permanent: true,
      },
      {
        source: "/spec/uae/visa",
        destination: "/uae-visa-photo",
        permanent: true,
      },
      {
        source: "/spec/uae-visa-photo",
        destination: "/uae-visa-photo",
        permanent: true,
      },
      {
        source: "/spec/dubai/visa",
        destination: "/dubai-visa-photo",
        permanent: true,
      },
      {
        source: "/spec/dubai-visa-photo",
        destination: "/dubai-visa-photo",
        permanent: true,
      },
      {
        source: "/passport/indian",
        destination: "/india-passport-photo",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
