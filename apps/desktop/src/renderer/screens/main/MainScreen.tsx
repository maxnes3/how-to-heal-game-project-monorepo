import React from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Panel, Text } from '@app/renderer/components';
import { AppRoutesEnum } from '@app/renderer/routes';

const MainScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('ui');

  const handleStartGameClick = () => {
    navigate(AppRoutesEnum.GAME);
  };

  const handleSettingsClick = () => {
    navigate(AppRoutesEnum.SETTINGS);
  };

  const handleExitClick = () => {
    window.electronAPI.app.quit();
  };

  return (
    <Panel>
      <Text variant="h1">{t('game.name')}</Text>
      <Button onClick={handleStartGameClick}>
        <Text>{t('menu.start_game')}</Text>
      </Button>
      <Button onClick={handleSettingsClick}>
        <Text>{t('menu.settings')}</Text>
      </Button>
      <Button onClick={handleExitClick}>
        <Text>{t('menu.exit')}</Text>
      </Button>
    </Panel>
  );
};

export default React.memo(MainScreen);
