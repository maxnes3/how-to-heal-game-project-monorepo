import i18n from 'i18next';
import { resources } from './resources.js';

i18n.init({
  lng: 'en',
  fallbackLng: 'en',
  resources,
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
