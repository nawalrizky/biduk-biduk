"use client";
import Link from "next/link";
import { Article } from "@/lib/api";
import { useState } from "react";

interface ArticleContentProps {
  article: Article;
}

export default function ArticleContent({ article }: ArticleContentProps) {
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Not published yet";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const articleUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/articles/${article.id}` 
    : '';

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(articleUrl);
      setCopySuccess(true);
      setTimeout(() => {
        setCopySuccess(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const closeModal = () => {
    setIsShareModalOpen(false);
    setCopySuccess(false);
  };

  return (
    <>
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
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="px-6 py-2 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 transition-colors flex items-center gap-2"
        >
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

      {/* Share Modal */}
      {isShareModalOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-black">Share Article</h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Article Info */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 mb-2">Share this article:</p>
              <p className="font-semibold text-black line-clamp-2">{article.title}</p>
            </div>

            {/* Link Display */}
            <div className="mb-6">
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Article Link
              </label>
              <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <input
                  type="text"
                  value={articleUrl}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-600 outline-none"
                />
              </div>
            </div>

            {/* Copy Button */}
            <button
              onClick={handleCopyLink}
              className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                copySuccess
                  ? 'bg-green-500 text-white'
                  : 'bg-primary text-white hover:bg-primary/90'
              }`}
            >
              {copySuccess ? (
                <>
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
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Link Copied!
                </>
              ) : (
                <>
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
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  Copy Link
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
