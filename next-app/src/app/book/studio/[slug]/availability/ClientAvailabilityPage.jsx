"use client";

import { useEffect, useMemo, useState } from "react";
import { MapPin } from "lucide-react";

import IntroSection from "@/app/components/IntroSection";
import AvailabilityBoard from "@components/book/AvailabilityBoard";
import AppointmentForm from "@components/book/AppointmentForm";
import ContactForm from "@components/book/ContactForm";
import FooterInfoStrip from "@/app/components/FooterInfoStrip";

export default function ClientAvailabilityPage({ studio, initialLocale = "el" }) {
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
          viewStudio: "View Studio",
          contactHeading: "Contact the Studio",
        }
        : {
          viewStudio: "Προβολή Στούντιο",
          contactHeading: "Επικοινωνία με το Στούντιο",
        },
    [locale]
  );

  const mode = studio.booking_mode || "CALENDAR_ONLY";
  const tz = studio.timezone || "Europe/Athens";

  const Header = (
    <IntroSection
      image={studio.photoUrls?.[0]}
      title={null}
      hasDarkOverlay={false}
      tallImage={true}
      isStudioPage={true}
      paragraph={
        <div className="max-w-5xl mx-auto w-full">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2>{studio.name}</h2>
              {studio.address ? (
                <p className="text-gray-700 mt-1 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-blue-500" />
                  {studio.address}
                </p>
              ) : null}
            </div>

            <a
              href={`/book/studio/${studio.slug}?lang=${locale}`}
              className="btn self-start sm:self-auto"
            >
              {t.viewStudio}
            </a>
          </div>
        </div>
      }
    />
  );

  // CONTACT_ONLY (and EXTERNAL_REDIRECT fallback)
  if (mode === "CONTACT_ONLY" || mode === "EXTERNAL_REDIRECT") {
    return (
      <main className="flex flex-col">
        {Header}

        <div className="w-full py-12">
          <div className="mx-auto w-full max-w-[42rem] text-center mb-8">
            <h2 className="text-2xl font-semibold">{t.contactHeading}</h2>
          </div>
          <div className="mx-auto w-full max-w-[42rem]">
            <ContactForm
              studioId={studio.id}
              studioName={studio.name}
              studioEmail={studio.email || ""}
              locale={locale}
              disabledSubmit={true}
              showTitle={false}
            />
          </div>
        </div>

        <FooterInfoStrip locale={locale} />
      </main>
    );
  }

  // CALENDAR_ONLY or CALENDAR_AND_CONTACT
  return (
    <main className="flex flex-col">
      {Header}

      {/* Calendar + Appointment form (side-by-side on lg) */}
      <div className="w-full py-12 bg-[#111315]">
        <div className="mx-auto max-w-[96rem] w-full grid grid-cols-1 lg:grid-cols-[60%_35%] gap-8 items-stretch justify-center">
          <div className="h-full min-w-0">
            <AvailabilityBoard
              studioId={studio.id}
              defaultTimezone={tz}
              embedded
            />
          </div>

          <div className="h-full min-w-0">
            <AppointmentForm
              embedded
              studioId={studio.id}
              defaultTimezone={tz}
              locale={locale}
            />
          </div>
        </div>
      </div>

      {/* Contact form BELOW both calendar components when CALENDAR_AND_CONTACT */}
      {mode === "CALENDAR_AND_CONTACT" && (
        <div className="w-full py-12">
          <div className="mx-auto w-full max-w-[42rem] text-center mb-8">
            <h2 className="text-2xl font-semibold">{t.contactHeading}</h2>
          </div>
          <div className="mx-auto w-full max-w-[42rem]">
            <ContactForm
              studioId={studio.id}
              studioName={studio.name}
              studioEmail={studio.email || ""}
              locale={locale}
              showTitle={false}
            />
          </div>
        </div>
      )}

      <FooterInfoStrip locale={locale} />
    </main>
  );
}
