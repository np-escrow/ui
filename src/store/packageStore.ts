import { create } from "zustand";

import { api } from "../services/api.service";

import type {
  ResOrder,
  CreateOrder,
  PrepateOrder
} from "../services/api.types";

interface PackageStore {
  error: {
    create: any;
  };
  loadings: {
    get: boolean;
    create: boolean;
  };
  data: {
    all: ResOrder[];
    create: ResOrder | null;
  };
  prepare: (data: PrepateOrder) => Promise<void>;
  create: (data: CreateOrder) => Promise<void>;
  get: () => Promise<void>;
}

export const usePackageStore = create<PackageStore>((set) => ({
  error: {
    create: null
  },
  loadings: {
    get: false,
    create: false
  },
  data: {
    all: [],
    create: null
  },
  get: async () => {
    set((s) => ({
      loadings: { ...s.loadings, get: true }
    }));

    try {
      const res = await api.getOrders();
      set((s) => ({
        data: { ...s.data, get: res }
      }));
    } catch (err) {
      console.log(err);
    }

    set((s) => ({
      loadings: { ...s.loadings, get: false }
    }));
  },
  create: async (data: CreateOrder) => {
    set((s) => ({
      loadings: { ...s.loadings, create: true }
    }));

    try {
      const res = await api.createOrder(data);
      set((s) => ({
        data: { ...s.data, create: res }
      }));
    } catch (err) {
      console.log(err);
      set((s) => ({
        error: { ...s.error, error: "Not found ttn" }
      }));
    }

    set((s) => ({
      loadings: { ...s.loadings, create: false }
    }));
  },
  prepare: async (data: PrepateOrder) => {
    set((s) => ({
      loadings: { ...s.loadings, create: true }
    }));

    try {
      const res = await api.prepateOrder(data);
      set((s) => ({
        data: { ...s.data, create: res }
      }));
    } catch (err) {
      console.log(err);
      set((s) => ({
        error: { ...s.error, error: "Not found ttn" }
      }));
    }

    set((s) => ({
      loadings: { ...s.loadings, create: false }
    }));
  }
}));
