import Link from "next/link";
import Image from "next/image";
import { Hotel } from "@/lib/api";

interface HotelContentProps {
  hotel: Hotel;
}

// Helper function to check if URL is embeddable
const isEmbeddableMapUrl = (url: string): boolean => {
  return url.includes('/embed') || url.includes('google.com/maps/embed');
};

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
  return (
    <div className="z-20 flex flex-col lg:px-56 items-center bg-white min-h-screen pb-16">
    

     
      {/* Description */}
      <p className="mt-8 text-lg lg:text-xl text-black text-justify px-6 lg:px-0 leading-relaxed">
        {hotel.description}
      </p>

      {/* Book Now Button */}
      {hotel.book_url ? (
        <a
          href={hotel.book_url}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-border-reveal bg-transparent border-2 border-accent mx-6 lg:mx-0 my-10 text-black font-semibold px-6 py-2 lg:px-3 rounded-full hover:bg-accent hover:text-white transition-colors text-sm lg:text-xl flex justify-center items-center gap-2 h-fit w-full max-w-md"
        >
          Book Now →
        </a>
      ) : (
        <Link
          href="/contact"
          className="btn-border-reveal bg-transparent border-2 border-accent mx-6 lg:mx-0 my-10 text-black font-semibold px-6 py-2 lg:px-3 rounded-full hover:bg-accent hover:text-white transition-colors text-sm lg:text-xl flex justify-center items-center gap-2 h-fit w-full max-w-md"
        >
          Contact Us to Book →
        </Link>
      )}

      <div className="mt-10 flex flex-col lg:flex-row w-full gap-8 px-6 lg:px-0">
        {/* Hotel Information */}
        <div className="flex-1 flex flex-col gap-2 bg-accent/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-accent mb-2">Hotel Information</h2>
          
          <p className="text-black">
            <span className="font-semibold">Price per Night:</span> Rp {parseFloat(hotel.price).toLocaleString('id-ID')}
          </p>

          {hotel.total_rating > 0 && (
            <>
              <p className="text-black">
                <span className="font-semibold">Rating:</span> {hotel.total_rating.toFixed(1)} / 5.0
              </p>
              <p className="text-black">
                <span className="font-semibold">Total Reviews:</span> {hotel.total_rating_users}
              </p>
            </>
          )}

          {hotel.book_url && (
            <p className="text-black">
              <span className="font-semibold">Booking:</span>{" "}
              <a 
                href={hotel.book_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                Book Online
              </a>
            </p>
          )}
          
          <p className="text-black mt-4">
            <span className="font-semibold">Contact Us:</span>
          </p>
          <p className="text-black">
            <span className="font-semibold">Phone:</span>{" "}
            <a href="tel:+6285251882238" className="hover:underline">
              +62 852-5188-2238
            </a>
          </p>
          <p className="text-black">
            <span className="font-semibold">Email:</span>{" "}
            <a href="mailto:bidukbidukpokdarwis@gmail.com" className="hover:underline">
              bidukbidukpokdarwis@gmail.com
            </a>
          </p>
        </div>
        
        {/* Map */}
        <div className="flex-1 min-h-[200px] rounded-xl overflow-hidden">
          {hotel.maps_url && isEmbeddableMapUrl(hotel.maps_url) ? (
            <iframe
              title={`${hotel.name} Location`}
              src={hotel.maps_url}
              className="w-full h-full border-0 rounded-xl"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : hotel.maps_url ? (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 rounded-xl p-6">
              <svg className="w-16 h-16 text-accent mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">View Location</h3>
              <a
                href={hotel.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-border-reveal bg-accent text-white px-6 py-3 rounded-full hover:bg-accent/80 transition-colors"
              >
                Open in Google Maps →
              </a>
            </div>
          ) : (
            <iframe
              title={`${hotel.name} Location`}
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63821.84753026603!2d118.61294940870013!3d1.2522236876905486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32734cb76f07da33%3A0x5e898623450bccae!2sBiduk-Biduk!5e0!3m2!1sen!2sid!4v1753828856108!5m2!1sen!2sid"
              className="w-full h-full border-0 rounded-xl"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          )}
        </div>
      </div>

      {/* Image Gallery */}
      {hotel.images && (() => {
        const validImages = hotel.images.map(getImageUrl).filter((url): url is string => url !== null);
        return validImages.length > 1 && (
          <div className="mt-12 w-full px-6 lg:px-0">
            <h3 className="text-2xl font-semibold text-black mb-4">Photo Gallery</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {validImages.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer"
                >
                  <Image
                    src={imageUrl}
                    alt={`${hotel.name} - Photo ${index + 1}`}
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
