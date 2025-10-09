"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { articlesApi, Article } from "@/lib/api";

export default function NewsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const touchStartX = useRef<number | null>(null);
    
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                setLoading(true);
                console.log("🔍 Fetching articles...");
                const response = await articlesApi.getAll(1, 4);
                console.log("📦 Articles API Response:", response);
                console.log("✅ Response success:", response.success);
                console.log("📄 Response data:", response.data);
                console.log("📊 Data length:", response.data?.length);
                
                if (response.success && response.data && response.data.length > 0) {
                    setArticles(response.data);
                    console.log("✨ Articles set to state:", response.data);
                } else {
                    console.warn("⚠️ No articles found or response not successful");
                    console.warn("⚠️ Trying without pagination...");
                    
                    // Try direct fetch without pagination params
                    const directResponse = await articlesApi.getAll(1, 100);
                    console.log("📦 Direct API Response:", directResponse);
                    if (directResponse.data && directResponse.data.length > 0) {
                        setArticles(directResponse.data.slice(0, 4));
                        console.log("✨ Articles set from direct fetch");
                    }
                }
            } catch (error) {
                console.error("❌ Failed to fetch articles:", error);
            } finally {
                setLoading(false);
                console.log("🏁 Loading finished");
            }
        };

        fetchArticles();
    }, []);

    const getImageIndex = (offset: number) => {
        const index = currentIndex + offset;
        if (index >= articles.length) return index - articles.length;
        if (index < 0) return articles.length + index;
        return index;
    };

    // Handle swipe gesture for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX.current;
        if (Math.abs(diff) > 40) {
            if (diff < 0) {
                // Swipe left
                setCurrentIndex((prev) => (prev + 1) % articles.length);
            } else {
                // Swipe right
                setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
            }
        }
        touchStartX.current = null;
    };

    if (loading) {
        return (
            <section className="bg-white py-16 px-8 md:px-16 lg:px-56 min-h-screen flex flex-col items-center justify-center">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-xl text-primary font-plant mb-2">Stories from the Coast</h1>
                        <p className="text-black text-2xl md:text-3xl lg:text-[32px] -mt-1 font-semibold">Latest News & Updates</p>
                    </div>
                    <div className="hidden lg:flex flex-wrap gap-8 justify-center">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex flex-col h-full lg:shadow-xl lg:rounded-3xl lg:p-4 bg-[#F1FAFF] animate-pulse w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-sm">
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
                </div>
            </section>
        );
    }

    if (!articles || articles.length === 0) {
        console.log("⚠️ No articles to display, returning null");
        // Return null to hide the section completely when no articles
        return null;
    }
    
    console.log("🎨 Rendering NewsSection with", articles.length, "articles");

    return (
        <section className="bg-white py-16 px-8 md:px-16 lg:px-56 min-h-screen flex flex-col items-center justify-center">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-xl  text-primary font-plant mb-2">Stories from the Coast</h1>
                    <p className="text-black text-2xl md:text-3xl lg:text-[32px] -mt-1 font-semibold">Latest News & Updates</p>
                </div>

                {/* Mobile Version - Stacked Images Side by Side */}
                <div className="block md:hidden">
                    <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                        {/* Stacked Images Container */}
                        <div className="relative h-64 mb-6 overflow-hidden">
                            <div className="flex items-center justify-center h-full">
                                {/* Previous image (left side) */}
                                {articles[getImageIndex(-1)]?.featured_image_url && (
                                    <div className="absolute left-0 w-20 h-48 opacity-60 transform scale-90">
                                        <Image
                                            src={articles[getImageIndex(-1)].featured_image_url}
                                            alt="Previous news"
                                            fill
                                            className="object-cover rounded-lg shadow-md"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                {/* Current image (center) */}
                                {articles[currentIndex]?.featured_image_url && (
                                    <div className="relative w-64 h-48 z-10">
                                        <Image
                                            src={articles[currentIndex].featured_image_url}
                                            alt={`News Image ${currentIndex + 1}`}
                                            fill
                                            className="object-cover rounded-lg shadow-lg"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                                {/* Next image (right side) */}
                                {articles[getImageIndex(1)]?.featured_image_url && (
                                    <div className="absolute right-0 w-20 h-48 opacity-60 transform scale-90">
                                        <Image
                                            src={articles[getImageIndex(1)].featured_image_url}
                                            alt="Next news"
                                            fill
                                            className="object-cover rounded-lg shadow-md"
                                            loading="lazy"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* News Content */}
                        {articles[currentIndex] && (
                            <div className="flex flex-col gap-3 h-40">
                                <h2 className="text-xl font-plant text-primary">{articles[currentIndex].category_name}</h2>
                                <h2 className="text-xl font-semibold text-black line-clamp-2 leading-tight">
                                    {articles[currentIndex].title}
                                </h2>
                                <p className="text-black text-sm leading-relaxed line-clamp-3 flex-1">
                                    {articles[currentIndex].content}
                                </p>
                                <Link href={`/articles/${articles[currentIndex].id}`}>
                                    <button className="btn-border-reveal w-fit px-6 py-2 text-base bg-transparent border-2 border-accent text-black font-semibold rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2">
                                        Read More
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
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        )}

                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {articles.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tablet Version - Carousel with 2 visible items */}
                <div className="hidden md:block lg:hidden">
                    <div className="relative">
                        {/* Carousel Container */}
                        <div className="relative overflow-hidden">
                            <div 
                                className="flex transition-transform duration-300 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 50}%)` }}
                            >
                                {articles.map((article) => (
                                    <div key={article.id} className="w-1/2 flex-shrink-0 px-4">
                                        <div className="flex flex-col h-full">
                                            <Image
                                                src={article.featured_image_url}
                                                alt={article.title}
                                                width={400}
                                                height={250}
                                                loading="lazy"
                                                className="w-full h-56 object-cover rounded-lg shadow-md"
                                            />
                                            <div className="flex flex-col gap-3 mt-4 flex-1">
                                                <h2 className="text-lg font-plant text-primary">{article.category_name}</h2>
                                                <h2 className="text-lg font-semibold text-black line-clamp-2 leading-tight">
                                                    {article.title}
                                                </h2>
                                                <p className="text-sm text-black leading-relaxed line-clamp-3 flex-1">
                                                    {article.content}
                                                </p>
                                                <Link href={`/articles/${article.id}`}>
                                                    <button className="btn-border-reveal w-fit px-5 py-2 text-sm bg-transparent border-2 border-accent text-black font-semibold rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2 mt-auto">
                                                        Read More
                                                        <svg
                                                            width="14"
                                                            height="14"
                                                            viewBox="0 0 24 24"
                                                            fill="none"
                                                            stroke="currentColor"
                                                            strokeWidth="2"
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                        >
                                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                                        </svg>
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        

                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-8 space-x-2">
                            {Array.from({ length: articles.length - 1 }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop Version - Original Grid */}
                <div className="hidden lg:flex flex-wrap gap-8 justify-center">
                    {articles.map((article) => (
                        <div key={article.id} className="flex flex-col h-full lg:shadow-xl lg:rounded-3xl lg:p-4 bg-[#F1FAFF] hover:scale-105 transition-transform duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(25%-1.5rem)] max-w-sm">
                            <Image
                                src={article.featured_image_url}
                                alt={article.title}
                                width={500}
                                height={300}
                                loading="lazy"
                                className="w-full h-48 object-cover rounded-xl "
                            />
                            <div className="flex flex-col gap-3 mt-4 flex-1">
                                <h2 className="text-xl font-plant text-primary">{article.category_name}</h2>
                                <h2 className="text-xl font-semibold text-black line-clamp-2 leading-tight">
                                    {article.title}
                                </h2>
                                <p className="text-black text-sm leading-relaxed line-clamp-4 flex-1">
                                    {article.content}
                                </p>
                                <Link href={`/articles/${article.id}`}>
                                    <button className="btn-border-reveal w-fit px-6 py-2 text-base bg-transparent border-2 border-accent text-black font-semibold rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2 mt-auto">
                                        Read More
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
                                            <path d="M5 12h14M12 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Watch More Link - Hidden on mobile, visible on tablet and desktop */}
                <div className="hidden md:flex justify-center mt-16 lg:mt-28">
                    <Link href="/articles" className="text-primary font-plant text-2xl lg:text-3xl flex items-center gap-2">
                        Watch More
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
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </section>
    );
}