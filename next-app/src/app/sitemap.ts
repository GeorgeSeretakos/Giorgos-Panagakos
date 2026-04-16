import type { MetadataRoute } from "next";
import posts from "../../public/data/blog";
import { getSiteUrl } from "./lib/siteUrl";

const locales = ["el", "en"] as const;

const staticPaths = [
  "",
  "/about",
  "/contact",
  "/thank-you",
  "/services",
  "/office",
  "/blog",
  "/privacy-policy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const staticEntries = staticPaths.flatMap((path) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: now,
      changeFrequency:
        path === "/blog" ? ("weekly" as const) : ("monthly" as const),
      priority:
        path === "" ? 1 : path === "/thank-you" ? 0.3 : 0.7,
      alternates: {
        languages: {
          el: `${baseUrl}/el${path}`,
          en: `${baseUrl}/en${path}`,
        },
      },
    }))
  );

  const blogSlugs = posts
    .map((post: { slug?: string | null }) => post.slug)
    .filter((slug): slug is string => Boolean(slug));

  const blogPostEntries = blogSlugs.flatMap((slug) =>
    locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      alternates: {
        languages: {
          el: `${baseUrl}/el/blog/${slug}`,
          en: `${baseUrl}/en/blog/${slug}`,
        },
      },
    }))
  );

  return [...staticEntries, ...blogPostEntries];
}
