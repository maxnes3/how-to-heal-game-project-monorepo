import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router';
import { initializeDesktopI18n } from './renderer/i18n/initialize';
import App from './renderer/App';

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element not found');
}

const bootstrap = async (): Promise<void> => {
  await initializeDesktopI18n();

  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <HashRouter>
        <App />
      </HashRouter>
    </React.StrictMode>,
  );
};

void bootstrap();
