import type { MetadataRoute } from "next";
import { posts } from "../../public/data/blog.js";
import { SUPPORTED_LOCALES } from "./lib/locales.js";

const SITE =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://agpa-law-firm.gr";

const STATIC_SEGMENTS = [
  "",
  "about",
  "contact",
  "services",
  "office",
  "blog",
  "privacy-policy",
] as const;

function absoluteUrl(path: string) {
  if (path === "" || path === "/") return SITE;
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE}${p}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const seg of STATIC_SEGMENTS) {
    const path = seg === "" ? "" : `/${seg}`;
    entries.push({
      url: absoluteUrl(path),
      lastModified: new Date(),
      changeFrequency: seg === "" ? "weekly" : "monthly",
      priority: seg === "" ? 1 : 0.8,
    });
  }

  for (const locale of SUPPORTED_LOCALES) {
    for (const seg of STATIC_SEGMENTS) {
      const path = seg === "" ? `/${locale}` : `/${locale}/${seg}`;
      entries.push({
        url: absoluteUrl(path),
        lastModified: new Date(),
        changeFrequency: seg === "" ? "weekly" : "monthly",
        priority: seg === "" ? 0.9 : 0.7,
      });
    }
  }

  const slugs = posts
    .map((p: { slug: string | null }) => p.slug)
    .filter((s): s is string => Boolean(s));

  for (const slug of slugs) {
    entries.push({
      url: absoluteUrl(`/blog/${slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    });
    for (const locale of SUPPORTED_LOCALES) {
      entries.push({
        url: absoluteUrl(`/${locale}/blog/${slug}`),
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
