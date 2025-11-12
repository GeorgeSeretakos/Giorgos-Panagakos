"use client";

import Link from "next/link";

export default function FeatureGrid({ items = [], title, preview = false }) {
  // Add CTA only in preview mode
  const enhancedItems = preview
    ? [
      ...items,
      {
        isCTA: true,
        title: "Δείτε αναλυτικά όλες τις υπηρεσίες",
        text:
          "Περιηγηθείτε στη σελίδα υπηρεσιών για πλήρη ενημέρωση ανά τομέα δικαίου.",
        href: "/services",
        icon: "/icons/more.png",
      },
    ]
    : items;

  return (
    <section className="w-4/5 max-w-6xl mx-auto py-16">
      {/* Optional title */}
      {/* {title && (
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--foreground)] mb-12">
          {title}
        </h2>
      )} */}

      <div className="grid md:grid-cols-2 gap-10">
        {enhancedItems.map((item, i) => (
          <div key={i} className="flex items-start gap-4">
            {/* Icon */}
            {item.icon && (
              <div className="w-6 h-6 flex-shrink-0 mt-1">
                <img
                  src={item.icon}
                  alt={item.title}
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {/* Text */}
            <div>
              <h3 className="font-bold text-lg mb-2 text-[var(--foreground)]">
                {item.title}
              </h3>
              <p className="text-[var(--foreground)]/80 text-sm leading-relaxed">
                {item.text}
              </p>

              {item.isCTA && (
                <Link
                  href={item.href}
                  className="underline text-[var(--foreground)]/80"
                >
                  Μετάβαση στη σελίδα →
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
