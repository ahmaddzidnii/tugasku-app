import { create } from "zustand";

// enum ModalName {
//   ADD_CLASS,
// }
interface UseModalHook {
  isOpen: boolean;
  modalName: "ADD_CLASS" | "ADD_TASK" | undefined;
  onOpen: (modalName: "ADD_CLASS" | "ADD_TASK") => void;
  onClose: () => void;
}

export const useModal = create<UseModalHook>((set) => ({
  isOpen: false,
  modalName: undefined,
  onOpen: (modalName) => set({ isOpen: true, modalName }),
  onClose: () => set({ isOpen: false, modalName: undefined }),
}));
