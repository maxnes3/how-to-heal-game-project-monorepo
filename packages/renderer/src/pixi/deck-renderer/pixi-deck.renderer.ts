import { Container } from 'pixi.js';
import type { CardModel } from '@game/core';
import type { CardDropEvent, CardDropHandler, CardTransform, DeckRenderer } from '../../interfaces';
import { PixiCardRenderer } from '../card-renderer';

export interface PixiDeckRendererOptions {
  onCardDrop?: CardDropHandler;
}

export class PixiDeckRenderer implements DeckRenderer {
  private readonly _container = new Container({
    sortableChildren: true,
  });
  private readonly _cards = new Map<string, PixiCardRenderer>();
  private readonly _onCardDrop?: CardDropHandler;

  public constructor(options?: PixiDeckRendererOptions) {
    this._onCardDrop = options?.onCardDrop;
  }

  public render(cards: CardModel[]): void {
    this.synchronizeCards(cards);
    this.layoutCards();
  }

  public layout(screenWidth: number, screenHeight: number): void {
    this._container.position.set(screenWidth / 2, screenHeight);
    this.layoutCards();
  }

  public destroy(): void {
    for (const card of this._cards.values()) {
      card.destroy();
    }
    this._cards.clear();

    this._container.destroy({
      children: true,
    });
  }

  public getContainer(): Container {
    return this._container;
  }

  private synchronizeCards(cards: CardModel[]): void {
    const cardIds = new Set(cards.map((card) => card.getId()));

    for (const [cardId, renderer] of this._cards) {
      if (cardIds.has(cardId)) {
        continue;
      }

      renderer.destroy();
      this._cards.delete(cardId);
    }

    for (const card of cards) {
      const cardId = card.getId();
      if (this._cards.has(cardId)) {
        continue;
      }

      const cardRenderer = new PixiCardRenderer(card, this.handleCardDrop);
      this._cards.set(cardId, cardRenderer);
      this._container.addChild(cardRenderer.getContainer());
    }
  }

  private handleCardDrop = (event: CardDropEvent): void => {
    this._onCardDrop?.(event);
  };

  private layoutCards(): void {
    const cards = Array.from(this._cards.values());

    const cardCount = cards.length;
    if (cardCount === 0) {
      return;
    }

    const spacing = 140;
    const startX = -((cardCount - 1) * spacing) / 2;

    cards.forEach((card, index) => {
      const transform = this.calculateCardTransform(index, cardCount, startX, spacing);
      card.setTransform(transform);
    });
  }

  private calculateCardTransform(
    index: number,
    cardCount: number,
    startX: number,
    spacing: number,
  ): CardTransform {
    const x = startX + index * spacing;
    const normalized = cardCount === 1 ? 0 : index / (cardCount - 1);
    const centered = normalized - 0.5;

    return {
      x,
      y: -220 + centered * centered * 120,
      rotation: centered * 0.6,
    };
  }
}
