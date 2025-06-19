import { create } from "zustand";

import { api } from "../services/api.service";

import type { ResBalance } from "../services/api.types";

interface BalanceState {
  loading: boolean;
  data: ResBalance | null;
  getBalance: () => Promise<void>;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  loading: true,
  data: null,
  getBalance: async () => {
    set({ loading: true });
    const res = await api.getBalance();
    set({ data: res, loading: false });
  }
}));
