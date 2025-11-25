"use client";
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@/i18n';

interface LocationData {
  country: string;
  country_code: string;
  timezone: string;
}

const LANGUAGE_MAP: Record<string, string> = {
  'ID': 'id',
  'US': 'en',
  'GB': 'en',
  'AU': 'en',
  'CA': 'en',
  'NZ': 'en',
  'SA': 'ar',
  'AE': 'ar',
  'QA': 'ar',
  'KW': 'ar',
  'BH': 'ar',
  'OM': 'ar',
  'CN': 'zh',
  'TW': 'zh',
  'HK': 'zh',
  'SG': 'zh',
  'FR': 'fr',
  'ES': 'es',
  'MX': 'es',
  'AR': 'es',
  'CL': 'es',
  'CO': 'es',
};

const COUNTRY_NAMES: Record<string, Record<string, string>> = {
  'id': { 'ID': 'Indonesia', 'US': 'Amerika Serikat', 'SA': 'Arab Saudi', 'CN': 'Tiongkok', 'FR': 'Prancis', 'ES': 'Spanyol' },
  'en': { 'ID': 'Indonesia', 'US': 'United States', 'SA': 'Saudi Arabia', 'CN': 'China', 'FR': 'France', 'ES': 'Spain' },
  'ar': { 'ID': 'إندونيسيا', 'US': 'الولايات المتحدة', 'SA': 'المملكة العربية السعودية', 'CN': 'الصين', 'FR': 'فرنسا', 'ES': 'إسبانيا' },
  'zh': { 'ID': '印度尼西亚', 'US': '美国', 'SA': '沙特阿拉伯', 'CN': '中国', 'FR': '法国', 'ES': '西班牙' },
  'fr': { 'ID': 'Indonésie', 'US': 'États-Unis', 'SA': 'Arabie Saoudite', 'CN': 'Chine', 'FR': 'France', 'ES': 'Espagne' },
  'es': { 'ID': 'Indonesia', 'US': 'Estados Unidos', 'SA': 'Arabia Saudita', 'CN': 'China', 'FR': 'Francia', 'ES': 'España' },
};

const LANGUAGE_NAMES: Record<string, Record<string, string>> = {
  'id': { 'id': 'Bahasa Indonesia', 'en': 'Bahasa Inggris', 'ar': 'Bahasa Arab', 'zh': 'Bahasa Mandarin', 'fr': 'Bahasa Prancis', 'es': 'Bahasa Spanyol' },
  'en': { 'id': 'Indonesian', 'en': 'English', 'ar': 'Arabic', 'zh': 'Chinese', 'fr': 'French', 'es': 'Spanish' },
  'ar': { 'id': 'الإندونيسية', 'en': 'الإنجليزية', 'ar': 'العربية', 'zh': 'الصينية', 'fr': 'الفرنسية', 'es': 'الإسبانية' },
  'zh': { 'id': '印度尼西亚语', 'en': '英语', 'ar': '阿拉伯语', 'zh': '中文', 'fr': '法语', 'es': '西班牙语' },
  'fr': { 'id': 'Indonésien', 'en': 'Anglais', 'ar': 'Arabe', 'zh': 'Chinois', 'fr': 'Français', 'es': 'Espagnol' },
  'es': { 'id': 'Indonesio', 'en': 'Inglés', 'ar': 'Árabe', 'zh': 'Chino', 'fr': 'Francés', 'es': 'Español' },
};

export default function LanguageDetectionModal() {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<string>('');
  const [suggestedLang, setSuggestedLang] = useState<string>('');
  const [currentDisplayLang, setCurrentDisplayLang] = useState<string>('id');

  useEffect(() => {
    const checkLanguagePreference = async () => {
      // Check if user has already made a language choice
      const hasUserChoice = localStorage.getItem('languageChoiceMade');
      console.log('[Language Detection] Has user choice?', hasUserChoice);
      
      if (hasUserChoice === 'true') {
        console.log('[Language Detection] User already made choice, skipping modal');
        return; // Don't show modal if user already chose
      }

      // Get current language
      const currentLang = localStorage.getItem('i18nextLng') || 'id';
      setCurrentDisplayLang(currentLang);
      console.log('[Language Detection] Current language:', currentLang);

      try {
        // Detect user's location using IP geolocation API
        console.log('[Language Detection] Fetching location...');
        const response = await fetch('https://ipapi.co/json/');
        const data: LocationData = await response.json();
        
        const countryCode = data.country_code;
        const detectedLang = LANGUAGE_MAP[countryCode] || 'en';
        
        console.log('[Language Detection] Country code:', countryCode);
        console.log('[Language Detection] Detected language:', detectedLang);
        console.log('[Language Detection] Current language:', currentLang);

        // Only show modal if detected language differs from current
        if (detectedLang !== currentLang && detectedLang) {
          console.log('[Language Detection] Languages differ, showing modal');
          setDetectedCountry(countryCode);
          setSuggestedLang(detectedLang);
          setShowModal(true);
        } else {
          console.log('[Language Detection] Languages match or no mapping found, skipping modal');
          // Mark as choice made even if languages match
          localStorage.setItem('languageChoiceMade', 'true');
        }
      } catch (error) {
        console.error('[Language Detection] Failed to detect location:', error);
        // Don't show modal on error, mark as choice made
        localStorage.setItem('languageChoiceMade', 'true');
      }
    };

    // Delay to avoid showing immediately on page load
    console.log('[Language Detection] Starting check in 2 seconds...');
    const timer = setTimeout(checkLanguagePreference, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    if (suggestedLang) {
      i18n.changeLanguage(suggestedLang);
      localStorage.setItem('i18nextLng', suggestedLang);
      localStorage.setItem('languageChoiceMade', 'true');
      setShowModal(false);
    }
  };

  const handleDecline = () => {
    localStorage.setItem('languageChoiceMade', 'true');
    setShowModal(false);
  };

  if (!showModal) return null;

  const countryName = COUNTRY_NAMES[currentDisplayLang]?.[detectedCountry] || detectedCountry;
  const languageName = LANGUAGE_NAMES[currentDisplayLang]?.[suggestedLang] || suggestedLang;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-in fade-in slide-in-from-bottom-4 duration-300">
        <div className="flex items-start gap-4 mb-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
              />
            </svg>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {t('language_detection.title') || 'Language Detection'}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {t('language_detection.message', { country: countryName, language: languageName }) || 
                `We detected you are in ${countryName}. Would you like to display the site in ${languageName}?`}
            </p>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={handleDecline}
            className="flex-1 px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors"
          >
            {t('language_detection.decline') || 'No, thanks'}
          </button>
          <button
            onClick={handleAccept}
            className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
          >
            {t('language_detection.accept') || 'Yes, switch'}
          </button>
        </div>
      </div>
    </div>
  );
}
