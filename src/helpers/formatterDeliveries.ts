import { EUserType, type IDeliveries } from "../types";
import type { ResOrder } from "../services/api.types";
import { parse } from "date-fns";

export const formatterDeliveries = (
  data: ResOrder,
  id: number
): IDeliveries => {
  return {
    id: data.id,
    currency: data.currency,
    price: `${data.amount}`,
    ttn: data.id,
    userType: +id === +data.sellerId ? EUserType.SELLER : EUserType.RECIPIENT,
    status: data.status,
    archive: false,
    info: {
      createdAt: new Date(data.createDt).toISOString(),
      recipient: data.metadata.RecipientFullName,
      seller: data.metadata.SenderFullNameEW,
      sellerCity: data.metadata.CitySender,
      recipientCity: data.metadata.CityRecipient,
      actualDeliveryDate:
        data.metadata.ActualDeliveryDate &&
        new Date(data.metadata.ActualDeliveryDate).toISOString(),
      sheduledDeliveryDate: data.metadata.ScheduledDeliveryDate
        ? parse(
            data.metadata.ScheduledDeliveryDate,
            "dd-MM-yyyy HH:mm:ss",
            new Date()
          ).toISOString()
        : null
    },
    link: data.link
  };
};
