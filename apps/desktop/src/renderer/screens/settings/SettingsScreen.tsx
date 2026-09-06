import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Article, Text, SettingsArticle } from '@app/renderer/components';
import { AppRoutesEnum } from '@app/renderer/routes';

const SettingsScreen = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('ui');

  const handleBackToMainScreenClick = useCallback(() => {
    navigate(AppRoutesEnum.MAIN);
  }, []);

  return (
    <Article>
      <Text variant="h1">{t('game.name')}</Text>
      <SettingsArticle onBackClick={handleBackToMainScreenClick} />
    </Article>
  );
};

export default React.memo(SettingsScreen);
