import { createInitialDeckState, type DeckState } from '../../deck';
import type { GameState } from './game.state.js';

export const createInitialGameState = (): GameState => {
  const deck: DeckState = createInitialDeckState();

  return {
    deck,
  };
};
