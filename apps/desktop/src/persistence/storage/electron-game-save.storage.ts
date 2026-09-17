import type {
  PersistedGameSave,
  PersistedSaveSlot,
  PersistanceSaveStorage,
} from '@game/persistance';

export class ElectronGameSaveStorage implements PersistanceSaveStorage {
  public async get(slot: PersistedSaveSlot): Promise<PersistedGameSave | null> {
    return window.electronAPI.gameSave.load(slot);
  }

  public async set(slot: PersistedSaveSlot, save: PersistedGameSave): Promise<void> {
    await window.electronAPI.gameSave.save(save);
  }

  public async delete(slot: PersistedSaveSlot): Promise<void> {
    await window.electronAPI.gameSave.delete(slot);
  }

  public async exists(slot: PersistedSaveSlot): Promise<boolean> {
    return window.electronAPI.gameSave.exists(slot);
  }
}
