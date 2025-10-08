"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { destinationsApi, Destination } from "@/lib/api";

export default function PlacePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await destinationsApi.getActive(1, 12);
        if (response.data && response.data.length > 0) {
          setDestinations(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch destinations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
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
            <div className="h-6 lg:h-8 bg-gray-200 rounded animate-pulse w-40 lg:w-48 mx-auto mb-3 lg:mb-4"></div>
            <div className="h-8 lg:h-12 bg-gray-200 rounded animate-pulse w-72 lg:w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center"
              >
                <div className="w-full aspect-square bg-gray-200 rounded-[20px] animate-pulse"></div>
                <div className="w-full px-4 mt-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded-full animate-pulse w-24 mx-auto"></div>
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
            Explore Paradise
          </h1>
          <h2 className="text-2xl lg:text-5xl text-black font-semibold mb-3 lg:mb-4">
            Discover Amazing Places
          </h2>
        </div>
      </div>

      {/* Destinations Grid */}
      <div className="container mx-auto px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {destinations.map((destination) => (
            <div
              key={destination.id}
              className="flex flex-col items-center group"
            >
              {/* Image */}
              <div className="relative w-full aspect-square overflow-hidden rounded-[20px] shadow-lg">
                <Image
                  src={Array.isArray(destination.images) ? destination.images[0] : destination.images}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              
              {/* Destination Info */}
              <div className="flex flex-col items-center w-full px-4 mt-4">
                <h3 className="text-lg lg:text-xl text-black font-semibold text-center line-clamp-2">
                  {destination.name}
                </h3>
                <Link 
                  href={`/place/${destination.id}`}
                  className="btn-border-reveal font-semibold mt-2 w-fit px-6 py-2 text-sm lg:text-base bg-transparent border-2 border-accent text-black rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
                >
                  Visit
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
          ))}
        </div>

        {/* Empty State */}
        {destinations.length === 0 && !loading && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No destinations available at the moment
            </h3>
            <p className="text-gray-500">Please check back later</p>
          </div>
        )}
      </div>
    </div>
  );
}
