"use client";

import IntroSection from "../../components/IntroSection";
import AboutSection from "../../components/AboutSection";
import FooterInfoStrip from "../../components/FooterInfoStrip";
import StepsSection from "../../components/StepsSection";
import LocationSearch from "../../components/book/LocationForm";
import { appointment_steps_el, appointment_steps_en } from "../../../../public/data/steps";

/**
 * Prefer getting `locale` and `steps` from the parent (BookPage).
 * If `steps` not provided, we pick based on locale here.
 */
export default function BookLandingLayout({ locale = "en", steps, onSearch }) {
  const t = {
    title: locale === "en" ? "Booking" : "Κράτηση",
    b2bTitle: locale === "en" ? "For Studio Owners (B2B)" : "Για ιδιοκτήτες studio (B2B)",
    b2bDesc: locale === "en"
      ? [
        "Do you already own an EMS studio?",
        "Our collaboration doesn’t end after you purchase the device and equipment! You now get extra support from the start. Contact us to be included in our network so new clients can book their first session through the service we provide to you!",
      ]
      : [
        "Έχεις ήδη EMS studio;",
        "Η συνεργασία μας δεν τελειώνει μετά την αγορά της συσκευής και του εξοπλισμού! Πλέον έχεις επιπλέον υποστήριξη στο ξεκίνημά σου! Επικοινώνησε μαζί μας για να σε εντάξουμε στο δίκτυό μας και οι νέοι σου πελάτες να κλείσουν την 1η τους προπόνηση μέσω της υπηρεσίας που σου προσφέρουμε!",
      ],
    ctaText: locale === "en" ? "Contact" : "Επικοινωνία",
  };

  const computedSteps =
    steps && Array.isArray(steps)
      ? steps
      : locale === "en"
        ? appointment_steps_en
        : appointment_steps_el;

  return (
    <>
      <IntroSection
        image="/images/general/25.jpg"
        title={t.title}
        paragraph={<LocationSearch locale={locale} onSearch={onSearch} />}
      />

      <StepsSection steps={computedSteps} />

      <div className="bg-blue-100">
        <AboutSection
          title={t.b2bTitle}
          image="/images/general/41.jpg"
          reverse={true}
          fullWidthTitle={false}
          description={t.b2bDesc}
          ctaText={t.ctaText}
          ctaLink="/contact"
        />
      </div>

      <FooterInfoStrip locale={locale} />
    </>
  );
}
