import { Button } from "../../components/Button";
import { EDeliveryStatus, EUserType, type IShipmentInfo } from "../../types";
import { NavHeader } from "../../components/NavHeader";
import styles from "./ShipmentInformation.module.css";
import ShipmentDealInfo from "../../components/ShipmentDealInfo/ShipmentDealInfo";
import ShipmentPaymentsDetails from "../../components/ShipmentPaymentsDetails/ShipmentPaymentsDetails";
import { t } from "i18next";

const mockShipmentInfo: IShipmentInfo = {
  id: "shipment_123456",
  ttn: "#2040506070809",
  status: EDeliveryStatus.PENDING,
  userType: EUserType.SELLER,
  paimentData: [
    {
      id: "pay_1",
      name: "Initial Payment",
      date: "2025-06-17T10:30:00Z"
    },
    {
      id: "pay_2",
      name: "Final Payment",
      date: "2025-06-18T12:00:00Z"
    }
  ],
  packageDetails: {
    from: "Kyiv",
    to: "Lviv",
    weight: "2.5kg"
  },
  paymentDetails: {
    price: 500.0,
    currency: "UAH",
    fee: 15.0
  }
};

const ShipmentInformation = () => {
  // TODO: Implement logic for fetching shipment information
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
                ttn={mockShipmentInfo.ttn}
                status={mockShipmentInfo.status}
                data={mockShipmentInfo.paimentData}
              />
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
                      {mockShipmentInfo.ttn}
                    </p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsFrom")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {mockShipmentInfo.packageDetails.from}
                    </p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsTo")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {mockShipmentInfo.packageDetails.to}
                    </p>
                  </li>
                  <li className="flex items-center justify-between">
                    <p className={styles.package_detail__subtitle}>
                      {t("shipment.detailsWeight")}
                    </p>
                    <p className={styles.package_detail__value}>
                      {mockShipmentInfo.packageDetails.weight}
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
                  userType={mockShipmentInfo.userType}
                  price={mockShipmentInfo.paymentDetails.price}
                  currency={mockShipmentInfo.paymentDetails.currency}
                  fee={mockShipmentInfo.paymentDetails.fee}
                />
              </div>
            </div>
          </div>

          {mockShipmentInfo.status !== EDeliveryStatus.COMPLETED && (
            <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
              <Button>
                {mockShipmentInfo.userType === EUserType.SELLER
                  ? "Share"
                  : "Pay"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default ShipmentInformation;
