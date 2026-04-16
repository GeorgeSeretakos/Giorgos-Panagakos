"use client";

import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from "./locales";

export function getLocaleFromPathname(pathname) {
  if (!pathname) return DEFAULT_LOCALE;
  const firstSegment = pathname.split("/").filter(Boolean)[0];
  return SUPPORTED_LOCALES.includes(firstSegment) ? firstSegment : DEFAULT_LOCALE;
}

export function stripLocalePrefix(pathname) {
  if (!pathname) return "/";
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  if (!SUPPORTED_LOCALES.includes(segments[0])) return pathname;
  const rest = segments.slice(1).join("/");
  return rest ? `/${rest}` : "/";
}

export function localizePath(path, locale) {
  if (!path) return `/${locale}`;
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("mailto:") ||
    path.startsWith("tel:") ||
    path.startsWith("#")
  ) {
    return path;
  }

  const normalized = path.startsWith("/") ? path : `/${path}`;
  const cleanPath = stripLocalePrefix(normalized);
  return cleanPath === "/" ? `/${locale}` : `/${locale}${cleanPath}`;
}

export function useLocale() {
  const pathname = usePathname();
  return getLocaleFromPathname(pathname);
}
