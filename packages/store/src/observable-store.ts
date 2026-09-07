import type { StateListener, Unsubscribe, WritableStore } from './interfaces';

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
    const nextState =
      typeof updater === 'function'
        ? (updater as (previousState: TState) => TState)(this._state)
        : updater;

    if (Object.is(this._state, nextState)) {
      return;
    }

    this._state = nextState;
    this.emit();
  }

  public subscribe(listener: StateListener<TState>): Unsubscribe {
    this._listeners.add(listener);

    return () => {
      this._listeners.delete(listener);
    };
  }

  private emit(): void {
    for (const listener of this._listeners) {
      listener(this._state);
    }
  }
}
