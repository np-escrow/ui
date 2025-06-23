import { create } from "zustand";
import { api } from "../services/api.service";
import type { Payment, ResAssets, ResPayment } from "../services/api.types";

export enum EPaymentStep {
  SELECT_ASSET = "selectAsset",
  CONFIRM = "confirm"
}

interface PaymentState {
  step: EPaymentStep;
  setStep: (step: EPaymentStep) => void;

  selectedAsset: ResAssets[0] | null;
  setSelectedAsset: (asset: ResAssets[0] | null) => void;
  selectedNetwork: ResAssets[0]["networks"][0] | null;
  setSelectedNetwork: (network: ResAssets[0]["networks"][0] | null) => void;
  errors: {
    payment: any;
  };
  loadings: {
    payment: boolean;
  };
  data: {
    payment: ResPayment | null;
  };
  payment: (data: Payment) => Promise<void>;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  assets: [],
  step: EPaymentStep.SELECT_ASSET,
  setStep: (step) => set({ step }),
  selectedAsset: null,
  selectedNetwork: null,
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  setSelectedNetwork: (network) => set({ selectedNetwork: network }),
  errors: {
    payment: null
  },
  loadings: {
    payment: false
  },
  data: {
    payment: null
  },
  payment: async (data: Payment) => {
    set((s) => ({
      loadings: { ...s.loadings, payment: true }
    }));
    try {
      const res = await api.payment(data);
      set((s) => ({
        data: { ...s.data, payment: res }
      }));
    } catch (err) {
      console.log(err);
      set((s) => ({
        errors: { ...s.errors, payment: err }
      }));
    }
    set((s) => ({
      loadings: { ...s.loadings, payment: false }
    }));
  }
}));
