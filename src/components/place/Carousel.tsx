"use client";
import { useState } from "react";
import Image from "next/image";
import { Destination, getDestinationTranslation } from "@/lib/api";
import { useLanguage } from '@/hooks/useLanguage';

interface PlaceCarouselProps {
  destination: Destination;
}

export default function PlaceCarousel({ destination }: PlaceCarouselProps) {
  const currentLanguage = useLanguage();
  const translation = getDestinationTranslation(destination, currentLanguage);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Convert images to array if it's a string
  const images = Array.isArray(destination.images) 
    ? destination.images 
    : destination.images 
      ? [destination.images] 
      : [];

  // Use placeholder if no images
  const slideImages = images.length > 0 
    ? images 
    : ["/images/home/hero/bg.png"];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slideImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slideImages.length) % slideImages.length);

  return (
    <div className="relative w-full h-screen lg:h-[110vh] overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {slideImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`${translation.name} - Image ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              quality={100}
              sizes="100vw"
            />
          </div>
        ))}
      </div>

      {/* Background Image Bottom - Desktop */}
      <div className="hidden md:block absolute bottom-0  lg:-mb-32 left-0 w-full z-10">
        <Image
          src="/images/place/bg.png"
          alt="Background decoration"
          width={1920}
          height={400}
          className="w-full object-cover"
        />
      </div>

      {/* Background Image Bottom - Mobile */}
      <div className="md:hidden flex flex-col items-center justify-center absolute -bottom-1 w-full z-0">
        <Image
          src="/images/place/bg.png"
          alt="Background decoration"
          width={1920}
          height={400}
          className="w-full object-cover"
        />
      </div>

      {/* Location Info Overlay - Desktop */}
      <div className="hidden md:flex flex-col items-center justify-center absolute bottom-15 3xl:bottom-35 w-full  z-20 px-20 lg:px-56 ">
        <h1 className="text-2xl lg:text-3xl font-plant text-primary">
          {destination.category?.name || "Place Detail"}
        </h1>
        <h1 className="text-2xl lg:text-5xl font-semibold text-black">
          {translation.name}
        </h1>
      </div>

      {/* Location Info Overlay - Mobile */}
      <div className="md:hidden flex flex-col items-center justify-center absolute bottom-1 w-full z-20 px-4">
        <h1 className="text-lg font-plant text-primary text-center">
          {destination.category?.name || "Place Detail"}
        </h1>
        <h1 className="text-xl font-semibold text-black text-center drop-shadow-lg">
          {translation.name}
        </h1>
      </div>

      {/* Navigation Arrows - Only show if multiple images */}
      {slideImages.length > 1 && (
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
