"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { packagesApi, Package } from "@/lib/api";

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 8;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const response = await packagesApi.getActive(currentPage, pageSize);
        if (response.results?.data?.items && response.results.data.items.length > 0) {
          setPackages(response.results.data.items);
          // Calculate total pages from count
          const total = Math.ceil(response.count / pageSize);
          setTotalPages(total);
        } else {
          setPackages([]);
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen relative">
        {/* Background Image - Mobile */}
        <div className="absolute inset-0 z-0 lg:hidden">
          <Image
            src="/images/hotel/bg_mobile.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>
        {/* Background Image - Desktop */}
        <div className="absolute inset-0 z-0 hidden lg:block">
          <Image
            src="/images/home/explore/explore.png"
            alt="Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/80"></div>
        </div>
        <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-20 relative z-10">
          <div className="text-center mb-8 lg:mb-16">
            <div className="h-6 lg:h-8 bg-gray-200 rounded animate-pulse w-40 lg:w-48 mx-auto mb-3 lg:mb-4"></div>
            <div className="h-8 lg:h-12 bg-gray-200 rounded animate-pulse w-72 lg:w-96 mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-3"></div>
                  <div className="h-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Mobile */}
      <div className="absolute inset-0 z-0 lg:hidden">
        <Image
          src="/images/hotel/bg_mobile.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/80"></div>
      </div>
      {/* Background Image - Desktop */}
      <div className="absolute inset-0 z-0 hidden lg:block">
        <Image
          src="/images/home/explore/explore.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-white/80"></div>
      </div>

      {/* Hero Section */}
      <div className="relative text-white pt-20 pb-8 lg:pt-24 lg:pb-10 z-10">
        <div className="container mx-auto px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-primary font-plant text-sm lg:text-xl mb-2 lg:mb-4">
            Best Deals
          </h1>
          <h2 className="text-2xl lg:text-5xl text-black font-semibold mb-3 lg:mb-4">
            Tour Packages
          </h2>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="container mx-auto px-6 lg:px-8 py-8 sm:py-12 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.package_id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 group"
            >
              {/* Package Image */}
              <div className="relative w-full h-48 overflow-hidden">
                {pkg.image_url ? (
                  <Image
                    src={pkg.image_url}
                    alt={pkg.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center">
                    <svg
                      className="w-16 h-16 text-accent/50"
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

              {/* Package Info */}
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black mb-2 line-clamp-2">
                  {pkg.name}
                </h3>
                <p className="text-accent font-bold text-xl mb-1">
                  Rp {parseFloat(pkg.price).toLocaleString('id-ID')}
                </p>
                
                {/* Rating */}
                {pkg.total_rating > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-600 mb-3">
                    <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                      <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                    </svg>
                    <span>{pkg.total_rating.toFixed(1)}</span>
                    <span className="text-gray-400">({pkg.total_rating_users})</span>
                  </div>
                )}

                {/* Destinations Count */}
                {((pkg.destination_details && pkg.destination_details.length > 0) || 
                  (pkg.destinations && pkg.destinations.length > 0)) && (
                  <p className="text-sm text-gray-600 mb-3">
                    {(pkg.destination_details || pkg.destinations || []).length} Destination{(pkg.destination_details || pkg.destinations || []).length > 1 ? 's' : ''}
                  </p>
                )}

                <Link
                  href={`/packages/${pkg.package_id}`}
                  className="btn-border-reveal w-full bg-transparent border-2 border-accent text-black font-semibold px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-colors text-sm flex items-center justify-center gap-2"
                >
                  View Details
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

        {/* Empty State */}
        {packages.length === 0 && !loading && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">
              No packages available at the moment
            </h3>
            <p className="text-gray-500">Please check back later</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-accent text-white hover:bg-accent/80'
              }`}
            >
              Previous
            </button>

            {/* Page Numbers */}
            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                    currentPage === page
                      ? 'bg-accent text-white'
                      : 'bg-white text-black border-2 border-gray-300 hover:border-accent'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-accent text-white hover:bg-accent/80'
              }`}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
