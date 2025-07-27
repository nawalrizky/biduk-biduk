"use client";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function DiscoverSection() {
  const [currentSlide, setCurrentSlide] = useState(4);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  const destinations = [
    { name: "Labuan Cermin", image: "/images/home/hero.png" },
    { name: "Pantai Teluk Semanting", image: "/images/home/hero.png" },
    { name: "Pulau Derawan", image: "/images/home/hero.png" },
    { name: "Danau Kakaban", image: "/images/home/hero.png" },
    { name: "Sangalaki Island", image: "/images/home/hero.png" },
    { name: "Maratua Island", image: "/images/home/hero.png" },
    { name: "Kaniungan Kecil", image: "/images/home/hero.png" },
    { name: "Pulau Nabucco", image: "/images/home/hero.png" },
    { name: "Tanjung Redeb", image: "/images/home/hero.png" },
  ];

  // Auto slide every 3 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % destinations.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [destinations.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % destinations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + destinations.length) % destinations.length);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide(); // Swipe left - next slide
    }
    
    if (distance < -minSwipeDistance) {
      prevSlide(); // Swipe right - previous slide
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section>
      {/* Desktop Version */}
      <div className="hidden lg:flex bg-white flex-col justify-center items-center min-h-screen py-48">
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-primary font-plant">
            Wonders to Discover
          </h1>
          <h1 className="text-5xl text-black font-semibold mt-2">
            Beautiful Places Await
          </h1>
        </div>
        
        {/* Slider Container */}
        <div className="relative w-full  mt-12 overflow-hidden">
          {/* Cards Container with circular effect */}
          <div 
            className="flex gap-10 h-[50vh] transition-transform duration-700 ease-in-out justify-center"
            style={{
              transform: `translateX(${-currentSlide * 340 + (4 * 340)}px)`,
              perspective: '1000px'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {destinations.map((destination, index) => {
              const position = index - currentSlide; // Position relative to current slide
              const isMainVisible = Math.abs(position) <= 4; // Show 9 cards (-4 to +4)
              
              return (
                <div
                  key={index}
                  className={`flex flex-col  items-center transition-all duration-700 ${
                    isMainVisible ? 'opacity-100' : 'opacity-40'
                  }`}
                  style={{
                    minWidth: '320px',
                    transform: `
                      ${position === -4 ? 'rotate(-16deg) translateY(140px)' : ''}
                      ${position === -3 ? 'rotate(-12deg) translateY(130px)' : ''}
                      ${position === -2 ? 'rotate(-8deg) translateY(70px)' : ''}
                      ${position === -1 ? 'rotate(-4deg) translateY(30px)' : ''}
                      ${position === 0 ? 'rotate(0deg) translateY(15px)' : ''}
                      ${position === 1 ? 'rotate(4deg) translateY(30px)' : ''}
                      ${position === 2 ? 'rotate(8deg) translateY(70px)' : ''}
                      ${position === 3 ? 'rotate(12deg) translateY(130px)' : ''}
                      ${position === 4 ? 'rotate(16deg) translateY(140px)' : ''}
                    `,
                    zIndex: position === 0 ? 10 : 5 - Math.abs(position)
                  }}
                >
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    width={500}
                    height={500}
                    loading="lazy"
                    className="w-80 h-80 object-cover rounded-[20px] hover:scale-105 transition-transform duration-300 shadow-lg"
                  />
                  <div className="flex flex-col items-center w-full px-4 3xl:px-10">
                    <h1 className="text-xl text-black font-semibold mt-4 text-center">
                      {destination.name}
                    </h1>
                    <button className="btn-border-reveal font-semibold mt-2 w-fit px-6 py-2 text-base bg-transparent border-2 border-accent text-black rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2">
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
          {Array.from({ length: destinations.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full border border-primary transition-all duration-300 ${
                currentSlide === index ? 'bg-primary scale-110' : 'bg-white hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden bg-white flex flex-col justify-center items-center min-h-screen py-16">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-lg text-primary font-plant">
            Wonders to Discover
          </h1>
          <h1 className="text-3xl text-black font-semibold mt-2 text-center">
            Beautiful Places Await
          </h1>
        </div>
        
        {/* Mobile 3D Carousel Container */}
        <div 
          className="relative w-full h-[550px] flex items-center justify-center overflow-hidden"
          style={{
            transformStyle: 'preserve-3d',
            perspective: '600px',
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Carousel Items */}
          {destinations.map((destination, index) => {
            const offset = index + 1; // 1-based offset
            const position = currentSlide + 1; // 1-based position
            const r = position - offset;
            const abs = Math.max(r * -1, r);
            
            return (
              <div
                key={index}
                className="absolute w-[300px] h-[450px] transition-all duration-300 ease-linear flex flex-col items-center justify-center"
                style={{
                  transform: `rotateY(${-10 * r}deg) translateX(${-350 * r}px)`,
                  zIndex: position - abs,
                 
                  overflow: 'hidden',
          
                }}
              >
                {/* Image */}
                <Image
                  src={destination.image}
                  alt={destination.name}
                  width={600}
                  height={600}
                  loading="lazy"
                  className="w-full h-[280px] rounded-xl object-cover"
                />
                
                {/* Text Content */}
                <div className="w-full h-[170px] bg-white flex flex-col items-center justify-center px-4 py-4">
                  <h3 className="text-lg font-semibold text-black text-center mb-3">
                    {destination.name}
                  </h3>
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
          {Array.from({ length: destinations.length }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full border border-primary transition-all duration-300 ${
                currentSlide === index ? 'bg-primary scale-125' : 'bg-white'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
