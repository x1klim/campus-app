import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import ru from './ru.json';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    lng: 'ru',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
      checkWhitelist: true,
    },
    resources: {
      ru: { translation: ru },
      en: { translation: en },
    },
    interpolation: {
      escapeValue: false, // React already protects from XSS
    },
  });

export default i18n;
