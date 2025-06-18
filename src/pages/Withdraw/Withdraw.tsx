import { useEffect, useState } from "react";
import { t } from "i18next";

import { EWithdrawStep, useWithdrawStore } from "../../store/withdrawStore";

import { Button } from "../../components/Button";
import { NavHeader } from "../../components/NavHeader";
import WithdrawStepSelectAsset from "../../components/WithdrawStepSelectAsset/WithdrawStepSelectAsset";
import WithdrawStepEnterAddress from "../../components/WithdrawStepEnterAddress/WithdrawStepEnterAddress";

import type { Crypto } from "../../types";
import { cryptoMock } from "./mock";

const Withdraw = () => {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);

  const selectedAssetId = useWithdrawStore((state) => state.selectedAssetId);
  const setSelectedAssetId = useWithdrawStore((state) => state.setSelectedAssetId);
  const selectedNetwork = useWithdrawStore((state) => state.selectedNetwork);
  const setSelectedNetwork = useWithdrawStore((state) => state.setSelectedNetwork);
  const step = useWithdrawStore((state) => state.step);
  const setStep = useWithdrawStore((state) => state.setStep);

  useEffect(() => {
    if (!cryptoList.length) {
      // todo get crypto list from backend
      setCryptoList(cryptoMock);
    }

    if (!selectedAssetId && cryptoList.length) {
      setSelectedAssetId(cryptoList[0]?.id);
      setSelectedNetwork(cryptoList[0]?.networks[0]);
    }
  }, [cryptoList, selectedAssetId, setSelectedAssetId, setSelectedNetwork]);

  const handleBack = () => {
    switch (step) {
      case EWithdrawStep.ENTER_ADDRESS:
        return {
          isLink: false,
          link: undefined,
          action: () => setStep(EWithdrawStep.SELECT_ASSET)
        };

      case EWithdrawStep.ENTER_AMOUNT:
        return {
          isLink: false,
          link: undefined,
          action: () => setStep(EWithdrawStep.ENTER_ADDRESS)
        };

      case EWithdrawStep.CONFIRM:
        return {
          isLink: false,
          link: undefined,
          action: () => setStep(EWithdrawStep.ENTER_AMOUNT)
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
      case EWithdrawStep.SELECT_ASSET:
        return () => {
          setStep(EWithdrawStep.ENTER_ADDRESS);
        };

      case EWithdrawStep.ENTER_ADDRESS:
        return () => {
          setStep(EWithdrawStep.ENTER_AMOUNT);
        };

      case EWithdrawStep.ENTER_AMOUNT:
        return () => {
          setStep(EWithdrawStep.CONFIRM);
        };

      default:
        return () => {
          setStep(EWithdrawStep.SELECT_ASSET);
        };
    }
  };

  const getButtonDisabled = () => {
    switch (step) {
      case EWithdrawStep.SELECT_ASSET:
        return !selectedAssetId || !selectedNetwork;
    }
  };

  return (
    <main className="page-with-button flex flex-col justify-center">
      <div className="custom-container flex-1">
        <div className="flex h-full flex-col">
          <div className="mb-[30px] mt-5">
            <NavHeader {...handleBack()} />
          </div>

          {step === EWithdrawStep.SELECT_ASSET && (
            <WithdrawStepSelectAsset
              cryptoList={cryptoList}
            />
          )}

          {step === EWithdrawStep.ENTER_ADDRESS && (
            <WithdrawStepEnterAddress
              selectedCryptoName={
                cryptoList.find((crypto) => crypto.id === selectedAssetId)
                  ?.token || ""
              }
            />
          )}
        </div>

        <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
          <Button
            actionHandler={handleButtonAction()}
            disabled={getButtonDisabled()}
          >
            {t("withdraw.continue")}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Withdraw;
