export enum ESendPakageTab {
  ValidateTTN = "validate_ttn",
  PackageDetails = "package_details",
  PaymentCreate = "payment_create",
  PaymentSend = "payment_send"
}

export interface IPackage {
  id: string;
  ttn: string;
  weight: string;
  from: string;
  to: string;
  dimensions: string;
}

export interface ICreatePackage {
  id: string;
  ttn: string;
  paymentLink: string;
  weight: string;
  route: string;
  price: string;
  fee: string;
}
