import { create } from "zustand";

interface UseSidebarHook {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useSidebar = create<UseSidebarHook>((set) => ({
  isOpen: false,
  onClose: () => set({ isOpen: false }),
  onOpen: () => set({ isOpen: true }),
}));
