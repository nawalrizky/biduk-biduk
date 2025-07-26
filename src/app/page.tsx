import HeroSection from "@/components/home/HeroSection";
import InfoSection from "@/components/home/InfoSection";
import DestinationSection from "@/components/home/DestinationSection";
import AboutSection from "@/components/home/AboutSection";
import DiscoverSection from "@/components/home/DiscoverSection";
import HotelSection from "@/components/home/HotelSection";
import NewsSection from "@/components/home/NewsSection";
import ExploreSection from "@/components/home/ExploreSection";
import PackageSection from "@/components/home/PackageSection";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <InfoSection />
      <DestinationSection />
      <AboutSection />
      <DiscoverSection />
      <HotelSection />
      <NewsSection />
      <ExploreSection />
      <PackageSection />
      <Footer />
    </main>
  );
}
