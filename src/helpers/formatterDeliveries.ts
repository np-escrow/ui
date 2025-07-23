import { EUserType, type IDeliveries } from "../types";
import type { ResOrder } from "../services/api.types";
import { parse, isValid } from "date-fns";

const tryParseDate = (dateStr: string): string | null => {
  const formats = [
    "dd-MM-yyyy HH:mm:ss",
    "yyyy-MM-dd HH:mm:ss",
    "dd.MM.yyyy HH:mm:ss",
    "yyyy/MM/dd HH:mm:ss",
    "MM-dd-yyyy HH:mm:ss",
    "yyyy-MM-dd'T'HH:mm:ss",
    "yyyy-MM-dd",
    "dd-MM-yyyy"
  ];

  for (const format of formats) {
    const parsed = parse(dateStr, format, new Date());
    if (isValid(parsed)) {
      return parsed.toISOString();
    }
  }

  return null;
};

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
    archive: data.archive,
    info: {
      createdAt: new Date(data.createDt).toISOString(),
      recipient: data.metadata.RecipientFullName,
      seller: data.metadata.SenderFullNameEW,
      sellerCity: data.metadata.CitySender,
      recipientCity: data.metadata.CityRecipient,
      actualDeliveryDate:
        data.metadata.ActualDeliveryDate &&
        tryParseDate(data.metadata.ActualDeliveryDate),
      sheduledDeliveryDate:
        data.metadata.ScheduledDeliveryDate &&
        tryParseDate(data.metadata.ScheduledDeliveryDate)
    },
    link: data.link
  };
};
