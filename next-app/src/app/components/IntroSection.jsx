export default function IntroSection({
                                       image,
                                       videoSrc,
                                       videoType = "video/mp4",
                                       poster,
                                       title,
                                       paragraph,
                                       imageClassName = "object-cover",
                                       hasDarkOverlay = true,
                                       tallImage = false,
                                       isStudioPage = false,
                                     }) {
  const hasVideo = !!videoSrc;
  const heroHeight = tallImage ? "h-[70vh]" : "h-[60vh]";

  return (
    <section className="relative text-white">
      {/* Studio page: centered framed box with white bg & side padding */}
      {isStudioPage ? (
        <div className="max-w-6xl mx-auto px-4">
          <div className={`relative ${heroHeight} rounded-2xl bg-white p-4 shadow`}>
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

            <div className="relative z-10 max-w-3xl mx-auto px-4 flex items-center justify-center h-full text-center">
              <h1 className="font-bold">{title}</h1>
            </div>
          </div>
        </div>
      ) : (
        // Default full-bleed hero (non-studio pages)
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
            <h1 className="font-bold">{title}</h1>
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
