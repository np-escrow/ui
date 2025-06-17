import { create } from 'zustand';

export enum EWithdrawStep {
  SELECT_CURRENCY = 'selectCurrency',
  ENTER_ADDRESS = 'enterAddress',
  ENTER_AMOUNT = 'enterAmount',
  CONFIRM = 'confirm',
}

interface WithdrawState {
  step: EWithdrawStep;
  setStep: (step: EWithdrawStep) => void;
}

export const useWithdrawStore = create<WithdrawState>((set) => ({
  step: EWithdrawStep.SELECT_CURRENCY,
  setStep: (step) => set({ step }),
})); 