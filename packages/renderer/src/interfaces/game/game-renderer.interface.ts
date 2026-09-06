export interface GameRenderer {
  initialize(container: HTMLElement): Promise<void>;
  destroy(): void;
}
