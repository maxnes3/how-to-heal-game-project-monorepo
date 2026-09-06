import type { GameState } from './game.state.js';
import { CardModel } from '../../card';

const INITIAL_HAND_SIZE = 5;

export const createInitialGameState = (): GameState => {
  const handCards = Array.from(
    { length: INITIAL_HAND_SIZE },
    (_, index) => new CardModel(`card-${index + 1}`),
  );

  return {
    player: {
      handCards,
    },
  };
};
