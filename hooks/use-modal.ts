import { create } from "zustand";

interface UseModalHook {
  isOpen: boolean;
  modalName: "ADD_CLASS" | "ADD_ASSIGNMENT" | undefined;
  onOpen: (modalName: "ADD_CLASS" | "ADD_ASSIGNMENT") => void;
  onClose: () => void;
}

export const useModal = create<UseModalHook>((set) => ({
  isOpen: false,
  modalName: undefined,
  onOpen: (modalName) => set({ isOpen: true, modalName }),
  onClose: () => set({ isOpen: false, modalName: undefined }),
}));
