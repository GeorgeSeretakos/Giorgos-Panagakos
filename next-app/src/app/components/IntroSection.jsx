export default function IntroSection({
                                       image,
                                       videoSrc,
                                       videoType = "video/mp4",
                                       poster,
                                       title,
                                       paragraph,
                                       imageClassName = "object-cover", // kept for non-studio pages
                                       hasDarkOverlay = true,
                                       tallImage = false,
                                       isStudioPage = false,
                                     }) {
  const hasVideo = !!videoSrc;
  const heroHeight = tallImage ? "h-[70vh]" : "h-[60vh]";

  // For studio pages we want contain, never crop
  const studioMaxHeights =
    "max-h-56 sm:max-h-64 md:max-h-72 lg:max-h-80 xl:max-h-96";

  return (
    <section className="relative text-white">
      {/* Studio page: framed card with contained media (no cropping) */}
      {isStudioPage ? (
        <div className="max-w-6xl mx-auto px-4">
          <div className="relative rounded-2xl bg-white p-4 shadow">
            <div className="flex items-center justify-center">
              {hasVideo ? (
                // Contained video inside the card
                <video
                  className={`block w-auto ${studioMaxHeights} object-contain`}
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={poster}
                >
                  <source src={videoSrc} type={videoType} />
                </video>
              ) : (
                <img
                  src={image}
                  alt="Background"
                  className={`block w-auto ${studioMaxHeights} object-contain`}
                />
              )}
            </div>

            {/* Optional centered title (kept for API parity) */}
            {title ? (
              <div className="mt-4 text-center">
                <h1 className="font-bold text-gray-900">{title}</h1>
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        // Default full-bleed hero (non-studio pages) — cover is fine here
        <div className={`relative ${heroHeight} flex items-center justify-center text-center`}>
          <div className="absolute inset-0">
            {hasVideo ? (
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster={poster}
              >
                <source src={videoSrc} type={videoType} />
              </video>
            ) : (
              <img
                src={image}
                alt="Background"
                className={`w-full h-full ${imageClassName}`}
              />
            )}
            {hasDarkOverlay && <div className="absolute inset-0 bg-black/50" />}
          </div>

          <div className="relative z-10 max-w-3xl px-4">
            {title ? <h1 className="font-bold">{title}</h1> : null}
          </div>
        </div>
      )}

      {/* Content below the image */}
      <div className="w-full px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-gray-700 leading-relaxed">{paragraph}</div>
        </div>
      </div>
    </section>
  );
}
