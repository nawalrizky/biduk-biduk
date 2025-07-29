"use client";

import { useState } from "react";
import Image from "next/image";

interface SlideData {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const HeroSection = () => {
  // Data carousel - bisa disesuaikan dengan kebutuhan
  const slides: SlideData[] = [
    {
      id: 1,
      image: "/images/home/hero.png",
      title: "Selamat Datang di Biduk-Biduk",
      subtitle: "Nikmati keindahan alam dan budaya lokal yang menawan",
    },
    {
      id: 2,
      image: "/images/home/hero.png",
      title: "Jelajahi Keindahan Alam",
      subtitle: "Temukan pesona tersembunyi di setiap sudut desa",
    },
    {
      id: 3,
      image: "/images/home/hero.png",
      title: "Pengalaman Tak Terlupakan",
      subtitle: "Ciptakan kenangan indah bersama masyarakat lokal",
    },
  ];

  // Mobile slides with different images
  const mobileSlides: SlideData[] = [
    {
      id: 1,
      image: "/images/home/hero_mobile.png",
      title: "Selamat Datang di Biduk-Biduk",
      subtitle: "Nikmati keindahan alam dan budaya lokal yang menawan",
    },
    {
      id: 2,
      image: "/images/home/hero_mobile.png",
      title: "Jelajahi Keindahan Alam",
      subtitle: "Temukan pesona tersembunyi di setiap sudut desa",
    },
    {
      id: 3,
      image: "/images/home/hero_mobile.png",
      title: "Pengalaman Tak Terlupakan",
      subtitle: "Ciptakan kenangan indah bersama masyarakat lokal",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative w-full h-screen lg:h-[110vh] overflow-hidden">
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

      {/* Dark Overlay */}
      <div className="absolute inset-0"></div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="text-white">
          {/* Mobile Layout - Stacked vertically on left */}
          <div className="md:hidden absolute bottom-32 left-4 space-y-2">
            <h1 className="font-plant text-[28px] sm:text-3xl md:text-4xl leading-tight text-left">
              Taste the flavors,
            </h1>
            <h1 className="font-plant text-[28px] sm:text-3xl md:text-4xl leading-tight text-left">
              hear the stories,
            </h1>
            <h1 className="font-plant text-[28px] sm:text-3xl md:text-4xl leading-tight text-left">
              and feel the soul of the sea.
            </h1>
          </div>

          {/* Desktop Layout - Original positioning */}
          <div className="hidden md:block">
            {/* First Line */}
            <h1 className="font-plant md:text-4xl lg:text-6xl xl:text-[72px] absolute bottom-110 left-10 lg:bottom-100 lg:left-30 leading-tight">
              Taste the flavors, hear the stories,
            </h1>

            {/* Second Line - Left */}
            <h1 className="font-plant md:text-4xl lg:text-6xl xl:text-[72px] absolute bottom-90 left-0 lg:bottom-80 lg:left-30 leading-tight">
              and feel the
            </h1>

            {/* Second Line - Right */}
            <h1 className="font-plant md:text-4xl lg:text-6xl xl:text-[72px] absolute bottom-90 right-70 lg:bottom-80 lg:right-100 leading-tight">
              soul of the sea.
            </h1>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/10 hover:bg-black/40 text-white px-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <svg
          className="w-6 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 64"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 48l-7-16 7-16"
          />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/10 hover:bg-black/40 text-white px-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <svg
          className="w-6 h-12"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 64"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 16l7 16-7 16"
          />
        </svg>
      </button>

      {/* Indicators */}
      <div className="absolute bottom-10 md:bottom-40 3xl:bottom-50 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white scale-125"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

    

      {/* Background Image Bottom - Desktop */}
      <div className="hidden md:block absolute bottom-0 lg:-mb-28 left-0 w-full z-10">
        <Image
          src="/images/home/hero/bg.png"
          alt="Background decoration"
          width={1920}
          height={400}
          className="w-full object-cover"
        />
      </div>

      

      {/* Location Info Overlay - Desktop */}
      <div className="hidden md:flex absolute bottom-15 lg:bottom-5 3xl:bottom-12 w-full justify-between z-20 px-20 lg:px-56 ">
        <div className="flex gap-2 items-center">
          <Image
            src="/images/home/hero/icon_location.png"
            alt="icon location"
            width={1000}
            height={1000}
            className="w-auto h-6 lg:h-9"
          />
          <div className="flex flex-col">
            <p className="text-sm lg:text-xl font-plant text-black">Biduk-Biduk</p>
            <p className="text-sm lg:text-xl font-plant text-black -mt-0.5 lg:-mt-2">
              Berau, East Kalimantan
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 lg:gap-2 items-center">
          <p className="text-lg lg:text-2xl font-plant text-black">14+</p>
          <p className="text-sm lg:text-xl font-plant text-accent -mt-0.5 lg:-mt-2">
            Destination
          </p>
        </div>
        <div className="flex flex-col gap-0.5 lg:gap-2 items-center">
          <p className="text-lg lg:text-2xl font-plant text-black">8200+</p>
          <p className="text-sm lg:text-xl font-plant text-accent -mt-0.5 lg:-mt-2">
            Visitor in 2024
          </p>
        </div>
        <div className="flex flex-col gap-0.5 lg:gap-2 items-center">
          <p className="text-lg lg:text-2xl font-plant text-black">320+</p>
          <p className="text-sm lg:text-xl font-plant text-accent -mt-0.5 lg:-mt-2">
            Sunny Days a Year
          </p>
        </div>
        <div className="flex flex-col gap-0.5 lg:gap-2 items-center">
          <p className="text-lg lg:text-2xl font-plant text-black">25+</p>
          <p className="text-sm lg:text-xl font-plant text-accent -mt-0.5 lg:-mt-2">
            Homestay & Hotels
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
