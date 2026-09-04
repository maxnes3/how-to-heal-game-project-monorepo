import { Container } from 'pixi.js';
import { PixiCardRenderer, type CardTransform } from '../card-renderer';
import type { DeckRenderer } from '../../interfaces';

export class PixiDeckRenderer implements DeckRenderer {
  public readonly container = new Container({
    sortableChildren: true,
  });
  private readonly cards: PixiCardRenderer[] = [];

  public constructor() {
    this.createCards(5);
  }

  private createCards(count: number): void {
    for (let index = 0; index < count; index++) {
      const card = new PixiCardRenderer();
      this.cards.push(card);
      this.container.addChild(card.container);
    }
  }

  public layout(screenWidth: number, screenHeight: number): void {
    this.container.position.set(screenWidth / 2, screenHeight);

    this.layoutCards();
  }

  private layoutCards(): void {
    const cardCount = this.cards.length;

    const spacing = 140;

    const startX = -((cardCount - 1) * spacing) / 2;

    this.cards.forEach((card, index) => {
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

  public destroy(): void {
    for (const card of this.cards) {
      card.destroy();
    }

    this.cards.length = 0;

    this.container.destroy({
      children: true,
    });
  }
}
