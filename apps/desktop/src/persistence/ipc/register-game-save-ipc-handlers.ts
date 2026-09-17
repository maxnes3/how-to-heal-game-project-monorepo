import { ipcMain } from 'electron';
import type { PersistedGameSave, PersistedSaveSlot } from '@game/persistance';
import { GameSaveIpcChannel } from '@app/shared';
import { ElectronPersistanceSaveStorage } from '../storage/electron-persistance.storage';

const electronPersistanceSaveStorage = new ElectronPersistanceSaveStorage();

export const registerGameSaveIpcHandlers = (): void => {
  ipcMain.handle(
    GameSaveIpcChannel.Save,
    async (_event, save: PersistedGameSave): Promise<void> => {
      await electronPersistanceSaveStorage.set(save.slot, save);
    },
  );

  ipcMain.handle(
    GameSaveIpcChannel.Load,
    async (_event, slot: PersistedSaveSlot): Promise<PersistedGameSave | null> => {
      return electronPersistanceSaveStorage.get(slot);
    },
  );

  ipcMain.handle(
    GameSaveIpcChannel.Delete,
    async (_event, slot: PersistedSaveSlot): Promise<void> => {
      await electronPersistanceSaveStorage.delete(slot);
    },
  );

  ipcMain.handle(
    GameSaveIpcChannel.Exists,
    async (_event, slot: PersistedSaveSlot): Promise<boolean> => {
      return electronPersistanceSaveStorage.exists(slot);
    },
  );
};
