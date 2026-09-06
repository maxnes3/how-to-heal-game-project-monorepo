export type Unsubscribe = () => void;

export type StateListener<TState> = (state: TState) => void;

export interface Store<TState> {
  getState(): TState;
  subscribe(listener: StateListener<TState>): Unsubscribe;
}
