import {
  BACKGROUND_COLOR,
  BORDER_COLOR,
  COLOR
} from "./ShipmentDealInfo.styles";

import type { FC } from "react";
import { Icon } from "../Icon";
import { OrderStatus } from "../../types";
import { format } from "date-fns";
import styles from "./ShipmentDealInfo.module.css";
import { t } from "i18next";

interface IShipmentDealInfoProps {
  ttn: string;
  status: OrderStatus;
  data: Array<{
    name: string;
    date: string;
  }>;
}

const ShipmentDealInfo: FC<IShipmentDealInfoProps> = ({
  ttn,
  status,
  data
}) => {
  const bgColorProperty = {
    "--bg-color": BACKGROUND_COLOR[status],
    "--color": COLOR[status],
    "--border": BORDER_COLOR[status]
  };
  return (
    <>
      <div className="flex w-full items-start justify-between">
        <p className={styles.deal_info__title}>
          {t("shipment.dealTitle", { ttn: `#${ttn}` })}
        </p>
        <div
          style={bgColorProperty as React.CSSProperties}
          className={styles.deal_info__box}
        >
          <p className="text-nowrap">
            {status === OrderStatus.new
              ? t("shipment.dealPending")
              : t("shipment.dealDone")}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-[20px]">
        {data.map((item) => (
          <div key={+new Date(item.date)} className={styles.deal_info__item}>
            <Icon name="success" size={34} />
            <div>
              <p className={styles.deal_info__title}>{item.name}</p>
              <p className={styles.deal_info__subtitle}>
                {format(item.date, "dd MMM, yyyy")}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ShipmentDealInfo;
