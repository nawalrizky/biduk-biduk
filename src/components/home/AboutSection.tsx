import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      className="h-screen md:h-[50vh] "
      style={{
        backgroundColor: "white",
        backgroundImage:
          "linear-gradient(90deg,rgba(30, 167, 203, 0.3) 0%, rgba(204, 204, 204, 0.25) 52%, rgba(242, 157, 0, 0.3) 100%)",
      }}
    >
      <div className="flex flex-col md:flex-row h-full justify-center items-center px-4 gap-4 md:gap-8 lg:gap-12 md:px-8 lg:px-56">
        <Image
          src="/images/home/about/image1.png"
          alt="About Biduk-Biduk"
          width={500}
          height={500}
          loading="lazy"
          className="w-full md:w-[55%] lg:w-[70%] h-auto"
        />
        <div className="flex flex-col justify-center items-start text-left gap-2">
          <h1 className="text-base md:text-lg lg:text-xl font-plant text-primary">About Us</h1>
          <p className="mt-2 text-lg md:text-xl lg:text-2xl xl:text-3xl max-w-md text-black font-semibold">
            Welcome to Biduk-Biduk - Where the Ocean Tells Stories
          </p>
          <p className="mt-2 text-xs md:text-sm lg:text-base xl:text-lg text-gray-700">
            Nestled on the remote coastline of East Kalimantan, Biduk-Biduk is a
            hidden gem where crystal-clear waters, untouched nature, and warm
            local hospitality invite you to experience Indonesia&apos;s coastal
            beauty at its purest.
          </p>
           <Link href="#package" className="text-base md:text-lg lg:text-xl font-plant text-primary mt-2">Explore  Tour Package →</Link>
        </div>
      </div>
    </section>
  );
}
