'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Custom hook to listen for language changes globally
 * This ensures all components re-render when language changes
 */
export function useLanguage() {
  const { i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState(i18n.language);

  useEffect(() => {
    // Update current language when i18n language changes
    const handleLanguageChange = (lng: string) => {
      setCurrentLanguage(lng);
    };

    i18n.on('languageChanged', handleLanguageChange);

    // Also listen to custom storage event
    const handleStorageChange = () => {
      const savedLang = localStorage.getItem('i18nextLng');
      if (savedLang && savedLang !== i18n.language) {
        i18n.changeLanguage(savedLang);
      }
    };

    window.addEventListener('languageChanged', handleStorageChange);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
      window.removeEventListener('languageChanged', handleStorageChange);
    };
  }, [i18n]);

  return currentLanguage;
}
