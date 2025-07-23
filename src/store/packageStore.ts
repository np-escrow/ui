import type {
  CreateOrder,
  PrepareOrder,
  ResOrder
} from "../services/api.types";

import { ESendPakageTab } from "../pages/SendPackage/SendPackage.type";
import { api } from "../services/api.service";
import { create } from "zustand";
import { toast } from "react-toastify";
import { useLoadingStore } from "./loadingStore";

interface PackageStore {
  error: {
    create: any;
  };
  loadings: {
    create: boolean;
    update: boolean;
  };
  data: {
    all: ResOrder[];
    details: ResOrder | null;
    create: ResOrder | null;
    activeTab: ESendPakageTab;
  };
  payments: Map<string, Date>;
  setActiveTab: (tab: ESendPakageTab) => void;
  setPayments: (ttn: string) => void;
  prepare: (data: PrepareOrder) => Promise<void>;
  create: (data: CreateOrder) => Promise<void>;
  update: (ttn: number | string, archive?: boolean) => Promise<void>;
  get: (id: number) => Promise<void>;
  getAll: () => Promise<void>;
}

export const usePackageStore = create<PackageStore>((set) => ({
  error: {
    create: null
  },
  loadings: {
    create: false,
    update: false
  },
  data: {
    all: [],
    create: null,
    details: null,
    activeTab: ESendPakageTab.ValidateTTN
  },
  payments: new Map(),
  setActiveTab: (tab: ESendPakageTab) => {
    set((s) => ({
      data: { ...s.data, activeTab: tab }
    }));
  },
  setPayments: (ttn: string) => {
    set((s) => ({
      payments: new Map(s.payments).set(ttn.toString(), new Date())
    }));
  },

  get: async (id: number) => {
    const { addPromise } = useLoadingStore.getState();

    const orderPromise = api.getOrder(id);
    addPromise(orderPromise);

    try {
      const res = await orderPromise;
      set((s) => ({
        data: { ...s.data, details: res }
      }));
    } catch (err) {
      console.log(err);
    }
  },
  getAll: async () => {
    const { addPromise } = useLoadingStore.getState();

    const ordersPromise = api.getOrders();
    addPromise(ordersPromise);

    try {
      const res = await ordersPromise;
      set((s) => ({
        data: { ...s.data, all: res }
      }));
    } catch (err) {
      console.log(err);
    }
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
    const { addPromise } = useLoadingStore.getState();

    const preparePromise = api.prepareOrder(data);
    addPromise(preparePromise);

    try {
      const res = await preparePromise;
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
  },
  update: async (ttn: number | string, archive?: boolean) => {
    set((s) => ({
      loadings: { ...s.loadings, update: true }
    }));

    try {
      const res = await api.updateOrder(ttn, archive);
      set((s) => ({
        data: { ...s.data, details: res }
      }));
    } catch (err: any) {
      toast.error(err.details ?? "Failed to update order");
      console.error("Update order error:", err);
    }

    set((s) => ({
      loadings: { ...s.loadings, update: false }
    }));
  }
}));
