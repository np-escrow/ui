import { create } from 'zustand';
import type { Crypto, Network } from '../types';

export enum EPaymentStep {
  SELECT_ASSET = 'selectAsset',
  CONFIRM = 'confirm',
}

interface PaymentState {
  step: EPaymentStep;
  setStep: (step: EPaymentStep) => void;
  selectedAsset: Crypto | null;
  setSelectedAsset: (asset: Crypto | null) => void;
  selectedNetwork: Network | null;
  setSelectedNetwork: (network: Network | null) => void;
  // withdrawAddress: string;
  // setWithdrawAddress: (address: string) => void;
  // withdrawAmount: string;
  // setWithdrawAmount: (amount: string) => void;
  // withdrawFee: number;
  // setWithdrawFee: (fee: number) => void;
  // isCalcInUSD: boolean;
  // setIsCalcInUSD: (isCalcInUSD: boolean) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  step: EPaymentStep.SELECT_ASSET,
  setStep: (step) => set({ step }),
  selectedAsset: null,
  setSelectedAsset: (asset) => set({ selectedAsset: asset }),
  selectedNetwork: null,
  setSelectedNetwork: (network) => set({ selectedNetwork: network }),
  // withdrawAddress: '',
  // setWithdrawAddress: (address) => set({ withdrawAddress: address }),
  // withdrawAmount: '',
  // setWithdrawAmount: (amount) => set({ withdrawAmount: amount }),
  // withdrawFee: 0,
  // setWithdrawFee: (fee) => set({ withdrawFee: fee }),
  // isCalcInUSD: false,
  // setIsCalcInUSD: (isCalcInUSD) => set({ isCalcInUSD }),
})); 