import { useEffect, useState, type FC } from "react";
import styles from "./ShipmentPaymentDuration.module.css";
import classNames from "classnames";
import { t } from "i18next";

interface IShipmentPaymentDurationProps {
  date: Date;
}

const ShipmentPaymentDuration: FC<IShipmentPaymentDurationProps> = ({
  date
}) => {
  const [time, setTime] = useState<string>("15:00");

  useEffect(() => {
    const endTime = date.getTime() + 15 * 60 * 1000; // deadline (15 minutes after provided date)

    const updateTime = () => {
      const now = Date.now();
      const timeRemaining = Math.max(endTime - now, 0);

      const minutes = Math.floor((timeRemaining / (1000 * 60)) % 60);
      const seconds = Math.floor((timeRemaining / 1000) % 60);

      setTime(
        `${minutes
          .toString()
          .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
      );
    };

    updateTime(); // initialize immediately
    const interval = setInterval(updateTime, 1000); // update every second

    return () => clearInterval(interval); // cleanup
  }, [date]);

  return (
    <>
      <div className="flex flex-col gap-[2px]">
        <h3 className={styles.title}>{t("shipment.duration.title")}</h3>
        {time === "00:00" ? (
          <p className={styles.description}>
            {t("shipment.duration.notPayment")}
          </p>
        ) : (
          <p className={styles.description}>
            {t("shipment.duration.subtitle")}
            <span className="block">
              {t("shipment.duration.timeCounter")}{" "}
              <span className="font-medium text-[#1d2023]">{time}</span>
            </span>
          </p>
        )}
      </div>
      <a
        href="https://t.me/npescrowsupport"
        target="_blank"
        rel="noopener noreferrer"
        className={classNames("font-sf-pro-text", styles.supportButton)}
      >
        {t("shipment.duration.supportBtn")}
      </a>
    </>
  );
};

export default ShipmentPaymentDuration;
