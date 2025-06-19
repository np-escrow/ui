import { DeliveriesListEmptyState } from "../DeliveriesListEmptyState";
import { EDeliveryStatus, EUserType, type IDeliveries } from "../../types";
import DeliveriesListItem from "../DeliveriesListItem/DeliveriesListItem";
import { t } from "i18next";
import styles from "./DeliveriesList.module.css";
import { usePackageStore } from "../../store/packageStore";
import { useEffect } from "react";
import { useUserStore } from "../../store/userStore";

const DeliveriesList = () => {
  const { id } = useUserStore();
  const { data, loadings, getAll } = usePackageStore();

  useEffect(() => {
    getAll();
  }, []);

  if (loadings.get) {
    return "Loading...";
  }

  const list = data.all.map<IDeliveries>((delivery) => ({
    id: delivery.id,
    currency: delivery.currency,
    price: `${delivery.amount}`,
    ttn: delivery.id,
    userType:
      +id === +delivery.sellerId ? EUserType.SELLER : EUserType.RECIPIENT,
    status: EDeliveryStatus.PENDING,
    archive: false,
    info: {
      createdAt: delivery.createDt,
      recipient: delivery.metadata.RecipientFullNameEW,
      seller: delivery.metadata.SenderFullNameEW,
      sellerCity: delivery.metadata.CitySender,
      recipientCity: delivery.metadata.CityRecipient,
      deliveryDate: delivery.metadata.ScheduledDeliveryDate
    }
  }));

  console.log(JSON.stringify(list));

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
