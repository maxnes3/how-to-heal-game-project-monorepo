import type { PersistedGameSave, PersistedSaveSlot } from '../save/models';

export interface PersistanceSaveStorage {
  get(slot: PersistedSaveSlot): Promise<PersistedGameSave | null>;
  set(slot: PersistedSaveSlot, save: PersistedGameSave): Promise<void>;
  delete(slot: PersistedSaveSlot): Promise<void>;
  exists(slot: PersistedSaveSlot): Promise<boolean>;
}
