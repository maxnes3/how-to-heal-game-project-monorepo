import type { CardModel } from '../../card';

export interface GameState {
  player: {
    handCards: CardModel[];
  };
}
