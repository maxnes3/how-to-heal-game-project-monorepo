import { Container, Graphics, type FederatedPointerEvent } from 'pixi.js';
import type { CardModel } from '@game/core';
import type {
  CardDropHandler,
  CardRenderer,
  CardRendererOptions,
  CardTransform,
} from '../../interfaces';

const DEFAULT_CARD_WIDTH = 180;
const DEFAULT_CARD_HEIGHT = 252;
const DEFAULT_CARD_RADIUS = 16;

export class PixiCardRenderer implements CardRenderer {
  private readonly _card: CardModel;
  private readonly _onDrop?: CardDropHandler;
  private readonly _container = new Container();
  private readonly _graphics = new Graphics();
  private _currentTransform: CardTransform = {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
  };
  private _initialTransform: CardTransform = {
    x: 0,
    y: 0,
    rotation: 0,
    scale: 1,
  };
  private _isDragging = false;
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
    const normalizedTransform: CardTransform = {
      ...transform,
      scale: transform.scale ?? 1,
    };

    this._currentTransform = normalizedTransform;

    if (!this._isDragging) {
      this._initialTransform = {
        ...normalizedTransform,
      };
    }

    this.applyTransform(normalizedTransform);
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

    this._container.on('pointerdown', this.handlePointerDown);
    this._container.on('globalpointermove', this.handlePointerMove);
    this._container.on('pointerup', this.handlePointerUp);
    this._container.on('pointerupoutside', this.handlePointerUp);
  }

  private removePointerEvents(): void {
    this._container.off('pointerdown', this.handlePointerDown);
    this._container.off('globalpointermove', this.handlePointerMove);
    this._container.off('pointerup', this.handlePointerUp);
    this._container.off('pointerupoutside', this.handlePointerUp);
  }

  private handlePointerDown = (event: FederatedPointerEvent): void => {
    this._isDragging = true;

    const position = this._container.position;

    this._dragOffset.x = event.global.x - position.x;
    this._dragOffset.y = event.global.y - position.y;

    this._container.zIndex = 1000;
    this._container.rotation = 0;

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

    this.applyTransform(this._initialTransform);
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
