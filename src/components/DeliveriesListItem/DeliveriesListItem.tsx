import { t } from "i18next";
import classNames from "classnames";
import { useMemo, type FC } from "react";
import { useNavigate } from "react-router-dom";

import DeliveriesItemInfo from "../DeliveriesItemInfo/DeliveriesItemInfo";

import {
  EUserType,
  EDeliveryStatus,
  ParseOrderStatus,
  type IDeliveries
} from "../../types";
import styles from "./DeliveriesListItem.module.css";
import { formatPriceValue } from "../../helpers/formatPriceValue";

interface DeliveriesListItemProps {
  item: IDeliveries;
}

const DeliveriesListItem: FC<DeliveriesListItemProps> = ({ item }) => {
  const navigate = useNavigate();
  const pStatus = ParseOrderStatus[item.status] as unknown as EDeliveryStatus;

  const subtitle = useMemo(() => {
    if (pStatus === EDeliveryStatus.PENDING) {
      return item.userType === EUserType.SELLER
        ? t("deliveries.item.sub-to", {
            recipient: `${item.info.recipient ? item.info.recipient + "," : ""} ${item.info.recipientCity}`
          }) //
        : t("deliveries.item.sub-from", {
            seller: `${item.info.seller}, ${item.info.sellerCity}`
          }); // ;
    }
    return item.userType === EUserType.SELLER
      ? t("deliveries.item.sub-seller")
      : t("deliveries.item.sub-recepient");
  }, [item]);

  const status = useMemo(() => {
    if (pStatus === EDeliveryStatus.PENDING) {
      if (item.userType === EUserType.RECIPIENT) {
        return t("deliveries.item.statuspending-recepient");
      } else {
        return t("deliveries.item.statuspending-seller");
      }
    }
    if (pStatus === EDeliveryStatus.PAID) {
      return t("deliveries.item.status-paid");
    }
    if (pStatus === EDeliveryStatus.COMPLETED) {
      return item.archive
        ? t("deliveries.item.status-completed-archive")
        : t("deliveries.item.status-completed");
    }
    return item.status;
  }, [item.status, item.userType, item.archive]);

  return (
    <div
      className={classNames(styles.deliveries__box, {
        [styles.completed]: status === EDeliveryStatus.COMPLETED && item.archive
      })}
      onClick={() => navigate(`/shipment-info/${item.id}`)}
    >
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p className={styles.deliveries__header}>#{item.ttn}</p>
          <p className={styles.deliveries__header}>
            {formatPriceValue(+item.price)}
          </p>
        </div>
        <p className={styles.deliveries__subtitle}>{subtitle}</p>
      </div>
      {!item.archive && status !== EDeliveryStatus.PENDING && (
        <DeliveriesItemInfo
          isDeliveried={
            item.info.deliveryDate
              ? new Date(item.info.deliveryDate).getTime() < Date.now()
              : false
          }
          createdAt={item.info.createdAt}
          deliveryDate={item.info.deliveryDate}
          sellerCity={item.info.sellerCity}
          recepientCity={item.info.recipientCity}
        />
      )}
      <div className="h-[1px] w-full bg-[#bcc3d080]" />
      <p className={styles.deliveries__status}>
        {t("deliveries.item.status")}: <span>{status}</span>
      </p>
    </div>
  );
};

export default DeliveriesListItem;
