import { create } from 'zustand';
import type { Crypto, Network } from '../types';

export enum EWithdrawStep {
  SELECT_ASSET = 'selectAsset',
  ENTER_ADDRESS = 'enterAddress',
  ENTER_AMOUNT = 'enterAmount',
  CONFIRM = 'confirm',
}

interface WithdrawState {
  step: EWithdrawStep;
  setStep: (step: EWithdrawStep) => void;
  selectedAsset: Crypto | null;
  setSelectedAsset: (asset: Crypto | null) => void;
  selectedNetwork: Network | null;
  setSelectedNetwork: (network: Network | null) => void;
  withdrawAddress: string;
  setWithdrawAddress: (address: string) => void;
  withdrawAmount: string;
  setWithdrawAmount: (amount: string) => void;
  withdrawFee: number;
  setWithdrawFee: (fee: number) => void;
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
  withdrawAddress: '',
  setWithdrawAddress: (address) => set({ withdrawAddress: address }),
  withdrawAmount: '',
  setWithdrawAmount: (amount) => set({ withdrawAmount: amount }),
  withdrawFee: 0,
  setWithdrawFee: (fee) => set({ withdrawFee: fee }),
  isCalcInUSD: false,
  setIsCalcInUSD: (isCalcInUSD) => set({ isCalcInUSD }),
})); 