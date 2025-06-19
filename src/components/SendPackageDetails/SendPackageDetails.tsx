import { Button } from "../Button";
import {
  ESendPakageTab,
  type IPackage
} from "../../pages/SendPackage/SendPackage.type";
import type { FC } from "react";

import styles from "./SendPackageDetails.module.css";
import { t } from "i18next";

interface ISendPackageDetailsProps {
  setActiveTab: (tab: ESendPakageTab) => void;
  pkg: IPackage | null;
}

const SendPackageDetails: FC<ISendPackageDetailsProps> = ({
  setActiveTab,
  pkg
}) => {
  if (!pkg) {
    return null; // or handle the case when pkg is null
  }

  return (
    <>
      <div className={styles.details__box}>
        <ul className="flex w-full flex-col gap-[20px]">
          <li className="flex items-center justify-between">
            <p className={styles.details__subtitle}>
              {t("sendPackage.detailsTTN")}
            </p>
            <p className={styles.details__value}>#{pkg.ttn}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className={styles.details__subtitle}>
              {t("sendPackage.detailsFrom")}
            </p>
            <p className={styles.details__value}>{pkg.from}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className={styles.details__subtitle}>
              {t("sendPackage.detailsTo")}
            </p>
            <p className={styles.details__value}>{pkg.to}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className={styles.details__subtitle}>
              {t("sendPackage.detailsWeight")}
            </p>
            <p className={styles.details__value}>{pkg.weight}</p>
          </li>
          <li className="flex items-center justify-between">
            <p className={styles.details__subtitle}>
              {t("sendPackage.detailsDimensions")}
            </p>
            <p className={styles.details__value}>{pkg.dimensions}</p>
          </li>
        </ul>
      </div>
      <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
        <Button
          actionHandler={() => setActiveTab(ESendPakageTab.PaymentCreate)}
        >
          {t("sendPackage.detailsButton")}
        </Button>
      </div>
    </>
  );
};

export default SendPackageDetails;
