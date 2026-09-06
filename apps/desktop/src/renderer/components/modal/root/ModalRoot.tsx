import classNames from 'classnames';
import styles from './ModalRoot.module.css';

interface Props {
  isOpen: boolean;
  children?: React.ReactNode;
  className?: string;
}

const ModalRoot: React.FC<Props> = ({ isOpen = false, children, className }) => {
  if (!isOpen) {
    return null;
  }

  return <div className={classNames(styles.modalRoot, className)}>{children}</div>;
};

export default ModalRoot;
