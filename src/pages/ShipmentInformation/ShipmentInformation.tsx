import { t } from "i18next";

import { Button } from "../../components/Button";
import { NavHeader } from "../../components/NavHeader";
import ShipmentPaymentsDetails from "../../components/ShipmentPaymentsDetails/ShipmentPaymentsDetails";

import { usePackageStore } from "../../store/packageStore";
import { EDeliveryStatus, EUserType, ParseOrderStatus } from "../../types";

import styles from "./ShipmentInformation.module.css";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const ShipmentInformation = () => {
  const { id } = useParams<{ id: string }>();
  const { id: userId } = useUserStore();
  const { data, loadings, get } = usePackageStore();

  useEffect(() => {
    if (id) get(+id);
  }, []);

  if (loadings.create) {
    return "Loading...";
  }

  if (!data.details) {
    return "Not found";
  }

  const userType =
    +data.details.sellerId === userId ? EUserType.SELLER : EUserType.RECIPIENT;
  const pStatus = ParseOrderStatus[
    data.details.status
  ] as unknown as EDeliveryStatus;

  return (
    <main className="page-with-button flex flex-col justify-start">
      <div className="custom-container flex-1 !px-0">
        <div className="flex h-full flex-col">
          <div className="mb-[30px] mt-5 px-[1rem]">
            <NavHeader isLink={true} link="/" />
          </div>

          <div className={styles.shipment__container}>
            <div className={styles.shipment__box}>
              {/* <ShipmentDealInfo
                ttn={data.details.metadata.Number}
                status={data.details.status}
                data={data.details.paimentData}
              /> */}
            </div>
            <div className="w-full">
              <p className={styles.shipment__subtitle}>
                {t("shipment.detailsTitle")}
              </p>
              <div className={styles.shipment__box}>
                <ul className="flex w-full flex-col gap-[14px]">
                  <li className="flex items-center justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsTtn")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {data.details.metadata.Number}
                    </p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsFrom")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {data.details.metadata.SenderAddress}
                    </p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsTo")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {data.details.metadata.RecipientAddress}
                    </p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsWeight")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {data.details.metadata.FactualWeight}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full">
              <p className={styles.shipment__subtitle}>
                {t("shipment.paymentTitle")}
              </p>
              <div className={styles.shipment__box}>
                <ShipmentPaymentsDetails
                  userType={userType}
                  price={data.details.amount}
                  currency={data.details.currency}
                  fee={data.details.fee}
                />
              </div>
            </div>
          </div>

          {pStatus !== EDeliveryStatus.COMPLETED && (
            <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
              <Button>{userType === EUserType.SELLER ? "Share" : "Pay"}</Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShipmentInformation;
