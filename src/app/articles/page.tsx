"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { articlesApi, Article } from "@/lib/api";

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const response = await articlesApi.getAll(1, 8);
        if (response.success && response.data) {
          setArticles(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* Background Image - Mobile */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <Image
            src="/images/hotel/bg_mobile.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>
        {/* Background Image - Desktop */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image
            src="/images/home/explore/explore.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>

        <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="text-center mb-8 lg:mb-16">
            <div className="h-6 lg:h-8 bg-gray-200 rounded animate-pulse w-40 mx-auto mb-3 lg:mb-4"></div>
            <div className="h-10 lg:h-12 bg-gray-200 rounded animate-pulse w-72 mx-auto"></div>
          </div>
          
          {/* Desktop Flex Skeleton */}
          <div className="hidden lg:flex flex-wrap gap-8 justify-center">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="flex flex-col h-full shadow-xl rounded-3xl p-4 bg-[#F1FAFF] animate-pulse w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-sm">
                <div className="w-full h-48 bg-gray-200 rounded-xl"></div>
                <div className="flex flex-col gap-3 mt-4 flex-1">
                  <div className="h-6 bg-gray-200 rounded w-20"></div>
                  <div className="h-6 bg-gray-200 rounded w-full"></div>
                  <div className="h-20 bg-gray-200 rounded w-full"></div>
                  <div className="h-10 bg-gray-200 rounded-full w-32 mt-auto"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Stack Skeleton */}
          <div className="flex flex-col lg:hidden gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                <div className="w-full h-56 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-200 rounded w-16 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                  <div className="h-16 bg-gray-200 rounded w-full mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-full w-32"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Mobile */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <Image
          src="/images/hotel/bg_mobile.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/80"></div>
      </div>
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <Image
          src="/images/home/explore/explore.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      {/* Hero Section */}
      <div className="relative text-white pt-20 pb-8 lg:pt-24 lg:pb-10 z-10">
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-primary font-plant text-sm lg:text-xl mb-2 lg:mb-4">
            Stories from the Coast
          </h1>
          <h2 className="text-2xl lg:text-5xl text-black font-semibold mb-3 lg:mb-4">
            Latest News & Updates
          </h2>
        </div>
      </div>

      {/* Articles Grid */}
      <div className="container mx-auto px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        {/* Desktop Version - Flex */}
        <div className="hidden lg:flex flex-wrap gap-8 justify-center">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex flex-col h-full shadow-xl rounded-3xl p-4 bg-[#F1FAFF] hover:scale-105 transition-transform duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-sm"
            >
              <Image
                src={article.featured_image_url}
                alt={article.title}
                width={500}
                height={300}
                loading="lazy"
                className="w-full h-48 object-cover rounded-xl"
              />
              <div className="flex flex-col gap-3 mt-4 flex-1">
                <h2 className="text-xl font-plant text-primary">
                  {article.category_name}
                </h2>
                <h2 className="text-xl font-semibold text-black line-clamp-2 leading-tight">
                  {article.title}
                </h2>
                <p className="text-black text-sm leading-relaxed line-clamp-4 flex-1">
                  {article.content}
                </p>
                <Link href={`/articles/${article.id}`}>
                  <button className="btn-border-reveal w-fit px-6 py-2 text-base bg-transparent border-2 border-accent text-black font-semibold rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2 mt-auto">
                    Read More →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile/Tablet Version - Vertical Stack */}
        <div className="flex flex-col lg:hidden gap-6">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <Image
                src={article.featured_image_url}
                alt={article.title}
                width={500}
                height={300}
                loading="lazy"
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h2 className="text-base font-plant text-primary mb-2">
                  {article.category_name}
                </h2>
                <h2 className="text-lg font-semibold text-black line-clamp-2 leading-tight mb-3">
                  {article.title}
                </h2>
                <p className="text-black text-sm leading-relaxed line-clamp-3 mb-4">
                  {article.content}
                </p>
                <Link href={`/articles/${article.id}`}>
                  <button className="w-fit px-6 py-2 text-sm bg-transparent border-2 border-accent text-black font-semibold rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2">
                    Read More →
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {articles.length === 0 && !loading && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No articles available at the moment
            </h3>
            <p className="text-gray-500">Please check back later</p>
          </div>
        )}
      </div>
    </div>
  );
}
