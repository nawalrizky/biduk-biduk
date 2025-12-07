"use client";

import Link from "next/link";
import { Destination, getDestinationTranslation } from "@/lib/api";
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';

interface PlaceContentProps {
  destination: Destination;
}

// Helper function to check if URL is embeddable
const isEmbeddableMapUrl = (url: string): boolean => {
  return url.includes('google.com/maps/embed') || url.includes('iframe');
};

// Default fallback map for Labuan Cermin area
const DEFAULT_MAP_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63821.84753026603!2d118.61294940870013!3d1.2522236876905486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32734cb76f07da33%3A0x5e898623450bccae!2sLabuan%20Cermin!5e0!3m2!1sen!2sid!4v1753828856108!5m2!1sen!2sid";

export default function PlaceContent({ destination }: PlaceContentProps) {
  const currentLanguage = useLanguage();
  const { t } = useTranslation();
  const translation = getDestinationTranslation(destination, currentLanguage);
  // Extract coordinates for Google Maps
  const latitude = destination.coordinates?.latitude;
  const longitude = destination.coordinates?.longitude;

  return (
    <div className="z-30 -mt-1 flex flex-col lg:px-56 items-center bg-white min-h-screen pb-16">
      {/* Description */}
      <p className="mt-8 text-base sm:text-lg lg:text-xl text-black text-justify px-3 sm:px-6 lg:px-0 leading-relaxed max-w-full">
        {translation.description}
      </p>

      <Link
        href="/hotels"
        className="btn-border-reveal bg-transparent border-2 border-accent mx-3 sm:mx-6 lg:mx-0 my-10 text-black font-semibold px-4 sm:px-6 py-2 lg:px-3 rounded-full hover:bg-accent transition-colors text-xs sm:text-sm lg:text-xl flex justify-center items-center gap-2 h-fit w-auto max-w-full"
      >
        {t('buttons.book_now')} →
      </Link>
      <div className="mt-10 flex flex-col lg:flex-row w-full gap-4 sm:gap-8 px-3 sm:px-6 lg:px-0">
        {/* Destination Information */}
        <div className="flex-1 flex flex-col gap-2 bg-accent/10 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-accent mb-2">
            {t('place.place_information')}
          </h2>

          <p className="text-black mt-2 text-sm sm:text-base">
            <span className="font-semibold">{t('hotel.contact_us')}:</span>
          </p>
          <p className="text-black text-sm sm:text-base break-words">
            <span className="font-semibold">{t('hotel.phone')}:</span>{" "}
            <a href="tel:+6285251882238" className="hover:underline">
              +62 852-5188-2238
            </a>
          </p>
          <p className="text-black text-sm sm:text-base break-words">
            <span className="font-semibold">{t('hotel.email')}:</span>{" "}
            <a
              href="mailto:bidukbidukpokdarwis@gmail.com"
              className="hover:underline"
            >
              bidukbidukpokdarwis@gmail.com
            </a>
          </p>
        </div>

        {/* Map */}
        <div className="flex-1 flex flex-col">
          <div className="min-h-[200px] sm:min-h-[250px] rounded-xl overflow-hidden bg-gray-100 relative">
            {destination.maps_url && isEmbeddableMapUrl(destination.maps_url) ? (
              <iframe
                title={`${translation.name} Google Map`}
                src={destination.maps_url}
                className="w-full h-full border-0 rounded-xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : latitude && longitude ? (
              <iframe
                title={`${translation.name} Google Map`}
                src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d15000!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sid`}
                className="w-full h-full border-0 rounded-xl"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="relative w-full h-full">
                <iframe
                  title={`${translation.name} Area Map`}
                  src={DEFAULT_MAP_EMBED}
                  className="w-full h-full border-0 rounded-xl"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                {destination.maps_url && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                    <div className="bg-white rounded-lg p-4 shadow-lg text-center">
                      <p className="text-sm text-gray-600 mb-3">{t('place.view_location')}</p>
                      <a
                        href={destination.maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full hover:bg-accent/90 transition-colors text-sm font-semibold"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                          <circle cx="12" cy="10" r="3"/>
                        </svg>
                        {t('place.open_in_google_maps')}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
