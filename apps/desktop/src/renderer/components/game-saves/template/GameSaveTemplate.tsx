import type { RestoredGameSave, PersistedSaveSlot } from '@game/persistance';
import { Template } from '../../template';
import { Text } from '../../text';
import { Button } from '../../button';
import styles from './GameSaveTemplate.module.css';

interface Props {
  slot: PersistedSaveSlot;
  save: RestoredGameSave | null;
  onSave: (slot: PersistedSaveSlot) => void;
  onLoad: (slot: PersistedSaveSlot) => void;
  onDelete: (slot: PersistedSaveSlot) => void;
}

const formatSaveDate = (date: string): string => {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(date));
};

const GameSaveTemplate: React.FC<Props> = ({ slot, save, onSave, onLoad, onDelete }) => {
  const handleSaveClick = () => {
    onSave(slot);
  };

  const handleLoadClick = () => {
    if (!save) {
      return;
    }

    onLoad(slot);
  };

  const handleDeleteClick = () => {
    if (!save) {
      return;
    }

    onDelete(slot);
  };

  if (!save) {
    return (
      <Template className={styles.emptyGameSaveTemplate}>
        <Button className={styles.emptyGameSaveButton} onClick={handleSaveClick}>
          <Text>Slot {slot}</Text>
          <Text>Empty Slot</Text>
        </Button>
      </Template>
    );
  }

  return (
    <Template className={styles.gameSaveTemplate}>
      <Button className={styles.gameSaveButtonLoad} onClick={handleLoadClick}>
        <Text>Slot {slot}</Text>
        <Text>Screen: {save.screen}</Text>
        <Text>Updated: {formatSaveDate(save.updatedAt)}</Text>
      </Button>
      <Button className={styles.gameSaveButtonDelete} onClick={handleDeleteClick}>
        Delete
      </Button>
    </Template>
  );
};

export default GameSaveTemplate;
