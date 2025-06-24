import { Button } from "../Button";
import type { FC } from "react";
import { Icon } from "../Icon";
import { QRCode } from "react-qrcode-logo";
import styles from "./SendPackagePaymentSend.module.css";
import { t } from "i18next";
import { useCopy } from "../../hooks/useCopy";
import { usePackageStore } from "../../store/packageStore";

const SendPackagePaymentSend: FC = () => {
  const { isCopy, handleCopy } = useCopy();
  const { data } = usePackageStore();
  if (!data.create) return null;

  const handleCopyClick = async () => {
    const text = data.create!.link;
    handleCopy(text);
  };

  const handleShare = () => {
    const url = data.create!.link;

    const text = t("shipment.shareText", {
      ttn: data.create!.metadata.Number
    });

    try {
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const calculateFee = (
    amount: string | number,
    fee: { fixed: number; percent: number }
  ) => {
    const res = +amount - (+amount * fee.percent + fee.fixed);
    return +res < 0 ? 0 : res;
  };

  return (
    <>
      <div>
        <div className="flex w-full flex-col items-center justify-center gap-[8px]">
          <QRCode value={data.create!.link} logoWidth={220} />
          <p className={styles.logo__info}>
            {t("sendPackage.sendDescription")}
          </p>
        </div>
        <div className={styles.link__box}>
          <p className={styles.link__text}>{data.create!.link}</p>
          <button className="cursor-pointer" onClick={handleCopyClick}>
            <Icon name={isCopy ? "little_success" : "copy"} size={24} />
          </button>
        </div>
        <h3 className={styles.package__title}>
          {t("sendPackage.sendSubtitle")}
        </h3>
        <div className={styles.package__box}>
          <div className="flex w-full items-center justify-between">
            <p className={styles.package__subtitle}>
              {t("sendPackage.sendTTN")}
            </p>
            <p className={styles.package__value}>
              {data.create!.metadata.Number}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className={styles.package__subtitle}>
              {t("sendPackage.sendRoute")}
            </p>
            <p className={styles.package__value}>
              {data.create.metadata.CitySender}-
              {data.create.metadata.CityRecipient}
            </p>
          </div>
          <div className="flex w-full items-center justify-between">
            <p className={styles.package__subtitle}>
              {t("sendPackage.sendWeight")}
            </p>
            <p className={styles.package__value}>
              {data.create.metadata.FactualWeight}
            </p>
          </div>

          <div className="h-[1px] w-full bg-[#BCC3D080]" />

          <div className="flex w-full items-center justify-between">
            <p className={styles.package__subtitle}>
              {t("sendPackage.sendPrice")}
            </p>
            <p className={styles.package__value}>${data.create.amount}</p>
          </div>
          {/* <div className="flex w-full items-center justify-between">
          <p className={styles.package__subtitle}>{t("sendPackage.sendFee")}</p>
          <p className={styles.package__value}>
            %{data.create.fee.percent} + ${data.create.fee.fixed}
          </p>
        </div> */}

          <div className="h-[1px] w-full bg-[#BCC3D080]" />
          <div className="flex w-full items-center justify-between">
            <p className={styles.package__total}>
              {t("sendPackage.sendTotal")}
            </p>
            <p className={styles.package__total}>
              ${calculateFee(data.create.amount, data.create.fee)}
            </p>
          </div>
        </div>
      </div>
      {/* <div className="pb-[40px]" /> */}
      <div className="custom-container primary-button-container">
        <Button actionHandler={handleShare}>
          {t("sendPackage.sendButton")}
        </Button>
      </div>
    </>
  );
};

export default SendPackagePaymentSend;
