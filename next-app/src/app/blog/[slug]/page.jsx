"use client";

import { useEffect, useState, use } from "react";
import posts from "../../../../public/data/blog";
import Link from "next/link";

export default function BlogSlugPage({ params }) {
  // ✅ Unwrap params Promise (Next.js 15+)
  const { slug } = use(params);

  const [locale, setLocale] = useState("el");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("locale") || "el"
        : "el";
    setLocale(saved);
  }, []);

  const isEn = locale === "en";

  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="title-black mb-2">
          {isEn ? "Article not found" : "Το άρθρο δεν βρέθηκε"}
        </h2>
        <p>
          {isEn
            ? "This content is only available as a PDF or is no longer accessible."
            : "Αυτό το περιεχόμενο είναι διαθέσιμο μόνο ως PDF ή δεν είναι πλέον προσβάσιμο."}
        </p>
      </div>
    );
  }

  const displayTitle =
    isEn && post.title_en ? post.title_en : post.title || "";

  const paragraphs =
    isEn && post.content_en && post.content_en.length > 0
      ? post.content_en
      : post.content || [];

  const moreLabel = isEn ? "Read more →" : "Δείτε περισσότερα →";

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="title-black text-center mb-6">{displayTitle}</h2>

      {post.image && (
        <div className="mb-6">
          <img
            src={post.image}
            alt={displayTitle}
            width={800}
            height={500}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}

      {post.contentHtml ? (
        <div
          className="content blog"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      ) : (
        paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)
      )}

      {post.externalUrl && (
        <Link
          href={post.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 font-medium hover:underline"
        >
          {moreLabel}
        </Link>
      )}
    </article>
  );
}
