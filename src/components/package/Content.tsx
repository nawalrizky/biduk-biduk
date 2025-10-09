import Link from "next/link";
import { Package } from "@/lib/api";

interface PackageContentProps {
  package: Package;
}

export default function PackageContent({ package: pkg }: PackageContentProps) {
  // Use destination_details if available, fallback to destinations
  const destinations = pkg.destination_details || pkg.destinations || [];

  return (
    <div className="z-20 flex flex-col lg:px-56 items-center bg-white min-h-screen pb-16">

      {/* Destinations Section */}
      {destinations.length > 0 && (
        <div className="mt-8 w-full px-6 lg:px-0">
          <h3 className="text-2xl font-semibold text-black mb-4">
            Destinations Included ({destinations.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {destinations.map((destination) => (
              <div
                key={destination.id}
                className="bg-white border-2 border-accent/20 rounded-xl p-4 hover:border-accent transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-6 h-6 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-black mb-1">
                      {destination.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-1">
                      📍 {destination.location}
                    </p>
                    <p className="text-sm text-gray-700">
                      {destination.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Link
        href="/hotels"
        className="btn-border-reveal bg-transparent border-2 border-accent mx-6 lg:mx-0 my-10 text-black font-semibold px-6 py-2 lg:px-3 rounded-full hover:bg-accent hover:text-white transition-colors text-sm lg:text-xl flex justify-center items-center gap-2 h-fit w-full max-w-md"
      >
        Book Now →
      </Link>

      <div className="mt-10 flex flex-col lg:flex-row w-full gap-8 px-6 lg:px-0">
        {/* Package Information */}
        <div className="flex-1 flex flex-col gap-2 bg-accent/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-accent mb-2">Package Information</h2>
      

          {destinations.length > 0 && (
            <p className="text-black">
              <span className="font-semibold">Total Destinations:</span> {destinations.length}
            </p>
          )}

          <p className="text-black">
            <span className="font-semibold">Price:</span> Rp {parseFloat(pkg.price).toLocaleString('id-ID')}
          </p>

          {pkg.total_rating > 0 && (
            <>
              <p className="text-black">
                <span className="font-semibold">Rating:</span> {pkg.total_rating.toFixed(1)} / 5.0
              </p>
              <p className="text-black">
                <span className="font-semibold">Total Reviews:</span> {pkg.total_rating_users}
              </p>
            </>
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
        
        {/* Map - Show first destination if available */}
        <div className="flex-1 min-h-[200px] rounded-xl overflow-hidden">
          {pkg.destinations && pkg.destinations.length > 0 ? (
            <iframe
              title={`${pkg.name} Location`}
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63821.84753026603!2d118.61294940870013!3d1.2522236876905486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32734cb76f07da33%3A0x5e898623450bccae!2sBiduk-Biduk!5e0!3m2!1sen!2sid!4v1753828856108!5m2!1sen!2sid`}
              className="w-full h-full border-0 rounded-xl"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="w-full h-full bg-accent/10 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <svg
                  className="w-16 h-16 text-accent/50 mx-auto mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <p className="text-gray-500">Map not available</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
