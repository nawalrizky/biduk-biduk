'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n/index';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show navbar when at top or scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsMobileMenuOpen(false); // Close mobile menu when hiding navbar
      }
      setIsAtTop(currentScrollY < 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const { t } = useTranslation();
  const navItems = [
    { name: t('navbar.home'), href: '/' },
    { name: t('navbar.place'), href: '/place' },
    { name: t('navbar.stay'), href: '/stay' },
    { name: t('navbar.contact'), href: '/contact' },
    { name: t('navbar.follow'), href: '/follow' },
    { name: t('navbar.language'), href: '/language', isLanguage: true },
  ];

  const languageOptions = [
    { label: 'English', code: 'en' },
    { label: 'Indonesia', code: 'id' },
    { label: 'Arabic', code: 'ar' },
    { label: 'Chinese', code: 'zh' },
    { label: 'French', code: 'fr' },
    { label: 'Spanish', code: 'es' },
  ];
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  return (
    <nav className={`
      fixed top-0 left-0 right-0 z-50
      ${isAtTop ? 'bg-gradient-to-b from-[#1E354D80] via-[#1E354D50] to-transparent' : (isVisible ? 'bg-[#05A5D0]' : 'bg-gradient-to-b from-[#1E354D80] via-[#1E354D50] to-transparent')}
      transition-transform duration-300 ease-in-out
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}
    `}>
      <div className="max-w-[100rem] mx-auto px-4 sm:px-6 lg:px-20">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="Biduk-Biduk Logo"
              width={500}
              height={500}
              className="mr-2 w-10 h-10"
            />
            <div className='flex items-start flex-col'>
              <h1 className="font-plant text-[11px] text-white ">
              Kelompok Sadar Wisata
              </h1>
              <h1 className="font-plant text-xl -mt-1 text-white ">
              Biduk Biduk
              </h1>
           </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="ml-10 flex items-baseline gap-11">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                if (item.isLanguage) {
                  return (
                    <div
                      key={item.name}
                      className="relative group"
                      onMouseEnter={() => setShowLangDropdown(true)}
                      onMouseLeave={() => setShowLangDropdown(false)}
                    >
                      <button
                        type="button"
                        className={`relative text-white transition-colors duration-200 text-xl group flex items-center gap-1 ${
                          isActive ? 'text-white' : ''
                        } ${(isActive && isVisible) ? 'font-semibold' : ''}`}
                        onClick={() => setShowLangDropdown((v) => !v)}
                      >
                        {item.name}
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </button>
                      {/* Dropdown */}
                      <div
                        className={`absolute left-0 mt-2 w-40 bg-white rounded shadow-lg z-50 transition-all duration-200 ${showLangDropdown ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                      >
                        <ul>
                          {languageOptions.map((lang) => (
                            <li key={lang.code}>
                              <button
                                className="w-full text-left px-4 py-2 text-gray-800 hover:bg-[#05A5D0] hover:text-white transition-colors duration-150"
                                onClick={() => i18n.changeLanguage(lang.code)}
                              >
                                {lang.label}
                              </button>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative text-white transition-colors duration-200 text-xl group ${
                      isActive ? 'text-white' : ''
                    } ${(isActive && isVisible) ? 'font-semibold' : ''}`}
                  >
                    {item.name}
                    {/* Active indicator line */}
                    <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transition-all duration-300 ${
                      isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                    }`} />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white  focus:outline-none p-2"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={`lg:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black/20 backdrop-blur-md">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative text-white hover:text-accent block px-3 py-2 text-base font-medium transition-colors duration-200 ${
                  isActive ? 'text-accent' : ''
                }`}
              >
                {item.name}
                {/* Active indicator line for mobile */}
                {isActive && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-white" />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
