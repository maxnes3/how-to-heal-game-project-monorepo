import type { PersistedGameSave, PersistedSaveSlot } from '@game/persistance';

interface ElectronAPI {
  app: {
    quit(): void;
  };
  gameSave: {
    save(save: PersistedGameSave): Promise<void>;
    load(slot: PersistedSaveSlot): Promise<PersistedGameSave | null>;
    delete(slot: PersistedSaveSlot): Promise<void>;
    exists(slot: PersistedSaveSlot): Promise<boolean>;
  };
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}

export {};
