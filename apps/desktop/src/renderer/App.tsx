import AppRoutes from './routes';
import { ModalOverlay, PauseModal, SettingsModal } from './components';
import { ModalProvider } from './contexts';
import './globals.css';

export default function App() {
  return (
    <ModalProvider>
      <AppRoutes />
      <ModalOverlay>
        <PauseModal />
        <SettingsModal />
      </ModalOverlay>
    </ModalProvider>
  );
}
