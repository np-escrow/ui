import { ESendPakageTab } from "../pages/SendPackage/SendPackage.type";
import { SendPackageDetails } from "../components/SendPackageDetails";
import { SendPackagePaymentCreate } from "../components/SendPackagePaymentCreate";
import { SendPackagePaymentSend } from "../components/SendPackagePaymentSend";
import { SendPackageValidateTTN } from "../components/SendPackageValidateTTN";
import { t } from "i18next";
import { usePackageStore } from "../store/packageStore";
import { useState } from "react";

export const useSendPackage = () => {
  const [ttn, setTtn] = useState("");
  const [amount, setAmount] = useState("");

  const { data, loadings, create, prepare, setActiveTab } = usePackageStore();

  const handlePaymentCreate = async () => {
    if (!data.create) return; // Prevent multiple clicks while loading

    create({
      ttn: data.create.metadata.Number,
      amount: +amount
    });
  };

  const switchTab = () => {
    switch (data.activeTab) {
      case ESendPakageTab.ValidateTTN:
        return <SendPackageValidateTTN ttn={ttn} setTtn={setTtn} />;
      case ESendPakageTab.PackageDetails:
        return <SendPackageDetails />;
      case ESendPakageTab.PaymentCreate:
        return (
          <SendPackagePaymentCreate amount={amount} setAmount={setAmount} />
        );
      case ESendPakageTab.PaymentSend:
        return <SendPackagePaymentSend />;
      default:
        return <SendPackageValidateTTN ttn={ttn} setTtn={setTtn} />;
    }
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

  const sendPackageBtn = {
    [ESendPakageTab.ValidateTTN]: {
      title: t("sendPackage.validateButton"),
      disabled: ttn.length !== 14 || loadings.create,
      action: () => prepare({ ttn }),
      loading: loadings.create
    },
    [ESendPakageTab.PackageDetails]: {
      title: t("sendPackage.detailsButton"),
      action: () => setActiveTab(ESendPakageTab.PaymentCreate),
      disabled: false,
      loading: false
    },
    [ESendPakageTab.PaymentCreate]: {
      title: t("sendPackage.createButton"),
      action: handlePaymentCreate,
      disabled: !amount,
      loading: loadings.create
    },
    [ESendPakageTab.PaymentSend]: {
      title: t("sendPackage.sendButton"),
      action: handleShare,
      disabled: false,
      loading: false
    }
  };

  const tabTitle = {
    [ESendPakageTab.ValidateTTN]: t("sendPackage.validateTitle"),
    [ESendPakageTab.PackageDetails]: t("sendPackage.detailsTitle"),
    [ESendPakageTab.PaymentCreate]: t("sendPackage.createTitle"),
    [ESendPakageTab.PaymentSend]: ""
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
      isLink: true,
      link: "/",
      action: undefined
      // isLink: false,

      // link: undefined,
      // action: () => setActiveTab(ESendPakageTab.PaymentCreate)
    }
  };

  const btnData = sendPackageBtn[data.activeTab];
  const backData = handleBack[data.activeTab];
  const titleTab = tabTitle[data.activeTab];

  return {
    btnData,
    backData,
    titleTab,
    data,

    switchTab,
    setActiveTab
  };
};
