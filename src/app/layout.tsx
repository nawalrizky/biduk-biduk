
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import I18nProvider from "@/providers/I18nProvider";
import LanguageDetectionModal from "@/components/ui/LanguageDetectionModal";
import Script from 'next/script';

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

// Custom Plant font for headers
const plantFont = localFont({
  src: [
    {
      path: './fonts/plantc.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/plantc.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: "--font-plant",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://bidukbiduk.com'),
  title: {
    default: 'Biduk Biduk | Destinasi Wisata Berau Kalimantan Timur',
    template: '%s | Biduk Biduk'
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://www.google.com" />
        <link rel="preconnect" href="https://www.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://recaptchaenterprise.googleapis.com" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#05A5D0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Biduk-Biduk" />
        <link rel="apple-touch-icon" href="/images/logo_192px.png" />
        <link rel="icon" type="image/png" href="/images/logo_192px.png" />
        
        {/* Alternate languages for SEO - x-default first, then self-referencing canonical */}
        <link rel="alternate" hrefLang="x-default" href="https://bidukbiduk.com/" />
        <link rel="alternate" hrefLang="id" href="https://bidukbiduk.com/" />
        <link rel="alternate" hrefLang="en" href="https://bidukbiduk.com/?lang=en" />
        <link rel="alternate" hrefLang="ar" href="https://bidukbiduk.com/?lang=ar" />
        <link rel="alternate" hrefLang="zh" href="https://bidukbiduk.com/?lang=zh" />
        <link rel="alternate" hrefLang="fr" href="https://bidukbiduk.com/?lang=fr" />
        <link rel="alternate" hrefLang="es" href="https://bidukbiduk.com/?lang=es" />
        {/* Umami analytics - configurable via env vars */}
        <Script
          src={process.env.NEXT_PUBLIC_UMAMI_SRC || 'https://umami-sigma-ashen.vercel.app/script.js'}
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID || '39e87117-6e63-4f7d-b5c5-c7ac71667519'}
          strategy="afterInteractive"
        />

        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Biduk Biduk Tourism',
              url: 'https://bidukbiduk.com',
              logo: 'https://bidukbiduk.com/images/logo.png',
              description: 'Official tourism information for Biduk Biduk village in Berau, East Kalimantan, Indonesia',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Biduk-Biduk',
                addressRegion: 'Berau, Kalimantan Timur',
                addressCountry: 'ID'
              },
              sameAs: [
                'https://www.instagram.com/bidukbiduk',
                'https://www.facebook.com/bidukbiduk',
                'https://twitter.com/bidukbiduk'
              ]
            })
          }}
        />
        
        {/* Structured Data - Tourist Destination */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'TouristDestination',
              name: 'Biduk-Biduk',
              description: 'A hidden paradise in Berau, East Kalimantan, featuring pristine beaches, crystal-clear lakes, and untouched natural beauty',
              image: 'https://bidukbiduk.com/images/home/hero/bg.png',
              url: 'https://bidukbiduk.com',
              geo: {
                '@type': 'GeoCoordinates',
                latitude: '2.2167',
                longitude: '118.5000'
              },
              touristType: ['Nature Lovers', 'Adventure Seekers', 'Beach Enthusiasts', 'Eco Tourists'],
              isAccessibleForFree: false,
              publicAccess: true
            })
          }}
        />
      </head>
      <body className={`${openSans.variable} ${plantFont.variable} font-sans antialiased`}>
        <I18nProvider>
          <Navbar />
          {children}
          <Footer />
          <LanguageDetectionModal />
        </I18nProvider>
      </body>
    </html>
  );
}
