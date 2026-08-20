import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { commonTh } from './locales/th/common';
import { commonEn } from './locales/en/common';

// Initialize language from localStorage if available and valid
const savedLanguage = localStorage.getItem('yudning_locale');
const initialLanguage = savedLanguage === 'en' ? 'en' : 'th'; // Fallback to th if invalid

i18n
  .use(initReactI18next)
  .init({
    resources: {
      th: {
        common: commonTh,
      },
      en: {
        common: commonEn,
      }
    },
    lng: initialLanguage,
    fallbackLng: 'th',
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

// Setup a listener to persist language changes
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('yudning_locale', lng);
});

export default i18n;
