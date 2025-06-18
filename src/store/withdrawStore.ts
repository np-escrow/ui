import { create } from 'zustand';
import type { Network } from '../types';

export enum EWithdrawStep {
  SELECT_ASSET = 'selectAsset',
  ENTER_ADDRESS = 'enterAddress',
  ENTER_AMOUNT = 'enterAmount',
  CONFIRM = 'confirm',
}

interface WithdrawState {
  step: EWithdrawStep;
  setStep: (step: EWithdrawStep) => void;
  selectedAssetId: string | null;
  setSelectedAssetId: (asset: string | null) => void;
  selectedNetwork: Network | null;
  setSelectedNetwork: (network: Network | null) => void;
  withdrawAddress: string;
  setWithdrawAddress: (address: string) => void;
  withdrawAmount: string;
  setWithdrawAmount: (amount: string) => void;
}

export const useWithdrawStore = create<WithdrawState>((set) => ({
  step: EWithdrawStep.SELECT_ASSET,
  setStep: (step) => set({ step }),
  selectedAssetId: null,
  setSelectedAssetId: (assetId) => set({ selectedAssetId: assetId }),
  selectedNetwork: null,
  setSelectedNetwork: (network) => set({ selectedNetwork: network }),
  withdrawAddress: '',
  setWithdrawAddress: (address) => set({ withdrawAddress: address }),
  withdrawAmount: '',
  setWithdrawAmount: (amount) => set({ withdrawAmount: amount }),
})); 