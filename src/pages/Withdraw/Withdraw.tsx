import { useEffect, useState } from "react";
import { t } from "i18next";
import cn from "classnames";

import { EWithdrawStep, useWithdrawStore } from "../../store/withdrawStore";

import { Button } from "../../components/Button";
import { NavHeader } from "../../components/NavHeader";
import WithdrawStepSelectAsset from "../../components/WithdrawStepSelectAsset/WithdrawStepSelectAsset";
import WithdrawStepEnterAddress from "../../components/WithdrawStepEnterAddress/WithdrawStepEnterAddress";
import WithdrawStepEnterAmount from "../../components/WithdrawStepEnterAmount/WithdrawStepEnterAmount";

import type { Crypto } from "../../types";
import { cryptoMock } from "./mock";
import { Icon } from "../../components/Icon";
import WithdrawStepConfirm from "../../components/WithdrawStepConfirm/WithdrawStepConfirm";

const Withdraw = () => {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);
  const [hasAmountError, setHasAmountError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const withdrawAmount = useWithdrawStore((state) => state.withdrawAmount);
  const selectedAsset = useWithdrawStore((state) => state.selectedAsset);
  const setSelectedAsset = useWithdrawStore((state) => state.setSelectedAsset);
  const selectedNetwork = useWithdrawStore((state) => state.selectedNetwork);
  const setSelectedNetwork = useWithdrawStore(
    (state) => state.setSelectedNetwork
  );
  const step = useWithdrawStore((state) => state.step);
  const setStep = useWithdrawStore((state) => state.setStep);
  const withdrawAddress = useWithdrawStore((state) => state.withdrawAddress);

  useEffect(() => {
    if (!cryptoList.length) {
      // todo get crypto list from backend
      setCryptoList(cryptoMock);
    }

    if (!selectedAsset && cryptoList.length) {
      setSelectedAsset(cryptoList[0]);
      setSelectedNetwork(cryptoList[0]?.networks[0]);
    }
  }, [cryptoList, selectedAsset, setSelectedAsset, setSelectedNetwork]);

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
          console.log("todo send withdraw request to backend");
          try {
            setIsLoading(true);
            setStep(EWithdrawStep.SELECT_ASSET);
          } catch (error) {
            console.error(error);
          } finally {
            setIsLoading(false);
          }
        };
    }
  };

  const getButtonDisabled = () => {
    if (isLoading) return true;

    switch (step) {
      case EWithdrawStep.SELECT_ASSET:
        return !selectedAsset || !selectedNetwork;

      case EWithdrawStep.ENTER_ADDRESS:
        return !selectedAsset || !selectedNetwork || !withdrawAddress;

      case EWithdrawStep.ENTER_AMOUNT:
        return hasAmountError || !Number(withdrawAmount) || !withdrawAmount;
    }
  };

  return (
    <main className="page-with-button flex flex-col justify-center">
      <div className="custom-container flex-1">
        <div className="flex h-full flex-col">
          <div
            className={cn("mt-5", {
              "mb-0": step === EWithdrawStep.CONFIRM,
              "mb-[30px]": step !== EWithdrawStep.CONFIRM
            })}
          >
            <NavHeader {...handleBack()} />
          </div>

          {step === EWithdrawStep.SELECT_ASSET && (
            <WithdrawStepSelectAsset cryptoList={cryptoList} />
          )}

          {step === EWithdrawStep.ENTER_ADDRESS && (
            <WithdrawStepEnterAddress
              selectedCryptoName={selectedAsset?.token || ""}
            />
          )}

          {step === EWithdrawStep.ENTER_AMOUNT && (
            <WithdrawStepEnterAmount
              hasAmountError={hasAmountError}
              setHasAmountError={setHasAmountError}
            />
          )}

          {step === EWithdrawStep.CONFIRM && <WithdrawStepConfirm />}
        </div>

        <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
          <Button
            actionHandler={handleButtonAction()}
            disabled={getButtonDisabled()}
          >
            {isLoading ? (
              <Icon
                name="arrow"
                width={20}
                height={20}
                className="animate-spin"
              />
            ) : (
              t("withdraw.continue")
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Withdraw;
