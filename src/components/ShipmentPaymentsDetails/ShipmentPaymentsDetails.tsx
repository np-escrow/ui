import { EUserType } from "../../types";
import type { FC } from "react";
import classNames from "classnames";
import { formatPriceValue } from "../../helpers/formatPriceValue";
import styles from "./ShipmentPaymentsDetails.module.css";
import { t } from "i18next";

interface IShipmentPaymentsDetailsProps {
  userType: EUserType;
  price: number;
  fee: {
    fixed: number;
    percent: number;
  };
  currency: string;
}

const ShipmentPaymentsDetails: FC<IShipmentPaymentsDetailsProps> = ({
  price,
  userType,
  fee
}) => {
  const pFee = +price * fee.percent + fee.fixed;
  const amount = +price - (+price * fee.percent + fee.fixed);

  return (
    <div className="flex w-full flex-col gap-[16px]">
      <div className="flex items-center justify-between">
        <p className={styles.details__subtitle}>{t("shipment.paymentPrice")}</p>
        <p className={styles.details__value}>
          {formatPriceValue(price, "USD")}
        </p>
      </div>
      <div className="flex items-center justify-between">
        <p className={styles.details__subtitle}>{t("shipment.paymentFee")}</p>
        <p className={styles.details__value}>{formatPriceValue(pFee)}</p>
      </div>
      <div className="h-[1px] w-full bg-[#BCC3D080]" />
      <div className="flex items-center justify-between">
        <p className={styles.details__total}>
          {userType === EUserType.SELLER
            ? t("shipment.totalSeller")
            : t("shipment.total")}
          :
        </p>
        <p className={styles.details__total}>
          {userType === EUserType.SELLER
            ? formatPriceValue(amount)
            : formatPriceValue(price)}
        </p>
      </div>
      <div className="h-[1px] w-full bg-[#BCC3D080]" />
      <div className="flex flex-col gap-[8px]">
        <p className={classNames(styles.details__subtitle, "!text-[14px]")}>
          {t("shipment.role")}
        </p>
        <p className={styles.details__value}>
          {userType === EUserType.SELLER
            ? t("shipment.roleSeller")
            : t("shipment.roleRecepient")}
        </p>
      </div>
    </div>
  );
};

export default ShipmentPaymentsDetails;
