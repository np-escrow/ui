import { t } from "i18next";
import cn from "classnames";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components/Button";
import { NavHeader } from "../../components/NavHeader";
import { PaymentStepConfirm } from "../../components/PaymentStepConfirm";
import PaymentStepSelectAsset from "../../components/PaymentStepSelectAsset/PaymentStepSelectAsset";

import { useUserStore } from "../../store/userStore";
import { usePackageStore } from "../../store/packageStore";
import { EPaymentStep, usePaymentStore } from "../../store/paymentStore";

import { EUserType, type IDeliveries } from "../../types";
import { Loader } from "../../components/Loader";
import { useAssetStore } from "../../store/assetStore";
import { toast } from "react-toastify";
import classNames from "classnames";
import { useKeyboardStatus } from "../../hooks/useKeyboardStatus";

const Payment = () => {
  const { id: ttn } = useParams<{ id: string }>();
  const { id } = useUserStore();
  const { isKeyboardOpen } = useKeyboardStatus();

  const { data, get } = usePackageStore();
  const navigate = useNavigate();
  const step = usePaymentStore((state) => state.step);
  const setStep = usePaymentStore((state) => state.setStep);
  const assets = useAssetStore((state) => state.data.assets);
  const getAssets = useAssetStore((state) => state.getAssets);
  const selectedAsset = usePaymentStore((state) => state.selectedAsset);
  const paymentLoadings = usePaymentStore((state) => state.loadings.payment);
  const assetsLoadings = useAssetStore((state) => state.loadings.assets);
  const selectedNetwork = usePaymentStore((state) => state.selectedNetwork);
  const error = usePaymentStore((state) => state.errors);
  const setSelectedAsset = usePaymentStore((state) => state.setSelectedAsset);
  const setSelectedNetwork = usePaymentStore(
    (state) => state.setSelectedNetwork
  );

  const delivery: IDeliveries | null = data.details
    ? {
        id: data.details.id,
        currency: data.details.currency,
        price: `${data.details.amount}`,
        ttn: data.details.id,
        userType:
          +id === +data.details.sellerId
            ? EUserType.SELLER
            : EUserType.RECIPIENT,
        status: data.details.status,
        archive: false,
        info: {
          createdAt: data.details.createDt,
          recipient: data.details.metadata.RecipientFullName,
          seller: data.details.metadata.SenderFullNameEW,
          sellerCity: data.details.metadata.CitySender,
          recipientCity: data.details.metadata.CityRecipient,
          deliveryDate: data.details.metadata.ScheduledDeliveryDate
        }
      }
    : null;

  useEffect(() => {
    getAssets();
  }, []);

  useEffect(() => {
    if (Telegram.WebApp.initDataUnsafe?.start_param)
      get(+Telegram.WebApp.initDataUnsafe?.start_param);
  }, []);

  useEffect(() => {
    if (error.payment) {
      toast.error(
        t("payment.error", { error: error.payment?.message ?? error.payment })
      );
    }
  }, [error.payment]);

  // const ttn = Telegram.WebApp.initDataUnsafe?.start_param;

  useEffect(() => {
    if (assets.length) {
      setSelectedAsset(assets[0]);
      setSelectedNetwork(assets[0]?.networks[0]);
    }
  }, [assets]);

  const handleBack = () => {
    switch (step) {
      case EPaymentStep.CONFIRM:
        return {
          isLink: false,
          link: undefined,
          action: () => setStep(EPaymentStep.SELECT_ASSET)
        };

      default:
        return {
          isLink: false,
          link: undefined,
          action: () => navigate("/")
        };
    }
  };

  const handleButtonAction = () => {
    switch (step) {
      case EPaymentStep.SELECT_ASSET:
        return () => {
          setStep(EPaymentStep.CONFIRM);
        };

      default:
        return () => {
          navigate(`/shipment-info/${ttn}`);
          setStep(EPaymentStep.SELECT_ASSET);
        };
    }
  };

  const getButtonDisabled = () => {
    switch (step) {
      case EPaymentStep.SELECT_ASSET:
        return !selectedAsset || !selectedNetwork;
    }
  };

  if (!delivery) {
    return null;
  }

  if (assetsLoadings) {
    return <Loader />;
  }

  return (
    <main
      className={classNames("page-with-button flex flex-col justify-center", {
        "translate-y-[40px] transform": isKeyboardOpen
      })}
    >
      <div className="custom-container max-h-full flex-1">
        <div className="flex h-full flex-col">
          {/* Header */}
          <div
            className={cn("mt-5", {
              "mb-[30px]": step !== EPaymentStep.CONFIRM,
              "mb-0": step === EPaymentStep.CONFIRM
            })}
          >
            <NavHeader {...handleBack()} />
          </div>

          {/* Select asset */}
          {step === EPaymentStep.SELECT_ASSET && (
            <PaymentStepSelectAsset delivery={delivery} />
          )}

          {step === EPaymentStep.CONFIRM && (
            <PaymentStepConfirm delivery={delivery} />
          )}
        </div>

        {!paymentLoadings && (
          <div className="custom-container primary-button-container">
            <Button
              actionHandler={handleButtonAction()}
              disabled={getButtonDisabled()}
            >
              {step === EPaymentStep.CONFIRM
                ? t("payment.paymentDone")
                : t("payment.continue")}
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default Payment;
