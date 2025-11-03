"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { destinationsApi, Destination } from "@/lib/api";
import { useTranslation } from 'react-i18next';

export default function DiscoverSection() {
  const { t } = useTranslation();
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [centerIndex, setCenterIndex] = useState<number>(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState<boolean>(true);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

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

  // Set initial scroll position to center (start at second set)
  useEffect(() => {
    if (scrollContainerRef.current && destinations.length > 0) {
      const container = scrollContainerRef.current;
      const cardWidth = 360; // 320px + 40px gap
      // Start at the beginning of the second set (index 1 of tripled array)
      container.scrollLeft = destinations.length * cardWidth;
    }
  }, [destinations]);

  // Auto scroll effect with seamless infinite loop (only left direction)
  useEffect(() => {
    if (!isAutoScrolling || !scrollContainerRef.current || destinations.length === 0) return;

    const container = scrollContainerRef.current;
    const cardWidth = 360; // 320px + 40px gap
    
    autoScrollRef.current = setInterval(() => {
      if (container && isAutoScrolling) {
        container.scrollLeft += 2; // Smooth continuous scroll to the left (right direction)
        
        // Seamlessly loop: when reaching end of second set, jump back to start of second set
        // This makes the loop invisible since content is identical
        const secondSetEnd = destinations.length * 2 * cardWidth;
        if (container.scrollLeft >= secondSetEnd) {
          // Jump back to start of second set
          container.scrollLeft = destinations.length * cardWidth;
        }
      }
    }, 16); // 60fps smooth scroll

    return () => {
      if (autoScrollRef.current) {
        clearInterval(autoScrollRef.current);
      }
    };
  }, [isAutoScrolling, destinations.length]);

  // Handle scroll to detect center card with precise center detection
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      
      const container = scrollContainerRef.current;
      const containerCenter = container.scrollLeft + container.offsetWidth / 2;
      const cardWidth = 360; // 320px + 40px gap
      
      // Calculate which card is at the center (more precise)
      const index = Math.floor(containerCenter / cardWidth);
      
      // Keep index within bounds
      const actualIndex = index % destinations.length;
      setCenterIndex(actualIndex);
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      // Initial center calculation
      handleScroll();
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [destinations.length]);

  return (
    <section>
      {/* Desktop Version */}
      <div className="hidden lg:flex bg-white flex-col justify-center items-center min-h-screen py-48">
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-xl text-primary font-plant">{t('home.discover_title')}</h1>
          <h1 className="text-5xl text-black font-semibold mt-2">{t('home.discover_subtitle')}</h1>
        </div>

        {/* Horizontal Scroll Carousel with Center Focus */}
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
              width: 320px;
              transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            }

            .destination-card.center {
              width: 400px;
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
            style={{ paddingLeft: 'calc(50v - 160px)', paddingRight: 'calc(50vw - 160px)' }}
          >
            {/* Triple the destinations for infinite loop */}
            {[...destinations, ...destinations, ...destinations].map((destination, index: number) => {
              // Calculate which card should be centered based on actual position in array
              const actualIndex = index % destinations.length;
              const isCenter = actualIndex === centerIndex;
              
              return (
                <div
                  key={`card-${index}`}
                  className={`destination-card ${isCenter ? 'center' : ''}`}
                >
                  <div className={`relative ${isCenter ? 'h-[400px] -translate-y-10' : 'h-[320px]'} w-full overflow-hidden rounded-[20px] group transition-all duration-500`}>
                    <Image
                      src={Array.isArray(destination.images) ? destination.images[0] : destination.images}
                      alt={destination.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500 shadow-lg"
                      draggable={false}
                    />
                  </div>
                  <div className={`flex flex-col items-center px-4 ${isCenter ? '-mt-4 ' : 'mt-4'}` }>
                    <h1 className={`text-black font-semibold text-center mb-3 transition-all duration-500 ${isCenter ? 'text-2xl ' : 'text-xl'} line-clamp-2`}>
                      {destination.name}
                    </h1>
                    <button className="font-semibold w-fit px-6 py-2 text-sm bg-transparent border-2 border-accent text-black rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2">
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
                    </button>
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

        {/* Mobile 3D Carousel Container */}
        <div
          className="relative w-full h-[550px] flex items-center justify-center overflow-hidden touch-pan-x"
          style={{
            transformStyle: "preserve-3d",
            perspective: "600px",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {destinations.map((destination, index: number) => {
            const offset = index + 1;
            const position = currentSlide + 1;
            const r = position - offset;
            const abs = Math.max(r * -1, r);

            // Calculate drag offset for mobile
            const mobileDragOffset = touchEnd && touchStart ? (touchEnd - touchStart) * 0.005 : 0;

            return (
              <div
                key={index}
                className="absolute w-[300px] h-[450px] flex flex-col items-center justify-center"
                style={{
                  transform: `rotateY(${-10 * r + mobileDragOffset * 180}deg) translateX(${-350 * r}px)`,
                  transition: touchEnd && touchStart ? 'none' : 'all 0.3s ease-linear',
                  zIndex: position - abs,
                  overflow: "hidden",
                  willChange: 'transform'
                }}
              >
                <Image
                  src={Array.isArray(destination.images) ? destination.images[0] : destination.images}
                  alt={destination.name}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="w-full h-[280px] rounded-xl object-cover"
                  draggable={false}
                />
                <div className="w-full h-[170px] bg-white flex flex-col items-center justify-center px-4 py-4">
                  <h3 className="text-lg font-semibold text-black text-center mb-3">{destination.name}</h3>
                  <button className="w-fit px-4 py-2 text-sm bg-transparent border-2 border-accent text-accent rounded-full hover:border-accent hover:text-accent transition-colors flex items-center gap-2">
                    Visit
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Dots */}
        <div className="flex gap-3 mt-8">
          {Array.from({ length: destinations.length }).map((_, index: number) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
              }}
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