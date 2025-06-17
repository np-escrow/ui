import { create } from 'zustand';

interface UIState {
  showHeader: boolean;
  setShowHeader: (show: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
  showHeader: false,
  setShowHeader: (show) => set({ showHeader: show }),
})); 