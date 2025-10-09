"use client";
import { useState } from "react";
import Image from "next/image";
import { Package } from "@/lib/api";

interface PackageCarouselProps {
  package: Package;
}

export default function PackageCarousel({ package: pkg }: PackageCarouselProps) {
  const [currentSlide] = useState(0);

  // Use package image or placeholder
  const slideImages = pkg.image_url 
    ? [pkg.image_url] 
    : ["/images/home/explore/explore.png"];

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
              alt={`${pkg.name} - Image ${index + 1}`}
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

      {/* Package Info Overlay - Desktop */}
      <div className="hidden md:flex flex-col items-center justify-center absolute bottom-15 lg:bottom-5 3xl:bottom-14 w-full z-20 px-20 lg:px-56">
        <h1 className="text-2xl lg:text-3xl font-plant text-primary">
          Tour Package
        </h1>
        <h1 className="text-2xl lg:text-5xl font-semibold text-black text-center">
          {pkg.name}
        </h1>
        <p className="text-xl lg:text-3xl font-bold text-accent mt-4">
          Rp {parseFloat(pkg.price).toLocaleString('id-ID')}
        </p>
      </div>
    </div>
  );
}
