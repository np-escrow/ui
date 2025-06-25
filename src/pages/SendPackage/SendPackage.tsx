import { ESendPakageTab } from "./SendPackage.type";
import { NavHeader } from "../../components/NavHeader";
import { SendPackageDetails } from "../../components/SendPackageDetails";
import { SendPackagePaymentCreate } from "../../components/SendPackagePaymentCreate";
import { SendPackagePaymentSend } from "../../components/SendPackagePaymentSend";
import { SendPackageValidateTTN } from "../../components/SendPackageValidateTTN";
import classNames from "classnames";
import styles from "./SendPackage.module.css";
import { t } from "i18next";
import { useKeyboardStatus } from "../../hooks/useKeyboardStatus";
import { usePackageStore } from "../../store/packageStore";

const SendPackage = () => {
  const { data, setActiveTab } = usePackageStore();
  const { isKeyboardOpen } = useKeyboardStatus();

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

  const handleBack = {
    [ESendPakageTab.ValidateTTN]: {
      isLink: true,
      link: "/",
      action: undefined
    },
    [ESendPakageTab.PackageDetails]: {
      isLink: false,
      link: undefined,
      action: () => setActiveTab(ESendPakageTab.ValidateTTN)
    },
    [ESendPakageTab.PaymentCreate]: {
      isLink: false,
      link: undefined,
      action: () => setActiveTab(ESendPakageTab.PackageDetails)
    },
    [ESendPakageTab.PaymentSend]: {
      isLink: false,
      link: undefined,
      action: () => setActiveTab(ESendPakageTab.PaymentCreate)
    }
  };

  return (
    <main
      className={classNames("page-with-button flex flex-col justify-start", {
        "translate-y-[40px] transform": isKeyboardOpen
      })}
    >
      <div className="custom-container max-h-full flex-1 !px-0">
        <div className="flex h-full flex-col">
          <div className="mb-[30px] mt-5 px-[1rem]">
            <NavHeader
              isLink={handleBack[data.activeTab].isLink}
              link={handleBack[data.activeTab].link}
              action={handleBack[data.activeTab].action}
            />
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
