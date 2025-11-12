import Link from "next/link";

export default function AboutTextOnly({
                                        title,
                                        description = [],
                                        ctaText = "",
                                        ctaLink = "",
                                      }) {
  return (
    <section className="max-w-6xl m-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-justify">
        {title && (
          <h2
            className="title-teal mb-6 text-center"
            // allow simple HTML like <br>; normalize common </br> to <br>
            dangerouslySetInnerHTML={{
              __html:
                typeof title === "string"
                  ? title.replace(/<\/br>/gi, "<br>")
                  : title,
            }}
          />
        )}

        <div className="leading-relaxed space-y-4">
          {description.map((item, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </div>

        {ctaText && (
          <div className="mt-10 flex justify-center">
            <Link href={ctaLink || "#"} className="btn">
              {ctaText}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}