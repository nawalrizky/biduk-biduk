import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    debug: false,
  });

export default i18n;
