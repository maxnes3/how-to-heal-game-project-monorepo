import { createContext } from 'react';

export enum ModalEnum {
  MENU = 'menu',
  SETTINGS = 'settings',
}

export interface ModalContextValue {
  modal: ModalEnum | null;
  openModal: (modal: ModalEnum) => void;
  closeModal: VoidFunction;
}

export const ModalContext = createContext<ModalContextValue | null>(null);
