"use client"
import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";

export default function NewsSection() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef<number | null>(null);
    
    // Sample news data - replace with your actual data
    const newsItems = [
        {
            id: 1,
            image: "/images/home/hero.png",
            category: "News",
            title: "Lorem Ipsum Dolor Sit Amet Ngentet",
            description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        },
        {
            id: 2,
            image: "/images/home/destination/image1.png",
            category: "News",
            title: "Second News Article Title Here",
            description: "Another lorem ipsum text for the second news article to demonstrate the mobile carousel functionality."
        },
        {
            id: 3,
            image: "/images/home/destination/image2.png",
            category: "News",
            title: "Third Amazing News Story",
            description: "Third news article description with more lorem ipsum content for testing purposes."
        },
        {
            id: 4,
            image: "/images/home/hero.png",
            category: "News",
            title: "Fourth Breaking News Update",
            description: "Fourth and final news article description to complete our news section carousel."
        }
    ];

    const getImageIndex = (offset: number) => {
        const index = currentIndex + offset;
        if (index >= newsItems.length) return index - newsItems.length;
        if (index < 0) return newsItems.length + index;
        return index;
    };

    // Handle swipe gesture for mobile
    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };
    const handleTouchEnd = (e: React.TouchEvent) => {
        if (touchStartX.current === null) return;
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchEndX - touchStartX.current;
        if (Math.abs(diff) > 40) {
            if (diff < 0) {
                // Swipe left
                setCurrentIndex((prev) => (prev + 1) % newsItems.length);
            } else {
                // Swipe right
                setCurrentIndex((prev) => (prev - 1 + newsItems.length) % newsItems.length);
            }
        }
        touchStartX.current = null;
    };

    return (
        <section className="bg-white py-16 px-8 md:px-16 lg:px-56 min-h-screen flex flex-col items-center justify-center">
            <div className="container mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-xl  text-primary font-plant mb-2">Stories from the Coast</h1>
                    <p className="text-black text-2xl md:text-3xl lg:text-[32px] -mt-1 font-semibold">Latest News & Updates</p>
                </div>

                {/* Mobile Version - Stacked Images Side by Side */}
                <div className="block md:hidden">
                    <div className="relative" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
                        {/* Stacked Images Container */}
                        <div className="relative h-64 mb-6 overflow-hidden">
                            <div className="flex items-center justify-center h-full">
                                {/* Previous image (left side) */}
                                <div className="absolute left-0 w-20 h-48 opacity-60 transform scale-90">
                                    <Image
                                        src={newsItems[getImageIndex(-1)].image}
                                        alt="Previous news"
                                        fill
                                        className="object-cover rounded-lg shadow-md"
                                        loading="lazy"
                                    />
                                </div>
                                {/* Current image (center) */}
                                <div className="relative w-64 h-48 z-10">
                                    <Image
                                        src={newsItems[currentIndex].image}
                                        alt={`News Image ${currentIndex + 1}`}
                                        fill
                                        className="object-cover rounded-lg shadow-lg"
                                        loading="lazy"
                                    />
                                </div>
                                {/* Next image (right side) */}
                                <div className="absolute right-0 w-20 h-48 opacity-60 transform scale-90">
                                    <Image
                                        src={newsItems[getImageIndex(1)].image}
                                        alt="Next news"
                                        fill
                                        className="object-cover rounded-lg shadow-md"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* News Content */}
                        <div className="flex flex-col gap-3 h-40">
                            <h2 className="text-xl font-plant text-primary">{newsItems[currentIndex].category}</h2>
                            <h2 className="text-xl font-semibold text-black line-clamp-2 leading-tight">
                                {newsItems[currentIndex].title}
                            </h2>
                            <p className="text-black text-sm leading-relaxed line-clamp-3 flex-1">
                                {newsItems[currentIndex].description}
                            </p>
                            <button className="btn-border-reveal w-fit px-6 py-2 text-base bg-transparent border-2 border-accent text-black font-semibold rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2">
                                Read More
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

                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-6 space-x-2">
                            {newsItems.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tablet Version - Carousel with 2 visible items */}
                <div className="hidden md:block lg:hidden">
                    <div className="relative">
                        {/* Carousel Container */}
                        <div className="relative overflow-hidden">
                            <div 
                                className="flex transition-transform duration-300 ease-in-out"
                                style={{ transform: `translateX(-${currentIndex * 50}%)` }}
                            >
                                {newsItems.map((item, index) => (
                                    <div key={index} className="w-1/2 flex-shrink-0 px-4">
                                        <div className="flex flex-col h-full">
                                            <Image
                                                src={item.image}
                                                alt={`News Image ${index + 1}`}
                                                width={400}
                                                height={250}
                                                loading="lazy"
                                                className="w-full h-56 object-cover rounded-lg shadow-md"
                                            />
                                            <div className="flex flex-col gap-3 mt-4 flex-1">
                                                <h2 className="text-lg font-plant text-primary">{item.category}</h2>
                                                <h2 className="text-lg font-semibold text-black line-clamp-2 leading-tight">
                                                    {item.title}
                                                </h2>
                                                <p className="text-sm text-black leading-relaxed line-clamp-3 flex-1">
                                                    {item.description}
                                                </p>
                                                <button className="btn-border-reveal w-fit px-5 py-2 text-sm bg-transparent border-2 border-accent text-black font-semibold rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2 mt-auto">
                                                    Read More
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
                                    </div>
                                ))}
                            </div>
                        </div>

                        

                        {/* Dots Indicator */}
                        <div className="flex justify-center mt-8 space-x-2">
                            {Array.from({ length: newsItems.length - 1 }).map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`w-2 h-2 rounded-full transition-colors ${
                                        index === currentIndex ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop Version - Original Grid */}
                <div className="hidden lg:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {newsItems.map((item, index) => (
                        <div key={index} className="flex flex-col h-full">
                            <Image
                                src={item.image}
                                alt={`News Image ${index + 1}`}
                                width={500}
                                height={300}
                                loading="lazy"
                                className="w-full h-48 object-cover rounded-lg shadow-md"
                            />
                            <div className="flex flex-col gap-3 mt-4 flex-1">
                                <h2 className="text-xl font-plant text-primary">{item.category}</h2>
                                <h2 className="text-xl font-semibold text-black line-clamp-2 leading-tight">
                                    {item.title}
                                </h2>
                                <p className="text-black text-sm leading-relaxed line-clamp-4 flex-1">
                                    {item.description}
                                </p>
                                <button className="btn-border-reveal w-fit px-6 py-2 text-base bg-transparent border-2 border-accent text-black font-semibold rounded-full hover:bg-accent hover:text-white transition-colors flex items-center gap-2 mt-auto">
                                    Read More
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
                    ))}
                </div>

                {/* Watch More Link - Hidden on mobile, visible on tablet and desktop */}
                <div className="hidden md:flex justify-center mt-16 lg:mt-28">
                    <Link href="/hotels" className="text-primary font-plant text-2xl lg:text-3xl flex items-center gap-2">
                        Watch More
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
}