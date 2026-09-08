import type { AnimationBounds } from './animation-bounds.interface.js';

export interface AnimationController {
  animate(from: AnimationBounds, to: AnimationBounds, duration: number): void;
  stop(): void;
  destroy(): void;
}
