import { CardModel, type GameState } from '@game/core';
import type { PersistedGameSave, PersistedSaveSlot, RestoredGameSave } from '../models';

export interface CreatePersistedGameSaveOptions {
  slot: PersistedSaveSlot;
  screen: string;
  createdAt?: string;
}

export class PersistedGameSaveMapper {
  public toPersistedGameSave(
    state: GameState,
    options: CreatePersistedGameSaveOptions,
  ): PersistedGameSave {
    const now = new Date().toISOString();

    return {
      slot: options.slot,
      screen: options.screen,
      game: {
        deck: {
          handCards: state.deck.handCards.map((card) => ({
            id: card.getId(),
          })),
        },
      },
      createdAt: options.createdAt ?? now,
      updatedAt: now,
    };
  }

  public toRestoredGameSave(save: PersistedGameSave): RestoredGameSave {
    return {
      screen: save.screen,
      game: {
        deck: {
          handCards: save.game.deck.handCards.map((card) => new CardModel(card.id)),
        },
      },
      createdAt: save.createdAt,
      updatedAt: save.updatedAt,
    };
  }
}
