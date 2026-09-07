import { Container, Graphics } from 'pixi.js';

import type { ExecuteZoneBounds, ExecuteZoneRenderer } from '../../interfaces';

const BORDER_COLOR = 0xffffff;
const BORDER_WIDTH = 3;
const BORDER_ALPHA = 0.8;

export class PixiExecuteZoneRenderer implements ExecuteZoneRenderer {
  private readonly _container = new Container();
  private readonly _graphics = new Graphics();

  public constructor() {
    this._container.addChild(this._graphics);
  }

  public render(bounds: ExecuteZoneBounds): void {
    this.draw(bounds);
  }

  public getContainer(): Container {
    return this._container;
  }

  public destroy(): void {
    this._container.destroy({
      children: true,
    });
  }

  private draw(bounds: ExecuteZoneBounds): void {
    const { x, y, width, height } = bounds;

    this._graphics.clear();
    this._graphics.rect(x, y, width, height).stroke({
      color: BORDER_COLOR,
      width: BORDER_WIDTH,
      alpha: BORDER_ALPHA,
    });
  }
}
