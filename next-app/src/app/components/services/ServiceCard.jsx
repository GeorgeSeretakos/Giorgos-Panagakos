export default function ServiceCard({ iconSrc, iconAlt, title, description }) {
  return (
    <div
      className="border border-[#1C86D1] bg-white rounded-xl p-6 shadow-lg
                 w-[260px] sm:w-[280px] lg:w-[300px] h-[24rem]
                 flex flex-col text-center"
    >
      {/* Icon */}
      <div className="w-14 h-14 flex items-center justify-center rounded-full mb-4 self-center">
        {typeof iconSrc === "string" ? (
          <img
            src={iconSrc}
            alt={iconAlt || title}
            className="w-10 h-10 object-contain"
          />
        ) : (
          <div className="w-8 h-8 text-cyan-500">{iconSrc}</div>
        )}
      </div>

      {/* Title */}
      <h3 className="text-base sm:text-lg font-semibold text-[#1C86D1] mb-2">
        {title}
      </h3>

      {/* Description */}
      <div className="text-gray-700 text-sm sm:text-base leading-relaxed overflow-hidden">
        <p className="max-h-40 overflow-hidden">{description}</p>
      </div>

      <div className="mt-auto" />
    </div>
  );
}
