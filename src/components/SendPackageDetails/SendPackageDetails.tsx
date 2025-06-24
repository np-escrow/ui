import { Button } from "../Button";
import { ESendPakageTab } from "../../pages/SendPackage/SendPackage.type";
import type { FC } from "react";
import styles from "./SendPackageDetails.module.css";
import { t } from "i18next";
import { usePackageStore } from "../../store/packageStore";

const SendPackageDetails: FC = () => {
  const { error, data, setActiveTab } = usePackageStore();
  const pkg = data.create?.metadata;

  if (!pkg) {
    return null; // or handle the case when pkg is null
  }

  if (error.create) {
    return (
      <>
        <div className={styles.details__box}>
          <div>{error.create}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className={styles.details__box}>
        <ul className="flex w-full flex-col gap-[20px]">
          <li className="flex items-start justify-between">
            <p className={styles.details__subtitle}>
              {t("sendPackage.detailsTTN")}
            </p>
            <p className={styles.details__value}>#{pkg.Number}</p>
          </li>
          <li className="flex items-start justify-between">
            <p className={styles.details__subtitle}>
              {t("sendPackage.detailsFrom")}
            </p>
            <p className={styles.details__value}>{pkg.SenderAddress}</p>
          </li>
          <li className="flex items-start justify-between">
            <p className={styles.details__subtitle}>
              {t("sendPackage.detailsTo")}
            </p>
            <p className={styles.details__value}>{pkg.RecipientAddress}</p>
          </li>
          <li className="flex items-start justify-between">
            <p className={styles.details__subtitle}>
              {t("sendPackage.detailsWeight")}
            </p>
            <p className={styles.details__value}>
              {t("shipment.weightValue", {
                value: pkg.FactualWeight
              })}
            </p>
          </li>
          {/* <li className="flex items-center justify-between">
            <p className={styles.details__subtitle}>
              {t("sendPackage.detailsDimensions")}
            </p>
            <p className={styles.details__value}>{pkg.dimensions}</p>
          </li> */}
        </ul>
      </div>
      <div className="custom-container primary-button-container">
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
