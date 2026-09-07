import type { CardModel } from '@game/core';

export interface CardDropEvent {
  card: CardModel;
  position: {
    x: number;
    y: number;
  };
}

export type CardDropHandler = (event: CardDropEvent) => void;
