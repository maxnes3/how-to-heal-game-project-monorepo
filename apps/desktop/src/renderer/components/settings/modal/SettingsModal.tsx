import { useCallback } from 'react';
import { ModalEnum, useModal } from '@app/renderer/contexts';
import { ModalRoot } from '../../modal';
import { SettingsArticle } from '../article';

const SettingsModal = () => {
  const { modal, openModal } = useModal();

  const handleBackToMenuModalClick = useCallback(() => {
    openModal(ModalEnum.PAUSE);
  }, []);

  return (
    <ModalRoot isOpen={modal === ModalEnum.SETTINGS}>
      <SettingsArticle onBackClick={handleBackToMenuModalClick} />
    </ModalRoot>
  );
};

export default SettingsModal;
