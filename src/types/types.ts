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

export interface IDeliveries {
  id: string;
  ttn: string;
  userType: EUserType;
  status: string;
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
