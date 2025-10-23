// app/book/studio/[slug]/ClientStudioPage.jsx
"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { MapPin, Globe } from "lucide-react";

import IntroSection from "../../../components/IntroSection";
import FooterInfoStrip from "../../../components/FooterInfoStrip";
import OfficePreview from "../../../components/book/OfficePreview";
import ServicesList from "../../../components/book/ServicesList";
import ContactAndHours from "../../../components/book/ContactHours";

export default function ClientStudioPage({ studio, initialLocale = "el" }) {
  // Seed from server-provided initialLocale to avoid hydration mismatch
  const [locale, setLocale] = useState(initialLocale);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("locale");
      const next = saved === "en" || saved === "el" ? saved : initialLocale;

      localStorage.setItem("locale", next);
      document.cookie = `locale=${next}; path=/; max-age=31536000; samesite=lax`;

      if (next !== locale) setLocale(next);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialLocale]);

  const t = useMemo(
    () =>
      locale === "en"
        ? {
          book: "Book Session",
          websiteAria: "Website (opens in a new tab)",
          websiteTitle: "Open website",
          mapTitle: `Map — ${studio.name}`,
          unavailable: "Booking unavailable",
        }
        : {
          book: "Κλείσε Προπόνηση",
          websiteAria: "Ιστότοπος στο νέο παράθυρο",
          websiteTitle: "Άνοιγμα ιστότοπου",
          mapTitle: `Χάρτης — ${studio.name}`,
          unavailable: "Μη διαθέσιμο",
        },
    [locale, studio?.name]
  );

  const getButtonProps = useCallback(() => {
    switch (studio.booking_mode) {
      case "EXTERNAL_REDIRECT":
        return {
          type: "external",
          href: studio.external_contact_url || studio.website || "",
        };
      case "CONTACT_ONLY":
      case "CALENDAR_AND_CONTACT":
      case "CALENDAR_ONLY":
      default:
        return {
          type: "internal",
          href: `/book/studio/${studio.slug}/availability?lang=${locale}`,
        };
    }
  }, [studio.booking_mode, studio.external_contact_url, studio.website, studio.slug, locale]);

  const btn = getButtonProps();
  const hasBtn = btn.href && btn.href.length > 0;

  return (
    <main className="flex flex-col">
      <IntroSection
        image={studio.photoUrls?.[0]}
        title={null}
        paragraph={
          <div className="max-w-5xl mx-auto w-full">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold">{studio.name}</h2>

                <div className="mt-1 space-y-1">
                  {studio.address && (
                    <p className="text-gray-700 flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-blue-500" />
                      {studio.address}
                    </p>
                  )}

                  {studio.website && (
                    <p className="text-gray-700 flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-500" />
                      <a
                        href={studio.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline break-all"
                        aria-label={t.websiteAria}
                        title={t.websiteTitle}
                      >
                        {studio.website}
                      </a>
                    </p>
                  )}
                </div>
              </div>

              {hasBtn ? (
                btn.type === "external" ? (
                  <a
                    href={btn.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn self-start sm:self-auto"
                  >
                    {t.book}
                  </a>
                ) : (
                  <a href={btn.href} className="btn self-start sm:self-auto">
                    {t.book}
                  </a>
                )
              ) : (
                <span className="inline-flex items-center rounded-md bg-gray-200 text-gray-700 px-3 py-2 text-sm self-start sm:self-auto">
                  {t.unavailable}
                </span>
              )}
            </div>
          </div>
        }
      />

      <ContactAndHours studio={studio} locale={locale} />

      {studio.services?.length > 0 && (
        <section className="py-6">
          <ServicesList services={studio.services} locale={locale} />
        </section>
      )}

      <OfficePreview locale={locale} images={studio.photoUrls?.slice(0, 6) || []} />

      {studio?.iframeSrc ? (
        <section className="w-full">
          <iframe
            src={studio.iframeSrc}
            className="w-full"
            height="420"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={t.mapTitle}
          />
        </section>
      ) : null}

      <FooterInfoStrip locale={locale} />
    </main>
  );
}
