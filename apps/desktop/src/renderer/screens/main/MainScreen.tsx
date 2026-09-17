import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Article, Text } from '@app/renderer/components';
import { AppRoutesEnum } from '@app/renderer/routes';

const MainScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('ui');

  const handleStartGameClick = useCallback(() => {
    navigate(AppRoutesEnum.GAME_SAVES);
  }, []);

  const handleNavigateToSettingsClick = useCallback(() => {
    navigate(AppRoutesEnum.SETTINGS);
  }, []);

  const handleExitClick = useCallback(() => {
    window.electronAPI.app.quit();
  }, []);

  return (
    <Article>
      <Text variant="h1">{t('game.name')}</Text>
      <Button onClick={handleStartGameClick}>
        <Text>{t('menu.start_game')}</Text>
      </Button>
      <Button onClick={handleNavigateToSettingsClick}>
        <Text>{t('menu.settings')}</Text>
      </Button>
      <Button onClick={handleExitClick}>
        <Text>{t('menu.exit')}</Text>
      </Button>
    </Article>
  );
};

export default React.memo(MainScreen);
