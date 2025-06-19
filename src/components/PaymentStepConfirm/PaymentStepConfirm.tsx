import { useEffect, type FC } from "react";
// import { QRCode } from "react-qrcode-logo";
// import styles from "./PaymentStepConfirm.module.css";
// import { Icon } from "../Icon";
// import { useCopy } from "../../hooks/useCopy";
// import { t } from "i18next";
import type { IDeliveries } from "../../types";
// import { usePaymentStore } from "../../store/paymentStore";

type Props = {
  delivery: IDeliveries;
};

const PaymentStepConfirm: FC<Props> = () => {
  // { delivery }
  // const { isCopy, handleCopy } = useCopy();

  // const selectedAsset = usePaymentStore((state) => state.selectedAsset);
  // const selectedNetwork = usePaymentStore((state) => state.selectedNetwork);

  // const handleCopyClick = async () => {
  //   const text = `https://t.me/AngryMinerBot/?start=${delivery.ttn}`;
  //   handleCopy(text);
  // };

  useEffect(() => {}, []);

  // const calculateFee = (price: string | number, fee: string | number) => {
  //   const packagePrice = typeof price === "number" ? price : parseFloat(price);
  //   const packageFee = typeof fee === "number" ? fee : parseFloat(fee);
  //   if (
  //     isNaN(packagePrice) ||
  //     packagePrice <= 0 ||
  //     isNaN(packageFee) ||
  //     packageFee < 0
  //   ) {
  //     return "0.00";
  //   }
  //   return (packagePrice - packageFee).toFixed(2);
  // };

  return (
    <div className="max-h-[calc(100vh-100px)] overflow-y-auto pt-[30px]">
      {/* <span className="mx-auto mb-2 block text-center text-[20px] font-semibold">
        {`${selectedAsset?.token} ${selectedNetwork?.name}`}
      </span>

      <div className="flex w-full flex-col items-center justify-center gap-[8px]">
        <QRCode value={MOCK_PAYMENT_ADDRESS} logoWidth={220} />
        <p
          className={styles.logo__info}
        >{`${t("payment.pay")} ${selectedAsset?.token} ${selectedNetwork?.name} ${t("payment.only")}`}</p>
      </div>

      <div className={styles.link__box}>
        <p className={styles.link__text}>{MOCK_PAYMENT_ADDRESS}</p>
        <button className="cursor-pointer" onClick={handleCopyClick}>
          <Icon name={isCopy ? "little_success" : "copy"} size={24} />
        </button>
      </div>
      <h3 className={styles.package__title}>{t("sendPackage.sendSubtitle")}</h3>
      <div className={styles.package__box}>
        <div className="flex w-full items-center justify-between">
          <p className={styles.package__subtitle}>{t("sendPackage.sendTTN")}</p>
          <p className={styles.package__value}>{`#${delivery.ttn}`}</p>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className={styles.package__subtitle}>
            {t("sendPackage.sendRoute")}
          </p>
          <p
            className={styles.package__value}
          >{`${delivery.info.sellerCity} - ${delivery.info.recipientCity}`}</p>
        </div>

        <div className="flex w-full items-center justify-between">
          <p className={styles.package__subtitle}>
            {t("sendPackage.sendWeight")}
          </p>
          <p
            className={styles.package__value}
          >{`${MOCK_PACKAGE_WEIGHT} ${t("payment.kg")}`}</p>
        </div>

        <div className="h-[1px] w-full bg-[#BCC3D080]" />

        <div className="flex w-full items-center justify-between">
          <p className={styles.package__total}>{t("payment.total")}</p>
          <p className={styles.package__total}>
            ${calculateFee(delivery.price, 1)}
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default PaymentStepConfirm;
