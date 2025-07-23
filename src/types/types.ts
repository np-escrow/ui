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
  COMPLETED = "completed",
  REVERTED = "reverted"
}

export enum ParseOrderStatus {
  new = EDeliveryStatus.PENDING,
  paid = EDeliveryStatus.PAID,
  transit = EDeliveryStatus.PENDING,
  closed = EDeliveryStatus.COMPLETED,
  revert = EDeliveryStatus.REVERTED
}

export enum OrderStatus {
  new = "new",
  paid = "paid",
  transit = "transit",
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
    actualDeliveryDate: string | null;
    sheduledDeliveryDate: string | null;
    sellerCity: string;
    seller: string;
    recipient: string;
    recipientCity: string;
  };
  archive: boolean;
  link?: string;
}

export type Crypto = {
  token: string;
  code: string;
  logoToken: string;
  logoNetwork: string;
  networks: Network[];
};

export enum NetworkCode {
  TRON = "TRON",
  ETHEREUM = "ETHEREUM",
  BINANCE_SMART_CHAIN = "BINANCE_SMART_CHAIN"
}

export type Network = {
  id: string;
  name: string;
  code: NetworkCode;
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
