import enCards from './locales/en/cards.json';
import enCommon from './locales/en/common.json';
import ruCards from './locales/ru/cards.json';
import ruCommon from './locales/ru/common.json';

export const resources = {
  en: {
    cards: enCards,
    common: enCommon,
  },
  ru: {
    cards: ruCards,
    common: ruCommon,
  },
} as const;

export type Language = keyof typeof resources;
