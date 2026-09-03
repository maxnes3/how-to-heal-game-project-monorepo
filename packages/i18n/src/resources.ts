import enCards from './locales/en/cards.json';
import enCommon from './locales/en/common.json';
import enUi from './locales/en/ui.json';
import ruCards from './locales/ru/cards.json';
import ruCommon from './locales/ru/common.json';
import ruUi from './locales/ru/ui.json';

export const resources = {
  en: {
    cards: enCards,
    common: enCommon,
    ui: enUi,
  },
  ru: {
    cards: ruCards,
    common: ruCommon,
    ui: ruUi,
  },
} as const;

export type Language = keyof typeof resources;
