"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { galleryApi, GalleryImage } from "@/lib/api";

export default function DestinationSection() {
  const [destinationImages, setDestinationImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDestinationImages = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await galleryApi.getDestinations();
        
        if (response && Array.isArray(response)) {
          // Map the API response to our expected format
          const mappedImages = response
            .filter(img => img.file_url || img.file) // Only include images with valid URLs
            .map(img => ({
              ...img,
              image_url: img.file_url || img.file || '', // Use file_url or file as the image URL
              alt_text: img.alt_text || img.description || img.title || 'Destination image'
            }))
            .reverse(); // Reverse the order to get correct lineup
          
          if (mappedImages.length > 0) {
            setDestinationImages(mappedImages);
          } else {
            setError('No destination images found');
          }
        } else {
          setError('No destination images available');
        }
      } catch (err) {
        console.error('❌ Failed to fetch destination images:', err);
        setError('Failed to load destination images');
      } finally {
        setLoading(false);
      }
    };

    fetchDestinationImages();
  }, []);

  // Don't render if no valid images
  if (loading) {
    return (
      <section className="bg-white py-48 px-4 lg:px-48">
        <div className="flex flex-col items-center">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-32 mb-2"></div>
          <div className="h-12 bg-gray-200 rounded animate-pulse w-96 mb-10"></div>
        </div>
        <div className="flex justify-center gap-6">
          <div className="flex flex-col gap-6">
            <div className="w-64 h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-64 h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="w-64 h-[546px] bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="flex flex-col gap-6">
            <div className="w-64 h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-64 h-96 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="w-112 h-64 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-112 h-64 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error || destinationImages.length === 0) {
    return (
      <section className="bg-white py-48 px-4 lg:px-48">
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-primary font-plant">Biduk-Biduk</h1>
          <h1 className="text-5xl text-black font-semibold mt-2 mb-10">
            Most Popular Destinations
          </h1>
          <div className="text-gray-500 text-center">
            <p>{error || 'No destination images available at the moment.'}</p>
            <p className="text-sm mt-2">Please check back later.</p>
          </div>
        </div>
      </section>
    );
  }
  return (
    <section>
      {/* Desktop Version */}
      <div className="hidden lg:flex bg-white flex-col justify-center items-center px-48 py-48">
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-primary font-plant">Biduk-Biduk</h1>
          <h1 className="text-5xl text-black font-semibold mt-2">
            Most Popular Destinations
          </h1>
        </div>
        <div className="flex mt-10 gap-6">
          <div className="flex items-start gap-6">
            {/* section 1 */}
            <div className="flex flex-col items-center gap-6">
              {destinationImages[0] && (
                <Image
                  src={destinationImages[0].image_url}
                  alt={destinationImages[0].alt_text || destinationImages[0].title}
                  width={1000}
                  height={1000}
                  loading="lazy"
                  className="w-64 h-64 object-cover rounded-[18px] shadow-lg 
                                  hover:scale-105 transition-transform duration-300"
                />
              )}
              {destinationImages[1] && (
                <Image
                  src={destinationImages[1].image_url}
                  alt={destinationImages[1].alt_text || destinationImages[1].title}
                  width={500}
                  height={500}
                  loading="lazy"
                  className="w-64 h-64 object-cover rounded-[18px] shadow-lg 
                                  hover:scale-105 transition-transform duration-300"
                />
              )}
            </div>
            {destinationImages[2] && (
              <Image
                src={destinationImages[2].image_url}
                alt={destinationImages[2].alt_text || destinationImages[2].title}
                width={500}
                height={500}
                loading="lazy"
                className="w-64 h-[546px] object-cover rounded-lg shadow-lg 
                                hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
          {/* section 2 */}
          <div className="flex flex-col gap-6">
            {destinationImages[3] && (
              <Image
                src={destinationImages[3].image_url}
                alt={destinationImages[3].alt_text || destinationImages[3].title}
                width={500}
                height={500}
                loading="lazy"
                className="w-64 h-80 object-cover rounded-lg shadow-lg 
                                hover:scale-105 transition-transform duration-300"
              />
            )}
            {destinationImages[4] && (
              <Image
                src={destinationImages[4].image_url}
                alt={destinationImages[4].alt_text || destinationImages[4].title}
                width={500}
                height={500}
                loading="lazy"
                className="w-64 h-96 object-cover rounded-lg shadow-lg 
                                hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>

          {/* section 3 */}
          <div className="flex flex-col gap-6">
            {destinationImages[5] && (
              <Image
                src={destinationImages[5].image_url}
                alt={destinationImages[5].alt_text || destinationImages[5].title}
                width={500}
                height={500}
                loading="lazy"
                className="w-112 h-64 object-cover rounded-lg shadow-lg
                                hover:scale-105 transition-transform duration-300"
              />
            )}
            {destinationImages[6] && (
              <Image
                src={destinationImages[6].image_url}
                alt={destinationImages[6].alt_text || destinationImages[6].title}
                width={500}
                height={500}
                loading="lazy"
                className="w-112 h-64 object-cover rounded-lg shadow-lg 
                                hover:scale-105 transition-transform duration-300"
              />
            )}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden bg-white pt-5 pb-32 px-4 overflow-hidden">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-lg text-primary font-plant">Biduk-Biduk</h1>
          <h1 className="text-2xl md:text-3xl text-black font-semibold mt-1 text-center">
            Most Popular Destinations
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {/* Section 1 - Mobile (Top) */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {destinationImages[0] && (
                <Image
                  src={destinationImages[0].image_url}
                  alt={destinationImages[0].alt_text || destinationImages[0].title}
                  width={500}
                  height={500}
                  loading="lazy"
                  className="flex-1 h-32 sm:h-36 object-cover rounded-lg shadow-lg"
                />
              )}
              {destinationImages[1] && (
                <Image
                  src={destinationImages[1].image_url}
                  alt={destinationImages[1].alt_text || destinationImages[1].title}
                  width={500}
                  height={500}
                  loading="lazy"
                  className="flex-1 h-32 sm:h-36 object-cover rounded-lg shadow-lg"
                />
              )}
            </div>
            {destinationImages[2] && (
              <Image
                src={destinationImages[2].image_url}
                alt={destinationImages[2].alt_text || destinationImages[2].title}
                width={500}
                height={500}
                loading="lazy"
                className="w-1/2 flex-1 object-cover rounded-lg shadow-lg"
              />
            )}
          </div>

          {/* Section 3 - One image (Middle) */}
          {destinationImages[6] && (
            <div>
              <Image
                src={destinationImages[6].image_url}
                alt={destinationImages[6].alt_text || destinationImages[6].title}
                width={500}
                height={500}
                loading="lazy"
                className="w-full h-48 object-cover rounded-lg shadow-lg"
              />
            </div>
          )}

          {/* Section 2 - Mobile flex-row (Bottom) */}
          <div className="flex gap-3">
            {destinationImages[3] && (
              <Image
                src={destinationImages[3].image_url}
                alt={destinationImages[3].alt_text || destinationImages[3].title}
                width={500}
                height={500}
                loading="lazy"
                className="w-32 flex-1 sm:h-48 object-cover rounded-lg shadow-lg"
              />
            )}
            {destinationImages[4] && (
              <Image
                src={destinationImages[4].image_url}
                alt={destinationImages[4].alt_text || destinationImages[4].title}
                width={500}
                height={500}
                loading="lazy"
                className="w-32 flex-1 sm:h-48 object-cover rounded-lg shadow-lg"
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
