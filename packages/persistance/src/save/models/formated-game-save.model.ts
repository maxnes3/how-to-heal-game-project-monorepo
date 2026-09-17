import type { DeckState } from '@game/core';

export interface FormatedGameSave {
  screen: string;
  deck: DeckState;
  createdAt: string;
  updatedAt: string;
}
