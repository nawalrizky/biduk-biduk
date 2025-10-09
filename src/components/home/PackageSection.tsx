"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { packagesApi, Package } from "@/lib/api";

const PackageSection = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await packagesApi.getActive(1, 8);
        if (response.results?.data?.items && response.results.data.items.length > 0) {
          setPackages(response.results.data.items);
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Dynamically set slider settings based on number of packages
  const settings = {
    dots: false,
    infinite: packages.length > 4, // Only infinite if more than 4 items
    speed: 2000,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    swipeToSlide: true,
    autoplay: packages.length > 4, // Only autoplay if more than 4 items
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 4,
          infinite: packages.length > 4,
        },
      },
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 3,
          infinite: packages.length > 3,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          infinite: packages.length > 2,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          infinite: packages.length > 1,
        },
      },
    ],
  };

  // Slider ref for navigation
  const sliderRef = React.useRef<Slider>(null);
  // Handler for previous slide
  const prevSlide = () => sliderRef?.current?.slickPrev();
  const nextSlide = () => sliderRef?.current?.slickNext();
  return (
    <section id="package" className="relative bg-white py-16 px-8 lg:py-24 lg:px-56 overflow-x-hidden">
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

        <div className="flex flex-col justify-center mb-8 items-center text-center lg:mb-12 ">
          <div className="mb-6 lg:mb-0">
            <span className="text-primary font-plant text-xl mb-2 block">
              Experience, Not Just Sightseeing
            </span>
            <h2 className="text-4xl lg:text-5xl font-semibold text-black leading-tight">
              Discover Our Packages
            </h2>
          </div>
        </div>

        <div className="hotel-slider-wrapper  relative">
          <Slider ref={sliderRef} {...settings}>
            {loading ? (
              // Loading skeletons
              Array.from({ length: 4 }, (_, i) => (
                <div key={i} className="px-3">
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="w-full h-80 bg-gray-200 animate-pulse rounded-xl"></div>
                  </div>
                  <div className="p-2">
                    <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                    <div className="h-8 bg-gray-200 rounded animate-pulse mb-4"></div>
                    <div className="h-10 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                </div>
              ))
            ) : packages.length > 0 ? (
              packages.map((pkg) => (
                <div key={pkg.package_id} className="px-3">
                  <div className="group relative overflow-hidden rounded-xl transition-all duration-500 flex flex-col h-full">
                    <div className="relative overflow-hidden rounded-xl">
                      {pkg.image_url ? (
                        <Image
                          src={pkg.image_url}
                          alt={pkg.name}
                          width={400}
                          height={480}
                          loading="lazy"
                          className="w-full h-80 object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-80 bg-gradient-to-br from-accent/20 to-primary/20 rounded-xl flex items-center justify-center">
                          <svg
                            className="w-20 h-20 text-accent/50"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                    {/* Content Below Image */}
                    <div className="p-2 flex flex-col flex-1">
                      <div className="flex flex-col justify-between h-full">
                        <div className="mb-4">
                          <h1 className="text-primary font-plant text-xl mb-1">
                            Rp {parseFloat(pkg.price).toLocaleString('id-ID')}
                          </h1>
                          <h3 className="text-2xl font-semibold mb-1 text-black line-clamp-2 h-16">
                            <Link
                              href={`/packages/${pkg.package_id}`}
                              className="hover:text-accent transition-colors"
                            >
                              {pkg.name}
                            </Link>
                          </h3>
                        </div>
                        <div className="flex justify-between items-end w-full">
                          <div className="flex flex-col gap-2">
                            {pkg.total_rating > 0 && (
                              <>
                                <div className="flex items-center gap-2">
                                  {/* 5 stars icon */}
                                  <div className="flex">
                                    {[...Array(5)].map((_, index) => (
                                      <svg
                                        key={index}
                                        className={`w-4 h-4 ${
                                          index < Math.floor(pkg.total_rating)
                                            ? 'text-accent fill-current'
                                            : 'text-gray-300 fill-current'
                                        }`}
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                      </svg>
                                    ))}
                                  </div>
                                  <p className="text-black font-bold text-sm">
                                    {pkg.total_rating % 1 === 0 ? Math.floor(pkg.total_rating) : pkg.total_rating.toFixed(1)}/5
                                  </p>
                                </div>
                                <p className="text-black font-bold text-sm">
                                  {pkg.total_rating_users} reviews
                                </p>
                              </>
                            )}
                            {((pkg.destination_details && pkg.destination_details.length > 0) || 
                              (pkg.destinations && pkg.destinations.length > 0)) && (
                              <p className="text-gray-600 text-sm">
                                {(pkg.destination_details || pkg.destinations || []).length} Destination{(pkg.destination_details || pkg.destinations || []).length > 1 ? 's' : ''}
                              </p>
                            )}
                          </div>
                          {/* Detail Button */}
                          <Link
                            href={`/packages/${pkg.package_id}`}
                            className="bg-transparent border-2 border-secondary text-secondary font-semibold px-6 py-2 lg:px-3 3xl:px-6 rounded-full hover:bg-accent transition-colors text-sm lg:text-[12px] flex items-center gap-2 h-fit whitespace-nowrap"
                          >
                            Detail
                          </Link>
                        </div>
                        <Link
                          href={`/packages/${pkg.package_id}`}
                          className="btn-border-reveal mt-4 bg-transparent border-2 border-accent text-black font-semibold px-6 py-2 lg:px-3 w-full rounded-full hover:bg-accent transition-colors text-sm lg:text-[12px] flex justify-center items-center gap-2 h-fit"
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
              ))
            ) : (
              // No packages available
              <div className="px-3">
                <div className="text-center py-10">
                  <p className="text-gray-500">No packages available</p>
                </div>
              </div>
            )}
          </Slider>
          {/* Mobile Explore More link below slider */}
          <div className="flex lg:hidden justify-center mt-10">
            <Link
              href="/packages"
              className="text-primary font-plant text-xl  flex items-center gap-2"
            >
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

export default PackageSection;
