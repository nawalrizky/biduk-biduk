import Link from "next/link";
export default function PlaceContent() {
  return (
    <div className="z-20 flex flex-col  lg:px-56 items-center bg-white h-screen">
      <p className="mt-24 text-xl text-black text-justify">
        Nestled on the remote coastline of East Kalimantan, Biduk-Biduk is a
        hidden gem where crystal-clear waters, untouched nature, and warm local
        hospitality invite you to experience Indonesia’s coastal beauty at its
        purest. Nestled on the remote coastline of East Kalimantan, Biduk-Biduk
        is a hidden gem where crystal-clear waters, untouched nature, and warm
        local hospitality invite you to experience Indonesia’s coastal beauty at
        its purest. Nestled on the remote coastline of East Kalimantan,
        Biduk-Biduk is a hidden gem where crystal-clear waters, untouched
        nature, and warm local hospitality invite you to experience Indonesia’s
        coastal beauty at its purest.Nestled on the remote coastline of East
        Kalimantan, Biduk-Biduk is a hidden gem where crystal-clear waters,
        untouched nature, and warm local hospitality invite you to experience
        Indonesia’s coastal beauty at its purest.Nestled on the remote coastline
        of East Kalimantan, Biduk-Biduk is a hidden gem where crystal-clear
        waters, untouched nature, and warm local hospitality invite you to
        experience Indonesia’s coastal beauty at its purest.Nestled on the
        remote coastline of East Kalimantan, Biduk-Biduk is a hidden gem where
        crystal-clear waters, untouched nature, and warm local hospitality
        invite you to experience Indonesia’s coastal beauty at its purest.
      </p>
      <Link
        href="/hotels"
        className="btn-border-reveal bg-transparent border-2 border-accent my-10 text-black font-semibold px-6 py-2 lg:px-3  rounded-full hover:bg-accent transition-colors text-sm lg:text-xl flex justify-center items-center gap-2 h-fit w-full"
      >
        Book Now →
      </Link>
      <div className="mt-10 flex flex-col lg:flex-row w-full gap-8 ">
        {/* Contact Information */}
        <div className="flex-1 flex flex-col gap-2 bg-accent/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-accent mb-2">Contact Information</h2>
          <p className="text-black"><span className="font-semibold">Phone:</span> <a href="tel:+6285251882238" className="hover:underline">+62 852-5188-2238</a></p>
          <p className="text-black"><span className="font-semibold">Email:</span> <a href="mailto:bidukbidukpokdarwis@gmail.com" className="hover:underline">bidukbidukpokdarwis@gmail.com</a></p>
          <p className="text-black"><span className="font-semibold">Address:</span> Biduk-Biduk, Berau, East Kalimantan, Indonesia</p>
        </div>
        {/* Map */}
        <div className="flex-1 min-h-[200px]  rounded-xl overflow-hidden">
          <iframe
            title="Labuan Cermin Google Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63821.84753026603!2d118.61294940870013!3d1.2522236876905486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32734cb76f07da33%3A0x5e898623450bccae!2sLabuan%20Cermin!5e0!3m2!1sen!2sid!4v1753828856108!5m2!1sen!2sid"
            className="w-full h-full border-0 rounded-xl"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
