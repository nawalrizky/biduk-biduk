"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Slider from 'react-slick';

const HotelSection = () => {

    const hotelContent = [
        {img:'/images/home/hero.png', location:'Berau', title:'Ocean View Resort'},          
        {img:'/images/home/hero.png', location:'Derawan Island', title:'Derawan Beach Hotel'},          
        {img:'/images/home/hero.png', location:'Maratua Island', title:'Maratua Paradise Resort'},          
        {img:'/images/home/hero.png', location:'Sangalaki Island', title:'Turtle Bay Lodge'},
        {img:'/images/home/hero.png', location:'Kakaban Island', title:'Jellyfish Lake Resort'},          
      ]; 

      const settings = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: false,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 4000,
        responsive: [
          {
            breakpoint: 1399,
            settings: {
              slidesToShow: 4,
            }
          },
          {
            breakpoint: 1199,
            settings: {
              slidesToShow: 3,
            }
          },
          {
            breakpoint: 991,
            settings: {
              slidesToShow: 2,
            }
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
            }
          }
        ]
      };  

    // Slider ref for navigation
    const sliderRef = React.useRef<Slider>(null);
    // Handler for previous slide
    const prevSlide = () => sliderRef?.current?.slickPrev();
    const nextSlide = () => sliderRef?.current?.slickNext();
    return (
        <section className="relative bg-white py-16 px-8 lg:py-24 lg:px-56 overflow-x-hidden">
            <div className="absolute inset-0 bg-secondary opacity-15"></div>
              <button
                  onClick={prevSlide}
                  className="hidden lg:block absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/10 hover:bg-black/40 text-white px-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-8 h-20"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 32 80"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M20 64l-10-24 10-24"
                    />
                  </svg>
              </button>
              <button
                  onClick={nextSlide}
                  className="hidden lg:block absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-black/10 hover:bg-black/40 text-white px-3 rounded-xl transition-all duration-300 backdrop-blur-sm"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-8 h-20 rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 32 80"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M20 64l-10-24 10-24"
                    />
                  </svg>
              </button>
              
            <div className="container mx-auto py-10 relative z-10">
                {/* Desktop left navigation button OUTSIDE the slider wrapper with new style */}
              
           
                <div className="flex flex-col lg:flex-row justify-between items-start mb-8 lg:items-center lg:mb-12 ">
                    <div className="mb-6 lg:mb-0">
                        <span className="text-primary font-plant text-xl mb-2 block">
                            Your Beachside Escape
                        </span>
                        <h2 className="text-4xl lg:text-5xl font-semibold text-black leading-tight">
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

                <div className="hotel-slider-wrapper  relative">
                    <Slider ref={sliderRef} {...settings}>
                        {hotelContent.map((item, i) => (
                            <div key={i} className="px-3 ">
                                <div className="group relative overflow-hidden rounded-xl transition-all duration-500">
                                    <div className="relative overflow-hidden rounded-xl">
                                        <Image 
                                            src={item.img} 
                                            alt={item.title} 
                                            width={400} 
                                            height={480}
                                            className="w-full h-80 object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                    {/* Content Below Image */}
                                    <div className="p-2">
                                        <div className="flex flex-col justify-between items-start">
                                            <div>
                                                <h1 className='text-primary font-plant text-xl mb-1'>Hotel</h1>
                                                <h3 className="text-2xl font-semibold mb-1 text-black">
                                                    <Link href={`/hotels/${item.title.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-accent transition-colors">
                                                        {item.title}
                                                    </Link>
                                                </h3>
                                            </div>
                                           <div className='flex justify-between items-center w-full mt-4'>
                                            <div className='flex flex-col gap-2'>
                                            <div className='flex items-center gap-2'>
                                            {/* 5 stars icon */}
                                            <div className="flex">
                                                {[...Array(5)].map((_, index) => (
                                                    <svg
                                                        key={index}
                                                        className="w-4 h-4 text-accent fill-current"
                                                        viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <p className="text-black font-bold text-sm">4,5/5</p>
                                            </div>
                                            <p className="text-black font-bold text-sm">500 reviews</p>
                                            </div>
                                            {/* Book Now with the same style as visit btn on discover */}
                                            <Link 
                                                href={`/hotels/${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                                                className="btn-border-reveal bg-transparent border-2 border-accent text-black font-semibold px-6 py-2 lg:px-3  rounded-full hover:bg-accent transition-colors text-sm lg:text-[12px] flex items-center gap-2 h-fit"
                                            >
                                                Book Now
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
                                            </Link>
                                           </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                    {/* Mobile Explore More link below slider */}
                    <div className="flex lg:hidden justify-center mt-10">
                        <Link href="/hotels" className="text-primary font-plant text-xl  flex items-center gap-2">
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
            </div>
        </section>
    );
};

export default HotelSection;
