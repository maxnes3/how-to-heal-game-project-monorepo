import { Container, Graphics, type FederatedPointerEvent } from 'pixi.js';
import type { CardModel } from '@game/core';
import type {
  AnimationBounds,
  CardDropHandler,
  CardRenderer,
  CardRendererOptions,
  CardTransform,
} from '../../interfaces';
import { PixiAnimationController } from '../animation';

const DEFAULT_CARD_SCALE = 1;
const DEFAULT_CARD_WIDTH = 180;
const DEFAULT_CARD_HEIGHT = 252;
const DEFAULT_CARD_RADIUS = 16;

const CARD_HOVER_SCALE = 1.4;
const CARD_ACTIVE_Z_INDEX = 1000;

const CARD_HOVER_ANIMATION_DURATION = 180;
const CARD_DRAG_ANIMATION_DURATION = 100;
const CARD_LAYOUT_ANIMATION_DURATION = 250;

export class PixiCardRenderer implements CardRenderer {
  private readonly _card: CardModel;
  private readonly _onDrop?: CardDropHandler;
  private readonly _container = new Container();
  private readonly _graphics = new Graphics();
  private readonly _animation: PixiAnimationController;
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

    this._animation = new PixiAnimationController(this.handleAnimationUpdate);

    this.draw(options);

    this._container.addChild(this._graphics);
    this.initializeInteraction();
  }

  public setTransform(transform: CardTransform): void {
    this._layoutTransform = {
      ...transform,
      scale: transform.scale ?? DEFAULT_CARD_SCALE,
    };

    if (this._isHovered || this._isDragging) {
      return;
    }

    this.animateTo(this._layoutTransform, CARD_LAYOUT_ANIMATION_DURATION);
  }

  public destroy(): void {
    this._animation.destroy();
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
    this.animateTo(
      {
        ...this._layoutTransform,
        rotation: 0,
        scale: CARD_HOVER_SCALE,
      },
      CARD_HOVER_ANIMATION_DURATION,
    );
  };

  private handlePointerOut = (): void => {
    if (this._isDragging) {
      return;
    }

    this._isHovered = false;
    this._container.zIndex = DEFAULT_CARD_SCALE;
    this.animateTo(this._layoutTransform, CARD_HOVER_ANIMATION_DURATION);
  };

  private handlePointerDown = (event: FederatedPointerEvent): void => {
    this._isDragging = true;

    const position = this._container.position;

    this._dragOffset.x = event.global.x - position.x;
    this._dragOffset.y = event.global.y - position.y;

    this._container.zIndex = CARD_ACTIVE_Z_INDEX;
    this.animateTo(
      {
        ...this._layoutTransform,
        rotation: 0,
        scale: DEFAULT_CARD_SCALE,
      },
      CARD_DRAG_ANIMATION_DURATION,
    );

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

    this.animateTo(this._layoutTransform, CARD_LAYOUT_ANIMATION_DURATION);
  };

  private animateTo(transform: CardTransform, duration: number): void {
    const current: AnimationBounds = {
      x: this._container.x,
      y: this._container.y,
      rotation: this._container.rotation,
      scale: this._container.scale.x,
    };

    const target: AnimationBounds = {
      x: transform.x,
      y: transform.y,
      rotation: transform.rotation,
      scale: transform.scale ?? DEFAULT_CARD_SCALE,
    };

    this._animation.animate(current, target, duration);
  }

  private handleAnimationUpdate = (values: AnimationBounds): void => {
    this._container.position.set(values.x, values.y);
    this._container.rotation = values.rotation;
    this._container.scale.set(values.scale);
  };

  private draw(options?: CardRendererOptions): void {
    const width = options?.width ?? DEFAULT_CARD_WIDTH;
    const height = options?.height ?? DEFAULT_CARD_HEIGHT;

    this._graphics.clear();
    this._graphics.roundRect(-width / 2, -height / 2, width, height, DEFAULT_CARD_RADIUS).fill({
      color: 0xffffff,
    });
  }
}
