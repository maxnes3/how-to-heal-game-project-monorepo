import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ModalEnum, useModal } from '@app/renderer/contexts';
import { ModalRoot } from '../../modal';
import { Button } from '../../button';

const MenuModal = () => {
  const { modal, openModal, closeModal } = useModal();
  const navigate = useNavigate();
  const { t } = useTranslation('ui');

  const handleResumeClick = () => {
    closeModal();
  };

  const handleOpenSettingsClick = () => {
    openModal(ModalEnum.SETTINGS);
  };

  const handleReturnToMainMenuClick = () => {
    navigate('/');
    closeModal();
  };

  return (
    <ModalRoot isOpen={modal === ModalEnum.MENU}>
      <Button onClick={handleResumeClick}>{t('menu.resume_game')}</Button>
      <Button onClick={handleOpenSettingsClick}>{t('menu.open_settings')}</Button>
      <Button onClick={handleReturnToMainMenuClick}>{t('menu.return_to_main_menu')}</Button>
    </ModalRoot>
  );
};

export default MenuModal;
