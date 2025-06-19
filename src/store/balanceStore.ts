import type { ResBalance, WithdrawDto } from "../services/api.types";

import { api } from "../services/api.service";
import { create } from "zustand";

interface BalanceState {
  loading: boolean;
  data: ResBalance | null;
  getBalance: () => Promise<void>;
  withdraw: (data: WithdrawDto) => Promise<void>;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  loading: true,
  data: null,
  getBalance: async () => {
    set({ loading: true });
    const res = await api.getBalance();
    set({ data: res, loading: false });
  },
  withdraw: async (data) => {
    set({ loading: true });
    try {
      set({ loading: true });

      await api.withdraw(data);
      // TODO: return to the balance after withdrawal in post withdrawal
      const res = await api.getBalance();
      set({ data: res, loading: false });
    } catch (error) {
      console.error("Withdrawal failed:", error);
      throw error; // Re-throw to handle it in the component if needed
    } finally {
      set({ loading: false });
    }
  }
}));
