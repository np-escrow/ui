import type { NetworkCode, OrderStatus } from "../types";

export type Signin = {
  message: string;
};

export type UserMetadata = {
  senderOnboarding: boolean;
  recipientOnboarding: boolean;
};

export type ResSignin = {
  id: number;
  accessToken: string;
  metadata: UserMetadata;
};

export type ResBalance = {
  entire: number;
  accessible: number;
};

export type PrepareOrder = {
  ttn: string;
};

export type CreateOrder = {
  ttn: string;
  amount: number;
};

export type ResOrder = {
  id: string;
  currency: string;
  sellerId: string;
  paimentData: {
    name: string;
    date: string;
  }[];
  fee: {
    fixed: number;
    percent: number;
  };
  amount: number;
  status: OrderStatus;
  metadata: {
    Number: string;
    StatusCode: string;
    DateCreated: string;
    Status: string;
    RefEW: string;
    RecipientDateTime: string;
    CargoType: string;
    CargoDescriptionString: string;
    DocumentCost: string;
    AnnouncedPrice: number;
    DocumentWeight: number;
    CheckWeight: number;
    CalculatedWeight: string;
    CheckWeightMethod: string;
    FactualWeight: string;
    VolumeWeight: string;
    OwnerDocumentNumber: string;
    OwnerDocumentType: string;
    SeatsAmount: string;
    ServiceType: string;
    CitySender: string;
    CounterpartySenderDescription: string;
    CounterpartySenderType: string;
    PhoneSender: string;
    RefCitySender: string;
    RefSettlementSender: string;
    SenderAddress: string;
    SenderFullNameEW: string;
    WarehouseSender: string;
    WarehouseSenderAddress: string;
    WarehouseSenderInternetAddressRef: string;
    LoyaltyCardSender: string;
    CityRecipient: string;
    CounterpartyRecipientDescription: string;
    PhoneRecipient: string;
    RecipientAddress: string;
    RecipientFullName: string;
    RecipientFullNameEW: string;
    RecipientWarehouseTypeRef: string;
    RefCityRecipient: string;
    RefSettlementRecipient: string;
    WarehouseRecipient: string;
    WarehouseRecipientAddress: string;
    WarehouseRecipientNumber: number;
    CategoryOfWarehouse: string;
    WarehouseRecipientRef: string;
    WarehouseRecipientInternetAddressRef: string;
    TrusteeRecipientPhone: string;
    LoyaltyCardRecipient: string;
    PayerType: string;
    PaymentMethod: string;
    PaymentStatus: string;
    PaymentStatusDate: string;
    ExpressWaybillPaymentStatus: string;
    ExpressWaybillAmountToPay: string;
    AmountPaid: string;
    AmountToPay: string;
    AfterpaymentOnGoodsCost: number;
    CardMaskedNumber: string;
    LastAmountReceivedCommissionGM: string;
    LastAmountTransferGM: string;
    LastTransactionDateTimeGM: string;
    LastTransactionStatusGM: string;
    SumBeforeCheckWeight: number;
    Redelivery: number;
    RedeliveryNum: string;
    RedeliveryPayer: string;
    RedeliveryPaymentCardDescription: string;
    RedeliveryServiceCost: string;
    RedeliverySum: string;
    RedeliveryPaymentCardRef: string;
    ScheduledDeliveryDate: string;
    ActualDeliveryDate: string;
    AdjustedDate: string;
    DateFirstDayStorage: string;
    DateReturnCargo: string;
    DateScan: string;
    DateMoving: string;
    TrackingUpdateDate: string;
    DatePayedKeeping: string;
    InternationalDeliveryType: string;
    InternetDocumentDescription: string;
    AdditionalInformationEW: string;
    AviaDelivery: number;
    BarcodeRedBox: string;
    CargoReturnRefusal: boolean;
    ClientBarcode: string;
    DaysStorageCargo: string;
    DeliveryTimeframe: string;
    FreeShipping: string;
    CreatedOnTheBasis: any[];
    LastCreatedOnTheBasisDateTime: string;
    LastCreatedOnTheBasisDocumentType: string;
    LastCreatedOnTheBasisNumber: string;
    LastCreatedOnTheBasisPayerType: string;
    MarketplacePartnerToken: string;
    Packaging: any[];
    PartialReturnGoods: any[];
    PostomatV3CellReservationNumber: string;
    SecurePayment: boolean;
    StorageAmount: string;
    StoragePrice: string;
    UndeliveryReasons: string;
    UndeliveryReasonsDate: string;
    UndeliveryReasonsSubtypeDescription: string;
    CounterpartyType: string;
    LightReturnNumber: string;
    PossibilityChangeCash2Card: boolean;
    PossibilityChangeDeliveryIntervals: boolean;
    PossibilityChangeEW: boolean;
    PossibilityCreateRedirecting: boolean;
    PossibilityCreateRefusal: boolean;
    PossibilityCreateReturn: boolean;
    PossibilityLightReturn: boolean;
    PossibilityTrusteeRecipient: boolean;
  };
  recipientId: string | null;
  createDt: string;
  updatedAt: string;
  link: string;
};

export type WithdrawDto = {
  currency: string;
  network: string;
  address: string;
  amount: string;
};

export type Payment = {
  id: string;
  network: NetworkCode;
  currency: string;
};

export type ResPayment = {
  orderId: string;
  network: NetworkCode;
  price: string;
  address: string;
};

export type ResAssets = {
  name: string;
  code: string;
  networks: {
    name: string;
    code: string;
    fee: {
      payment: {
        fixed: number;
        percent: number;
      };
      withdraw: {
        fixed: number;
        percent: number;
      };
    };
  }[];
}[];
