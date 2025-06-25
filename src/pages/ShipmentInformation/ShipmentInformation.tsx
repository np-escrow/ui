import {
  EDeliveryStatus,
  EPlatform,
  EUserType,
  ParseOrderStatus
} from "../../types";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components/Button";
import { NavHeader } from "../../components/NavHeader";
import ShipmentDealInfo from "../../components/ShipmentDealInfo/ShipmentDealInfo";
import ShipmentPaymentsDetails from "../../components/ShipmentPaymentsDetails/ShipmentPaymentsDetails";
import classNames from "classnames";
import styles from "./ShipmentInformation.module.css";
import { t } from "i18next";
import { useEffect } from "react";
import { usePackageStore } from "../../store/packageStore";
import { useUserStore } from "../../store/userStore";

const ShipmentInformation = () => {
  const { id } = useParams<{ id: string }>();
  const { id: userId, platform } = useUserStore();

  const { data, get } = usePackageStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) get(+id);
  }, []);

  if (!data.details) {
    return "Not found";
  }

  const userType =
    +data.details.sellerId === userId ? EUserType.SELLER : EUserType.RECIPIENT;
  const pStatus = ParseOrderStatus[
    data.details.status
  ] as unknown as EDeliveryStatus;

  const handleClick = () => {
    if (userType === EUserType.SELLER && data.details?.link) {
      const text = t("shipment.shareText", {
        ttn: data.details.metadata.Number
      });
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(data.details?.link)}&text=${encodeURIComponent(text)}`
      );
    }
    if (userType === EUserType.RECIPIENT && data.details?.status === "new") {
      navigate(`/payment/${data.details.metadata.Number}`);
      // window.Telegram.WebApp.openTelegramLink(data.details.link);
    }
  };

  return (
    <main className="page-with-button flex flex-col justify-start">
      <div className="custom-container flex-1 !px-0">
        <div className="flex h-full flex-col">
          <div className="mb-[30px] mt-5 px-[1rem]">
            <NavHeader isLink={true} link="/" />
          </div>

          <div
            className={classNames(styles.shipment__container, {
              "!max-h-[calc(100dvh-190px)]":
                platform !== EPlatform.IOS && platform !== EPlatform.ANDROID
            })}
          >
            <div className={styles.shipment__box}>
              <ShipmentDealInfo
                ttn={data.details.metadata.Number}
                status={data.details.status}
                data={data.details.paimentData}
              />
            </div>
            <div className="w-full">
              <p className={styles.shipment__subtitle}>
                {t("shipment.detailsTitle")}
              </p>
              <div className={styles.shipment__box}>
                <ul className="flex w-full flex-col gap-[14px]">
                  <li className="flex items-start justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsTtn")}
                    </p>
                    <p className={styles.package_detail__value}>
                      #{data.details.metadata.Number}
                    </p>
                  </li>
                  <li className="flex items-start justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsFrom")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {data.details.metadata.WarehouseSenderAddress}
                    </p>
                  </li>
                  <li className="flex items-start justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsTo")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {data.details.metadata.WarehouseRecipientAddress}
                    </p>
                  </li>
                  <li className="flex items-start justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsWeight")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {t("shipment.weightValue", {
                        value: data.details.metadata.FactualWeight
                      })}
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="mb-[40px] w-full">
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

          {pStatus === EDeliveryStatus.PENDING && (
            <div className="custom-container primary-button-container">
              <Button actionHandler={handleClick}>
                {userType === EUserType.SELLER ? "Share" : "Pay"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShipmentInformation;
