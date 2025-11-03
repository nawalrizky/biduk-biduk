'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/index';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Initialize i18n on client side
    if (!isInitialized) {
      // Load saved language or default to Indonesian
      const savedLang = typeof window !== 'undefined' 
        ? localStorage.getItem('i18nextLng') || 'id'
        : 'id';
      
      if (i18n.language !== savedLang) {
        i18n.changeLanguage(savedLang).then(() => {
          setIsInitialized(true);
        });
      } else {
        setIsInitialized(true);
      }
    }
  }, [isInitialized]);

  if (!isInitialized) {
    // Show minimal loading to prevent flash
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#05A5D0]"></div>
      </div>
    );
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
