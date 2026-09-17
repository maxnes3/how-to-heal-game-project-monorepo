import type { PersistedSaveSlot } from './persisted-save-slot.enum.js';

export interface PersistedGameSaveCard {
  id: string;
}

export interface PersistedGameSaveDeck {
  handCards: Array<PersistedGameSaveCard>;
}

export interface PersistedGameSave {
  slot: PersistedSaveSlot;
  screen: string;
  deck: PersistedGameSaveDeck;
  createdAt: string;
  updatedAt: string;
}
