"use client";
import { useState } from "react";
import Image from "next/image";
import { Article, getArticleTranslation } from "@/lib/api";
import { useLanguage } from '@/hooks/useLanguage';

interface ArticleCarouselProps {
  article: Article;
}

export default function ArticleCarousel({ article }: ArticleCarouselProps) {
  const currentLanguage = useLanguage();
  const translation = getArticleTranslation(article, currentLanguage);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // For now, we only have one image per article, but this allows for future expansion
  // Add safety check for featured_image_url
  const images = article?.featured_image_url ? [article.featured_image_url] : [];
  
  // If no images, show placeholder
  if (images.length === 0) {
    return (
      <div className="relative w-full h-screen lg:h-[110vh] overflow-hidden bg-gray-200 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <p>No image available</p>
        </div>
      </div>
    );
  }
  
  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full h-screen lg:h-[110vh] overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={translation.title}
              fill
              className="object-cover"
              priority={index === 0}
              quality={100}
            />
          </div>
        ))}
      </div>

      {/* Background Image Bottom - Desktop */}
      <div className="hidden md:block absolute bottom-0 lg:-mb-32 left-0 w-full z-10">
        <Image
          src="/images/place/bg.png"
          alt="Background decoration"
          width={1920}
          height={400}
          className="w-full object-cover"
        />
      </div>

      {/* Article Info Overlay - Desktop */}
      <div className={`hidden md:flex flex-col items-center justify-center absolute w-full z-20 px-20 lg:px-56 ${
        translation.title.length > 100 ? 'bottom-0' : 
        translation.title.length > 50 ? 'bottom-5' : 
        'bottom-10'
      } 3xl:bottom-35`}>
        <h1 className="text-2xl lg:text-3xl font-plant text-primary">
          {article.category_name}
        </h1>
        <h1 className="text-2xl lg:text-5xl font-semibold text-black text-center">
          {translation.title}
        </h1>
      </div>

      {/* Navigation Arrows - Only show if multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 lg:left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/10 hover:bg-black/40 text-white px-2 lg:px-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg className="w-4 h-8 lg:w-6 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 64">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 48l-7-16 7-16" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 lg:right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/10 hover:bg-black/40 text-white px-2 lg:px-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg className="w-4 h-8 lg:w-6 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 64">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 16l7 16-7 16" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
