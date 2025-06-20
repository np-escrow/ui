import type { ResBalance, WithdrawDto } from "../services/api.types";

import { api } from "../services/api.service";
import { create } from "zustand";
import { useLoadingStore } from "./loadingStore";

interface BalanceState {
  data: ResBalance | null;
  getBalance: () => Promise<void>;
  withdraw: (data: WithdrawDto) => Promise<void>;
}

export const useBalanceStore = create<BalanceState>((set) => ({
  data: null,
  getBalance: async () => {
    const { addPromise } = useLoadingStore.getState();
    
    const balancePromise = api.getBalance();
    addPromise(balancePromise);
    
    try {
      const res = await balancePromise;
      set({ data: res });
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  },
  withdraw: async (data) => {
    const { addPromise } = useLoadingStore.getState();
    
    try {
      const withdrawPromise = api.withdraw(data);
      addPromise(withdrawPromise);
      
      await withdrawPromise;
      // TODO: return to the balance after withdrawal in post withdrawal
      
      const balancePromise = api.getBalance();
      addPromise(balancePromise);
      
      const res = await balancePromise;
      set({ data: res });
    } catch (error) {
      console.error("Withdrawal failed:", error);
      throw error; // Re-throw to handle it in the component if needed
    }
  }
}));
