import type { CardModel } from '@game/core';
import type { CardDropHandler } from './card-drop-event.interface.js';

export interface CardRendererOptions {
  card: CardModel;
  onDrop?: CardDropHandler;
  width?: number;
  height?: number;
}
