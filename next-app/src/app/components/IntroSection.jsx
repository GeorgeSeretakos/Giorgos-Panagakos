export default function IntroSection({
                                       image,
                                       title,
                                       paragraph,
                                       imageClassName = "object-cover",
                                       hasDarkOverlay = true,
                                     }) {
  return (
    <section className="relative text-white">
      {/* Full-bleed hero — height uses largest viewport height when supported */}
      <div className="relative h-[80vh] h-[75lvh] flex items-center justify-center text-center">
        <div className="absolute inset-0">
          <img
            src={image}
            alt="Background"
            className={`w-full h-full ${imageClassName}`}
          />
          {hasDarkOverlay && <div className="absolute inset-0 bg-black/50" />}
        </div>

        {/* Title (forced white) */}
        {title && (
          <div className="relative z-10 max-w-3xl px-4">
            <h1 className="font-bold text-white !text-white text-3xl sm:text-4xl lg:text-5xl leading-snug drop-shadow-lg">
              {title}
            </h1>
          </div>
        )}
      </div>

      {/* Paragraph below */}
      {paragraph && (
        <div className="w-full px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-gray-700 leading-relaxed">{paragraph}</div>
          </div>
        </div>
      )}
    </section>
  );
}
