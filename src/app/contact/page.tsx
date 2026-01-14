"use client";
import Image from "next/image";
import { useTranslation } from "react-i18next";

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#C8E6F0] via-[#E8F4F8] to-[#F5F5DC] lg:bg-gradient-to-br lg:from-[#C8E6F0] lg:to-[#F5F5DC] overflow-hidden">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-primary text-xl mb-2 font-plant">{t('contact.title')}</h2>
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900">
            {t('contact.subtitle')}
          </h1>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="pb-20 px-4 lg:px-40">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Images Collage */}
            <div className="relative w-full h-[500px] lg:h-[600px] ">
              {/* Large Image - Center */}
              <div className="absolute top-24 left-1/2 lg:top-12 lg:left-1/2 transform -translate-x-1/2 z-20 w-[280px] md:w-[350px] h-[200px] md:h-[250px]">
                <Image
                  src="/images/home/destination/image1.png"
                  alt="Boats at sea"
                  fill
                  className="object-cover rounded-[20px] shadow-lg"
                />
              </div>

              {/* Small Image - Top Left */}
              <div className="absolute top-0 left-0 md:left-20 lg:top-0 lg:left-0 z-10 w-[150px] md:w-[180px] h-[120px] md:h-[150px]">
                <Image
                  src="/images/home/destination/image2.png"
                  alt="Beach view"
                  fill
                  className="object-cover rounded-[20px] shadow-lg"
                />
              </div>

              {/* Small Image - Bottom Right */}
              <div className="absolute bottom-24 right-0 md:right-20 lg:bottom-44 lg:right-10 z-10 w-[150px] md:w-[180px] h-[120px] md:h-[150px]">
                <Image
                  src="/images/home/destination/image3.png"
                  alt="People on pier"
                  fill
                  className="object-cover rounded-[20px] shadow-lg"
                />
              </div>
            </div>

            {/* Right Side - Contact Information */}
            <div className="space-y-8 font-plant px-6 lg:pl-24">
              {/* Available Contacts */}
              <div>
                <h3 className="text-2xl font-semibold text-primary mb-6">
                  {t('contact.available_contacts')}
                </h3>
                <div className="space-y-4 ">
                  {/* Phone */}
                  <a
                    href="tel:+628521000219"
                    className="flex items-center gap-4 text-primary  hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm lg:text-lg font-medium underline">+62 852 5188 2238</span>
                      <span className="text-sm lg:text-lg font-medium underline">+62 812 4143 7131</span>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:bidukbidukpokdarwis@gmail.com"
                    className="flex items-center gap-4 text-primary hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <span className="text-sm lg:text-lg font-medium underline">
                      bidukbidukpokdarwis@gmail.com
                    </span>
                  </a>
                </div>
              </div>

              {/* Follow Us */}
              <div>
                <h3 className="text-2xl font-semibold font-plant text-primary mb-6">
                  {t('contact.follow_us')}
                </h3>
                <div className="space-y-4">
                  {/* Facebook */}
                  <a
                    href="https://facebook.com/pokdarwisbidukbiduk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-primary hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-primary"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </div>
                    <span className="text-sm lg:text-lg font-medium underline">Pokdarwis Biduk Biduk</span>
                  </a>

                  {/* Twitter */}
                  <a
                    href="https://twitter.com/paradiseofbidukbiduk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-primary hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="text-primary"
                      >
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                      </svg>
                    </div>
                    <span className="text-sm lg:text-lg font-medium underline">Paradiseofbidukbiduk</span>
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/paradiseofbiduk"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 text-primary hover:text-primary transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </div>
                    <span className="text-sm lg:text-lg font-medium underline">ParadiseofBiduk</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
