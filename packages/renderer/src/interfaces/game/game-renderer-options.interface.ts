import type { Store } from '@game/store';
import type { DeckState } from '@game/core';

export interface GameRendererOptions {
  deckStore: Store<DeckState>;
}
