import type { BrowserWindow } from 'electron';

export const registerKeyboardShortcuts = (window: BrowserWindow): void => {
  window.webContents.on('before-input-event', (event, input) => {
    const key = input.key.toLowerCase();

    const isDevToolsShortcut =
      input.key === 'F12' ||
      (input.control && input.shift && key === 'i') ||
      (input.meta && input.alt && key === 'i');

    const isReloadShortcut = input.key === 'F5' || ((input.control || input.meta) && key === 'r');

    if (isDevToolsShortcut || isReloadShortcut) {
      event.preventDefault();
    }
  });
};
