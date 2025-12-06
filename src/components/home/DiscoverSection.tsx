"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef, useMemo } from "react";
import { destinationsApi, Destination } from "@/lib/api";
import { useTranslation } from 'react-i18next';

export default function DiscoverSection() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  // Calculate how many copies needed for truly infinite scroll (memoized)
  const infiniteDestinations = useMemo(() => {
    if (destinations.length === 0) return [];
    
    // For small number of destinations, we need more copies to fill viewport
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const avgCardWidth = 380; // 320-400px + gap
    const minCardsToFillScreen = Math.ceil(viewportWidth / avgCardWidth);
    
    // We want at least 3x the screen width for smooth infinite scroll
    const totalCardsNeeded = minCardsToFillScreen * 3;
    const copiesNeeded = Math.ceil(totalCardsNeeded / destinations.length);
    
    // Minimum 5 copies for smooth loop, maximum 20 to avoid performance issues
    const finalCopies = Math.max(5, Math.min(20, copiesNeeded));
    
    // Create array with multiple copies
    const result = [];
    for (let i = 0; i < finalCopies; i++) {
      result.push(...destinations);
    }
    return result;
  }, [destinations]);

  // Fetch destinations from API
  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await destinationsApi.getActive(1, 12);
        if (response.data && response.data.length > 0) {
          setDestinations(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch destinations:', error);
      }
    };

    fetchDestinations();
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (Math.abs(distance) > minSwipeDistance) {
      if (distance > 0) {
        // Swipe left -> next
        setCurrentSlide((prev) => (prev + 1) % destinations.length);
      } else {
        // Swipe right -> prev
        setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length);
      }
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  // Set initial scroll position to center (start at middle set for infinite scroll)
  useEffect(() => {
    if (scrollContainerRef.current && destinations.length > 0) {
      const container = scrollContainerRef.current;
      const cardWidth = 380;
      // Start at middle position
      const middlePosition = Math.floor(infiniteDestinations.length / 2);
      container.scrollLeft = middlePosition * cardWidth;
    }
  }, [destinations, infiniteDestinations]);

  // Auto scroll with seamless infinite loop
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current || destinations.length === 0) return;

    const container = scrollContainerRef.current;
    const cardWidth = 380;
    const oneSetWidth = destinations.length * cardWidth;
    
    autoScrollRef.current = setInterval(() => {
      if (container && isAutoScrolling) {
        container.scrollLeft += 1.5;
        
        // Calculate positions for seamless loop
        const maxPosition = infiniteDestinations.length * cardWidth;
        const quarterPosition = maxPosition * 0.25;
        const threeQuarterPosition = maxPosition * 0.75;
        
        // When reaching 75%, jump back to 25% (seamless because content repeats)
        if (container.scrollLeft >= threeQuarterPosition) {
          container.scrollLeft = quarterPosition;
        }
        
        // If somehow scrolled too far left, jump forward
        if (container.scrollLeft < quarterPosition - oneSetWidth) {
          container.scrollLeft = quarterPosition;
        }
      }
    }, 16);

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, destinations.length, infiniteDestinations]);

  return (
    <section>
      {/* Desktop Version */}
      <div className="hidden lg:flex bg-white flex-col justify-center items-center min-h-screen py-48">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-xl text-primary font-plant">{t('home.discover_title')}</h1>
          <h1 className="text-5xl text-black font-semibold mt-2">{t('home.discover_subtitle')}</h1>
        </div>

        {/* Horizontal Scroll Carousel with Alternating Sizes */}
        <div className="w-full relative">
          <style jsx>{`
            .scroll-container {
              display: flex;
              gap: 40px;
              padding: 60px 0;
              overflow-x: auto;
              scroll-behavior: smooth;
              scrollbar-width: none;
              -ms-overflow-style: none;
              cursor: grab;
            }

            .scroll-container::-webkit-scrollbar {
              display: none;
            }

            .scroll-container:active {
              cursor: grabbing;
            }

            .destination-card {
              flex-shrink: 0;
              transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .destination-card.large {
              width: 400px;
            }

            .destination-card.small {
              width: 320px;
            }

            .destination-card img {
              transition: transform 0.5s ease;
            }
          `}</style>

          <div 
            ref={scrollContainerRef} 
            className="scroll-container"
            onMouseEnter={() => setIsAutoScrolling(false)}
            onMouseLeave={() => setIsAutoScrolling(true)}
            style={{ paddingLeft: 'calc(50vw - 200px)', paddingRight: 'calc(50vw - 200px)' }}
          >
            {/* Dynamic copies based on viewport and destination count */}
            {infiniteDestinations.map((destination, index: number) => {
              // Alternating pattern: large, small, large, small
              const isLarge = index % 2 === 0;
              
              return (
                <div
                  key={`card-${index}`}
                  className={`destination-card ${isLarge ? 'large' : 'small'}`}
                >
                  <div className={`relative ${isLarge ? 'h-[400px] -translate-y-10' : 'h-[320px]'} w-full overflow-hidden rounded-[20px] group transition-all duration-500`}>
                    <Image
                      src={Array.isArray(destination.images) ? destination.images[0] : destination.images}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 shadow-lg"
                      draggable={false}
                      sizes={isLarge ? "400px" : "320px"}
                    />
                  </div>
                  <div className={`flex flex-col items-center px-4 ${isLarge ? '-mt-4' : 'mt-4'}`}>
                    <h1 className={`text-black font-semibold text-center mb-3 transition-all duration-500 ${isLarge ? 'text-2xl' : 'text-xl'} line-clamp-2`}>
                      {destination.name}
                    </h1>
                    <Link 
                      href={`/place/${destination.id}`}
                      className="font-semibold  btn-border-reveal w-fit px-6 py-2 text-sm bg-transparent border-2 border-accent text-black rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
                    >
                      {t('buttons.visit')}
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
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden bg-white flex flex-col justify-center items-center min-h-screen py-16">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-lg text-primary font-plant">{t('home.discover_title')}</h1>
          <h1 className="text-3xl text-black font-semibold mt-2 text-center">{t('home.discover_subtitle')}</h1>
        </div>

        {/* Mobile Simple Carousel Container */}
        <div 
          className="relative w-full px-4"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {destinations.map((destination, index: number) => (
                <div key={index} className="w-full flex-shrink-0 px-2">
                  <div className="relative w-full h-[400px] overflow-hidden rounded-[20px]">
                    <Image
                      src={Array.isArray(destination.images) ? destination.images[0] : destination.images}
                      alt={destination.name}
                      fill
                      className="object-cover"
                      draggable={false}
                      sizes="100vw"
                    />
                  </div>
                  <div className="flex flex-col items-center mt-6">
                    <h1 className="text-2xl text-black font-semibold text-center mb-4 line-clamp-2">
                      {destination.name}
                    </h1>
                    <Link 
                      href={`/place/${destination.id}`}
                      className="font-semibold w-fit px-6 py-2 text-sm bg-transparent border-2 border-accent text-black rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
                    >
                      {t('buttons.visit')}
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
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length)}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % destinations.length)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full shadow-lg transition-all z-10"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex gap-3 mt-8">
          {destinations.map((_, index: number) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full border border-primary transition-all duration-300 ${
                currentSlide === index ? "bg-primary scale-125" : "bg-white"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}