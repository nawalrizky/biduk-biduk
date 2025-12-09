"use client";

import React, { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { destinationsApi, Destination } from "@/lib/api";
import { useTranslation } from "react-i18next";
import type { PerformanceMetrics } from "@/lib/performance";

// Dynamic import untuk menghindari SSR issues dengan Leaflet
const LeafletMap = dynamic(() => import("./LeafletMap"), { ssr: false });

// Extend Window interface for performance metrics
declare global {
  interface Window {
    __EXPLORE_SECTION_METRICS__?: {
      getMetrics?: () => PerformanceMetrics;
      getMarks?: () => PerformanceMark[];
      getMeasures?: () => PerformanceMeasure[];
      clear?: () => void;
      log?: () => void;
      totalMarkers?: number;
    };
  }
}

interface Feature {
  type: "Feature";
  properties: {
    GID_0: string;
    NAME_0: string;
    GID_1: string;
    NAME_1: string;
    NL_NAME_1: string;
    GID_2: string;
    NAME_2: string;
    NL_NAME_2: string;
    GID_3: string;
    NAME_3: string;
    NL_NAME_3: string;
    GID_4: string;
    NAME_4: string;
    VARNAME_4: string;
    TYPE_4: string;
    ENGTYPE_4: string;
    CC_4: string;
  };
  geometry: {
    type: "MultiPolygon";
    coordinates: number[][][][];
  };
}

interface BidukBidukData {
  type: "FeatureCollection";
  features: Feature[];
}


const ExploreSection: React.FC = () => {
  const { t } = useTranslation();
  const [mapData, setMapData] = useState<BidukBidukData | null>(null);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredMarker, setHoveredMarker] = useState<string | null>(null);
  const [clickedMarker, setClickedMarker] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);

  const center: [number, number] = [1.22, 118.674]; // [lat, lng] untuk Leaflet

  // Responsive map dimensions - bisa di-custom height
  const getMapDimensions = () => {
    if (typeof window !== "undefined") {
      const screenWidth = window.innerWidth;
      if (screenWidth < 640) {
        return { width: "100%", height: "350px" }; // Mobile
      } else if (screenWidth < 1024) {
        return { width: "100%", height: "400px" }; // Tablet
      } else if (screenWidth < 1536) {
        return { width: "100%", height: "450px" }; // Desktop
      } else {
        return { width: "100%", height: "500px" }; // Large screen
      }
    }
    return { width: "100%", height: "500px" };
  };

  const [mapDimensions, setMapDimensions] = useState(getMapDimensions());

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setMapDimensions(getMapDimensions());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        
        // Performance mark: Start loading data
        performance.mark('explore-data-load-start');
        
        const [mapResponse, destinationsData] = await Promise.all([
          fetch("/biduk_biduk.json"),
          destinationsApi.getActive(),
        ]);

        const mapData = await mapResponse.json();
        
        // Performance mark: Data loaded, before setting state
        performance.mark('explore-data-load-end');
        performance.measure('explore-data-loading', 'explore-data-load-start', 'explore-data-load-end');
        
        setMapData(mapData);
        setDestinations(destinationsData.data || []);
        setLoading(false);
      } catch (error) {
        console.error(" [ExploreSection] Error loading data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Memoize markerData to prevent re-creation on every render
  const markerData = useMemo(
    () =>
      destinations?.map((destination) => ({
        id: destination.id.toString(),
        coordinates: [
          destination.coordinates.latitude || 0,
          destination.coordinates.longitude || 0,
        ] as [number, number],
        title: destination.name,
        type: destination.category.name,
        description: destination.description,
        image: Array.isArray(destination.images)
          ? destination.images[0]
          : destination.images || "/images/placeholder.png",
      })) || [],
    [destinations]
  );

  // Performance monitoring for marker rendering
  useEffect(() => {
    if (!loading && markerData.length > 0) {
      // Mark before rendering markers
      performance.mark('explore-markers-render-start');
      
      // Use requestAnimationFrame to measure after rendering
      requestAnimationFrame(() => {
        performance.mark('explore-markers-render-end');
        performance.measure('explore-markers-rendering', 'explore-markers-render-start', 'explore-markers-render-end');
        
        // Log performance metrics for Lighthouse custom audit
        const measures = performance.getEntriesByType('measure');
        const dataLoadMeasure = measures.find(m => m.name === 'explore-data-loading') as PerformanceMeasure | undefined;
        const markersRenderMeasure = measures.find(m => m.name === 'explore-markers-rendering') as PerformanceMeasure | undefined;
        
        console.log('📊 [ExploreSection Performance Metrics]');
        if (dataLoadMeasure) {
          console.log(`  ⏱️  Data Loading: ${dataLoadMeasure.duration.toFixed(2)}ms`);
        }
        if (markersRenderMeasure) {
          console.log(`  🗺️  Markers Rendering: ${markersRenderMeasure.duration.toFixed(2)}ms`);
        }
        console.log(`  📍 Total Markers: ${markerData.length}`);
        
        // Store marker count for external access
        if (typeof window !== 'undefined') {
          window.__EXPLORE_SECTION_METRICS__ = {
            ...window.__EXPLORE_SECTION_METRICS__,
            totalMarkers: markerData.length,
          };
        }
      });
    }
  }, [loading, markerData]);

  useEffect(() => {
    // Hide click content on scroll
    const handleHideClickContent = () => {
      setClickedMarker(null);
    };
    window.addEventListener("scroll", handleHideClickContent);
    return () => {
      window.removeEventListener("scroll", handleHideClickContent);
    };
  }, []);

  if (loading) {
    return (
      <section
        className="flex justify-center items-center min-h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/home/explore/explore.png')",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  if (!mapData || !mapData.features || mapData.features.length === 0) {
    return (
      <section
        className="flex justify-center items-center min-h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/home/explore/explore.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#027DB9] opacity-50"></div>
        <div className="relative z-10">
          <p className="text-white font-semibold">Failed to load map data</p>
        </div>
      </section>
    );
  }

  // GeoJSON style function
  const geoJsonStyle = () => ({
    fillColor: "#FFFFFF",
    fillOpacity: 1,
    color: "#FFFFFF",
    weight: 2,
    opacity: 1,
  });

  const handleMarkerClick = (markerId: string) => {
    setClickedMarker(clickedMarker === markerId ? null : markerId);
  };

  const handleMarkerHover = (markerId: string) => {
    setHoveredMarker(markerId);
  };

  const handleMarkerLeave = () => {
    setHoveredMarker(null);
  };

  if (!mounted) {
    return (
      <section
        className="flex justify-center items-center min-h-screen relative bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/home/explore/explore.png')",
        }}
      >
        <div className="absolute inset-0 bg-[#027DB9] opacity-50"></div>
        <div className="relative z-10">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white"></div>
        </div>
      </section>
    );
  }

  return (
    <section
      className="flex justify-center items-center min-h-screen relative bg-cover bg-center bg-no-repeat overflow-x-hidden"
      style={{
        backgroundImage: "url('/images/home/explore/explore.png')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#027DB9] opacity-50"></div>
      <div className="relative flex flex-col z-10 container mx-auto px-4 py-8 lg:py-16">
        <div className="text-center mb-8 lg:mb-12">
          <h2 className="text-lg sm:text-xl lg:text-2xl font-plant text-white mb-2 lg:mb-4">
            {t("home.explore_title_prefix")}
          </h2>
          <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
            {t("home.explore_title")}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:mt-10 lg:-ml-20 lg:gap-10 w-full">
          {/* Map Content */}
          <div 
            className="relative z-10 flex justify-center w-full lg:w-1/2 lg:max-w-md"
          >
            <div 
              className="rounded-lg overflow-hidden shadow-2xl border-2 border-white"
              style={{ 
                width: mapDimensions.width, 
                height: mapDimensions.height,
                minWidth: mapDimensions.width,
                display: 'block',
                position: 'relative',
                flexShrink: 0
              }}
            >
              <LeafletMap
                mapData={mapData || { type: "FeatureCollection", features: [] }}
                markerData={markerData}
                center={center}
                hoveredMarker={hoveredMarker}
                onMarkerHover={handleMarkerHover}
                onMarkerLeave={handleMarkerLeave}
                onMarkerClick={handleMarkerClick}
                clickedMarker={clickedMarker}
              />
            </div>
          </div>

          {/* Statistics */}
          <div className="flex flex-col sm:flex-row mx-auto sm:mx-0 px-32 sm:px-0 lg:flex-col gap-6 sm:gap-8 lg:gap-12 lg:mt-14 w-full lg:w-auto justify-center lg:justify-start items-start sm:items-center lg:items-start">
            <div className="flex items-start sm:items-center gap-3 lg:gap-4 justify-start sm:justify-center lg:justify-start w-full">
              <Image
                src="/images/home/explore/icon1.png"
                alt="Facilities Icon"
                width={48}
                height={48}
                loading="lazy"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <div className="flex flex-col items-start">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  14+
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-plant text-white">
                  Facilities
                </span>
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-3 lg:gap-4 justify-start sm:justify-center lg:justify-start w-full">
              <Image
                src="/images/home/explore/icon2.png"
                alt="Destinations Icon"
                width={48}
                height={48}
                loading="lazy"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <div className="flex flex-col items-start">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  4+
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-plant text-white">
                  Destinations
                </span>
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-3 lg:gap-4 justify-start sm:justify-center lg:justify-start w-full">
              <Image
                src="/images/home/explore/icon3.png"
                alt="Hotels Icon"
                width={48}
                height={48}
                loading="lazy"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <div className="flex flex-col items-start">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  33+
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-plant text-white">
                  Hotel & Resort
                </span>
              </div>
            </div>
            <div className="flex items-start sm:items-center gap-3 lg:gap-4 justify-start sm:justify-center lg:justify-start w-full">
              <Image
                src="/images/home/explore/icon4.png"
                alt="Tour Package Icon"
                width={48}
                height={48}
                loading="lazy"
                className="w-10 h-10 sm:w-12 sm:h-12"
              />
              <div className="flex flex-col items-start">
                <span className="text-lg sm:text-xl lg:text-2xl font-bold text-white">
                  9+
                </span>
                <span className="text-xs sm:text-sm lg:text-base font-plant text-white">
                  Tour Package
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExploreSection;
