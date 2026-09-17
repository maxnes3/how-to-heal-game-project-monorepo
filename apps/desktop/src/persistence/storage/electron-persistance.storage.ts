import { app } from 'electron';
import { access, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type {
  PersistedGameSave,
  PersistedSaveSlot,
  PersistanceSaveStorage,
} from '@game/persistance';

export class ElectronPersistanceSaveStorage implements PersistanceSaveStorage {
  private readonly _directoryPath: string;

  public constructor() {
    this._directoryPath = path.join(app.getPath('userData'), 'game-saves');
  }

  public async get(slot: PersistedSaveSlot): Promise<PersistedGameSave | null> {
    try {
      const content = await readFile(this.getFilePath(slot), 'utf-8');
      return JSON.parse(content) as PersistedGameSave;
    } catch {
      return null;
    }
  }

  public async set(slot: PersistedSaveSlot, save: PersistedGameSave): Promise<void> {
    await mkdir(this._directoryPath, {
      recursive: true,
    });

    await writeFile(this.getFilePath(slot), JSON.stringify(save, null, 2), 'utf-8');
  }

  public async delete(slot: PersistedSaveSlot): Promise<void> {
    await rm(this.getFilePath(slot), {
      force: true,
    });
  }

  public async exists(slot: PersistedSaveSlot): Promise<boolean> {
    try {
      await access(this.getFilePath(slot));
      return true;
    } catch {
      return false;
    }
  }

  private getFilePath(slot: PersistedSaveSlot): string {
    return path.join(this._directoryPath, `slot-${slot}.json`);
  }
}
