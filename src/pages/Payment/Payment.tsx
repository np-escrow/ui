import { EPaymentStep, usePaymentStore } from "../../store/paymentStore";
import { useNavigate, useParams } from "react-router-dom";

import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { NavHeader } from "../../components/NavHeader";
import { PaymentStepConfirm } from "../../components/PaymentStepConfirm";
import PaymentStepSelectAsset from "../../components/PaymentStepSelectAsset/PaymentStepSelectAsset";
import classNames from "classnames";
import { formatterDeliveries } from "../../helpers/formatterDeliveries";
import { t } from "i18next";
import { toast } from "react-toastify";
import { useAssetStore } from "../../store/assetStore";
import { useEffect } from "react";
import { useKeyboardStatus } from "../../hooks/useKeyboardStatus";
import { usePackageStore } from "../../store/packageStore";
import { useUserStore } from "../../store/userStore";

const Payment = () => {
  const { id: ttn } = useParams<{ id: string }>();
  const { id } = useUserStore();
  const { isKeyboardOpen } = useKeyboardStatus();
  const navigate = useNavigate();

  const assets = useAssetStore((state) => state.data.assets);
  const getAssets = useAssetStore((state) => state.getAssets);
  const { data, get } = usePackageStore();
  const {
    step,
    selectedAsset,
    selectedNetwork,
    errors,
    setStep,
    setSelectedAsset,
    setSelectedNetwork
  } = usePaymentStore();

  const paymentLoadings = usePaymentStore((state) => state.loadings.payment);
  const assetsLoadings = useAssetStore((state) => state.loadings.assets);

  const delivery = data.details ? formatterDeliveries(data.details, id) : null;

  useEffect(() => {
    if (!assets.length) getAssets();
  }, []);

  useEffect(() => {
    if (Telegram.WebApp.initDataUnsafe?.start_param)
      get(+Telegram.WebApp.initDataUnsafe?.start_param);
  }, []);

  useEffect(() => {
    if (errors.payment) {
      toast.error(
        t("payment.error", { error: errors.payment?.message ?? errors.payment })
      );
    }
  }, [errors.payment]);

  useEffect(() => {
    if (assets.length) {
      setSelectedAsset(assets[0]);
      setSelectedNetwork(assets[0]?.networks[0]);
    }
  }, [assets]);

  const paymentStepData = {
    [EPaymentStep.SELECT_ASSET]: {
      backButton: {
        isLink: false,
        link: undefined,
        action: () => navigate("/")
      },
      buttonAction: () => setStep(EPaymentStep.CONFIRM),
      buttonDisabled: !selectedAsset || !selectedNetwork
    },
    [EPaymentStep.CONFIRM]: {
      backButton: {
        isLink: false,
        link: undefined,
        action: () => navigate("/")
      },
      buttonAction: () => {
        navigate(`/shipment-info/${ttn}`);
        setStep(EPaymentStep.SELECT_ASSET);
      },
      buttonDisabled: false
    }
  };

  if (!delivery) {
    return null;
  }

  if (assetsLoadings) {
    return <Loader />;
  }

  const stepPaymentData = paymentStepData[step];

  return (
    <main
      className={classNames("page-with-button flex flex-col justify-center", {
        "translate-y-[40px] transform": isKeyboardOpen
      })}
    >
      <div className="custom-container max-h-full flex-1">
        <div className="flex h-full flex-col">
          <div
            className={classNames("mt-5", {
              "mb-[30px]": step !== EPaymentStep.CONFIRM,
              "mb-0": step === EPaymentStep.CONFIRM
            })}
          >
            <NavHeader {...stepPaymentData.backButton} />
          </div>

          <>
            {step === EPaymentStep.SELECT_ASSET && (
              <PaymentStepSelectAsset delivery={delivery} />
            )}

            {step === EPaymentStep.CONFIRM && (
              <PaymentStepConfirm delivery={delivery} />
            )}
          </>
        </div>

        {!paymentLoadings && (
          <div className="custom-container primary-button-container">
            <Button
              actionHandler={stepPaymentData.buttonAction}
              disabled={stepPaymentData.buttonDisabled}
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
