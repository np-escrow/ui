import { create } from "zustand";
import type { ResAssets } from "../services/api.types";

export enum EWithdrawStep {
  SELECT_ASSET = "selectAsset",
  ENTER_ADDRESS = "enterAddress",
  ENTER_AMOUNT = "enterAmount",
  CONFIRM = "confirm"
}

interface WithdrawState {
  step: EWithdrawStep;
  setStep: (step: EWithdrawStep) => void;
  selectedAsset: ResAssets[0] | null;
  setSelectedAsset: (asset: ResAssets[0] | null) => void;
  selectedNetwork: ResAssets[0]["networks"][0] | null;
  setSelectedNetwork: (network: ResAssets[0]["networks"][0] | null) => void;
  withdrawAddress: string;
  setWithdrawAddress: (address: string) => void;
  withdrawAmount: string;
  setWithdrawAmount: (amount: string) => void;
  isCalcInUSD: boolean;
  setIsCalcInUSD: (isCalcInUSD: boolean) => void;
}

export const useWithdrawStore = create<WithdrawState>((set) => ({
  step: EWithdrawStep.SELECT_ASSET,
  setStep: (step) => set({ step }),
  selectedAsset: null,
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  selectedNetwork: null,
  setSelectedNetwork: (network) => set({ selectedNetwork: network }),
  withdrawAddress: "",
  setWithdrawAddress: (address) => set({ withdrawAddress: address }),
  withdrawAmount: "",
  setWithdrawAmount: (amount) => set({ withdrawAmount: amount }),
  isCalcInUSD: false,
  setIsCalcInUSD: (isCalcInUSD) => set({ isCalcInUSD })
}));
