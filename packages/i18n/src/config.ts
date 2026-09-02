import { i18n } from './instance.js';
import { resources } from './resources.js';

export const initializeI18n = async (): Promise<void> => {
  await i18n.init({
    lng: 'en',
    fallbackLng: 'en',
    resources,
    defaultNS: 'common',
    interpolation: {
      escapeValue: false,
    },
  });
};
