import { useCallback, useMemo, useState } from 'react';
import { ModalContext, ModalEnum } from './ModalContext';

interface Props {
  children: React.ReactNode;
}

export const ModalProvider: React.FC<Props> = ({ children }) => {
  const [modal, setModal] = useState<ModalEnum | null>(null);

  const openModal = useCallback((modal: ModalEnum) => {
    setModal(modal);
  }, []);

  const closeModal = useCallback(() => {
    setModal(null);
  }, []);

  const value = useMemo(
    () => ({
      modal,
      openModal,
      closeModal,
    }),
    [modal, openModal, closeModal],
  );

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
};
