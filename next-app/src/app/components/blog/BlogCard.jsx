// app/components/blog/BlogCard.jsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function BlogCard({ post }) {
  const [locale, setLocale] = useState("el");

  useEffect(() => {
    const saved =
      typeof window !== "undefined"
        ? localStorage.getItem("locale") || "el"
        : "el";
    setLocale(saved);
  }, []);

  if (!post) return null;

  const isEn = locale === "en";

  const isPdf = !!post.pdfUrl;
  const isSlug = !!post.slug;
  const targetUrl = isPdf ? post.pdfUrl : isSlug ? `/blog/${post.slug}` : null;

  const linkLabel = isPdf
    ? isEn
      ? "Download PDF ↓"
      : "Λήψη PDF ↓"
    : isEn
      ? "Learn more →"
      : "Μάθετε περισσότερα →";

  const fallbackAlt = isEn ? "Blog post image" : "Εικόνα άρθρου";

  const displayTitle =
    isEn && post.title_en ? post.title_en : post.title || "";

  const altText = post.imageAlt || displayTitle || fallbackAlt;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-72">
      <div className="relative w-full h-[50%]">
        {post.image && (
          <img
            src={post.image}
            alt={altText}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h4 className="text-gray-900 font-semibold mb-2">
          {displayTitle}
        </h4>

        {targetUrl && (
          <Link
            href={targetUrl}
            download={isPdf ? "" : undefined}
            target={isPdf ? "_blank" : "_self"}
            rel={isPdf ? "noopener noreferrer" : undefined}
            className="inline-block mt-auto text-[#1C86D1] font-medium hover:underline"
          >
            {linkLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
