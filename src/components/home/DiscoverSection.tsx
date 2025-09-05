"use client";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";

export default function DiscoverSection() {
  const [currentSlide, setCurrentSlide] = useState<number>(4);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [mouseStart, setMouseStart] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragOffset, setDragOffset] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  const destinations: { name: string; image: string }[] = [
    { name: "Labuan Cermin", image: "/images/home/hero.png" },
    { name: "Bangkuduan", image: "/images/home/hero.png" },
    { name: "Labuan Cermin", image: "/images/home/hero.png" },
    { name: "Bangkuduan", image: "/images/home/hero.png" },
    { name: "Labuan Cermin", image: "/images/home/hero.png" },
    { name: "Bangkuduan", image: "/images/home/hero.png" },
    { name: "Labuan Cermin", image: "/images/home/hero.png" },
    { name: "Bangkuduan", image: "/images/home/hero.png" },
  { name: "Labuan Cermin", image: "/images/home/hero.png" },
  ];

  // Auto slide setiap 4 detik (pause saat dragging)
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinations.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [destinations.length, isAutoPlay]);



  // Enhanced Mouse handlers untuk drag yang lebih responsif
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setIsDragging(true);
    setIsAutoPlay(false);
    setMouseStart(e.clientX);
    setDragOffset(0);
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grabbing';
      containerRef.current.style.userSelect = 'none';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    
    e.preventDefault();
    const currentX = e.clientX;
    const diff = currentX - mouseStart;
    setDragOffset(diff);
    
    // Cancel animation frame untuk performa yang lebih baik
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (!isDragging) return;
    
    const currentX = e.clientX;
    const distance = mouseStart - currentX;
    const minDragDistance = 80; // Threshold minimum
    const cardWidth = 340; // Lebar satu card + gap
    
    if (Math.abs(distance) > minDragDistance) {
      // Hitung berapa card yang harus dipindah (maksimal 2)
      const cardsMoved = Math.min(Math.ceil(Math.abs(distance) / cardWidth), 2);
      
      if (distance > 0) {
        // Drag kiri -> next (pindah 1-2 cards)
        setCurrentSlide((prev) => (prev + cardsMoved) % destinations.length);
      } else {
        // Drag kanan -> prev (pindah 1-2 cards)
        setCurrentSlide((prev) => (prev - cardsMoved + destinations.length) % destinations.length);
      }
    }
    
    // Reset state
    setIsDragging(false);
    setDragOffset(0);
    setMouseStart(0);
    
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
      containerRef.current.style.userSelect = 'auto';
    }
    
    // Resume autoplay setelah 2 detik
    setTimeout(() => {
      setIsAutoPlay(true);
    }, 2000);
  };

  const handleMouseLeave = (): void => {
    if (isDragging) {
      handleMouseUp({} as React.MouseEvent<HTMLDivElement>);
    }
  };

  // Enhanced Touch handlers
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>): void => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsAutoPlay(false);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>): void => {
    const currentTouch = e.targetTouches[0].clientX;
    setTouchEnd(currentTouch);
    
    if (touchStart) {
      const diff = currentTouch - touchStart;
      setDragOffset(diff);
    }
  };

  const handleTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;
    const cardWidth = 340; // Lebar satu card + gap (estimasi untuk mobile)

    if (Math.abs(distance) > minSwipeDistance) {
      // Hitung berapa card yang harus dipindah (maksimal 2)
      const cardsMoved = Math.min(Math.ceil(Math.abs(distance) / cardWidth), 2);
      
      if (distance > 0) {
        // Swipe kiri -> next (pindah 1-2 cards)
        setCurrentSlide((prev) => (prev + cardsMoved) % destinations.length);
      } else {
        // Swipe kanan -> prev (pindah 1-2 cards)
        setCurrentSlide((prev) => (prev - cardsMoved + destinations.length) % destinations.length);
      }
    }

    // Reset state
    setTouchStart(0);
    setTouchEnd(0);
    setDragOffset(0);
    
    // Resume autoplay setelah 2 detik
    setTimeout(() => {
      setIsAutoPlay(true);
    }, 2000);
  };

  // Calculate transform dengan drag offset
  const calculateTransform = () => {
    const baseTransform = -currentSlide * 340 + 4 * 340;
    const dragTransform = isDragging || touchEnd ? dragOffset * 0.8 : 0; // Damping factor
    return baseTransform + dragTransform;
  };

  return (
    <section>
      {/* Desktop Version */}
      <div className="hidden lg:flex bg-white flex-col justify-center items-center min-h-screen py-48">
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-primary font-plant">Wonders to Discover</h1>
          <h1 className="text-5xl text-black font-semibold mt-2">Beautiful Places Await</h1>
        </div>

        {/* Slider Container */}
        <div
          ref={containerRef}
          className="relative w-full mt-12 overflow-hidden cursor-grab active:cursor-grabbing select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ 
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: isDragging ? 'none' : 'auto'
          }}
        >
          <div
            className="flex gap-10 h-[50vh] justify-center"
            style={{
              transform: `translateX(${calculateTransform()}px)`,
              transition: isDragging || touchEnd 
                ? 'none' 
                : 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              perspective: "1000px",
              willChange: 'transform'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {destinations.map((destination, index: number) => {
              const position = index - currentSlide;
              const isMainVisible = Math.abs(position) <= 4;

              return (
                <div
                  key={index}
                  className={`flex flex-col items-center transition-all duration-700 ${
                    isMainVisible ? "opacity-100" : "opacity-40"
                  }`}
                  style={{
                    minWidth: "320px",
                    transform: `
                      ${position === -4 ? "rotate(-16deg) translateY(140px)" : ""}
                      ${position === -3 ? "rotate(-12deg) translateY(130px)" : ""}
                      ${position === -2 ? "rotate(-8deg) translateY(70px)" : ""}
                      ${position === -1 ? "rotate(-4deg) translateY(30px)" : ""}
                      ${position === 0 ? "rotate(0deg) translateY(15px)" : ""}
                      ${position === 1 ? "rotate(4deg) translateY(30px)" : ""}
                      ${position === 2 ? "rotate(8deg) translateY(70px)" : ""}
                      ${position === 3 ? "rotate(12deg) translateY(130px)" : ""}
                      ${position === 4 ? "rotate(16deg) translateY(140px)" : ""}
                    `,
                    zIndex: position === 0 ? 10 : 5 - Math.abs(position),
                    pointerEvents: isDragging ? 'none' : 'auto'
                  }}
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="w-80 h-80 object-cover rounded-[20px] hover:scale-105 transition-transform duration-300 shadow-lg"
                    draggable={false}
                  />
                  <div className="flex flex-col items-center w-full px-4 3xl:px-10">
                    <h1 className="text-xl text-black font-semibold mt-4 text-center">{destination.name}</h1>
                    <button 
                      className="btn-border-reveal font-semibold mt-2 w-fit px-6 py-2 text-base bg-transparent border-2 border-accent text-black rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2"
                      onMouseDown={(e) => e.stopPropagation()}
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
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex gap-2 mt-8">
          {Array.from({ length: destinations.length }).map((_, index: number) => (
            <button
              key={index}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlay(false);
                setTimeout(() => setIsAutoPlay(true), 3000);
              }}
              className={`w-3 h-3 rounded-full border border-primary transition-all duration-300 ${
                currentSlide === index ? "bg-primary scale-110" : "bg-white hover:bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden bg-white flex flex-col justify-center items-center min-h-screen py-16">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-lg text-primary font-plant">Wonders to Discover</h1>
          <h1 className="text-3xl text-black font-semibold mt-2 text-center">Beautiful Places Await</h1>
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
                  src={destination.image}
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
                setIsAutoPlay(false);
                setTimeout(() => setIsAutoPlay(true), 3000);
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