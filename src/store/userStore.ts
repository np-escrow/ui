import { EPlatform, EUserLanguage, EUserType } from "../types";

import type { NavigateFunction } from "react-router-dom";
import type { UserMetadata } from "../services/api.types";
import { api } from "../services/api.service";
import { create } from "zustand";
import { getWebAppFromGlobal } from "../helpers/getWebAppFromGlobal";
import { setToken } from "../services/storage";
import { useLoadingStore } from "./loadingStore";

interface UserState {
  id: number;
  userType: EUserType;
  avatar: string;
  language: EUserLanguage;
  platform: EPlatform;
  username?: string;
  metadata: UserMetadata;
  isRequestFullscreenAllowed: boolean;
  setUserType: (type: EUserType) => void;
  setLanguage: (lang: EUserLanguage) => void;
  setPlatform: (platform: EPlatform) => void;
  getAvatar: () => Promise<void>;
  signin: (navigate: NavigateFunction, ttn?: number) => Promise<void>;
  setMetadata: (data: Partial<UserMetadata>) => Promise<void>;
  setIsRequestFullscreenAllowed: (isAllowed: boolean) => void;
}

export const useUserStore = create<UserState>((set) => ({
  id: 0,
  userType: EUserType.SELLER,
  language: EUserLanguage.UK,
  platform: EPlatform.WEB,
  avatar: "",
  username: Telegram.WebApp.initDataUnsafe?.user?.username,
  isRequestFullscreenAllowed: false,
  metadata: {
    senderOnboarding: false,
    recipientOnboarding: false
  },
  setIsRequestFullscreenAllowed: (isAllowed) => set({ isRequestFullscreenAllowed: isAllowed }),
  setUserType: (type) => set({ userType: type }),
  setLanguage: (lang) => set({ language: lang }),
  setPlatform: (platform) => set({ platform }),
  setMetadata: async (data: Partial<UserMetadata>) => {
    const { addPromise } = useLoadingStore.getState();
    set((state) => ({
      metadata: {
        ...state.metadata,
        ...data
      }
    }));

    const metadataPromise = api.patchUserMetadata(data);
    addPromise(metadataPromise);

    await metadataPromise;
  },
  getAvatar: async () => {
    const { addPromise } = useLoadingStore.getState();

    const avatarPromise = api.getAvatar();
    addPromise(avatarPromise);

    try {
      const res = await avatarPromise;
      if (res) {
        set({
          avatar: res
        });
      }
    } catch (error) {
      console.error("Error fetching avatar:", error);
    }
  },
  signin: async (navigate: NavigateFunction, ttn?: number) => {
    const { addPromise } = useLoadingStore.getState();

    set({ userType: ttn ? EUserType.RECIPIENT : EUserType.SELLER });

    const webApp = getWebAppFromGlobal();

    if (!webApp?.initData) {
      throw new Error("Not support telegram auth");
    }

    const signinPromise = api.signin({ message: webApp.initData });
    addPromise(signinPromise, "signin");

    const res = await signinPromise;
    setToken(res.accessToken);
    set({ id: res.id, metadata: res.metadata });

    if (Telegram.WebApp.initDataUnsafe?.start_param) {
      navigate(`/payment/${Telegram.WebApp.initDataUnsafe.start_param}`);
    }
  }
}));
