import type { FC } from "react";
import { Icon } from "../Icon";
import { Trans } from "react-i18next";
import { format } from "date-fns";
import styles from "./DeliveriesItemInfo.module.css";

interface DeliveriesItemInfoProps {
  isDeliveried: boolean;
  createdAt: string;
  deliveryDate: string | null;
  sellerCity: string;
  recepientCity: string;
}

const DeliveriesItemInfo: FC<DeliveriesItemInfoProps> = ({
  isDeliveried,
  createdAt,
  deliveryDate,
  sellerCity,
  recepientCity
}) => {
  return (
    <div className="flex gap-[8px]">
      <Icon
        name={isDeliveried ? "deliveries-received" : "deliveries_in_transit"}
        height={75}
      />
      <div className="flex flex-col justify-between">
        <div>
          <p className={styles.info__title}>
            <Trans i18nKey="deliveries.item.info-sent"></Trans>
          </p>
          <p
            className={styles.info__subtitle}
          >{`${sellerCity}, ${format(createdAt, "dd MMM, yyyy")}`}</p>
        </div>
        <div>
          <p className={styles.info__title}>
            <Trans i18nKey="deliveries.item.info-receiving"></Trans>
          </p>
          <p
            className={styles.info__subtitle}
          >{`${recepientCity}${deliveryDate ? `, ${format(deliveryDate, "dd MMM, yyyy")}` : ""}`}</p>
        </div>
      </div>
    </div>
  );
};

export default DeliveriesItemInfo;
