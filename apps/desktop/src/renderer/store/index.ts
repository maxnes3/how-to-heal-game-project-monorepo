import { createInitialGameState, type GameState } from '@game/core';
import { ObservableStore } from '@game/store';

export const gameStore = new ObservableStore<GameState>(createInitialGameState());
