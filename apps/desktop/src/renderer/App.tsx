import { Navigate, Route, Routes } from 'react-router';
import { MenuModal, ModalOverlay } from './components';
import { ModalProvider } from './contexts';
import { GameScreen, MainScreen, SettingsScreen } from './screens';
import './globals.css';

export default function App() {
  return (
    <ModalProvider>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/game" element={<GameScreen />} />
        <Route path="/settings" element={<SettingsScreen />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ModalOverlay>
        <MenuModal />
      </ModalOverlay>
    </ModalProvider>
  );
}
