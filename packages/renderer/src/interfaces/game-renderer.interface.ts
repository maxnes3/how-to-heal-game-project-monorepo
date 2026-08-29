export interface GameRenderer {
  initialize(container: HTMLElement): void;
  destroy(): void;
}
