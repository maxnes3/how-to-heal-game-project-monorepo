import { Navigate, Route, Routes } from 'react-router';
import '@game/i18n';
import { GameScreen, MainScreen, SettingsScreen } from './screens';
import './globals.css';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MainScreen />} />
      <Route path="/game" element={<GameScreen />} />
      <Route path="/settings" element={<SettingsScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
