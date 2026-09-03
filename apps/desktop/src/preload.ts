import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  app: {
    quit: () => {
      ipcRenderer.send('app:quit');
    },
  },
});
