import { app, ipcMain } from 'electron';

export const registerIpcHandlers = (): void => {
  ipcMain.on('app:quit', () => {
    app.quit();
  });
};
