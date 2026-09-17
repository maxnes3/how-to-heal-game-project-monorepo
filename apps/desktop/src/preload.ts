import { contextBridge, ipcRenderer } from 'electron';
import type { PersistedGameSave, PersistedSaveSlot } from '@game/persistance';
import { GameSaveIpcChannel } from '@app/shared';

const electronAPI = {
  app: {
    quit(): void {
      ipcRenderer.send('app:quit');
    },
  },
  gameSave: {
    save(save: PersistedGameSave): Promise<void> {
      return ipcRenderer.invoke(GameSaveIpcChannel.Save, save);
    },
    load(slot: PersistedSaveSlot): Promise<PersistedGameSave | null> {
      return ipcRenderer.invoke(GameSaveIpcChannel.Load, slot);
    },
    delete(slot: PersistedSaveSlot): Promise<void> {
      return ipcRenderer.invoke(GameSaveIpcChannel.Delete, slot);
    },
    exists(slot: PersistedSaveSlot): Promise<boolean> {
      return ipcRenderer.invoke(GameSaveIpcChannel.Exists, slot);
    },
  },
};

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
