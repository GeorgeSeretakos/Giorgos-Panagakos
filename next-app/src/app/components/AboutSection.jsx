import Link from "next/link";

export default function AboutSection({
                                       title,
                                       image,
                                       reverse = false,
                                       fullWidthTitle = true,
                                       description = [],
                                       ticks = [],
                                       features = [],
                                       tickIcon = "/icons/scales.png",
                                       ctaText = "",
                                       ctaLink = "",
                                     }) {
  return (
    <section className="max-w-6xl m-auto px-4 py-12">
      {/* Title (elegant, serious tone) */}
      {fullWidthTitle && (
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold italic tracking-wide text-[#0E2A4C]">
            {title}
          </h2>
          <div className="w-16 h-[2px] bg-[#0E2A4C] mx-auto mt-3" />
        </div>
      )}

      <div
        className={`flex flex-col md:flex-row max-w-6xl mx-auto ${
          reverse ? "md:flex-row-reverse" : ""
        } gap-8 items-center`}
      >
        {/* Image */}
        <div className="w-full md:flex-1">
          <div className="block md:hidden w-screen relative left-1/2 right-1/2 -ml-[50vw]">
            <img
              src={image}
              alt={title}
              className="w-full object-cover rounded-none"
            />
          </div>

          <div className="hidden md:block w-full">
            <img
              src={image}
              alt={title}
              className="w-full object-cover rounded-lg shadow-sm"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:flex-1">
          {!fullWidthTitle && (
            <h2 className="text-2xl font-semibold text-[#0E2A4C] mb-6">{title}</h2>
          )}

          {/* Description */}
          <div className="leading-relaxed space-y-4 text-[#2F3E46]">
            {description.map((item, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: item }} />
            ))}
          </div>

          {/* Bullet Points */}
          {ticks.length > 0 && (
            <ul className="mt-6 space-y-2">
              {ticks.map((t, i) => (
                <li key={i} className="flex items-start gap-2">
                  <img
                    src={tickIcon}
                    alt=""
                    className="w-5 h-5 mt-0.5 select-none"
                    aria-hidden="true"
                  />
                  <span className="font-medium text-[#0E2A4C]">{t}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Features */}
          {features.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {features.map((f, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <img
                    src={f.icon}
                    alt=""
                    className="w-14 h-14 object-contain mb-3 select-none"
                    aria-hidden="true"
                  />
                  <div className="text-[#2F3E46] font-semibold leading-snug text-sm">
                    {f.text}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA Button */}
          {ctaText && (
            <div className="my-10 flex justify-center md:justify-start">
              <Link
                href={ctaLink || "#"}
                className="inline-block bg-[#0E2A4C] text-white px-6 py-2 rounded font-semibold hover:opacity-90 transition"
              >
                {ctaText}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
