import type { StateListener, Unsubscribe, WritableStore } from './interfaces';

export class ObservableStore<TState> implements WritableStore<TState> {
  private state: TState;

  private readonly listeners = new Set<StateListener<TState>>();

  public constructor(initialState: TState) {
    this.state = initialState;
  }

  public getState(): TState {
    return this.state;
  }

  public setState(updater: TState): void;
  public setState(updater: (previousState: TState) => TState): void;
  public setState(updater: TState | ((previousState: TState) => TState)): void {
    const nextState =
      typeof updater === 'function'
        ? (updater as (previousState: TState) => TState)(this.state)
        : updater;

    if (Object.is(this.state, nextState)) {
      return;
    }

    this.state = nextState;
    this.emit();
  }

  public subscribe(listener: StateListener<TState>): Unsubscribe {
    this.listeners.add(listener);

    return () => {
      this.listeners.delete(listener);
    };
  }

  private emit(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }
}
