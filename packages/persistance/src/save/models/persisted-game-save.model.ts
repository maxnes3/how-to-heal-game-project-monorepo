import type { PersistedSaveSlot } from './persisted-save-slot.enum.js';

export interface PersistedGameSave {
  slot: PersistedSaveSlot;
  screen: string;
  game: PersistedGameState;
  createdAt: string;
  updatedAt: string;
}

export interface PersistedGameState {
  deck: PersistedGameDeck;
}

export interface PersistedGameDeck {
  handCards: Array<PersistedGameCard>;
}

export interface PersistedGameCard {
  id: string;
}
