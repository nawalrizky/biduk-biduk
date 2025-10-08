"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PlaceCarousel from "@/components/place/Carousel";
import PlaceContent from "@/components/place/Content";
import { destinationsApi, Destination } from "@/lib/api";

export default function PlaceDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [destination, setDestination] = useState<Destination | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestination = async () => {
      try {
        console.log('🔍 Fetching destination with ID:', id);
        setLoading(true);
        const data = await destinationsApi.getById(Number(id));
        console.log('📍 Destination data received:', data);
        setDestination(data);
      } catch (error) {
        console.error('❌ Failed to fetch destination:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDestination();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading destination...</p>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Destination not found
          </h2>
          <p className="text-gray-600">
            The destination you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-screen lg:h-[110vh]">
        <PlaceCarousel destination={destination} />
      </div>
      <div className="relative z-20">
        <PlaceContent destination={destination} />
      </div>
    </div>
  );
}