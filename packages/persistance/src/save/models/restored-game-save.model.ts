import type { GameState } from '@game/core';

export interface RestoredGameSave {
  screen: string;
  game: GameState;
  createdAt: string;
  updatedAt: string;
}
