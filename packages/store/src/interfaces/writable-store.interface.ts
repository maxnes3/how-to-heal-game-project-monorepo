import type {
  EqualityChecker,
  SliceListener,
  StateListener,
  StateSelector,
  Unsubscribe,
} from './store.interface.js';

export interface WritableStore<TState> {
  getState(): TState;
  setState(state: TState): void;
  setState(updater: (previousState: TState) => TState): void;
  subscribe(listener: StateListener<TState>): Unsubscribe;
  subscribe<TSlice>(
    selector: StateSelector<TState, TSlice>,
    listener: SliceListener<TSlice>,
    options?: {
      equalityFn?: EqualityChecker<TSlice>;
      fireImmediately?: boolean;
    },
  ): Unsubscribe;
}
