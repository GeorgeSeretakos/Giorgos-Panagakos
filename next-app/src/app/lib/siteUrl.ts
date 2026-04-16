/**
 * Canonical site origin for sitemap, robots, and metadata.
 * Set NEXT_PUBLIC_SITE_URL in .env (production / preview). No trailing slash.
 */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/$/, "");
  if (fromEnv) return fromEnv;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "http://localhost:3000";
}
