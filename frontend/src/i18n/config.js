import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import en from './en.json';
import ru from './ru.json';

const storedLang = localStorage.getItem('i18nextLng');
const initialLanguage =
  storedLang && ['en', 'ru'].includes(storedLang) ? storedLang : 'ru';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    lng: initialLanguage,
    whitelist: ['en', 'ru'],
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
    saveMissing: true,
  });

export default i18n;
