import { create } from "zustand";
import { api } from "../services/api.service";
import type { ResAssets } from "../services/api.types";

interface AssetState {
  loadings: {
    assets: boolean;
  };
  data: {
    assets: ResAssets;
  };
  getAssets: () => Promise<void>;
}

export const useAssetStore = create<AssetState>((set) => ({
  loadings: {
    assets: false
  },
  data: {
    assets: []
  },
  getAssets: async () => {
    set((s) => ({
      loadings: { ...s.loadings, assets: true }
    }));

    const res = await api.assets();
    set((s) => ({
      data: { ...s.data, assets: res }
    }));

    set((s) => ({
      loadings: { ...s.loadings, assets: false }
    }));
  }
}));
