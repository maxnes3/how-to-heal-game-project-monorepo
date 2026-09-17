import type {
  EqualityChecker,
  SliceListener,
  StateListener,
  StateSelector,
  Unsubscribe,
  WritableStore,
} from './interfaces';

export class ObservableStore<TState> implements WritableStore<TState> {
  private _state: TState;
  private readonly _listeners = new Set<StateListener<TState>>();

  public constructor(initialState: TState) {
    this._state = initialState;
  }

  public getState(): TState {
    return this._state;
  }

  public setState(updater: TState): void;
  public setState(updater: (previousState: TState) => TState): void;
  public setState(updater: TState | ((previousState: TState) => TState)): void {
    const previousState = this._state;

    const nextState =
      typeof updater === 'function'
        ? (updater as (previousState: TState) => TState)(previousState)
        : updater;

    if (Object.is(previousState, nextState)) {
      return;
    }

    this._state = nextState;

    this.emit(nextState, previousState);
  }

  public subscribe(listener: StateListener<TState>): Unsubscribe;
  public subscribe<TSlice>(
    selector: StateSelector<TState, TSlice>,
    listener: SliceListener<TSlice>,
    options?: {
      equalityFn?: EqualityChecker<TSlice>;
      fireImmediately?: boolean;
    },
  ): Unsubscribe;
  public subscribe<TSlice>(
    selectorOrListener: StateListener<TState> | StateSelector<TState, TSlice>,
    listener?: SliceListener<TSlice>,
    options?: {
      equalityFn?: EqualityChecker<TSlice>;
      fireImmediately?: boolean;
    },
  ): Unsubscribe {
    if (listener) {
      return this.subscribeToSlice(
        selectorOrListener as StateSelector<TState, TSlice>,
        listener,
        options,
      );
    }

    this._listeners.add(selectorOrListener as StateListener<TState>);

    return () => {
      this._listeners.delete(selectorOrListener as StateListener<TState>);
    };
  }

  private subscribeToSlice<TSlice>(
    selector: StateSelector<TState, TSlice>,
    listener: SliceListener<TSlice>,
    options?: {
      equalityFn?: EqualityChecker<TSlice>;
      fireImmediately?: boolean;
    },
  ): Unsubscribe {
    const equalityFn = options?.equalityFn ?? Object.is;

    let previousSlice = selector(this._state);

    if (options?.fireImmediately) {
      listener(previousSlice, previousSlice);
    }

    const stateListener: StateListener<TState> = (state) => {
      const nextSlice = selector(state);

      if (equalityFn(previousSlice, nextSlice)) {
        return;
      }

      const previous = previousSlice;
      previousSlice = nextSlice;

      listener(nextSlice, previous);
    };

    this._listeners.add(stateListener);

    return () => {
      this._listeners.delete(stateListener);
    };
  }

  private emit(state: TState, previousState: TState): void {
    for (const listener of this._listeners) {
      listener(state, previousState);
    }
  }
}
