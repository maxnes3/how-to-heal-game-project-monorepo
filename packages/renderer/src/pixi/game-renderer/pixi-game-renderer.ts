import { Application } from 'pixi.js';
import { PixiDeckRenderer } from '../deck-renderer';
import type { GameRenderer } from '../../interfaces';

export class PixiGameRenderer implements GameRenderer {
  private readonly app = new Application();
  private readonly deckRenderer = new PixiDeckRenderer();
  private initPromise: Promise<void> | null = null;
  private destroyed = false;
  private resizeObserver: ResizeObserver | null = null;

  public initialize(container: HTMLElement): Promise<void> {
    if (this.initPromise) {
      return this.initPromise;
    }

    this.initPromise = this.initializeApplication(container);

    return this.initPromise;
  }

  public destroy(): void {
    this.destroyed = true;

    this.resizeObserver?.disconnect();

    this.resizeObserver = null;

    if (!this.initPromise) {
      return;
    }

    void this.initPromise.then(() => {
      this.deckRenderer.destroy();

      this.app.destroy(
        {
          removeView: true,
        },
        {
          children: true,
          texture: true,
          textureSource: true,
          context: true,
        },
      );
    });
  }

  private async initializeApplication(container: HTMLElement): Promise<void> {
    await this.app.init({
      resizeTo: container,
      background: '#111111',
      antialias: true,
    });

    if (this.destroyed) {
      return;
    }

    container.appendChild(this.app.canvas);

    this.app.stage.addChild(this.deckRenderer.container);

    this.layout();

    this.initializeResizeObserver(container);
  }

  private initializeResizeObserver(container: HTMLElement): void {
    this.resizeObserver = new ResizeObserver(() => {
      if (this.destroyed) {
        return;
      }

      this.layout();
    });

    this.resizeObserver.observe(container);
  }

  private layout(): void {
    this.deckRenderer.layout(this.app.screen.width, this.app.screen.height);
  }
}
