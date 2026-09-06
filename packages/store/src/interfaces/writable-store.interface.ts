import type { Store } from './store.interface.js';

export interface WritableStore<TState> extends Store<TState> {
  setState(state: TState | ((previousState: TState) => TState)): void;
}
