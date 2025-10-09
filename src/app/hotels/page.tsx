"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { hotelsApi, Hotel } from "@/lib/api";

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

export default function HotelsPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const handleImageError = (hotelId: number) => {
    console.error(`❌ Image failed to load for hotel ${hotelId}`);
    setImageErrors(prev => ({ ...prev, [hotelId]: true }));
  };

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        const response = await hotelsApi.getActive(1, 8);
        console.log('🏨 Hotels API Response:', response);
        if (response.results?.data?.items) {
          const hotelItems = response.results.data.items.slice(0, 8);
          console.log('🏨 Hotel Items:', hotelItems);
          hotelItems.forEach((hotel, index) => {
            console.log(`Hotel ${index}:`, {
              name: hotel.name,
              image: hotel.image,
              images: hotel.images,
              hasImages: hotel.images && hotel.images.length > 0
            });
          });
          setHotels(hotelItems);
        }
      } catch (error) {
        console.error("Failed to fetch hotels:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
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
            <div className="h-6 lg:h-8 bg-gray-200 rounded animate-pulse w-32 lg:w-48 mx-auto mb-3 lg:mb-4"></div>
            <div className="h-8 lg:h-12 bg-gray-200 rounded animate-pulse w-64 lg:w-96 mx-auto"></div>
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
              >
                <div className="w-full h-[280px] md:h-[240px] lg:h-56 bg-gray-200 animate-pulse"></div>
                <div className="py-3 px-1">
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-12 mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-3"></div>
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                    </div>
                    <div className="h-10 bg-gray-200 rounded-full animate-pulse w-28"></div>
                  </div>
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
            Your Beachside Escape
          </h1>
          <h2 className="text-2xl lg:text-5xl text-black font-semibold mb-3 lg:mb-4">
            Choose Your Relax Place
          </h2>
        </div>
      </div>

      {/* Hotels Grid */}
      <div className="container mx-auto px-6 lg:px-8 py-6 lg:py-16 relative z-10">
        <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {hotels.slice(0, 8).map((hotel) => (
            <div
              key={hotel.hotel_id}
              className="rounded-2xl overflow-hidden transition-all duration-300"
            >
                            <div className="group">
                <Link href={`/hotels/${hotel.hotel_id}`} className="block overflow-hidden rounded-2xl">
                  <div className="relative w-full h-[280px] md:h-[240px] lg:h-56">
                    <Image
                      src={
                        imageErrors[hotel.hotel_id] 
                          ? "/images/home/explore/explore.png" 
                          : (() => {
                              // Extract first valid image
                              const firstImage = hotel.images && hotel.images.length > 0 ? getImageUrl(hotel.images[0]) : null;
                              const fallbackImage = hotel.image && hotel.image.trim() !== "" ? hotel.image : null;
                              return firstImage || fallbackImage || "/images/home/explore/explore.png";
                            })()
                      }
                      alt={hotel.name}
                      fill
                      loading="lazy"
                      className="rounded-2xl object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={() => handleImageError(hotel.hotel_id)}
                    />
                  </div>
                </Link>
                {/* Content Below Image */}
                <div className="py-3 px-1">
             
                  
                  <h3 className="text-lg lg:text-xl font-semibold mb-3 text-black line-clamp-1">
                    <Link 
                      href={`/hotels/${hotel.hotel_id}`}
                      className="hover:text-accent transition-colors"
                    >
                      {hotel.name}
                    </Link>
                  </h3>
                  
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(hotel.total_rating)].map((_, index) => (
                            <svg
                              key={index}
                              className="w-4 h-4 text-accent fill-current"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="text-sm font-bold text-black">
                          {hotel.total_rating}/5
                        </span>
                      </div>
                      <p className="text-sm text-black font-semibold">
                        {hotel.total_rating_users.toLocaleString()} Reviews
                      </p>
                    </div>
                    
                    <Link
                      href={hotel.book_url || `/hotels/${hotel.hotel_id}`}
                      className="btn-border-reveal border-2 border-accent text-black font-semibold px-4 lg:px-6 py-2 rounded-full hover:bg-accent hover:text-white transition-colors text-sm flex items-center gap-2 whitespace-nowrap"
                    >
                      Book Now →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {hotels.length === 0 && !loading && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No hotels available at the moment
            </h3>
            <p className="text-gray-500">Please check back later</p>
          </div>
        )}
      </div>
    </div>
  );
}
