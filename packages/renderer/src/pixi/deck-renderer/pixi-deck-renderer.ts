import { Container } from 'pixi.js';
import type { CardModel } from '@game/core';
import type { CardTransform, DeckRenderer } from '../../interfaces';
import { PixiCardRenderer } from '../card-renderer';

export type CardDropHandler = (card: CardModel) => void;

export interface PixiDeckRendererOptions {
  onCardDrop?: CardDropHandler;
}

export class PixiDeckRenderer implements DeckRenderer {
  private readonly _cards = new Map<string, PixiCardRenderer>();
  public readonly container = new Container({
    sortableChildren: true,
  });

  public render(cards: CardModel[]): void {
    this.synchronizeCards(cards);

    this.layoutCards();
  }

  public layout(screenWidth: number, screenHeight: number): void {
    this.container.position.set(screenWidth / 2, screenHeight);

    this.layoutCards();
  }

  public destroy(): void {
    for (const card of this._cards.values()) {
      card.destroy();
    }
    this._cards.clear();

    this.container.destroy({
      children: true,
    });
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
      if (this._cards.has(card.getId())) {
        continue;
      }

      const cardRenderer = new PixiCardRenderer(card);
      this._cards.set(card.getId(), cardRenderer);
      this.container.addChild(cardRenderer.container);
    }
  }

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
