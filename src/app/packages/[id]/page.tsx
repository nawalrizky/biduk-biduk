"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import PackageCarousel from "@/components/package/Carousel";
import PackageContent from "@/components/package/Content";
import { packagesApi, Package } from "@/lib/api";

export default function PackageDetail() {
  const params = useParams();
  const id = params?.id as string;
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      try {
        console.log('🔍 Fetching package with ID:', id);
        setLoading(true);
        const data = await packagesApi.getById(Number(id));
        console.log('📦 Package data received:', data);
        setPackageData(data);
      } catch (error) {
        console.error('❌ Failed to fetch package:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPackage();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-gray-600">Loading package...</p>
        </div>
      </div>
    );
  }

  if (!packageData) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Package not found
          </h2>
          <p className="text-gray-600">
            The package you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative w-full h-screen lg:h-[110vh]">
        <PackageCarousel package={packageData} />
      </div>
      <div className="relative z-20">
        <PackageContent package={packageData} />
      </div>
    </div>
  );
}
