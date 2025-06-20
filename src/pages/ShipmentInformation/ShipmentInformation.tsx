import { EDeliveryStatus, EUserType, ParseOrderStatus } from "../../types";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { NavHeader } from "../../components/NavHeader";
import ShipmentDealInfo from "../../components/ShipmentDealInfo/ShipmentDealInfo";
import ShipmentPaymentsDetails from "../../components/ShipmentPaymentsDetails/ShipmentPaymentsDetails";
import styles from "./ShipmentInformation.module.css";
import { t } from "i18next";
import { useEffect } from "react";
import { usePackageStore } from "../../store/packageStore";
import { useUserStore } from "../../store/userStore";

const ShipmentInformation = () => {
  const { id } = useParams<{ id: string }>();
  const { id: userId } = useUserStore();

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
      window.open(data.details.link, "_blank");
    }
    if (userType === EUserType.RECIPIENT && data.details?.status === "new") {
      navigate("/payment?ttn=" + data.details.metadata.Number);
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

          <div className={styles.shipment__container}>
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
                      {data.details.metadata.SenderAddress}
                    </p>
                  </li>
                  <li className="flex items-start justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsTo")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {data.details.metadata.RecipientAddress}
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
