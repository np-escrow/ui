import { DeliveriesListEmptyState } from "../DeliveriesListEmptyState";
import { EDeliveryStatus, EUserType, type IDeliveries } from "../../types";
import DeliveriesListItem from "../DeliveriesListItem/DeliveriesListItem";
import { t } from "i18next";
import styles from "./DeliveriesList.module.css";

const mockDeliveries: Array<IDeliveries> = [
  {
    id: "1",
    ttn: "#123456789065",
    userType: EUserType.RECIPIENT,
    status: EDeliveryStatus.PENDING,
    price: "100",
    currency: "UAH",
    info: {
      createdAt: "2023-10-01T12:00:00Z",
      deliveryDate: "2023-10-02T12:00:00Z",
      sellerCity: "Kyiv",
      seller: "Andrew",
      recipient: "Oleg",
      recipientCity: "Lviv/Ukraine"
    },
    archive: false
  },
  {
    id: "12",
    ttn: "#100456789065",
    userType: EUserType.RECIPIENT,
    status: EDeliveryStatus.PAID,
    price: "164",
    currency: "UAH",
    info: {
      createdAt: "2023-10-01T12:00:00Z",
      deliveryDate: "2027-10-02T12:00:00Z",
      sellerCity: "Kyiv",
      seller: "Andrew",
      recipient: "Oleg",
      recipientCity: "Lviv"
    },
    archive: false
  },
  {
    id: "2",
    ttn: "#123431789065",
    userType: EUserType.SELLER,
    status: EDeliveryStatus.COMPLETED,
    price: "90",
    currency: "UAH",
    info: {
      createdAt: "2023-10-01T12:00:00Z",
      deliveryDate: "2023-10-02T12:00:00Z",
      sellerCity: "Kyiv",
      recipientCity: "Lviv",
      seller: "Andrew",
      recipient: "Oleg"
    },
    archive: false
  },
  {
    id: "32",
    ttn: "#123431789065",
    userType: EUserType.SELLER,
    status: EDeliveryStatus.COMPLETED,
    price: "90",
    currency: "UAH",
    info: {
      createdAt: "2023-10-01T12:00:00Z",
      deliveryDate: "2023-10-02T12:00:00Z",
      sellerCity: "Kyiv",
      recipientCity: "Lviv",
      seller: "Andrew",
      recipient: "Oleg"
    },
    archive: true
  }
];

const DeliveriesList = () => {
  // TODO: Replace mockDeliveries with actual data from the backend
  return (
    <>
      <span className="px-[1rem] text-[15px] font-semibold">
        {t("home.deliveries")}
      </span>
      <div
        className={styles.scroll__container}
        //   style={{ outline: "1px solid tomato" }}
      >
        {mockDeliveries.length ? (
          <div className="flex flex-col gap-[30px]">
            {mockDeliveries.map((delivery) => (
              <DeliveriesListItem key={delivery.id} item={delivery} />
            ))}
          </div>
        ) : (
          <DeliveriesListEmptyState />
        )}
      </div>
    </>
  );
};

export default DeliveriesList;
