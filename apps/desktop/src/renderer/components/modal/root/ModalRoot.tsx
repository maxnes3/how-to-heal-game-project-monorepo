import styles from './ModalRoot.module.css';

interface Props {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

const ModalRoot: React.FC<Props> = ({ isOpen = false, children, className }) => {
  if (!isOpen) {
    return null;
  }

  return <div className={className || styles.modalRoot}>{children}</div>;
};

export default ModalRoot;
