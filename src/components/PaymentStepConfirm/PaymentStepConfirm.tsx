import { t } from "i18next";
import { useEffect, type FC } from "react";
import { QRCode } from "react-qrcode-logo";

import { usePaymentStore } from "../../store/paymentStore";

import { Icon } from "../Icon";
import { useCopy } from "../../hooks/useCopy";

import type { IDeliveries, NetworkCode } from "../../types";
import styles from "./PaymentStepConfirm.module.css";
import { usePackageStore } from "../../store/packageStore";
import { Loader } from "../Loader";
import { formatPriceValue } from "../../helpers/formatPriceValue";

type Props = {
  delivery: IDeliveries;
};

const PaymentStepConfirm: FC<Props> = ({ delivery }) => {
  const { isCopy, handleCopy } = useCopy();
  const loading = usePaymentStore((state) => state.loadings.payment);
  const payment = usePaymentStore((state) => state.payment);
  const data = usePaymentStore((state) => state.data.payment);
  const details = usePackageStore((state) => state.data.details);
  const selectedAsset = usePaymentStore((state) => state.selectedAsset);
  const selectedNetwork = usePaymentStore((state) => state.selectedNetwork);

  useEffect(() => {
    if (!selectedAsset || !selectedNetwork || loading) return;

    payment({
      currency: selectedAsset.code,
      id: Telegram.WebApp.initDataUnsafe!.start_param!,
      network: selectedNetwork.code as NetworkCode
    });
  }, [selectedAsset, selectedNetwork]);

  const handleCopyClick = async () => {
    const text = data?.address || "";
    handleCopy(text);
  };

  const calculateFee = (price: string | number) => {
    const fee = selectedNetwork!.fee.payment;
    const packagePrice = +price + +price * fee.percent + fee.fixed;

    return formatPriceValue(packagePrice);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-h-[calc(100vh-100px)] overflow-y-auto pt-[30px]">
      <span className="mx-auto mb-2 block text-center text-[20px] font-semibold">
        {`${selectedNetwork?.name}`}
      </span>

      <div className="flex w-full flex-col items-center justify-center gap-[8px]">
        <QRCode value={data?.address} logoWidth={220} />
        <p
          className={styles.logo__info}
        >{`${t("payment.pay")} ${selectedNetwork?.name} ${t("payment.only")}`}</p>
      </div>

      <div className={styles.link__box}>
        <p className={styles.link__text}>{data?.address}</p>
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
          >{`${details?.metadata.FactualWeight} ${t("payment.kg")}`}</p>
        </div>

        <div className="h-[1px] w-full bg-[#BCC3D080]" />

        <div className="flex w-full items-center justify-between">
          <p className={styles.package__total}>{t("payment.total")}</p>
          <p className={styles.package__total}>
            {calculateFee(delivery.price)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentStepConfirm;
