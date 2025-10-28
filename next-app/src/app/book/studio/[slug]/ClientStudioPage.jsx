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
          book: "Schedule training",
          websiteAria: "Website (opens in a new tab)",
          websiteTitle: "Open website",
          instagramLabel: "Instagram profile",
          facebookLabel: "Facebook profile",
          notesTitle: "About this studio",
          mapTitle: `Map — ${studio.name}`,
        }
        : {
          book: "Κλείσε Προπόνηση",
          websiteAria: "Ιστότοπος στο νέο παράθυρο",
          websiteTitle: "Άνοιγμα ιστότοπου",
          instagramLabel: "Instagram profile",
          facebookLabel: "Facebook profile",
          notesTitle: "Σχετικά με το στούντιο",
          mapTitle: `Χάρτης — ${studio.name}`,
        },
    [locale, studio?.name]
  );

  // If a studio has no booking method at all, don't render a CTA button.
  // Treat missing/null booking_mode OR explicit "NONE" as "no booking".
  const getButtonProps = useCallback(() => {
    const mode = studio?.booking_mode;

    if (!mode || mode === "NONE") return null;

    switch (mode) {
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
  }, [
    studio.booking_mode,
    studio.external_contact_url,
    studio.website,
    studio.slug,
    locale,
  ]);

  const btn = getButtonProps();
  const hasBtn = !!btn?.href;

  const normalizeUrl = (u) =>
    u?.startsWith("http") ? u : u ? `https://${u}` : "";

  return (
    <main className="flex flex-col">
      <IntroSection
        image={studio.photoUrls?.[0]}
        title={null}
        hasDarkOverlay={false}
        isStudioPage={true}
        paragraph={
          <div className="max-w-5xl mx-auto w-full">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl sm:text-3xl font-semibold">
                  {studio.name}
                </h2>

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
                        href={normalizeUrl(studio.website)}
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

                  {(studio.instagram || studio.facebook) && (
                    <div className="mt-2 flex items-center gap-6">
                      {studio.instagram && (
                        <a
                          href={normalizeUrl(studio.instagram)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 group"
                          aria-label="Instagram profile"
                          title="Instagram profile"
                        >
                          <img
                            src="/icons/instagram.png"
                            alt="Instagram"
                            className="h-5 w-5"
                          />
                          <span className="text-sm text-gray-700 group-hover:underline">
                            Instagram profile
                          </span>
                        </a>
                      )}
                      {studio.facebook && (
                        <a
                          href={normalizeUrl(studio.facebook)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 group"
                          aria-label="Facebook profile"
                          title="Facebook profile"
                        >
                          <img
                            src="/icons/facebook.png"
                            alt="Facebook"
                            className="h-5 w-5"
                          />
                          <span className="text-sm text-gray-700 group-hover:underline">
                            Facebook profile
                          </span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {hasBtn &&
                (btn.type === "external" ? (
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
                ))}
              {/* If no booking, render nothing here */}
            </div>
          </div>
        }
      />

      <ContactAndHours studio={studio} locale={locale} />

      {Array.isArray(studio.notes) && studio.notes.length > 0 && (
        <section className="py-6">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="title-black">{t.notesTitle}</h2>
            <div className="max-w-3xl mt-4 space-y-4 text-gray-700 leading-relaxed">
              {studio.notes.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>
        </section>
      )}

      {studio.services?.length > 0 && (
        <section className="py-6">
          <ServicesList services={studio.services} locale={locale} />
        </section>
      )}

      <OfficePreview
        locale={locale}
        images={studio.photoUrls?.slice(0, 6) || []}
      />

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
