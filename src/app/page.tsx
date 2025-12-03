import dynamic from "next/dynamic";
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
  title: 'Biduk-Biduk | Destinasi Wisata Berau Kalimantan Timur',
  description: 'Jelajahi keindahan Desa Biduk-Biduk, surga tersembunyi di Berau, Kalimantan Timur. Nikmati wisata alam, pantai eksotis, Labuan Cermin, hotel nyaman, dan paket wisata terbaik.',
  keywords: [
    'Biduk-Biduk',
    'Berau',
    'Kalimantan Timur',
    'wisata Berau',
    'Labuan Cermin',
    'Danau Labuan Cermin',
    'pantai Kalimantan',
    'destinasi wisata Indonesia',
    'hidden paradise Indonesia',
    'eco tourism Kalimantan'
  ],
  openGraph: {
    title: 'Biduk-Biduk | Destinasi Wisata Berau Kalimantan Timur',
    description: 'Jelajahi keindahan Desa Biduk-Biduk, surga tersembunyi di Berau, Kalimantan Timur.',
    url: 'https://bidukbiduk.com',
    siteName: 'Biduk-Biduk Tourism',
    images: [
      {
        url: '/images/home/hero/bg.png',
        width: 1200,
        height: 630,
        alt: 'Biduk-Biduk Village - Beautiful Tourism Destination',
      }
    ],
    locale: 'id_ID',
    type: 'website',
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
