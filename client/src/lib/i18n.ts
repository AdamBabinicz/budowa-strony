import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import plTranslations from '../translations/pl.json';
import enTranslations from '../translations/en.json';
import jaTranslations from '../translations/ja.json';

const resources = {
  pl: {
    translation: plTranslations,
  },
  en: {
    translation: enTranslations,
  },
  ja: {
    translation: jaTranslations,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'pl',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
