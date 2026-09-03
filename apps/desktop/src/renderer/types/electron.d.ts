export {};

declare global {
  interface Window {
    electronAPI: {
      app: {
        quit: () => void;
      };
    };
  }
}
