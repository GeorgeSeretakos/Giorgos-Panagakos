import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES } from "../lib/locales";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!SUPPORTED_LOCALES.includes(locale)) {
    notFound();
  }

  return children;
}
