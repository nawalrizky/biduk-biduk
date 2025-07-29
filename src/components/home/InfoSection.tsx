
import Image from 'next/image';

export default function InfoSection() {
    return (
        <section className="md:hidden relative w-full z-40 ">
            {/* Background Image Mobile */}
            <div className="relative w-full h-64 -mt-40">
                <Image
                    src="/images/home/hero/bg_mobile.png"
                    alt="Background decoration mobile"
                    width={768}
                    height={400}
                    priority
                    className="w-full h-full object-contain"
                />
            </div>
            <div className='bg-white -mt-25 h-[35vh] w-full' />

            {/* Location Info Overlay Mobile */}
            <div className="absolute inset-0 flex flex-col justify-center items-center z-20 px-4 mt-5 space-y-4">
                {/* First Row - Location (1) */}
                <div className="flex gap-2 items-center justify-center">
                    <Image
                        src="/images/home/hero/icon_location.png"
                        alt="icon location"
                        width={1000}
                        height={1000}
                        loading='lazy'
                        className="w-auto h-10"
                    />
                    <div className="flex flex-col text-left">
                        <p className="text-xl font-plant text-black">Biduk-Biduk</p>
                        <p className="text-xl font-plant text-black -mt-1">
                            Berau, East Kalimantan
                        </p>
                    </div>
                </div>

                {/* Second Row - Items 2 & 3 */}
                <div className="flex justify-between w-full max-w-[15rem] mt-8 ">
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-plant text-black">14+</p>
                        <p className="text-xl font-plant text-accent -mt-1">
                            Destination
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-plant text-black">8200+</p>
                        <p className="text-xl font-plant text-accent -mt-1">
                            Visitor
                        </p>
                    </div>
                </div>

                {/* Third Row - Items 4 & 5 */}
                <div className="flex justify-between w-full max-w-[15rem]">
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-plant text-black">320+</p>
                        <p className="text-xl font-plant text-accent -mt-1">
                            Sunny Days
                        </p>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-plant text-black">25+</p>
                        <p className="text-xl font-plant text-accent -mt-1">
                            Homestay
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}