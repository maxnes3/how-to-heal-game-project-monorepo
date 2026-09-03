import { useContext } from 'react';
import { ModalContext, type ModalContextValue } from './ModalContext';

export const useModal = (): ModalContextValue => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within ModalProvider');
  }

  return context;
};
