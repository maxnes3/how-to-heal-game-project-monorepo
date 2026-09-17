import { PersistenceGameSaveService } from '@game/persistance';
import { ElectronGameSaveStorage } from '../storage/electron-game-save.storage';

const storage = new ElectronGameSaveStorage();
export const electronGameSaveService = new PersistenceGameSaveService(storage);
