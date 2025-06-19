import {
  ESendPakageTab,
  type ICreatePackage,
  type IPackage
} from "./SendPackage.type";
import { NavHeader } from "../../components/NavHeader";
import { SendPackageDetails } from "../../components/SendPackageDetails";
import { SendPackagePaymentCreate } from "../../components/SendPackagePaymentCreate";
import { SendPackagePaymentSend } from "../../components/SendPackagePaymentSend";
import { SendPackageValidateTTN } from "../../components/SendPackageValidateTTN";
import styles from "./SendPackage.module.css";
import { useState } from "react";
import { t } from "i18next";

const SendPackage = () => {
  const [activeTab, setActiveTab] = useState<ESendPakageTab>(
    ESendPakageTab.ValidateTTN
  );
  const [packageData, setPackageData] = useState<null | IPackage>(null);
  const [createdPackage, setCreatedPackage] = useState<null | ICreatePackage>(
    null
  );

  const tabTitle = {
    [ESendPakageTab.ValidateTTN]: t("sendPackage.validateTitle"),
    [ESendPakageTab.PackageDetails]: t("sendPackage.detailsTitle"),
    [ESendPakageTab.PaymentCreate]: t("sendPackage.createTitle"),
    [ESendPakageTab.PaymentSend]: ""
  };

  const switchTab = () => {
    switch (activeTab) {
      case ESendPakageTab.ValidateTTN:
        return (
          <SendPackageValidateTTN
            setPackage={setPackageData}
            setActiveTab={setActiveTab}
          />
        );
      case ESendPakageTab.PackageDetails:
        return (
          <SendPackageDetails pkg={packageData} setActiveTab={setActiveTab} />
        );
      case ESendPakageTab.PaymentCreate:
        return (
          <SendPackagePaymentCreate
            ttn={packageData?.ttn ?? ""}
            setActiveTab={setActiveTab}
            setCreatedPackage={setCreatedPackage}
          />
        );
      case ESendPakageTab.PaymentSend:
        return <SendPackagePaymentSend createdPackage={createdPackage} />;
      default:
        return (
          <SendPackageValidateTTN
            setPackage={setPackageData}
            setActiveTab={setActiveTab}
          />
        );
    }
  };

  return (
    <main className="page-with-button flex flex-col justify-start">
      <div className="custom-container flex-1 !px-0">
        <div className="flex h-full flex-col">
          <div className="mb-[30px] mt-5 px-[1rem]">
            <NavHeader isLink />
          </div>
          <div className={styles.tab__box}>
            {activeTab !== ESendPakageTab.PaymentSend && (
              <p className={styles.tab__title}>{tabTitle[activeTab]}</p>
            )}
            {switchTab()}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SendPackage;
