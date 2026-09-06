import { Container, Graphics, type FederatedPointerEvent } from 'pixi.js';
import type { CardModel } from '@game/core';
import type { CardRenderer, CardRendererOptions, CardTransform } from '../../interfaces';

const DEFAULT_CARD_WIDTH = 180;
const DEFAULT_CARD_HEIGHT = 252;

export class PixiCardRenderer implements CardRenderer {
  private readonly _card: CardModel;
  public readonly container = new Container();
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

  public constructor(card: CardModel, options?: CardRendererOptions) {
    this._card = card;

    this.draw({
      ...options,
      width: options?.width ?? DEFAULT_CARD_WIDTH,
      height: options?.height ?? DEFAULT_CARD_HEIGHT,
    });

    this.container.addChild(this._graphics);
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
    this.container.off('pointerdown', this.handlePointerDown);
    this.container.off('globalpointermove', this.handlePointerMove);
    this.container.off('pointerup', this.handlePointerUp);
    this.container.off('pointerupoutside', this.handlePointerUp);

    this.container.destroy({
      children: true,
    });
  }

  private initializeInteraction(): void {
    this.container.eventMode = 'static';
    this.container.cursor = 'pointer';

    this.container.on('pointerdown', this.handlePointerDown);
    this.container.on('globalpointermove', this.handlePointerMove);
    this.container.on('pointerup', this.handlePointerUp);
    this.container.on('pointerupoutside', this.handlePointerUp);
  }

  private handlePointerDown = (event: FederatedPointerEvent): void => {
    this._isDragging = true;

    const position = this.container.position;

    this._dragOffset.x = event.global.x - position.x;
    this._dragOffset.y = event.global.y - position.y;

    this.container.zIndex = 1000;
    this.container.rotation = 0;

    event.stopPropagation();
  };

  private handlePointerMove = (event: FederatedPointerEvent): void => {
    if (!this._isDragging) {
      return;
    }

    this.container.position.set(
      event.global.x - this._dragOffset.x,
      event.global.y - this._dragOffset.y,
    );
  };

  private handlePointerUp = (): void => {
    if (!this._isDragging) {
      return;
    }

    this._isDragging = false;
    this.container.zIndex = 0;

    this.applyTransform(this._initialTransform);
  };

  private applyTransform(transform: CardTransform): void {
    this.container.position.set(transform.x, transform.y);
    this.container.rotation = transform.rotation;
    this.container.scale.set(transform.scale ?? 1);
  }

  private draw(options: CardRendererOptions): void {
    const { width, height } = options;

    this._graphics.roundRect(-width / 2, -height / 2, width, height, 16).fill({
      color: 0xffffff,
    });
  }
}
