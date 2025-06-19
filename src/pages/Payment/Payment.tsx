import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import { t } from "i18next";
import cn from "classnames";

import { Button } from "../../components/Button";
import { NavHeader } from "../../components/NavHeader";
import PaymentStepSelectAsset from "../../components/PaymentStepSelectAsset/PaymentStepSelectAsset";
import { PaymentStepConfirm } from "../../components/PaymentStepConfirm";

import type { Crypto, IDeliveries } from "../../types";
import { cryptoMock, mockDeliveries } from "./mock";
import { EPaymentStep, usePaymentStore } from "../../store/paymentStore";

const Payment = () => {
  const [deliveries, setDeliveries] = useState<IDeliveries[]>([]);
  const [delivery, setDelivery] = useState<IDeliveries | null>(null);
  const [searchParams] = useSearchParams();
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);

  const navigate = useNavigate();

  // todo remove ttn mock!!!
  const ttn = searchParams.get("ttn") || "123456789065";

  const selectedAsset = usePaymentStore((state) => state.selectedAsset);
  const setSelectedAsset = usePaymentStore((state) => state.setSelectedAsset);
  const selectedNetwork = usePaymentStore((state) => state.selectedNetwork);
  const setSelectedNetwork = usePaymentStore(
    (state) => state.setSelectedNetwork
  );
  const step = usePaymentStore((state) => state.step);
  const setStep = usePaymentStore((state) => state.setStep);

  useEffect(() => {
    if (!deliveries.length) {
      // todo get deliveries list from backend
      setDeliveries(mockDeliveries);
      setDelivery(
        mockDeliveries.find((delivery) => delivery.ttn === ttn) || null
      );
    }

    if (!cryptoList.length) {
      // todo get crypto list from backend
      setCryptoList(cryptoMock);
    }

    if (!selectedAsset && cryptoList.length) {
      setSelectedAsset(cryptoList[0]);
      setSelectedNetwork(cryptoList[0]?.networks[0]);
    }
  }, [
    cryptoList,
    deliveries.length,
    selectedAsset,
    setSelectedAsset,
    setSelectedNetwork,
    ttn
  ]);

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
          isLink: true,
          link: "/",
          action: undefined
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

  return (
    <main className="page-with-button flex flex-col justify-center">
      <div className="custom-container flex-1">
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
            <PaymentStepSelectAsset
              cryptoList={cryptoList}
              delivery={delivery}
            />
          )}

          {/* {step === EPaymentStep.CONFIRM && <div>CONTENT</div>} */}
          {step === EPaymentStep.CONFIRM && (
            <PaymentStepConfirm delivery={delivery} />
          )}
        </div>

        <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
          <Button
            actionHandler={handleButtonAction()}
            disabled={getButtonDisabled()}
          >
            {step === EPaymentStep.CONFIRM
              ? t("payment.paymentDone")
              : t("payment.continue")}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Payment;
