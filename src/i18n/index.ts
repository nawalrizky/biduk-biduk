import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import id from './locales/id.json';
import ar from './locales/ar.json';
import zh from './locales/zh.json';
import fr from './locales/fr.json';
import es from './locales/es.json';

const resources = {
  en: { translation: en },
  id: { translation: id },
  ar: { translation: ar },
  zh: { translation: zh },
  fr: { translation: fr },
  es: { translation: es },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'id', // Default language is Indonesian
    fallbackLng: 'id', // Fallback to Indonesian
    interpolation: { 
      escapeValue: false 
    },
    debug: false,
    react: {
      useSuspense: false, // Disable suspense to avoid SSR issues
    },
  });

// Save language preference to localStorage
i18n.on('languageChanged', (lng) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('i18nextLng', lng);
  }
});

// Load saved language preference
if (typeof window !== 'undefined') {
  const savedLang = localStorage.getItem('i18nextLng');
  if (savedLang && savedLang !== i18n.language) {
    i18n.changeLanguage(savedLang);
  }
}

export default i18n;
