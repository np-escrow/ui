import { DeliveriesListEmptyState } from "../DeliveriesListEmptyState";
import DeliveriesListItem from "../DeliveriesListItem/DeliveriesListItem";
import { EPlatform } from "../../types";
import classNames from "classnames";
import { formatterDeliveries } from "../../helpers/formatterDeliveries";
import styles from "./DeliveriesList.module.css";
import { t } from "i18next";
import { useEffect } from "react";
import { usePackageStore } from "../../store/packageStore";
import { useUserStore } from "../../store/userStore";

const DeliveriesList = () => {
  const { id } = useUserStore();
  const { data, getAll } = usePackageStore();
  const { platform } = useUserStore();

  useEffect(() => {
    getAll();
  }, []);

  const list = data.all.map((delivery) => formatterDeliveries(delivery, id));

  return (
    <>
      <span className="px-[1rem] text-[15px] font-semibold">
        {t("home.deliveries")}
      </span>
      <div
        className={classNames({
          [styles.scroll__container]:
            platform === EPlatform.IOS || platform === EPlatform.ANDROID,
          [styles.scroll__desktop_container]:
            platform !== EPlatform.IOS && platform !== EPlatform.ANDROID
        })}
      >
        {list.length ? (
          <div className="flex flex-col gap-[30px]">
            {list.map((delivery) => (
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
