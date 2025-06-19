import axios, { Axios, type InternalAxiosRequestConfig } from "axios";

import { getToken } from "./storage";

import type {
  CreateOrder,
  PrepateOrder,
  ResBalance,
  ResOrder,
  ResSignin,
  Signin,
  UserMetadata
} from "./api.types";

let baseURL: string | undefined = import.meta.env.VITE_APP_API_URL;

if (!baseURL) {
  throw new Error("Not found base url from env");
} else {
  baseURL = baseURL.replace(/\/$/g, "") + "/api/ui";
}

class Api {
  constructor() {
    this.httpService = axios.create({
      baseURL,
      withCredentials: true
    });

    this.httpService.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        const token = getToken();
        config.headers.Authorization = `Bearer ${token}`;

        return config;
      }
    );
  }

  private httpService: Axios;

  isAuthenticated() {
    const token = getToken();
    return !!token;
  }

  async signin(data: Signin) {
    const res = await this.httpService.post<ResSignin>("/auth/signin", data);
    return res.data;
  }

  async getAvatar() {
    const res = await this.httpService.get<string | undefined>(`/users/avatar`);
    return res.data;
  }

  async patchUserMetadata(data: Partial<UserMetadata>) {
    const res = await this.httpService.patch<UserMetadata>(
      "/users/metadata",
      data
    );
    return res.data;
  }

  async getBalance() {
    const res = await this.httpService.get<ResBalance>("/balances");
    return res.data;
  }

  async prepateOrder(data: PrepateOrder) {
    const res = await this.httpService.post<ResOrder>(
      "/shipments/prepate",
      data
    );
    return res.data;
  }

  async createOrder(data: CreateOrder) {
    const res = await this.httpService.post<ResOrder>("/shipments", data);
    return res.data;
  }

  async getOrders() {
    const res = await this.httpService.get<ResOrder[]>("/shipments");
    return res.data;
  }
}
const api = new Api();

export { api, Api };
