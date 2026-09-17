import type { DeckState } from '@game/core';
import type { PersistanceSaveStorage } from '../storage';
import type { FormatedGameSave, PersistedSaveSlot } from './models';
import { PersistedGameSaveMapper, type CreatePersistedGameSaveOptions } from './mappers';

export class PersistenceGameSaveService {
  private readonly _mapper: PersistedGameSaveMapper;

  public constructor(private readonly _storage: PersistanceSaveStorage) {
    this._mapper = new PersistedGameSaveMapper();
  }

  public async save(state: DeckState, options: CreatePersistedGameSaveOptions): Promise<void> {
    const existingSave = await this._storage.get(options.slot);

    const save = this._mapper.toPersistedGameSave(state, {
      ...options,
      createdAt: existingSave?.createdAt,
    });

    await this._storage.set(options.slot, save);
  }

  public async load(slot: PersistedSaveSlot): Promise<FormatedGameSave | null> {
    const loadedSave = await this._storage.get(slot);
    if (!loadedSave) {
      return null;
    }

    return this._mapper.toFormatedGameState(loadedSave);
  }

  public async delete(slot: PersistedSaveSlot): Promise<void> {
    await this._storage.delete(slot);
  }

  public async exists(slot: PersistedSaveSlot): Promise<boolean> {
    return this._storage.exists(slot);
  }
}
