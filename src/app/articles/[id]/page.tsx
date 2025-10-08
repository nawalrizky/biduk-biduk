"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { articlesApi, Article } from "@/lib/api";
import ArticleCarousel from "@/components/article/Carousel";
import ArticleContent from "@/components/article/Content";

export default function ArticleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      if (!id) {
        console.log("⚠️ No ID provided");
        return;
      }
      
      try {
        setLoading(true);
        console.log(`🔍 Fetching article with ID: ${id}`);
        const response = await articlesApi.getById(Number(id));
        console.log("📦 Article response:", response);
        
        if (response) {
          setArticle(response);
          console.log("✨ Article set to state:", response);
        } else {
          console.warn("⚠️ No article data received");
        }
      } catch (error) {
        console.error("❌ Failed to fetch article:", error);
      } finally {
        setLoading(false);
        console.log("🏁 Loading finished");
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">
            Article not found
          </h2>
          <Link
            href="/articles"
            className="text-primary hover:underline font-semibold"
          >
            ← Back to Articles
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-screen lg:h-[110vh]">
        <ArticleCarousel article={article} />
      </div>
      <div className="relative z-20">
        <ArticleContent article={article} />
      </div>
    </div>
  );
}
