import { useCallback, useEffect, useState } from 'react';
import { PersistedSaveSlot, type RestoredGameSave } from '@game/persistance';
import { electronGameSaveService } from '@app/persistence/service';
import { Article } from '../../article';
import { GameSaveTemplate } from '../template';
import { Button } from '../../button';
import styles from './GameSavesArticle.module.css';

const SAVE_SLOTS: PersistedSaveSlot[] = [
  PersistedSaveSlot.FIRST,
  PersistedSaveSlot.SECOND,
  PersistedSaveSlot.THIRD,
];

type SavesBySlot = Record<PersistedSaveSlot, RestoredGameSave | null>;

const createInitialSavesState = (): SavesBySlot => {
  return {
    [PersistedSaveSlot.FIRST]: null,
    [PersistedSaveSlot.SECOND]: null,
    [PersistedSaveSlot.THIRD]: null,
  };
};

interface Props {
  onCreateSaveSlot: (slot: PersistedSaveSlot) => Promise<void>;
  onLoadSaveSlot: (save: RestoredGameSave) => Promise<void> | void;
  onBack: VoidFunction;
}

const GameSavesArticle: React.FC<Props> = ({ onCreateSaveSlot, onLoadSaveSlot, onBack }) => {
  const [saves, setSaves] = useState<SavesBySlot>(createInitialSavesState);
  const [isLoading, setIsLoading] = useState(true);

  const loadSaves = useCallback(async () => {
    setIsLoading(true);

    try {
      const saveEntries = await Promise.all(
        SAVE_SLOTS.map(async (slot) => {
          const save = await electronGameSaveService.load(slot);
          return [slot, save] as const;
        }),
      );

      setSaves(() => {
        const nextState = createInitialSavesState();
        for (const [slot, save] of saveEntries) {
          nextState[slot] = save;
        }
        return nextState;
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadSaves();
  }, [loadSaves]);

  const handleSave = useCallback(
    async (slot: PersistedSaveSlot) => {
      if (!onCreateSaveSlot) {
        return;
      }

      await onCreateSaveSlot(slot);
      const savedGame = await electronGameSaveService.load(slot);

      setSaves((previousState) => ({
        ...previousState,
        [slot]: savedGame,
      }));
    },
    [onCreateSaveSlot],
  );

  const handleLoad = useCallback(
    async (slot: PersistedSaveSlot) => {
      if (!onLoadSaveSlot) {
        return;
      }

      const save = saves[slot];
      if (!save) {
        return;
      }

      await onLoadSaveSlot(save);
    },
    [onLoadSaveSlot, saves],
  );

  const handleDelete = useCallback(async (slot: PersistedSaveSlot) => {
    await electronGameSaveService.delete(slot);

    setSaves((previousState) => ({
      ...previousState,
      [slot]: null,
    }));
  }, []);

  if (isLoading) {
    return <Article>Loading saves...</Article>;
  }

  return (
    <Article className={styles.gameSavesArticle}>
      {SAVE_SLOTS.map((slot) => (
        <GameSaveTemplate
          key={slot}
          slot={slot}
          save={saves[slot]}
          onSave={handleSave}
          onLoad={handleLoad}
          onDelete={handleDelete}
        />
      ))}
      <Button className={styles.gameSavesBackButton} onClick={onBack}>
        Back
      </Button>
    </Article>
  );
};

export default GameSavesArticle;
