import { Container, Graphics, type FederatedPointerEvent } from 'pixi.js';
import type { CardModel } from '@game/core';
import type {
  CardDropHandler,
  CardRenderer,
  CardRendererOptions,
  CardTransform,
} from '../../interfaces';

const DEFAULT_CARD_SCALE = 1;
const DEFAULT_CARD_WIDTH = 180;
const DEFAULT_CARD_HEIGHT = 252;
const DEFAULT_CARD_RADIUS = 16;

const CARD_HOVER_SCALE = 1.4;
const CARD_ACTIVE_Z_INDEX = 1000;

export class PixiCardRenderer implements CardRenderer {
  private readonly _card: CardModel;
  private readonly _onDrop?: CardDropHandler;
  private readonly _container = new Container();
  private readonly _graphics = new Graphics();
  private _layoutTransform: CardTransform = {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
  };
  private _isDragging = false;
  private _isHovered = false;
  private _dragOffset = {
    x: 0,
    y: 0,
  };

  public constructor(card: CardModel, onDrop?: CardDropHandler, options?: CardRendererOptions) {
    this._card = card;
    this._onDrop = onDrop;

    this.draw(options);

    this._container.addChild(this._graphics);
    this.initializeInteraction();
  }

  public setTransform(transform: CardTransform): void {
    this._layoutTransform = {
      ...transform,
      scale: transform.scale ?? 1,
    };

    if (!this._isHovered && !this._isDragging) {
      this.applyTransform(this._layoutTransform);
    }
  }

  public destroy(): void {
    this.removePointerEvents();
    this._container.destroy({
      children: true,
    });
  }

  public getContainer(): Container {
    return this._container;
  }

  private initializeInteraction(): void {
    this._container.eventMode = 'static';
    this._container.cursor = 'pointer';

    this._container.on('pointerover', this.handlePointerOver);
    this._container.on('pointerout', this.handlePointerOut);

    this._container.on('pointerdown', this.handlePointerDown);
    this._container.on('globalpointermove', this.handlePointerMove);
    this._container.on('pointerup', this.handlePointerUp);
    this._container.on('pointerupoutside', this.handlePointerUp);
  }

  private removePointerEvents(): void {
    this._container.off('pointerover', this.handlePointerOver);
    this._container.off('pointerout', this.handlePointerOut);

    this._container.off('pointerdown', this.handlePointerDown);
    this._container.off('globalpointermove', this.handlePointerMove);
    this._container.off('pointerup', this.handlePointerUp);
    this._container.off('pointerupoutside', this.handlePointerUp);
  }

  private handlePointerOver = (): void => {
    if (this._isDragging) {
      return;
    }

    this._isHovered = true;

    this._container.zIndex = CARD_ACTIVE_Z_INDEX;
    this.applyTransform({
      ...this._layoutTransform,
      rotation: 0,
      scale: CARD_HOVER_SCALE,
    });
  };

  private handlePointerOut = (): void => {
    if (this._isDragging) {
      return;
    }

    this._isHovered = false;
    this._container.zIndex = 0;
    this.applyTransform(this._layoutTransform);
  };

  private handlePointerDown = (event: FederatedPointerEvent): void => {
    this._isDragging = true;

    const position = this._container.position;

    this._dragOffset.x = event.global.x - position.x;
    this._dragOffset.y = event.global.y - position.y;

    this._container.zIndex = CARD_ACTIVE_Z_INDEX;
    this._container.rotation = 0;
    this._container.scale.set(DEFAULT_CARD_SCALE);

    event.stopPropagation();
  };

  private handlePointerMove = (event: FederatedPointerEvent): void => {
    if (!this._isDragging) {
      return;
    }

    this._container.position.set(
      event.global.x - this._dragOffset.x,
      event.global.y - this._dragOffset.y,
    );
  };

  private handlePointerUp = (): void => {
    if (!this._isDragging) {
      return;
    }

    this._isDragging = false;
    this._container.zIndex = 0;

    const globalPosition = this._container.getGlobalPosition();
    this._onDrop?.({
      card: this._card,
      position: {
        x: globalPosition.x,
        y: globalPosition.y,
      },
    });

    this.applyTransform(this._layoutTransform);
  };

  private applyTransform(transform: CardTransform): void {
    this._container.position.set(transform.x, transform.y);
    this._container.rotation = transform.rotation;
    this._container.scale.set(transform.scale ?? 1);
  }

  private draw(options?: CardRendererOptions): void {
    const width = options?.width ?? DEFAULT_CARD_WIDTH;
    const height = options?.height ?? DEFAULT_CARD_HEIGHT;

    this._graphics.clear();
    this._graphics.roundRect(-width / 2, -height / 2, width, height, DEFAULT_CARD_RADIUS).fill({
      color: 0xffffff,
    });
  }
}
