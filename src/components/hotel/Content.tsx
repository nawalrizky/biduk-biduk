"use client";

import Link from "next/link";
import Image from "next/image";
import { Hotel, getHotelTranslation } from "@/lib/api";
import { useLanguage } from '@/hooks/useLanguage';
import { useTranslation } from 'react-i18next';

interface HotelContentProps {
  hotel: Hotel;
}

// Helper function to extract image URL from HotelImage object or string
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getImageUrl = (image: any): string | null => {
  if (typeof image === 'string') {
    return image.trim() !== "" ? image : null;
  }
  if (typeof image === 'object' && image !== null) {
    const url = image.image_url || image.image || "";
    return typeof url === 'string' && url.trim() !== "" ? url : null;
  }
  return null;
};

export default function HotelContent({ hotel }: HotelContentProps) {
  const currentLanguage = useLanguage();
  const { t } = useTranslation();
  const translation = getHotelTranslation(hotel, currentLanguage);
  
  return (
    <div className="z-20 flex flex-col lg:px-56 items-center bg-white min-h-screen pb-16">
    

     
      {/* Description */}
      <p className="mt-8 text-base sm:text-lg lg:text-xl text-black text-justify px-3 sm:px-6 lg:px-0 leading-relaxed max-w-full">
        {translation.description}
      </p>

      {/* Book Now Button */}
      {hotel.book_url ? (
        <a
          href={hotel.book_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-border-reveal bg-transparent border-2 border-accent mx-3 sm:mx-6 lg:mx-0 my-10 text-black font-semibold px-4 sm:px-6 py-2 lg:px-3 rounded-full hover:bg-accent hover:text-white transition-colors text-xs sm:text-sm lg:text-xl flex justify-center items-center gap-2 h-fit w-auto max-w-full"
        >
          {t('buttons.book_now')} →
        </a>
      ) : (
        <Link
          href="/contact"
          className="btn-border-reveal bg-transparent border-2 border-accent mx-3 sm:mx-6 lg:mx-0 my-10 text-black font-semibold px-4 sm:px-6 py-2 lg:px-3 rounded-full hover:bg-accent hover:text-white transition-colors text-xs sm:text-sm lg:text-xl flex justify-center items-center gap-2 h-fit w-auto max-w-full"
        >
          {t('buttons.contact_to_book')} →
        </Link>
      )}

      <div className="mt-10 flex flex-col lg:flex-row w-full gap-4 sm:gap-8 px-3 sm:px-6 lg:px-0">
        {/* Hotel Information */}
        <div className="flex-1 flex flex-col gap-2 bg-accent/10 rounded-xl p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-semibold text-accent mb-2">{t('hotel.hotel_information')}</h2>
          
          <p className="text-black text-sm sm:text-base break-words">
            <span className="font-semibold">{t('hotel.price_per_night')}:</span> Rp {parseFloat(hotel.price).toLocaleString('id-ID')}
          </p>

          {hotel.total_rating > 0 && (
            <>
              <p className="text-black text-sm sm:text-base">
                <span className="font-semibold">{t('hotel.rating')}:</span> {hotel.total_rating.toFixed(1)} / 5.0
              </p>
              <p className="text-black text-sm sm:text-base">
                <span className="font-semibold">{t('hotel.total_reviews')}:</span> {hotel.total_rating_users}
              </p>
            </>
          )}

          {hotel.book_url && (
            <p className="text-black text-sm sm:text-base break-words">
              <span className="font-semibold">{t('hotel.booking')}:</span>{" "}
              <a 
                href={hotel.book_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {t('hotel.book_online')}
              </a>
            </p>
          )}
          
          <p className="text-black mt-4 text-sm sm:text-base">
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
            <a href="mailto:bidukbidukpokdarwis@gmail.com" className="hover:underline">
              bidukbidukpokdarwis@gmail.com
            </a>
          </p>
        </div>
        
        {/* Map */}
        <div className="flex-1 min-h-[200px] sm:min-h-[250px] rounded-xl overflow-hidden">
          <iframe
            title={`${translation.name} Google Map`}
            src={hotel.maps_url || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63821.84753026603!2d118.61294940870013!3d1.2522236876905486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32734cb76f07da33%3A0x5e898623450bccae!2sBiduk-Biduk!5e0!3m2!1sen!2sid!4v1753828856108!5m2!1sen!2sid"}
            className="w-full h-full border-0 rounded-xl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>

      {/* Image Gallery */}
      {hotel.images && (() => {
        const validImages = hotel.images.map(getImageUrl).filter((url): url is string => url !== null);
        return validImages.length > 1 && (
          <div className="mt-12 w-full px-3 sm:px-6 lg:px-0">
            <h3 className="text-xl sm:text-2xl font-semibold text-black mb-4">{t('hotel.photo_gallery')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
              {validImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={imageUrl}
                    alt={`${translation.name} - Photo ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        );
      })()}
    </div>
  );
}
