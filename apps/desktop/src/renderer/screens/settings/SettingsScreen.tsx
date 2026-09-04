import React from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button, Panel, Text } from '@app/renderer/components';
import { AppRoutesEnum } from '@app/renderer/routes';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('ui');

  const handleBackToMainScreenClick = () => {
    navigate(AppRoutesEnum.MAIN);
  };

  const handleSaveSettingsClick = () => {};

  return (
    <Panel>
      <Text variant="h1">{t('game.name')}</Text>
      <Button onClick={handleBackToMainScreenClick}>
        <Text>{t('settings.back')}</Text>
      </Button>
      <Button type="submit" onClick={handleSaveSettingsClick}>
        <Text>{t('settings.save')}</Text>
      </Button>
    </Panel>
  );
};

export default React.memo(SettingsScreen);
