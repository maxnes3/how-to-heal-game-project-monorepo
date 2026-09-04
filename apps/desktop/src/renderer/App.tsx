import AppRoutes from './routes';
import { MenuModal, ModalOverlay } from './components';
import { ModalProvider } from './contexts';
import './globals.css';

export default function App() {
  return (
    <ModalProvider>
      <AppRoutes />
      <ModalOverlay>
        <MenuModal />
      </ModalOverlay>
    </ModalProvider>
  );
}
