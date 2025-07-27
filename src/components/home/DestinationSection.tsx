import Image from "next/image";

export default function DestinationSection() {
  return (
    <section>
      {/* Desktop Version */}
      <div className="hidden lg:flex  bg-white flex-col justify-center items-center px-48 py-48">
        <div className="flex flex-col items-center">
          <h1 className="text-xl text-primary font-plant">Biduk-Biduk</h1>
          <h1 className="text-5xl text-black font-semibold mt-2">
            Most Popular Destinations
          </h1>
        </div>
        <div className="flex mt-10  gap-6 ">
          <div className="flex  items-start gap-6">
            {/* section 1 */}
            <div className="flex flex-col items-center gap-6">
              <Image
                src="/images/home/destination/image1.png"
                alt="Biduk Surfing"
                width={1000}
                height={1000}
                loading="lazy"
                className="w-64 h-64 object-cover rounded-[18px] shadow-lg 
                                hover:scale-105 transition-transform duration-300"
              />
              <Image
                src="/images/home/destination/image2.png"
                alt="Biduk Snorkeling"
                width={500}
                height={500}
                loading="lazy"
                className="w-64 h-64 object-cover rounded-[18px] shadow-lg 
                                hover:scale-105 transition-transform duration-300"
              />
            </div>
            <Image
              src="/images/home/destination/image3.png"
              alt="Biduk Sea View"
              width={500}
              height={500}
              loading="lazy"
              className="w-64 h-[546px] object-cover rounded-lg shadow-lg 
                                hover:scale-105 transition-transform duration-300"
            />
          </div>
          {/* section 2 */}

          <div className="flex flex-col gap-6">
            <Image
              src="/images/home/destination/image4.png"
              alt="Dermaga Labuan Cermin"
              width={500}
              height={500}
              loading="lazy"
              className="w-64 h-80 object-cover rounded-lg shadow-lg 
                                hover:scale-105 transition-transform duration-300"
            />
            <Image
              src="/images/home/destination/image5.png"
              alt="Perahu Labuan Cermin"
              width={500}
              height={500}
              loading="lazy"
              className="w-64 h-96 object-cover rounded-lg shadow-lg 
                                hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* section 3 */}

          <div className="flex flex-col gap-6">
            <Image
              src="/images/home/destination/image6.png"
              alt="Labuan Cermin"
              width={500}
              height={500}
              loading="lazy"
              className="w-112 h-64 object-cover rounded-lg shadow-lg
                                hover:scale-105 transition-transform duration-300"
            />
            <Image
              src="/images/home/destination/image7.png"
              alt="Bangkuduan"
              width={500}
              height={500}
              loading="lazy"
              className="w-112 h-64 object-cover rounded-lg shadow-lg 
                                hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="lg:hidden bg-white pt-5 pb-32 px-4 overflow-hidden">
        <div className="flex flex-col items-center mb-6">
          <h1 className="text-lg text-primary font-plant">Biduk-Biduk</h1>
          <h1 className="text-2xl md:text-3xl text-black font-semibold mt-1 text-center">
            Most Popular Destinations
          </h1>
        </div>

        <div className="flex flex-col gap-4">
          {/* Section 1 - Mobile (Top) */}
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              <Image
                src="/images/home/destination/image1.png"
                alt="Biduk Surfing"
                width={500}
                height={500}
                loading="lazy"
                className="flex-1 h-32 sm:h-36 object-cover rounded-lg shadow-lg"
              />
              <Image
                src="/images/home/destination/image2.png"
                alt="Biduk Snorkeling"
                width={500}
                height={500}
                loading="lazy"
                className="flex-1 h-32 sm:h-36 object-cover rounded-lg shadow-lg"
              />
            </div>
            <Image
              src="/images/home/destination/image3.png"
              alt="Biduk Beach"
              width={500}
              height={500}
              loading="lazy"
              className="w-1/2 flex-1 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Section 3 - One image (Middle) */}
          <div>
            <Image
              src="/images/home/destination/image7.png"
              alt="Bangkuduan"
              width={500}
              height={500}
              loading="lazy"
              className="w-full h-48 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Section 2 - Mobile flex-row (Bottom) */}
          <div className="flex gap-3">
            <Image
              src="/images/home/destination/image4.png"
              alt="Perahu Labuan Cermin"
              width={500}
              height={500}
              loading="lazy"
              className="w-32 flex-1 sm:h-48  object-cover rounded-lg shadow-lg"
            />
            <Image
              src="/images/home/destination/image5.png"
              alt="Destination 5"
              width={500}
              height={500}
              loading="lazy"
              className="w-32 flex-1 sm:h-48  object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
