import { app, BrowserWindow } from 'electron';
import started from 'electron-squirrel-startup';
import { registerIpcHandlers } from './main/ipc';
import { createMainWindow } from './main/window';
import { registerKeyboardShortcuts } from './main/keyboard-shortcuts';

if (started) {
  app.quit();
}

const bootstrap = (): void => {
  registerIpcHandlers();
  const mainWindow = createMainWindow();
  registerKeyboardShortcuts(mainWindow);
};

app.whenReady().then(() => {
  bootstrap();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
