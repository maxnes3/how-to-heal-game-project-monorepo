import { Application } from 'pixi.js';
import type { GameRenderer } from '../interfaces';

export class PixiGameRenderer implements GameRenderer {
  private readonly app = new Application();

  public async initialize(container: HTMLElement): Promise<void> {
    await this.app.init({
      resizeTo: container,
      background: '#111111',
      antialias: true,
    });

    container.appendChild(this.app.canvas);
  }

  public destroy(): void {
    this.app.destroy(true, {
      children: true,
      texture: true,
    });
  }
}
