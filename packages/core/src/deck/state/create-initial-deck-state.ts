import { CardModel } from '../../card';
import type { DeckState } from './deck.state.js';

const INITIAL_HAND_SIZE = 5;

export const createInitialDeckState = (): DeckState => {
  const handCards = Array.from(
    { length: INITIAL_HAND_SIZE },
    (_, index) => new CardModel(`card-${index + 1}`),
  );

  return {
    handCards,
  };
};
