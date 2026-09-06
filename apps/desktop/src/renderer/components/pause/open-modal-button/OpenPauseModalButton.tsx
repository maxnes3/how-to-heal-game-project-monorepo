import { useTranslation } from 'react-i18next';
import { useModal, ModalEnum } from '@app/renderer/contexts';
import { Button } from '../../button';
import styles from './OpenPauseModalButton.module.css';

const OpenPauseModalButton = () => {
  const { openModal } = useModal();
  const { t } = useTranslation('ui');

  const handleClick = () => {
    openModal(ModalEnum.PAUSE);
  };

  return (
    <Button className={styles.openPauseModalButton} onClick={handleClick}>
      {t('menu.open_menu')}
    </Button>
  );
};

export default OpenPauseModalButton;
