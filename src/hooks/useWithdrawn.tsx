import { EWithdrawStep, useWithdrawStore } from "../store/withdrawStore";
import { useEffect, useState } from "react";

import type { NetworkCode } from "../types";
import WithdrawStepConfirm from "../components/WithdrawStepConfirm/WithdrawStepConfirm";
import { WithdrawStepEnterAddress } from "../components/WithdrawStepEnterAddress";
import { WithdrawStepEnterAmount } from "../components/WithdrawStepEnterAmount";
import { WithdrawStepSelectAsset } from "../components/WithdrawStepSelectAsset";
import { t } from "i18next";
import { toast } from "react-toastify";
import { useAssetStore } from "../store/assetStore";
import { useBalanceStore } from "../store/balanceStore";
import { useNavigate } from "react-router-dom";
import { useNetworkSchema } from "./validation/useNetworkSchema";

export const useWithdrawn = () => {
  const [networkError, setNetworkError] = useState("");
  const [hasAmountError, setHasAmountError] = useState<boolean>(false);
  const { withdraw, error } = useBalanceStore((state) => state);
  const getSchema = useNetworkSchema();
  const navigate = useNavigate();

  const { loadings, data, getAssets } = useAssetStore();
  const {
    step,
    withdrawAddress,
    withdrawAmount,
    selectedAsset,
    selectedNetwork,
    setSelectedAsset,
    setStep,
    setSelectedNetwork,
    setWithdrawAmount,
    setWithdrawAddress
  } = useWithdrawStore();

  const isValidAssetAndNetwork: boolean =
    !selectedAsset || !selectedNetwork || loadings.assets;

  const isValidAddress: boolean =
    isValidAssetAndNetwork && !!withdrawAddress && !networkError;

  const isValidAmount: boolean =
    !!withdrawAmount && !hasAmountError && !!Number(withdrawAmount);

  useEffect(() => {
    if (error.withdraw) {
      toast.error(
        t("withdraw.withdrawErrorDescription", {
          error: error.withdraw?.message ?? error.withdraw
        })
      );
    }
  }, [error.withdraw]);

  useEffect(() => {
    getAssets();
  }, []);

  useEffect(() => {
    if (data.assets.length) {
      setSelectedAsset(data.assets[0]);
      setSelectedNetwork(data.assets[0]?.networks[0]);
    }
  }, [data.assets]);

  const validate = async () => {
    const schema = getSchema((selectedNetwork?.code as NetworkCode) ?? null);
    try {
      await schema.validate({ network: withdrawAddress });
      setNetworkError("");
    } catch (err: any) {
      setNetworkError(err.message);
    }
  };

  const configBackButton = {
    [EWithdrawStep.SELECT_ASSET]: {
      isLink: true,
      link: "/",
      action: undefined
    },
    [EWithdrawStep.ENTER_ADDRESS]: {
      isLink: false,
      link: undefined,
      action: () => setStep(EWithdrawStep.SELECT_ASSET)
    },
    [EWithdrawStep.ENTER_AMOUNT]: {
      isLink: false,
      link: undefined,
      action: () => setStep(EWithdrawStep.ENTER_ADDRESS)
    },
    [EWithdrawStep.CONFIRM]: {
      isLink: false,
      link: undefined,
      action: () => setStep(EWithdrawStep.ENTER_AMOUNT)
    }
  };

  const configButton = {
    [EWithdrawStep.SELECT_ASSET]: {
      action: () => setStep(EWithdrawStep.ENTER_ADDRESS),
      disabled: isValidAssetAndNetwork
    },
    [EWithdrawStep.ENTER_ADDRESS]: {
      action: async () => {
        if (networkError) return;
        const schema = getSchema(
          (selectedNetwork?.code as NetworkCode) ?? null
        );
        try {
          await schema.validate({ network: withdrawAddress });
          setNetworkError("");
        } catch (err: any) {
          setNetworkError(err.message);
          return;
        }

        setStep(EWithdrawStep.ENTER_AMOUNT);
      },
      disabled: isValidAddress
    },
    [EWithdrawStep.ENTER_AMOUNT]: {
      action: () => {
        if (hasAmountError) return;

        setStep(EWithdrawStep.CONFIRM);
      },
      disabled: !isValidAmount
    },
    [EWithdrawStep.CONFIRM]: {
      disabled: false,
      action: async () => {
        try {
          if (
            !selectedAsset ||
            !selectedNetwork ||
            !withdrawAddress ||
            !withdrawAmount ||
            isNaN(Number(withdrawAmount))
          ) {
            toast.error(t("withdraw.withdrawError"));
            return;
          }

          await withdraw({
            currency: selectedAsset.code || "",
            network: selectedNetwork.code || "",
            address: withdrawAddress,
            amount: withdrawAmount
          });

          // AFTER RESPONSE!!!
          navigate("/");
          setStep(EWithdrawStep.SELECT_ASSET);
        } catch (error) {
          console.error(error);
        }
      }
    }
  };

  //  return tab by Step
  const switchTab = () => {
    switch (step) {
      case EWithdrawStep.SELECT_ASSET:
        return <WithdrawStepSelectAsset />;
      case EWithdrawStep.ENTER_ADDRESS:
        return (
          <WithdrawStepEnterAddress
            error={networkError}
            setError={setNetworkError}
            selectedCryptoName={selectedAsset?.name || ""}
            validate={validate}
          />
        );
      case EWithdrawStep.ENTER_AMOUNT:
        return (
          <WithdrawStepEnterAmount
            hasAmountError={hasAmountError}
            setHasAmountError={setHasAmountError}
          />
        );
      case EWithdrawStep.CONFIRM:
        return <WithdrawStepConfirm />;
      default:
        return <WithdrawStepSelectAsset />;
    }
  };

  useEffect(() => {
    return () => {
      setWithdrawAmount("");
      setWithdrawAddress("");
    };
  }, []);

  return {
    loading: loadings.assets,
    backBtnConfig: configBackButton[step],
    btnConfig: configButton[step],
    switchTab
  };
};
