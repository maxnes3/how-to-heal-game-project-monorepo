import { CardModel, type DeckState } from '@game/core';
import type { FormatedGameSave, PersistedGameSave, PersistedSaveSlot } from '../models';

export interface CreatePersistedGameSaveOptions {
  slot: PersistedSaveSlot;
  screen: string;
  createdAt?: string;
}

export class PersistedGameSaveMapper {
  public toPersistedGameSave(
    state: DeckState,
    options: CreatePersistedGameSaveOptions,
  ): PersistedGameSave {
    const now = new Date().toISOString();

    return {
      slot: options.slot,
      screen: options.screen,
      deck: {
        handCards: state.handCards.map((card) => ({
          id: card.getId(),
        })),
      },
      createdAt: options.createdAt ?? now,
      updatedAt: now,
    };
  }

  public toFormatedGameState(save: PersistedGameSave): FormatedGameSave {
    return {
      screen: save.screen,
      deck: {
        handCards: save.deck.handCards.map((card) => new CardModel(card.id)),
      },
      createdAt: save.createdAt,
      updatedAt: save.updatedAt,
    };
  }
}
