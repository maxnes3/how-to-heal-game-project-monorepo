import { Ticker } from 'pixi.js';
import type { AnimationBounds, AnimationController } from '../../interfaces';

export class PixiAnimationController implements AnimationController {
  private readonly _onUpdate: (values: AnimationBounds) => void;
  private _from: AnimationBounds | null = null;
  private _to: AnimationBounds | null = null;
  private _duration = 0;
  private _elapsed = 0;
  private _isAnimating = false;

  public constructor(onUpdate: (values: AnimationBounds) => void) {
    this._onUpdate = onUpdate;
  }

  public animate(from: AnimationBounds, to: AnimationBounds, duration: number): void {
    this._from = { ...from };
    this._to = { ...to };
    this._duration = duration;
    this._elapsed = 0;

    if (this._isAnimating) {
      return;
    }
    this._isAnimating = true;

    Ticker.shared.add(this.handleTick);
  }

  public stop(): void {
    if (!this._isAnimating) {
      return;
    }

    Ticker.shared.remove(this.handleTick);

    this._isAnimating = false;
    this._from = null;
    this._to = null;
    this._elapsed = 0;
  }

  public destroy(): void {
    this.stop();
  }

  private handleTick = (ticker: Ticker): void => {
    if (!this._from || !this._to) {
      this.stop();
      return;
    }

    this._elapsed += ticker.deltaMS;
    const progress = Math.min(this._elapsed / this._duration, 1);
    const easedProgress = this.easeOutCubic(progress);

    this._onUpdate({
      x: this.lerp(this._from.x, this._to.x, easedProgress),
      y: this.lerp(this._from.y, this._to.y, easedProgress),
      rotation: this.lerp(this._from.rotation, this._to.rotation, easedProgress),
      scale: this.lerp(this._from.scale, this._to.scale, easedProgress),
    });

    if (progress >= 1) {
      this.stop();
    }
  };

  private lerp(from: number, to: number, progress: number): number {
    return from + (to - from) * progress;
  }

  private easeOutCubic(progress: number): number {
    return 1 - Math.pow(1 - progress, 3);
  }
}
