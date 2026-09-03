import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Panel, Text } from '@app/renderer/components';

const MainScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('ui');

  const handleStartGameClick = () => {
    navigate('/game');
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleExitClick = () => {
    window.electronAPI.app.quit();
  };

  return (
    <Panel>
      <Text>{t('game.title')}</Text>
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

export default MainScreen;
