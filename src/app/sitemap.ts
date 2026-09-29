import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { DOCUMENT_PAGES, documentPath } from "@/lib/document-catalog";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const documentEntries: MetadataRoute.Sitemap = DOCUMENT_PAGES.map((page) => ({
    url: `${SITE_URL}${documentPath(page)}`,
    lastModified,
    changeFrequency: "weekly",
    priority: page.tier === "primary" ? 0.85 : 0.7,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_URL}/ar`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${SITE_URL}/spec`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/make-photo`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/privacy-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/terms-of-service`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/refund-policy`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...documentEntries,
  ];
}
