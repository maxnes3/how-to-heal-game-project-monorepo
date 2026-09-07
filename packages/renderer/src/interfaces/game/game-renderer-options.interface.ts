import type { WritableStore } from '@game/store';
import type { DeckState } from '@game/core';

export interface GameRendererOptions {
  deckStore: WritableStore<DeckState>;
}
