"use client";
import { useState } from "react";
import Image from "next/image";

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const slides: SlideData[] = [
  {
    id: 1,
    image: "/images/home/explore/explore.png",
    title: "Jelajahi Tempat Wisata",
    subtitle: "Temukan destinasi terbaik di Biduk-Biduk",
  },
  {
    id: 2,
    image: "/images/home/hero.png",
    title: "Keindahan Alam",
    subtitle: "Panorama alam yang memukau di setiap sudut",
  },
  {
    id: 3,
    image: "/images/home/hero.png",
    title: "Budaya Lokal",
    subtitle: "Rasakan keramahan dan tradisi masyarakat",
  },
];
const mobileSlides: SlideData[] = [
  {
    id: 1,
    image: "/images/home/hero_mobile.png",
    title: "Jelajahi Tempat Wisata",
    subtitle: "Temukan destinasi terbaik di Biduk-Biduk",
  },
  {
    id: 2,
    image: "/images/home/hero_mobile.png",
    title: "Keindahan Alam",
    subtitle: "Panorama alam yang memukau di setiap sudut",
  },
  {
    id: 3,
    image: "/images/home/hero_mobile.png",
    title: "Budaya Lokal",
    subtitle: "Rasakan keramahan dan tradisi masyarakat",
  },
];

export default function PlaceCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const goToSlide = (index: number) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-screen lg:h-[110vh] overflow-hidden">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {/* Desktop Images */}
        <div className="hidden md:block">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={100}
              />
            </div>
          ))}
        </div>
        {/* Mobile Images */}
        <div className="md:hidden">
          {mobileSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                quality={100}
              />
            </div>
          ))}
        </div>
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

      {/* Location Info Overlay - Desktop */}
      <div className="hidden md:flex flex-col items-center justify-center absolute bottom-15 lg:bottom-5 3xl:bottom-35 w-full  z-20 px-20 lg:px-56 ">
        <h1 className="text-2xl lg:text-3xl font-plant text-primary">
          Place Detail
        </h1>
        <h1 className="text-2xl lg:text-5xl font-semibold text-black">
          Labuan Cermin
        </h1>
      </div>

      {/* Navigation Arrows */}
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
    </div>
  );
}
