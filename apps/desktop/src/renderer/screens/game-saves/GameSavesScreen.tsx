import React, { useCallback } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import type { PersistedSaveSlot, FormatedGameSave } from '@game/persistance';
import { Article, GameSavesArticle, Text } from '@app/renderer/components';
import { AppRoutesEnum } from '@app/renderer/routes';
import { electronGameSaveService } from '@app/persistence/service';
import { deckStore } from '@app/renderer/stores';

const GameSavesScreen: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation('ui');

  const handleCreateSaveSlot = useCallback(async (slot: PersistedSaveSlot): Promise<void> => {
    const state = deckStore.getState();
    await electronGameSaveService.save(state, {
      slot,
      screen: AppRoutesEnum.GAME,
    });
    navigate(AppRoutesEnum.GAME);
  }, []);

  const handleLoadSaveSlot = useCallback((save: FormatedGameSave): Promise<void> | void => {
    deckStore.setState(save.deck);
    navigate(save.screen);
  }, []);

  const handleBackToMainMenu = useCallback(() => {
    navigate(AppRoutesEnum.MAIN);
  }, []);

  return (
    <Article>
      <Text variant="h1">{t('game.name')}</Text>
      <GameSavesArticle
        onCreateSaveSlot={handleCreateSaveSlot}
        onLoadSaveSlot={handleLoadSaveSlot}
        onBack={handleBackToMainMenu}
      />
    </Article>
  );
};

export default React.memo(GameSavesScreen);
