import { Application, type PointData } from 'pixi.js';
import type { CardModel, DeckState } from '@game/core';
import type { WritableStore, Unsubscribe } from '@game/store';
import type {
  GameRenderer,
  GameRendererOptions,
  ExecuteZoneBounds,
  CardDropEvent,
} from '../../interfaces';
import { PixiDeckRenderer } from '../deck';
import { PixiExecuteZoneRenderer } from '../execute-zone';

export class PixiGameRenderer implements GameRenderer {
  private readonly _app = new Application();
  private readonly _deckStore: WritableStore<DeckState>;
  private readonly _deckRenderer: PixiDeckRenderer;
  private readonly _executeZoneRenderer = new PixiExecuteZoneRenderer();
  private _initPromise: Promise<void> | null = null;
  private _destroyed = false;
  private _resizeObserver: ResizeObserver | null = null;
  private _unsubscribe: Unsubscribe | null = null;

  public constructor(options: GameRendererOptions) {
    this._deckStore = options.deckStore;
    this._deckRenderer = new PixiDeckRenderer({
      onCardDrop: this.handleCardDrop,
    });
  }

  public initialize(container: HTMLElement): Promise<void> {
    if (this._initPromise) {
      return this._initPromise;
    }

    this._initPromise = this.initializeApplication(container);
    return this._initPromise;
  }

  public destroy(): void {
    this._destroyed = true;

    this._unsubscribe?.();
    this._unsubscribe = null;

    this._resizeObserver?.disconnect();
    this._resizeObserver = null;

    if (!this._initPromise) {
      return;
    }

    void this._initPromise.then(() => {
      this._deckRenderer.destroy();
      this._app.destroy(
        {
          removeView: true,
        },
        {
          children: true,
          texture: true,
          textureSource: true,
          context: true,
        },
      );
    });
  }

  private async initializeApplication(container: HTMLElement): Promise<void> {
    await this._app.init({
      resizeTo: container,
      background: '#111111',
      antialias: true,
    });

    if (this._destroyed) {
      return;
    }

    container.appendChild(this._app.canvas);

    this._app.stage.addChild(
      this._executeZoneRenderer.getContainer(),
      this._deckRenderer.getContainer(),
    );

    this.renderInitialState();
    this.subscribeToState();

    this.layout();

    this.initializeResizeObserver(container);
  }

  private renderInitialState(): void {
    const state = this._deckStore.getState();
    this._deckRenderer.render(state.handCards);
  }

  private subscribeToState(): void {
    this._unsubscribe = this._deckStore.subscribe((state) => {
      this._deckRenderer.render(state.handCards);
    });
  }

  private initializeResizeObserver(container: HTMLElement): void {
    this._resizeObserver = new ResizeObserver(() => {
      if (this._destroyed) {
        return;
      }

      this.layout();
    });

    this._resizeObserver.observe(container);
  }

  private layout(): void {
    const width = this._app.screen.width;
    const height = this._app.screen.height;

    this._executeZoneRenderer.render(this.getExecuteZoneBounds());
    this._deckRenderer.layout(width, height);
  }

  private handleCardDrop = (event: CardDropEvent): void => {
    const executeZone = this.getExecuteZoneBounds();
    if (!this.isPointInsideBounds(event.position, executeZone)) {
      this._deckRenderer.render(this._deckStore.getState().handCards);
      return;
    }

    this.executeCard(event.card);
  };

  private executeCard(card: CardModel): void {
    this._deckStore.setState((previousState) => ({
      ...previousState,
      handCards: previousState.handCards.filter(
        (currentCard) => currentCard.getId() !== card.getId(),
      ),
    }));
  }

  private getExecuteZoneBounds(): ExecuteZoneBounds {
    const width = this._app.screen.width;
    const height = this._app.screen.height;

    return {
      x: width * 0.25,
      y: height * 0.1,
      width: width * 0.5,
      height: height * 0.5,
    };
  }

  private isPointInsideBounds(point: PointData, bounds: ExecuteZoneBounds): boolean {
    return (
      point.x >= bounds.x &&
      point.x <= bounds.x + bounds.width &&
      point.y >= bounds.y &&
      point.y <= bounds.y + bounds.height
    );
  }
}
