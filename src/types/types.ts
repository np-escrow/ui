export enum EUserType {
  SELLER = "seller",
  RECIPIENT = "recipient"
}

export enum EUserLanguage {
  UK = "uk",
  EN = "en",
  RU = "ru"
}

export enum EPlatform {
  IOS = "ios",
  ANDROID = "android",
  WEB = "web",
  WEBA = "weba",
  MACOS = "macos",
  TDESKTOP = "tdesktop"
}

export enum EDeliveryStatus {
  PENDING = "pending",
  PAID = "paid",
  COMPLETED = "completed"
}

export enum ParseOrderStatus {
  new = EDeliveryStatus.PENDING,
  paid = EDeliveryStatus.PAID,
  closed = EDeliveryStatus.COMPLETED,
  revert = EDeliveryStatus.COMPLETED
}

export enum OrderStatus {
  new = "new",
  paid = "paid",
  closed = "closed",
  revert = "revert"
}

export interface IDeliveries {
  id: string;
  ttn: string;
  userType: EUserType;
  status: OrderStatus;
  price: string;
  currency: string;
  info: {
    createdAt: string;
    deliveryDate: string;
    sellerCity: string;
    seller: string;
    recipient: string;
    recipientCity: string;
  };
  archive: boolean;
}

export type Crypto = {
  id: string;
  token: string;
  networks: Network[];
  balance: number;
  balanceUSD: number;
  price: number;
  isNative: boolean;
  logoToken: string;
  logoNetwork: string;
};

export enum NetworkCode {
  TRC20 = "TRC20",
  TRON = "TRON",
  BITCOIN = "BITCOIN",
  ETHEREUM = "ETHEREUM",
  BINANCE_SMART_CHAIN = "BINANCE_SMART_CHAIN",
  POLYGON = "POLYGON"
}

export type Network = {
  id: string;
  name: string;
  code: NetworkCode;
  address: string;
};

export interface IShipmentInfo {
  id: string;
  ttn: string;
  status: EDeliveryStatus;
  userType: EUserType;

  paimentData: Array<{
    id: string;
    name: string;
    date: string;
  }>;
  packageDetails: {
    from: string;
    to: string;
    weight: string;
  };
  paymentDetails: {
    price: number;
    currency: string;
    fee: number;
  };
}
