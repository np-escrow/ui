import { t } from "i18next";
import { parse } from "date-fns";
import { useEffect } from "react";

import { useUserStore } from "../../store/userStore";
import { usePackageStore } from "../../store/packageStore";

import { DeliveriesListEmptyState } from "../DeliveriesListEmptyState";
import DeliveriesListItem from "../DeliveriesListItem/DeliveriesListItem";

import { EUserType, type IDeliveries } from "../../types";
import styles from "./DeliveriesList.module.css";

const DeliveriesList = () => {
  const { id } = useUserStore();
  const { data, getAll } = usePackageStore();

  useEffect(() => {
    getAll();
  }, []);

  const list = data.all.map<IDeliveries>((delivery) => {
    return {
      id: delivery.id,
      currency: delivery.currency,
      price: `${delivery.amount}`,
      ttn: delivery.id,
      userType:
        +id === +delivery.sellerId ? EUserType.SELLER : EUserType.RECIPIENT,
      status: delivery.status,
      archive: false,
      info: {
        createdAt: delivery.createDt,
        recipient: delivery.metadata.RecipientFullName,
        seller: delivery.metadata.SenderFullNameEW,
        sellerCity: delivery.metadata.CitySender,
        recipientCity: delivery.metadata.CityRecipient,
        deliveryDate: parse(
          delivery.metadata.ScheduledDeliveryDate,
          "dd-MM-yyyy HH:mm:ss",
          new Date()
        ).toISOString()
      },
      link: delivery.link
    };
  });

  return (
    <>
      <span className="px-[1rem] text-[15px] font-semibold">
        {t("home.deliveries")}
      </span>
      <div className={styles.scroll__container}>
        {list.length ? (
          <div className="flex flex-col gap-[30px]">
            {list.map((delivery) => (
              <DeliveriesListItem key={delivery.id} item={delivery} />
            ))}
          </div>
        ) : (
          <DeliveriesListEmptyState />
        )}
      </div>
    </>
  );
};

export default DeliveriesList;
