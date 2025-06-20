import { create } from "zustand";
import type { Crypto, Network } from "../types";

export enum EPaymentStep {
  SELECT_ASSET = "selectAsset",
  CONFIRM = "confirm"
}

interface PaymentState {
  step: EPaymentStep;
  setStep: (step: EPaymentStep) => void;
  selectedAsset: Crypto | null;
  setSelectedAsset: (asset: Crypto | null) => void;
  selectedNetwork: Network | null;
  setSelectedNetwork: (network: Network | null) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  step: EPaymentStep.SELECT_ASSET,
  setStep: (step) => set({ step }),
  selectedAsset: null,
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  selectedNetwork: null,
  setSelectedNetwork: (network) => set({ selectedNetwork: network })
}));
