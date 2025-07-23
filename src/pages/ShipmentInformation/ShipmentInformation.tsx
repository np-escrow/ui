import {
  EDeliveryStatus,
  EPlatform,
  EUserType,
  ParseOrderStatus
} from "../../types";
import { useNavigate, useNavigationType, useParams } from "react-router-dom";

import { Button } from "../../components/Button";
import { NavHeader } from "../../components/NavHeader";
import ShipmentDealInfo from "../../components/ShipmentDealInfo/ShipmentDealInfo";
import { ShipmentPaymentDuration } from "../../components/ShipmentPaymentDuration";
import ShipmentPaymentsDetails from "../../components/ShipmentPaymentsDetails/ShipmentPaymentsDetails";
import styles from "./ShipmentInformation.module.css";
import { t } from "i18next";
import { useEffect } from "react";
import { usePackageStore } from "../../store/packageStore";
import { useUserStore } from "../../store/userStore";

const ShipmentInformation = () => {
  const { id } = useParams<{ id: string }>();
  const { id: userId, platform } = useUserStore();

  const { data, get, payments } = usePackageStore();
  const navigate = useNavigate();
  const navigationType = useNavigationType();

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

  function getStyledContainer() {
    const isMobile =
      platform === EPlatform.IOS || platform === EPlatform.ANDROID;
    const isPending = pStatus === EDeliveryStatus.PENDING;

    const offsets = {
      mobile: { pending: 280, default: 185 },
      desktop: { pending: 190, default: 100 }
    };

    const offset = isMobile
      ? isPending
        ? offsets.mobile.pending
        : offsets.mobile.default
      : isPending
        ? offsets.desktop.pending
        : offsets.desktop.default;

    return { "--max-height": `calc(100dvh - ${offset}px)` };
  }

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

  const shipmentDetails = {
    ttn: {
      title: t("shipment.detailsTtn"),
      value: data?.details?.metadata?.Number
        ? `#${data.details.metadata.Number}`
        : ""
    },
    from: {
      title: t("shipment.detailsFrom"),
      value: data?.details?.metadata?.WarehouseSenderAddress ?? ""
    },
    to: {
      title: t("shipment.detailsTo"), // Add a title for the "to" field
      value: data?.details?.metadata?.WarehouseRecipientAddress ?? ""
    },
    weight: {
      title: t("shipment.detailsWeight"), // You might want to add this if missing
      value: data?.details?.metadata?.FactualWeight
        ? t("shipment.weightValue", {
            value: data.details.metadata.FactualWeight
          })
        : ""
    }
  };

  const handleBack = () => {
    if (window.history.length > 1 && navigationType !== "POP") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const paymentDate = payments.get(data.details.metadata.Number);

  return (
    <main className="page-with-button flex flex-col justify-start">
      <div className="custom-container flex-1 !px-0">
        <div className="flex h-full flex-col">
          <div className="mb-[30px] mt-5 px-[1rem]">
            <NavHeader isLink={false} action={handleBack} />
          </div>

          <div
            className={styles.shipment__container}
            style={getStyledContainer() as React.CSSProperties}
          >
            <div className={styles.shipment__box}>
              <ShipmentDealInfo
                ttn={data.details.metadata.Number}
                status={data.details.status}
                data={data.details.paimentData}
              />
            </div>

            {paymentDate && (
              <div className={styles.shipment__box}>
                <ShipmentPaymentDuration date={paymentDate} />
              </div>
            )}

            <div className="w-full">
              <p className={styles.shipment__subtitle}>
                {t("shipment.detailsTitle")}
              </p>
              <div className={styles.shipment__box}>
                <ul className="flex w-full flex-col gap-[14px]">
                  {Object.entries(shipmentDetails).map(([key, detail]) => (
                    <li key={key} className="flex items-start justify-between">
                      <p className={styles.package_detail__subtitle}>
                        {detail.title}
                      </p>
                      <p className={styles.package_detail__value}>
                        {detail.value}
                      </p>
                    </li>
                  ))}
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
                {userType === EUserType.SELLER
                  ? t("shipment.shareButtonTitle")
                  : t("shipment.payButtonTitle")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShipmentInformation;
