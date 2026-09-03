import React from 'react';
import { Button } from '../button';
import styles from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ children, onClose }) => {
  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(event) => event.stopPropagation()}>
        <Button onClick={onClose}>×</Button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
