"use client";
import { useState } from "react";
import Image from "next/image";
import { Hotel } from "@/lib/api";

interface HotelCarouselProps {
  hotel: Hotel;
}

// Helper function to extract image URL from HotelImage object or string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getImageUrl = (image: any): string | null => {
  if (typeof image === 'string') {
    return image.trim() !== "" ? image : null;
  }
  if (typeof image === 'object' && image !== null) {
    const url = image.image_url || image.image || "";
    return typeof url === 'string' && url.trim() !== "" ? url : null;
  }
  return null;
};

export default function HotelCarousel({ hotel }: HotelCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Use hotel images or placeholder - extract URLs from objects or strings
  const slideImages = hotel.images && hotel.images.length > 0
    ? hotel.images.map(getImageUrl).filter((url): url is string => url !== null)
    : hotel.image && hotel.image.trim() !== ""
      ? [hotel.image]
      : ["/images/home/explore/explore.png"];
  
  // Fallback to default image if no valid images
  const validSlideImages = slideImages.length > 0 ? slideImages : ["/images/home/explore/explore.png"];

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % validSlideImages.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + validSlideImages.length) % validSlideImages.length);

  return (
    <div className="relative w-full h-screen lg:h-[110vh] overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {validSlideImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image}
              alt={`${hotel.name} - Image ${index + 1}`}
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

      {/* Hotel Info Overlay - Desktop */}
      <div className="hidden md:flex flex-col items-center justify-center absolute bottom-15 lg:bottom-5 3xl:bottom-20 w-full z-20 px-20 lg:px-56">
        <h1 className="text-2xl lg:text-3xl font-plant text-primary">
          Hotel & Accommodation
        </h1>
        <h1 className="text-2xl lg:text-5xl font-semibold text-black text-center">
          {hotel.name}
        </h1>
        <p className="text-xl lg:text-3xl font-bold text-accent mt-4">
          Rp {parseFloat(hotel.price).toLocaleString('id-ID')} / night
        </p>
      </div>

      {/* Navigation Arrows - Only show if multiple images */}
      {validSlideImages.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/10 hover:bg-black/40 text-white px-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 64">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 48l-7-16 7-16" />
            </svg>
          </button>
          <button
            onClick={nextSlide}
            className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/10 hover:bg-black/40 text-white px-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
            aria-label="Next slide"
          >
            <svg className="w-6 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 64">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 16l7 16-7 16" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
