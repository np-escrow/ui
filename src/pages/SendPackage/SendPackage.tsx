import { t } from "i18next";

import { usePackageStore } from "../../store/packageStore";

import { NavHeader } from "../../components/NavHeader";
import { SendPackageDetails } from "../../components/SendPackageDetails";
import { SendPackagePaymentCreate } from "../../components/SendPackagePaymentCreate";
import { SendPackagePaymentSend } from "../../components/SendPackagePaymentSend";
import { SendPackageValidateTTN } from "../../components/SendPackageValidateTTN";

import { ESendPakageTab } from "./SendPackage.type";
import styles from "./SendPackage.module.css";

const SendPackage = () => {
  const { data } = usePackageStore();

  const tabTitle = {
    [ESendPakageTab.ValidateTTN]: t("sendPackage.validateTitle"),
    [ESendPakageTab.PackageDetails]: t("sendPackage.detailsTitle"),
    [ESendPakageTab.PaymentCreate]: t("sendPackage.createTitle"),
    [ESendPakageTab.PaymentSend]: ""
  };

  const switchTab = () => {
    switch (data.activeTab) {
      case ESendPakageTab.ValidateTTN:
        return <SendPackageValidateTTN />;
      case ESendPakageTab.PackageDetails:
        return <SendPackageDetails />;
      case ESendPakageTab.PaymentCreate:
        return <SendPackagePaymentCreate />;
      case ESendPakageTab.PaymentSend:
        return <SendPackagePaymentSend />;
      default:
        return <SendPackageValidateTTN />;
    }
  };

  return (
    <main className="page-with-button flex flex-col justify-start">
      <div className="custom-container flex-1 max-h-full !px-0">
        <div className="flex h-full flex-col">
          <div className="mb-[30px] mt-5 px-[1rem]">
            <NavHeader isLink />
          </div>
          <div className={styles.tab__box}>
            {data.activeTab !== ESendPakageTab.PaymentSend && (
              <p className={styles.tab__title}>{tabTitle[data.activeTab]}</p>
            )}
            {switchTab()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SendPackage;
