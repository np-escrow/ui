import { t } from "i18next";
import { useEffect } from "react";

import { useUserStore } from "../../store/userStore";
import { usePackageStore } from "../../store/packageStore";

import { Loader } from "../Loader";
import { DeliveriesListEmptyState } from "../DeliveriesListEmptyState";
import DeliveriesListItem from "../DeliveriesListItem/DeliveriesListItem";

import { EUserType, type IDeliveries } from "../../types";
import styles from "./DeliveriesList.module.css";

const DeliveriesList = () => {
  const { id } = useUserStore();
  const { data, loadings, getAll } = usePackageStore();

  useEffect(() => {
    getAll();
  }, []);

  if (loadings.get) {
    return <Loader />;
  }

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
        deliveryDate: new Date().toISOString() //delivery.metadata.ScheduledDeliveryDate
      },
      link: delivery.link
    };
  });

  console.log(list);

  return (
    <>
      <span className="px-[1rem] text-[15px] font-semibold">
        {t("home.deliveries")}
      </span>
      <div
        className={styles.scroll__container}
        //   style={{ outline: "1px solid tomato" }}
      >
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
