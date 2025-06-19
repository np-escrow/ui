import { Button } from "../Button";
import { type ICreatePackage } from "../../pages/SendPackage/SendPackage.type";
import type { FC } from "react";
import { QRCode } from "react-qrcode-logo";
import styles from "./SendPackagePaymentSend.module.css";
import { Icon } from "../Icon";
import { useCopy } from "../../hooks/useCopy";
import { t } from "i18next";

interface ISendPackagePaymentSendProps {
  createdPackage: null | ICreatePackage;
}

const SendPackagePaymentSend: FC<ISendPackagePaymentSendProps> = ({
  createdPackage
}) => {
  const { isCopy, handleCopy } = useCopy();
  if (!createdPackage) return null;

  const handleCopyClick = async () => {
    const text = `https://t.me/AngryMinerBot/?start=${createdPackage.ttn}`;
    handleCopy(text);
  };

  const handleShare = () => {
    const url = `https://t.me/AngryMinerBot/?start=${createdPackage.ttn}`;

    const text = `LInk on your package`;

    try {
      window.Telegram.WebApp.openTelegramLink(
        `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`
      );
    } catch (err) {
      console.log(err);
    }
  };

  const calculateFee = (price: string | number, fee: string | number) => {
    const packagePrice = typeof price === "number" ? price : parseFloat(price);
    const packageFee = typeof fee === "number" ? fee : parseFloat(fee);
    if (
      isNaN(packagePrice) ||
      packagePrice <= 0 ||
      isNaN(packageFee) ||
      packageFee < 0
    ) {
      return "0.00";
    }
    return (packagePrice - packageFee).toFixed(2);
  };

  return (
    <>
      <div className="flex w-full flex-col items-center justify-center gap-[8px]">
        <QRCode value={createdPackage.paymentLink} logoWidth={220} />
        <p className={styles.logo__info}>{t("sendPackage.sendDescription")}</p>
      </div>
      <div className={styles.link__box}>
        <p className={styles.link__text}>{createdPackage.paymentLink}</p>
        <button className="cursor-pointer" onClick={handleCopyClick}>
          <Icon name={isCopy ? "little_success" : "copy"} size={24} />
        </button>
      </div>
      <h3 className={styles.package__title}>{t("sendPackage.sendSubtitle")}</h3>
      <div className={styles.package__box}>
        <div className="flex w-full items-center justify-between">
          <p className={styles.package__subtitle}>{t("sendPackage.sendTTN")}</p>
          <p className={styles.package__value}>{createdPackage.ttn}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className={styles.package__subtitle}>
            {t("sendPackage.sendRoute")}
          </p>
          <p className={styles.package__value}>{createdPackage.route}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className={styles.package__subtitle}>
            {t("sendPackage.sendWeight")}
          </p>
          <p className={styles.package__value}>{createdPackage.weight}</p>
        </div>

        <div className="h-[1px] w-full bg-[#BCC3D080]" />

        <div className="flex w-full items-center justify-between">
          <p className={styles.package__subtitle}>
            {t("sendPackage.sendPrice")}
          </p>
          <p className={styles.package__value}>${createdPackage.price}</p>
        </div>
        <div className="flex w-full items-center justify-between">
          <p className={styles.package__subtitle}>{t("sendPackage.sendFee")}</p>
          <p className={styles.package__value}>${createdPackage.fee}</p>
        </div>

        <div className="h-[1px] w-full bg-[#BCC3D080]" />
        <div className="flex w-full items-center justify-between">
          <p className={styles.package__total}>{t("sendPackage.sendTotal")}</p>
          <p className={styles.package__total}>
            ${calculateFee(createdPackage.price, createdPackage.fee)}
          </p>
        </div>
      </div>
      {/* <div className="pb-[40px]" /> */}
      <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
        <Button actionHandler={handleShare}>
          {t("sendPackage.sendButton")}
        </Button>
      </div>
    </>
  );
};

export default SendPackagePaymentSend;
