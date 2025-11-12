'use client';

import Link from 'next/link';
import testimonials from '/public/data/testimonials';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function TestimonialsCarousel() {
  // TODO: replace with your actual Google reviews URL
  const reviewUrl = '#';

  return (
    <div className="relative px-4 flex justify-center items-center">
      <div className="z-10 w-full">
        {/* Section Title + CTA */}
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h2 className="text-left text-3xl md:text-4xl font-semibold text-[var(--foreground)]">
              Τι λένε για εμάς
            </h2>
            <p className="mt-2 max-w-xl text-left text-[var(--foreground)]/70">
              Ενδεικτικές αξιολογήσεις πελατών για την ποιότητα των υπηρεσιών μας.
            </p>
          </div>

          {/*<Link*/}
          {/*  href={reviewUrl}*/}
          {/*  target="_blank"*/}
          {/*  rel="noopener noreferrer"*/}
          {/*  className="btn self-start sm:self-auto"*/}
          {/*>*/}
          {/*  Άφησε κριτική*/}
          {/*</Link>*/}
        </div>

        {/* Carousel */}
        <div className="max-w-6xl mx-auto my-10 px-2 sm:px-4">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={16}
            slidesPerView={1}
            pagination={{ clickable: true }}
            loop={true}
            autoplay={{ delay: 9000 }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {testimonials.map((r, idx) => (
              <SwiperSlide key={idx} className="flex">
                <div className="flex flex-col justify-between flex-1 bg-white border border-[var(--border)] rounded-xl p-4 md:p-5 shadow-sm text-left">
                  {/* Header */}
                  <div className="flex items-center gap-3">
                    {r.avatar ? (
                      <img
                        src={r.avatar}
                        alt={r.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div
                        className={`w-10 h-10 bg-[var(--primary)] text-white flex items-center justify-center rounded-full font-bold`}
                        aria-label={r.name?.[0] || 'A'}
                        title={r.name}
                      >
                        {r.initial}
                      </div>
                    )}

                    <div className="flex flex-col">
                      <span className="font-semibold text-[var(--foreground)]">{r.name}</span>
                      {r.years && (
                        <span className="text-xs text-[var(--foreground)]/70">{r.years}</span>
                      )}
                    </div>

                    <div className="ml-auto opacity-80">
                      <img src="/icons/google.png" alt="Google" className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Stars */}
                  <div className="mt-2 text-sm md:text-base text-[var(--accent)]/90 tracking-wide">
                    {'★'.repeat(r.stars || 5)}
                  </div>

                  {/* Review */}
                  <p className="mt-2 text-sm text-[var(--foreground)]/85 leading-relaxed">
                    {r.text}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <style>{`
        .swiper-slide {
          display: flex;
          height: auto;
        }
        .swiper-pagination {
          position: relative !important;
          margin-top: 1.5rem;
        }
        .swiper-pagination-bullet {
          background: var(--primary) !important;
          opacity: 0.35;
        }
        .swiper-pagination-bullet-active {
          background: var(--accent) !important;
          opacity: 1;
        }
      `}</style>
    </div>
  );
}
