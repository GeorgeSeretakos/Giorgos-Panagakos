"use client";
import { useState } from "react";

export default function CVTimeline({ sections = [] }) {
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="border-t border-gray-300">
        {sections.map((section, idx) => (
          <CVSection
            key={idx}
            title={section.title}
            items={section.items ?? section.entries ?? []}
            defaultOpen={false}
            isLast={idx === sections.length - 1}
          />
        ))}
      </div>
    </section>
  );
}

function CVSection({ title, items = [], defaultOpen = false, isLast }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className={`py-4 border-b ${
        isLast ? "border-gray-300" : "border-gray-300"
      } transition-all duration-300`}
    >
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left cursor-pointer hover:opacity-80 transition-opacity"
      >
        <h2 className="text-lg md:text-xl font-semibold text-gray-800">
          {title}
        </h2>
        <span
          className={`transition-transform duration-200 text-gray-600 text-2xl ${
            open ? "rotate-180" : "rotate-0"
          }`}
        >
          ▾
        </span>
      </button>

      {/* Collapsible Content */}
      {open && (
        <div className="mt-4 pl-1 text-gray-700 leading-relaxed space-y-5">
          {Array.isArray(items) &&
            items.map((it, i) => (
              <div key={i} className="space-y-1">
                {/* Top row: Role (left) — Dates (right) */}
                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1">
                  <div className="font-semibold text-gray-900">
                    {it.role}
                  </div>
                  {it.dates && (
                    <div className="text-sm text-gray-500 whitespace-nowrap">
                      {it.dates}
                    </div>
                  )}
                </div>

                {/* Org always on a new line */}
                {it.org && (
                  <div className="text-gray-600">
                    {it.org}
                  </div>
                )}

                {/* Bullets */}
                {Array.isArray(it.bullets) && it.bullets.length > 0 && (
                  <ul className="list-disc pl-6 text-sm text-gray-700 space-y-1">
                    {it.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
