import { Container } from 'pixi.js';
import type { CardModel } from '@game/core';
import { PixiCardRenderer, type CardTransform } from '../card-renderer';
import type { DeckRenderer } from '../../interfaces';

export class PixiDeckRenderer implements DeckRenderer {
  public readonly container = new Container({
    sortableChildren: true,
  });

  private readonly cards = new Map<string, PixiCardRenderer>();

  public render(cards: CardModel[]): void {
    this.synchronizeCards(cards);

    this.layoutCards();
  }

  public layout(screenWidth: number, screenHeight: number): void {
    this.container.position.set(screenWidth / 2, screenHeight);

    this.layoutCards();
  }

  public destroy(): void {
    for (const card of this.cards.values()) {
      card.destroy();
    }

    this.cards.clear();

    this.container.destroy({
      children: true,
    });
  }

  private synchronizeCards(cards: CardModel[]): void {
    const cardIds = new Set(cards.map((card) => card.getId()));

    for (const [cardId, renderer] of this.cards) {
      if (cardIds.has(cardId)) {
        continue;
      }

      renderer.destroy();

      this.cards.delete(cardId);
    }

    for (const card of cards) {
      if (this.cards.has(card.getId())) {
        continue;
      }

      const cardRenderer = new PixiCardRenderer({
        width: 180,
        height: 252,
      });
      this.cards.set(card.getId(), cardRenderer);

      this.container.addChild(cardRenderer.container);
    }
  }

  private layoutCards(): void {
    const cards = Array.from(this.cards.values());

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
