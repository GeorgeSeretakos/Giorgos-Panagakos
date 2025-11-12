"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ServiceCard from "./ServiceCard";

export default function ServicesSection({
                                          title = "",
                                          paragraphs = [],
                                          ctaText = "",
                                          ctaHref = "",
                                          services = [],
                                        }) {
  const [visibleCount, setVisibleCount] = useState(3); // lg:3, sm:2, xs:1
  const [page, setPage] = useState(0); // 0 => first set, 1 => last set

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      if (w >= 1024) setVisibleCount(3);
      else if (w >= 640) setVisibleCount(2);
      else setVisibleCount(1);
      setPage(0); // reset after resize
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  // indices so that desktop shows 1–3 then 3–5 (for 5 services)
  const start0 = 0;
  const start1 = Math.max(0, services.length - visibleCount);

  const sliceFor = (start) => services.slice(start, start + visibleCount);

  const page0Items = useMemo(() => sliceFor(start0), [services, visibleCount]);
  const page1Items = useMemo(() => sliceFor(start1), [services, visibleCount]);

  const canLeft = page > 0;
  const canRight = services.length > visibleCount && page === 0;

  // IMPORTANT: move the 200%-wide track by **50%** (one viewport), not 100%.
  const translateClass = page === 0 ? "translate-x-0" : "-translate-x-1/2";

  return (
    <section className="w-full py-12">
      <div className="max-w-6xl mx-auto px-4">
        {title && <h2 className="title-teal mb-4">{title}</h2>}

        {Array.isArray(paragraphs) && paragraphs.length > 0 && (
          <div className="max-w-3xl mb-8 space-y-4">
            {paragraphs.map((p, i) =>
              typeof p === "string" && /<[^>]+>/.test(p) ? (
                <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
              ) : (
                <p key={i} className="text-gray-700">{p}</p>
              )
            )}
          </div>
        )}

        {ctaText && (
          <div className="my-6 flex justify-center md:justify-start">
            <Link href={ctaHref || "#"} className="btn">
              {ctaText}
            </Link>
          </div>
        )}

        {/* Slider viewport */}
        <div className="relative">
          <div className="overflow-hidden">
            {/* Track with two pages */}
            <div className={`flex w-[200%] transition-transform duration-500 ease-out ${translateClass}`}>
              {/* Page 0 */}
              <div className="w-1/2">
                <div className="grid gap-8 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {page0Items.map((service, idx) => (
                    <div key={`p0-${service.title}-${idx}`} className="flex justify-center">
                      <ServiceCard
                        iconSrc={service.iconSrc}
                        iconAlt={service.iconAlt}
                        title={service.title}
                        description={service.description}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Page 1 */}
              <div className="w-1/2">
                <div className="grid gap-8 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {page1Items.map((service, idx) => (
                    <div key={`p1-${service.title}-${idx}`} className="flex justify-center">
                      <ServiceCard
                        iconSrc={service.iconSrc}
                        iconAlt={service.iconAlt}
                        title={service.title}
                        description={service.description}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Arrows (outside, not overlapping) */}
          {canLeft && (
            <button
              onClick={() => setPage(0)}
              aria-label="Προηγούμενες υπηρεσίες"
              className="hidden md:flex items-center justify-center
                         absolute -left-8 top-1/2 -translate-y-1/2
                         w-10 h-10 rounded-full bg-white shadow border hover:bg-gray-50"
            >
              <ChevronLeft />
            </button>
          )}
          {canRight && (
            <button
              onClick={() => setPage(1)}
              aria-label="Επόμενες υπηρεσίες"
              className="hidden md:flex items-center justify-center
                         absolute -right-8 top-1/2 -translate-y-1/2
                         w-10 h-10 rounded-full bg-white shadow border hover:bg-gray-50"
            >
              <ChevronRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
