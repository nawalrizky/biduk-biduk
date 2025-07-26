"use client";
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
    const navigationLinks = [
        {
            title: "Latest",
            links: [
                { name: "News", href: "/destinations/berau" },
                { name: "Updates", href: "/destinations/derawan" },
            ]
        },
        {
            title: "About",
            links: [
                { name: "About us", href: "/experiences/diving" },
                { name: "Contact us", href: "/experiences/island-hopping" },
            ]
        },
        {
            title: "Contact",
            links: [
                { name: "+62 85251882238", href: "/experiences/diving" },
                { name: "bidukbidukpokdarwis@gmail.com", href: "/experiences/island-hopping" },
            ]
        },
    ];

    const socialLinks = [
        {
            name: "Instagram",
            href: "https://instagram.com/derawan-tourism",
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
            )
        },
        {
            name: "Facebook",
            href: "https://facebook.com/derawan-tourism",
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
            )
        },
        {
            name: "Twitter",
            href: "https://twitter.com/derawan-tourism",
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
            )
        },
        {
            name: "YouTube",
            href: "https://youtube.com/derawan-tourism",
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
            )
        },
        {
            name: "TikTok",
            href: "https://tiktok.com/@derawan-tourism",
            icon: (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
            )
        }
    ];

    return (
        <footer className="relative bg-white">
            <div className="flex flex-col lg:flex-row">
                {/* Main Footer Content - Mobile: full width, Desktop: 2/3 */}
                <div className="w-full lg:w-3/4 bg-primary px-8 py-16 lg:px-16 lg:py-20">
                    <div className="max-w-6xl mx-auto">
                        {/* Logo and Brand Section */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-8">
                            <div className="flex items-center gap-3">
                                {/* Logo placeholder - replace with your actual logo */}
                                <Image
                                    src="/images/home/logo.png"
                                    alt="Biduk Biduk Logo"
                                    width={500}
                                    height={500}
                                    className='w-20 h-20  rounded-lg flex items-center justify-center'
                                />
                                <div>
                                    <h3 className="text-white text-2xl font-plant">
                                        Destinasi Pesisir
                                    </h3>
                                    <p className="text-white font-plant text-2xl">
                                        Kelompok Sadar Wisata Biduk Biduk
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* White Divider Line */}
                        <div className="w-full h-px bg-white mb-12"></div>

                        {/* Navigation Links Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
                            {navigationLinks.map((section, index) => (
                                <div key={index}>
                                    <h4 className="text-white font-semibold text-lg mb-4 font-plant">
                                        {section.title}
                                    </h4>
                                    <ul className="space-y-3">
                                        {section.links.map((link, linkIndex) => (
                                            <li key={linkIndex}>
                                                <Link 
                                                    href={link.href}
                                                    className="text-white/80 hover:text-white transition-colors duration-300 text-sm hover:underline"
                                                >
                                                    {link.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Social Media and Address Section */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-12">
                            {/* Social Media Links */}
                            <div>
                                <h4 className="text-white font-semibold text-lg mb-4 font-plant">
                                    Social
                                </h4>
                                <div className="flex gap-4 flex-wrap">
                                    {socialLinks.map((social, index) => (
                                        <Link
                                            key={index}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white hover:text-accent transition-all duration-300 hover:scale-110"
                                            aria-label={social.name}
                                        >
                                            {social.icon}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            {/* Address Information */}
                            <div>
                                <h4 className="text-white font-semibold text-lg mb-4 font-plant">
                                    Address
                                </h4>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <svg className="w-5 h-5 text-white mt-1 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                        </svg>
                                        <div>
                                            <p className="text-white/80 text-sm">
                                                Jl. Manunggal 87, RT 03 Kampung Biduk Biduk
                                            </p>
                                        </div>
                                    </div>

                                   
                                </div>
                            </div>
                            
                        
                        </div>
                         <div className="w-full h-px bg-white mb-12"></div>
                              <div className="max-w-6xl mx-auto px-8 lg:px-16">
                    <div className="text-center">
                        <p className="text-white font-bold text-sm">
                            Kelompok Sadar Wisata Biduk Biduk &copy; 2025
                        </p>
                    </div>
                    
                </div>
                
                    </div>
                </div>

                {/* Image Section - Only visible on desktop */}
                <div className="hidden lg:flex lg:w-1/4 relative min-h-64 lg:min-h-full">
                    <Image
                        src="/images/home/hero.png"
                        alt="Derawan Islands Beauty"
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 33vw"
                    />
                    {/* Overlay with gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-primary/20 to-transparent"></div>
                </div>
            </div>

           
        </footer>
    );
};

export default Footer;