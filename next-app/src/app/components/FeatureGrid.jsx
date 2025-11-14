"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FeatureGrid({ items = [], preview = false }) {
  const [locale, setLocale] = useState("el");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("locale") || "el"
        : "el";
    setLocale(saved);
  }, []);

  const isEn = locale === "en";

  const enhancedItems = preview
    ? [
      ...items,
      {
        isCTA: true,
        title: isEn
          ? "View all services in detail"
          : "Δείτε αναλυτικά όλες τις υπηρεσίες",
        text: isEn
          ? "Browse the services page for a complete overview of each legal field."
          : "Περιηγηθείτε στη σελίδα υπηρεσιών για πλήρη ενημέρωση ανά τομέα δικαίου.",
        href: "/services",
        icon: "/icons/more.png",
      },
    ]
    : items;

  return (
    <section className="w-4/5 max-w-6xl mx-auto py-16">
      <div className="grid md:grid-cols-2 gap-10">
        {enhancedItems.map((item, i) => {
          const titleToShow =
            item.isCTA || !isEn ? item.title : item.title_en || item.title;
          const textToShow =
            item.isCTA || !isEn ? item.text : item.text_en || item.text;

          return (
            <div key={i} className="flex items-start gap-4">
              {item.icon && (
                <div className="w-6 h-6 flex-shrink-0 mt-1">
                  <img
                    src={item.icon}
                    alt={titleToShow}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}

              <div>
                <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">
                  {titleToShow}
                </h3>
                <p className="text-[var(--foreground)]/80 text-sm leading-relaxed">
                  {textToShow}
                </p>

                {item.isCTA && (
                  <Link
                    href={item.href}
                    className="underline text-[var(--foreground)]/80"
                  >
                    {isEn ? "Go to page →" : "Μετάβαση στη σελίδα →"}
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
