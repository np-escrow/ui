import { create } from "zustand";

interface LoadingState {
  isMainLoading: boolean;
  activePromisesCount: number;
  setMainLoading: (loading: boolean) => void;
  addPromise: (promise: Promise<any>) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isMainLoading: false,
  activePromisesCount: 0,

  setMainLoading: (loading: boolean) => set({ isMainLoading: loading }),

  addPromise: (promise: Promise<any>) => {
    set((state) => ({
      activePromisesCount: state.activePromisesCount + 1,
      isMainLoading: true
    }));

    promise.finally(() => {
      set((state) => {
        const newCount = Math.max(0, state.activePromisesCount - 1);
        return {
          activePromisesCount: newCount,
          isMainLoading: newCount > 0
        };
      });
    });
  }
}));
