import { Application } from 'pixi.js';
import type { GameRenderer } from '../interfaces';

export class PixiGameRenderer implements GameRenderer {
  private readonly app = new Application();
  private initPromise: Promise<void> | null = null;
  private destroyed = false;

  public async initialize(container: HTMLElement): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.app
      .init({
        resizeTo: container,
        background: '#111111',
        antialias: true,
      })
      .then(() => {
        if (this.destroyed) {
          return;
        }
        container.appendChild(this.app.canvas);
      });

    return this.initPromise;
  }

  public destroy(): void {
    this.destroyed = true;

    if (!this.initPromise) {
      return;
    }

    void this.initPromise.then(() => {
      if (!this.app.renderer) {
        return;
      }
      this.app.destroy(true, {
        children: true,
        texture: true,
      });
    });
  }
}
