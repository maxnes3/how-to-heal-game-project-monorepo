export type StateListener<TState> = (state: TState, previousState: TState) => void;

export type StateSelector<TState, TSlice> = (state: TState) => TSlice;

export type SliceListener<TSlice> = (slice: TSlice, previousSlice: TSlice) => void;

export type EqualityChecker<T> = (previousValue: T, nextValue: T) => boolean;

export type Unsubscribe = () => void;
