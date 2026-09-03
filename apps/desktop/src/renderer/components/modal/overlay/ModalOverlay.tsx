import { ModalEnum, useModal } from '@app/renderer/contexts';
import styles from './ModalOverlay.module.css';

interface Props {
  children?: React.ReactNode;
}

const ModalOverlay: React.FC<Props> = ({ children }) => {
  const { modal } = useModal();
  const isShowOverlay = modal !== null && Object.values(ModalEnum).includes(modal);

  if (!isShowOverlay) {
    return null;
  }

  return <div className={styles.modalOverlay}>{children}</div>;
};

export default ModalOverlay;
