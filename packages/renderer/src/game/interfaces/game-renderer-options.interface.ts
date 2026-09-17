import type { WritableStore } from '@game/store';
import type { GameState } from '@game/core';

export interface GameRendererOptions {
  gameStore: WritableStore<GameState>;
}
