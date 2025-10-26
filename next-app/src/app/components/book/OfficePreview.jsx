"use client";

import { useState } from "react";

export default function OfficePreview({
                                        locale = "el",
                                        title = "Ο χώρος",
                                        images = [],
                                      }) {
  const isEN = locale === "en";
  const tTitle = title || (isEN ? "The studio" : "Ο χώρος");

  const [selected, setSelected] = useState(null);

  return (
    <section className="py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="title-black">{tTitle}</h2>
          <div className="max-w-xl mb-8" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {(images || []).slice(0, 6).map((src, idx) => (
            <button
              key={idx}
              onClick={() => setSelected(src)}
              className="relative w-full aspect-[5/3] shadow-lg overflow-hidden bg-white focus:outline-none group"
            >
              <img
                src={src}
                alt={`Office ${idx + 1}`}
                className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </button>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <img
            src={selected}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-2xl"
          />
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white text-3xl font-light"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}
