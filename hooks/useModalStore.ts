import { create } from 'zustand';

export type ModalType = 'navigationMenu';

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  openModal: (type) => set({ type, isOpen: true }),
  closeModal: () => set({ type: null, isOpen: false }),
}));
