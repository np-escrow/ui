import type {
  CreateOrder,
  PrepareOrder,
  ResOrder
} from "../services/api.types";

import { ESendPakageTab } from "../pages/SendPackage/SendPackage.type";
import { api } from "../services/api.service";
import { create } from "zustand";

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
    details: ResOrder | null;
    create: ResOrder | null;
    activeTab: ESendPakageTab;
  };
  setActiveTab: (tab: ESendPakageTab) => void;
  prepare: (data: PrepareOrder) => Promise<void>;
  create: (data: CreateOrder) => Promise<void>;
  get: (id: number) => Promise<void>;
  getAll: () => Promise<void>;
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
    create: null,
    details: null,
    activeTab: ESendPakageTab.ValidateTTN
  },
  setActiveTab: (tab: ESendPakageTab) => {
    set((s) => ({
      data: { ...s.data, activeTab: tab }
    }));
  },
  get: async (id: number) => {
    set((s) => ({
      loadings: { ...s.loadings, get: true }
    }));

    try {
      const res = await api.getOrder(id);
      set((s) => ({
        data: { ...s.data, details: res }
      }));
    } catch (err) {
      console.log(err);
    }

    set((s) => ({
      loadings: { ...s.loadings, get: false }
    }));
  },
  getAll: async () => {
    set((s) => ({
      loadings: { ...s.loadings, get: true }
    }));

    try {
      const res = await api.getOrders();
      set((s) => ({
        data: { ...s.data, all: res }
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
        data: { ...s.data, create: res, activeTab: ESendPakageTab.PaymentSend }
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
  prepare: async (data: PrepareOrder) => {
    set((s) => ({
      loadings: { ...s.loadings, create: true }
    }));

    try {
      const res = await api.prepareOrder(data);
      set((s) => ({
        data: {
          ...s.data,
          create: res,
          activeTab: ESendPakageTab.PackageDetails
        },
        error: { ...s.error, create: null }
      }));
    } catch (err) {
      console.log(err);
      set((s) => ({
        error: {
          ...s.error,
          create: err // или err.message, если нужно только текст
        }
      }));
    }

    set((s) => ({
      loadings: { ...s.loadings, create: false }
    }));
  }
}));
