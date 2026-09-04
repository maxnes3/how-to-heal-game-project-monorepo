import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { ModalEnum, useModal } from '@app/renderer/contexts';
import { AppRoutesEnum } from '@app/renderer/routes';
import { ModalRoot } from '../../modal';
import { Button } from '../../button';
import { Text } from '../../text';

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
    navigate(AppRoutesEnum.MAIN);
    closeModal();
  };

  return (
    <ModalRoot isOpen={modal === ModalEnum.MENU}>
      <Button onClick={handleResumeClick}>
        <Text>{t('menu.resume_game')}</Text>
      </Button>
      <Button onClick={handleOpenSettingsClick}>
        <Text>{t('menu.settings')}</Text>
      </Button>
      <Button onClick={handleReturnToMainMenuClick}>
        <Text>{t('menu.return_to_main_menu')}</Text>
      </Button>
    </ModalRoot>
  );
};

export default MenuModal;
