import { EPaymentStep, usePaymentStore } from "../../store/paymentStore";
import { useNavigate, useNavigationType } from "react-router-dom";

import { Button } from "../../components/Button";
import { Loader } from "../../components/Loader";
import { NavHeader } from "../../components/NavHeader";
import { OrderStatus } from "../../types";
import { PaymentStepConfirm } from "../../components/PaymentStepConfirm";
import PaymentStepSelectAsset from "../../components/PaymentStepSelectAsset/PaymentStepSelectAsset";
import classNames from "classnames";
import { formatterDeliveries } from "../../helpers/formatterDeliveries";
import { t } from "i18next";
import { toast } from "react-toastify";
import { useAssetStore } from "../../store/assetStore";
import { useEffect } from "react";
import { usePackageStore } from "../../store/packageStore";
import { useUserStore } from "../../store/userStore";

const Payment = () => {
  const { id } = useUserStore();

  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const assets = useAssetStore((state) => state.data.assets);
  const getAssets = useAssetStore((state) => state.getAssets);
  const { data, loadings, get, update, setPayments } = usePackageStore();
  const {
    step,
    selectedAsset,
    selectedNetwork,
    errors,
    setStep,
    setSelectedAsset,
    setSelectedNetwork,
    setPaymentModalOpen
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

  const handleBack = () => {
    if (window.history.length > 1 && navigationType !== "POP") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const paymentStepData = {
    [EPaymentStep.SELECT_ASSET]: {
      backButton: {
        isLink: false,
        link: undefined,
        action: handleBack
      },
      buttonAction: () => setStep(EPaymentStep.CONFIRM),
      buttonDisabled: !selectedAsset || !selectedNetwork
    },
    [EPaymentStep.CONFIRM]: {
      backButton: {
        isLink: false,
        link: undefined,
        action: () => setStep(EPaymentStep.SELECT_ASSET)
      },
      buttonAction: async () => {
        if (!delivery?.id || isNaN(+delivery.id)) {
          toast.error(t(`${delivery?.id}`));
          return;
        }

        await update(+delivery.id);

        navigate("/");

        setStep(EPaymentStep.SELECT_ASSET);
        setPaymentModalOpen(true);
        console.log("delivery.id", delivery.id);
        setPayments(delivery.id); // Save payment time for the package
      },
      buttonDisabled: loadings.update
    }
  };

  if (!delivery) {
    return null;
  }

  if (delivery.status !== OrderStatus.new) {
    return (
      <main
        className={classNames("page-with-button flex flex-col justify-center")}
      >
        <div className="custom-container flex max-h-full flex-1 flex-col items-center justify-center px-4">
          <div className="w-full max-w-md space-y-6 text-center">
            <div className="mb-8">
              <h1 className="md:text-4lm text-3xl font-bold text-gray-900">
                {t("payment.paid_or_completed.title")}
              </h1>
            </div>

            <div className="mx-auto max-w-lg">
              <p className="text-lg leading-relaxed text-gray-600 md:text-xl dark:text-gray-300">
                {t("payment.paid_or_completed.message")}
              </p>
            </div>
          </div>
        </div>

        <div className="shadow-up-lg fixed bottom-0 left-0 right-0 bg-white px-4 py-4">
          <div className="custom-container">
            <Button
              actionHandler={() => {
                navigate(`/`);
              }}
              className="w-full py-3 text-lg font-medium"
            >
              {t("payment.continue")}
            </Button>
          </div>
        </div>
      </main>
    );
  }

  if (assetsLoadings) {
    return <Loader />;
  }

  const stepPaymentData = paymentStepData[step];

  return (
    <main
      className={classNames("page-with-button flex flex-col justify-center")}
    >
      <div className="custom-container flex-1 !px-0">
        <div className="flex h-full flex-col">
          <div
            className={classNames("mt-5 px-[1rem]", {
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
