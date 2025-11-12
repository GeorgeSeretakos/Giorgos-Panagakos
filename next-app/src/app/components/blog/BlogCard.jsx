// app/components/blog/BlogCard.jsx
"use client";

import Link from "next/link";

export default function BlogCard({ post }) {
  if (!post) return null;

  const isPdf = !!post.pdfUrl;
  const isSlug = !!post.slug;
  const targetUrl = isPdf ? post.pdfUrl : isSlug ? `/blog/${post.slug}` : null;

  const linkLabel = isPdf ? "Λήψη PDF ↓" : "Μάθετε περισσότερα →";

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-72">
      <div className="relative w-full h-[50%]">
        {post.image && (
          <img
            src={post.image}
            alt={post.imageAlt || post.title || "Εικόνα άρθρου"}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4">
        <h4 className="text-gray-900 font-semibold mb-2">{post.title}</h4>

        {targetUrl && (
          <Link
            href={targetUrl}
            download={isPdf ? "" : undefined} // ✅ triggers file download
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
