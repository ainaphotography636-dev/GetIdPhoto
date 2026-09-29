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
  env: {
    GIT_COMMIT_SHA: getGitVersion(),
  },
  async redirects() {
    return LEGACY_SPEC_REDIRECTS.map(([country, document, slug]) => ({
      source: `/spec/${country}/${document}`,
      destination: `/spec/${slug}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
