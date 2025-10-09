"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import HotelCarousel from "@/components/hotel/Carousel";
import HotelContent from "@/components/hotel/Content";
import { hotelsApi, Hotel } from "@/lib/api";

export default function HotelDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        console.log('🔍 Fetching hotel with ID:', id);
        setLoading(true);
        const data = await hotelsApi.getById(Number(id));
        console.log('🏨 Hotel data received:', data);
        setHotel(data);
      } catch (error) {
        console.error('❌ Failed to fetch hotel:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchHotel();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading hotel...</p>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Hotel not found
          </h2>
          <p className="text-gray-600">
            The hotel you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-screen lg:h-[110vh]">
        <HotelCarousel hotel={hotel} />
      </div>
      <div className="relative z-20">
        <HotelContent hotel={hotel} />
      </div>
    </div>
  );
}
