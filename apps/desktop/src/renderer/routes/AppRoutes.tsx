import { Navigate, Route, Routes } from 'react-router';
import { MainScreen, GameScreen, GameSavesScreen, SettingsScreen } from '../screens';
import { AppRoutesEnum } from './routes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path={AppRoutesEnum.MAIN} element={<MainScreen />} />
      <Route path={AppRoutesEnum.GAME} element={<GameScreen />} />
      <Route path={AppRoutesEnum.GAME_SAVES} element={<GameSavesScreen />} />
      <Route path={AppRoutesEnum.SETTINGS} element={<SettingsScreen />} />
      <Route path="*" element={<Navigate to={AppRoutesEnum.MAIN} replace />} />
    </Routes>
  );
};

export default AppRoutes;
