"use client";
import Link from "next/link";
import { Article } from "@/lib/api";

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published yet";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="z-20 flex flex-col lg:px-56 items-center bg-white min-h-screen pb-16">
      {/* Meta Information */}
      <div className="mt-12 lg:mt-24 flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-gray-600 px-6">
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
          <span>By {article.author_name}</span>
        </div>
        <div className="flex items-center gap-2">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
          <span>{formatDate(article.publish_date || article.created_at)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              article.status === "published"
                ? "bg-green-100 text-green-700"
                : "bg-yellow-100 text-yellow-700"
            }`}
          >
            {article.status}
          </span>
        </div>
      </div>

      {/* Article Content */}
      <p className="px-6 text-base lg:text-xl text-black text-justify leading-relaxed whitespace-pre-line">
        {article.content}
      </p>

      {/* Tags */}
      {article.tags_list && article.tags_list.length > 0 && (
        <div className="mt-12 px-6 w-full">
          <h3 className="text-xl font-semibold text-black mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags_list.map((tag, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-12 px-6 w-full flex justify-between items-center">
        <Link
          href="/articles"
          className="text-primary hover:text-primary/80 font-semibold flex items-center gap-2 transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Articles
        </Link>

        {/* Share Button */}
        <button className="px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Share
        </button>
      </div>
    </div>
  );
}
