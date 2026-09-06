import { createInitialDeckState, type DeckState } from '@game/core';
import { ObservableStore } from '@game/store';

export const deckStore = new ObservableStore<DeckState>(createInitialDeckState());
