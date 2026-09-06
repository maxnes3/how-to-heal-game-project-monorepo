import { createContext } from 'react';

export enum ModalEnum {
  PAUSE = 'pause',
  SETTINGS = 'settings',
}

export interface ModalContextValue {
  modal: ModalEnum | null;
  openModal: (modal: ModalEnum) => void;
  closeModal: VoidFunction;
}

export const ModalContext = createContext<ModalContextValue | null>(null);
