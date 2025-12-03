import HeroSection from "@/components/home/HeroSection";
import InfoSection from "@/components/home/InfoSection";
import DestinationSection from "@/components/home/DestinationSection";
import AboutSection from "@/components/home/AboutSection";
import DiscoverSection from "@/components/home/DiscoverSection";
import HotelSection from "@/components/home/HotelSection";
import NewsSection from "@/components/home/NewsSection";
import ExploreSection from "@/components/home/ExploreSection";
import PackageSection from "@/components/home/PackageSection";
import ChatbotButton from "@/components/ui/ChatbotButton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Biduk-Biduk, Berau | Desa Wisata, Pantai & Panduan Liburan Kalimantan Timur",
  description:
    "Informasi lengkap tentang Biduk-Biduk di Kabupaten Berau, Kalimantan Timur: sejarah singkat kecamatan, desa wisata, pantai, Danau/Labuan Cermin, penginapan, rute perjalanan, dan paket liburan ke Biduk-Biduk.",
  keywords: [
    "Biduk Biduk",
    "Biduk-Biduk",
    "Kecamatan Biduk-Biduk",
    "Desa Wisata Biduk-Biduk",
    "kampung Biduk-Biduk",
    "Kabupaten Berau",
    "Kalimantan Timur",
    "wisata Berau",
    "Labuan Cermin",
    "Danau Labuan Cermin",
    "pantai Biduk-Biduk",
    "pantai Kalimantan Timur",
    "destinasi wisata Indonesia",
    "eco tourism Kalimantan",
  ],
  alternates: {
    canonical: "https://bidukbiduk.com/",
  },
  openGraph: {
    title:
      "Biduk-Biduk, Berau | Desa Wisata, Pantai & Panduan Liburan Kalimantan Timur",
    description:
      "Portal informasi resmi wisata Biduk-Biduk di Berau, Kalimantan Timur: jelajahi pantai, Labuan Cermin, aktivitas laut, penginapan, serta tips dan panduan perjalanan ke Biduk-Biduk.",
    url: "https://bidukbiduk.com/",
    siteName: "Biduk-Biduk, Berau",
    images: [
      {
        url: "/images/home/hero/bg.png",
        width: 1200,
        height: 630,
        alt: "Panorama pantai dan desa wisata Biduk-Biduk di Berau, Kalimantan Timur",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Biduk-Biduk, Berau | Desa Wisata, Pantai & Panduan Liburan Kalimantan Timur",
    description:
      "Kenali Biduk-Biduk di Berau, Kalimantan Timur: desa wisata, pantai, Labuan Cermin, penginapan, dan panduan perjalanan untuk liburan yang berkesan.",
    images: ["/images/home/hero/bg.png"],
  },
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <InfoSection />
      <DestinationSection />
      <AboutSection />
      <DiscoverSection />
      <HotelSection />
      <NewsSection />
      <ExploreSection />
      <PackageSection />
      
      {/* Floating Chatbot Button */}
      <ChatbotButton />
    </main>
  );
}
