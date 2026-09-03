import { useTranslation } from 'react-i18next';
import { useModal, ModalEnum } from '@app/renderer/contexts';
import { Button } from '../../button';
import styles from './OpenMenuModalButton.module.css';

const OpenMenuModalButton = () => {
  const { openModal } = useModal();
  const { t } = useTranslation('ui');

  const handleClick = () => {
    openModal(ModalEnum.MENU);
  };

  return (
    <Button className={styles.openMenuModalButton} onClick={handleClick}>
      {t('menu.open_menu')}
    </Button>
  );
};

export default OpenMenuModalButton;
