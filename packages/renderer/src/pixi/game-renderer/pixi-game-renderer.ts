import { Application } from 'pixi.js';
import type { DeckState } from '@game/core';
import type { Store, Unsubscribe } from '@game/store';
import type { GameRenderer, GameRendererOptions } from '../../interfaces';
import { PixiDeckRenderer } from '../deck-renderer';

export class PixiGameRenderer implements GameRenderer {
  private readonly _app = new Application();
  private readonly _deckStore: Store<DeckState>;
  private readonly _deckRenderer: PixiDeckRenderer;
  private _initPromise: Promise<void> | null = null;
  private _destroyed = false;
  private _resizeObserver: ResizeObserver | null = null;
  private _unsubscribe: Unsubscribe | null = null;

  public constructor(options: GameRendererOptions) {
    this._deckStore = options.deckStore;
    this._deckRenderer = new PixiDeckRenderer();
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

    this._app.stage.addChild(this._deckRenderer.container);

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
    this._deckRenderer.layout(this._app.screen.width, this._app.screen.height);
  }
}
