import { create } from "zustand";
import { EUserType, EUserLanguage, EPlatform } from "../types";
import { api } from "../services/api.service";
import { getWebAppFromGlobal } from "../helpers/getWebAppFromGlobal";
import type { UserMetadata } from "../services/api.types";
import { setToken } from "../services/storage";

interface UserState {
  id: number;
  userType: EUserType;
  avatar: string;
  language: EUserLanguage;
  platform: EPlatform;
  username?: string;
  metadata: UserMetadata;
  setUserType: (type: EUserType) => void;
  setLanguage: (lang: EUserLanguage) => void;
  setPlatform: (platform: EPlatform) => void;
  loadings: {
    auth: boolean;
  };
  getAvatar: () => Promise<void>;
  signin: (ttn?: number) => Promise<void>;
  setMetadata: (data: Partial<UserMetadata>) => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  id: 0,
  userType: EUserType.SELLER,
  language: EUserLanguage.UK,
  platform: EPlatform.WEB,
  avatar: "",
  username: Telegram.WebApp.initDataUnsafe?.user?.username,
  metadata: {
    senderOnboarding: false,
    recipientOnboarding: false
  },
  setUserType: (type) => set({ userType: type }),
  setLanguage: (lang) => set({ language: lang }),
  setPlatform: (platform) => set({ platform }),
  loadings: {
    auth: false
  },
  setMetadata: async (data: Partial<UserMetadata>) => {
    set((state) => ({
      metadata: {
        ...state.metadata,
        ...data
      }
    }));

    await api.patchUserMetadata(data);
  },
  getAvatar: async () => {
    const res = await api.getAvatar();

    set({
      avatar: res
    });
  },
  signin: async (ttn?: number) => {
    set((state) => ({
      loadings: {
        ...state.loadings,
        auth: true
      },
      userType: ttn ? EUserType.RECIPIENT : EUserType.SELLER
    }));

    const webApp = getWebAppFromGlobal();

    if (!webApp?.initData) {
      throw new Error("Not support telegram auth");
    }

    const res = await api.signin({ message: webApp.initData });
    setToken(res.accessToken);
    set({ id: res.id, metadata: res.metadata });
    set((state) => ({
      loadings: {
        ...state.loadings,
        auth: false
      }
    }));
  }
}));
