import { initReactI18next } from 'react-i18next';
import { i18n, initializeI18n } from '@game/i18n';

export const initializeDesktopI18n = async (): Promise<void> => {
  i18n.use(initReactI18next);
  await initializeI18n();
};
