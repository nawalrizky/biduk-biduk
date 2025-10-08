"use client"
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import { hotelsApi, Hotel } from '@/lib/api';

const HotelSection = () => {
  const lenisRef = useRef<Lenis | null>(null);
  const [hotels, setHotels] = useState<Hotel[]>([]);

  // Fetch hotels from API
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await hotelsApi.getActive(1, 12);
        if (response.results?.data?.items) {
          setHotels(response.results.data.items);
        }
      } catch (error) {
        console.error('Failed to fetch hotels:', error);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Update ScrollTrigger on scroll
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis to gsap ticker
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);
  
   useGSAP(() => {
    
    gsap.registerPlugin(ScrollTrigger);
    const hotelSection = document.querySelector('.hotel-wrapper') as HTMLElement;

    if (hotelSection && hotels.length > 0) { // Add check for hotels
      // Different scroll distances based on screen size
      const getScrollDistance = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) { // Desktop
          return -(hotelSection.scrollWidth - window.innerWidth + 200);
        } else if (screenWidth >= 768) { // Tablet
          return -(hotelSection.scrollWidth - window.innerWidth + 100);
        } else { // Mobile
          return -(hotelSection.scrollWidth - window.innerWidth + 50);
        }
      };

      const getEndDistance = () => {
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1024) { // Desktop
          return "+=" + (hotelSection.scrollWidth + 200);
        } else if (screenWidth >= 768) { // Tablet
          return "+=" + (hotelSection.scrollWidth + 100);
        } else { // Mobile
          return "+=" + (hotelSection.scrollWidth);
        }
      };

      // Kill any existing ScrollTrigger instances for this element
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === '.horizontal-scroll') {
          trigger.kill();
        }
      });

      gsap.to('.hotel-wrapper', {
         x: getScrollDistance,
        scrollTrigger: {
          trigger: '.horizontal-scroll',
          start: 'center center',
          end: getEndDistance,
          scrub: true,
          pin: ".horizontal-scroll",
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }
  }, [hotels]); // Add hotels as dependency

    return (
        <section className="horizontal-scroll relative bg-white overflow-hidden py-40 lg:py-40">
            <div className="absolute inset-0 bg-secondary opacity-15"></div>
            <div className="container mx-auto px-4 lg:px-0 relative z-10">

                <div className="flex flex-col lg:flex-row justify-center items-center mb-8 lg:px-24">
                    <div className="mb-6 lg:mb-0 w-full lg:w-2/3 flex flex-col justify-center text-center lg:text-left">
                        <span className="text-primary font-plant text-lg lg:text-xl mb-2 block lg:pr-24">
                            Your Beachside Escape
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-black leading-tight">
                           Stay, Swim, Relax
                        </h2>
                    </div>
                    <Link href="/hotels" className="hidden lg:flex text-primary font-plant text-3xl mb-2  items-center gap-2">
                       Explore More
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

                {/* Horizontal scroll layout for all devices */}
                <div className="hotel-wrapper h-[50vh] md:h-[55vh] lg:h-[55vh]">
                    <div className="flex gap-6 md:gap-8 lg:gap-12 pl-4 md:pl-8 lg:pl-44">
                        {hotels.map((hotel) => (
                            <div key={hotel.hotel_id} className="flex-shrink-0 w-64 md:w-72 lg:w-80">
                                <div className="group card-hotel rounded-xl h-full transition-all duration-500">
                                    <div className="overflow-hidden rounded-xl">
                                        <Image 
                                            src={hotel.image} 
                                            alt={hotel.name} 
                                            width={400} 
                                            height={480}
                                            loading="lazy"
                                            className="w-full h-48 md:h-64 lg:h-80 object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    {/* Content Below Image */}
                                    <div className="p-2">
                                        <div className="flex flex-col justify-between items-start">
                                            <div>
                                                <h1 className='text-primary font-plant text-lg md:text-xl mb-1'>Hotel</h1>
                                                <h3 className="text-xl md:text-2xl font-semibold mb-1 text-black">
                                                    <Link href={`/hotels/${hotel.hotel_id}`} className="hover:text-accent transition-colors">
                                                        {hotel.name}
                                                    </Link>
                                                </h3>
                                            </div>
                                           <div className='flex justify-between items-center w-full mt-2 md:mt-4'>
                                            <div className='flex flex-col gap-1 md:gap-2'>
                                            <div className='flex items-center gap-2'>
                                            {/* 5 stars icon */}
                                            <div className="flex">
                                                {[...Array(hotel.total_rating)].map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        className="w-3 h-3 md:w-4 md:h-4 text-accent fill-current"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-black font-bold text-xs md:text-sm">{hotel.total_rating}/5</p>
                                            </div>
                                            <p className="text-black font-bold text-xs md:text-sm">{hotel.total_rating_users.toLocaleString()} reviews</p>
                                            </div>
                                            {/* Book Now button */}
                                            <Link 
                                                href={hotel.book_url || `/hotels/${hotel.hotel_id}`}
                                                className="btn-border-reveal bg-transparent border-2 border-accent text-black font-semibold px-3 md:px-4 lg:px-6 py-1.5 md:py-2 rounded-full hover:bg-accent transition-colors text-xs md:text-sm lg:text-[12px] flex items-center gap-1 md:gap-2 h-fit"
                                            >
                                                Book Now
                                                <svg
                                                    width="12"
                                                    height="12"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="md:w-[14px] md:h-[14px]"
                                                >
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </Link>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Explore More link below horizontal scroll */}
                    
                </div>
                <div className="flex lg:hidden justify-center -mt-12">
                        <Link href="/hotels" className="text-primary font-plant text-xl flex items-center gap-2">
                            Explore More
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
        </section>
    );
};

export default HotelSection;