import { create } from 'zustand'
import { EUserType, EUserLanguage, EPlatform } from '../types';

interface UserState {
  userType: EUserType;
  language: EUserLanguage;
  platform: EPlatform;
  username?: string;
  setUserType: (type: EUserType) => void;
  setLanguage: (lang: EUserLanguage) => void;
  setPlatform: (platform: EPlatform) => void;
  setUsername: (username: string | undefined) => void;
}

export const useUserStore = create<UserState>((set) => ({
  userType: EUserType.SELLER,
  language: EUserLanguage.UK,
  platform: EPlatform.WEB,
  username: undefined,
  setUserType: (type) => set({ userType: type }),
  setLanguage: (lang) => set({ language: lang }),
  setPlatform: (platform) => set({ platform }),
  setUsername: (username) => set({ username }),
}));