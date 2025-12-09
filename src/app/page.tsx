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
  metadataBase: new URL('https://bidukbiduk.com'),
  title: "Biduk-Biduk Berau | Desa Wisata & Pantai Kalimantan Timur",
  description: "Jelajahi Biduk-Biduk di Berau, Kalimantan Timur: desa wisata, pantai eksotis, Labuan Cermin, penginapan, dan paket liburan terbaik.",
  keywords: [
    "Website Resmi Biduk Biduk",
    "biduk biduk",
    "website biduk biduk",
    "Biduk Biduk",
    "Biduk-Biduk",
    "Kecamatan Biduk-Biduk",
    "Desa Wisata Biduk-Biduk",
    "kampung Biduk-Biduk",
    "Berau",
    "Kabupaten Berau",
    "Kalimantan Timur",
    "wisata Berau",
    "destinasi wisata Indonesia",
    "pantai Kalimantan",
    "pantai Biduk-Biduk",
    "pantai Kalimantan Timur",
    "Labuan Cermin",
    "Danau Labuan Cermin",
    "wisata alam",
    "hotel Berau",
    "paket wisata Berau",
    "travelling Indonesia",
    "hidden paradise",
    "eco tourism",
    "eco tourism Kalimantan",
    "East Kalimantan tourism"
  ],
  authors: [{ name: 'Biduk Biduk Tourism' }],
  creator: 'Biduk Biduk Tourism',
  publisher: 'Biduk Biduk Tourism',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "https://bidukbiduk.com/",
    languages: {
      'id': 'https://bidukbiduk.com',
      'en': 'https://bidukbiduk.com?lang=en',
      'ar': 'https://bidukbiduk.com?lang=ar',
      'zh': 'https://bidukbiduk.com?lang=zh',
      'fr': 'https://bidukbiduk.com?lang=fr',
      'es': 'https://bidukbiduk.com?lang=es',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: ['en_US', 'ar_SA', 'zh_CN', 'fr_FR', 'es_ES'],
    url: 'https://bidukbiduk.com/',
    siteName: 'Biduk Biduk Tourism',
    title: "Biduk Biduk Berau | Desa Wisata & Pantai Kalimantan Timur",
    description: "Jelajahi Biduk-Biduk di Berau, Kalimantan Timur: desa wisata, pantai eksotis, Labuan Cermin, penginapan, dan paket liburan terbaik.",
    images: [
      {
        url: '/images/home/hero/bg.png',
        width: 1200,
        height: 630,
        alt: 'Panorama pantai dan desa wisata Biduk-Biduk di Berau, Kalimantan Timur',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Biduk Biduk Berau | Desa Wisata & Pantai Kalimantan Timur",
    description: "Jelajahi Biduk-Biduk di Berau, Kalimantan Timur: desa wisata, pantai eksotis, Labuan Cermin, penginapan, dan paket liburan terbaik.",
    images: ['/images/home/hero/bg.png'],
    creator: '@bidukbiduk',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
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
 