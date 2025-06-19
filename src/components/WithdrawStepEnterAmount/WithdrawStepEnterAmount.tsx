import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type FC,
  type SetStateAction
} from "react";

import cn from "classnames";
import { BigNumber } from "tronweb";

import { useWithdrawStore } from "../../store/withdrawStore";

import { Icon } from "../Icon";
import { formatInputNumericValue } from "../../helpers/formatInputNumericValue";
import { t } from "i18next";

type Props = {
  hasAmountError: boolean;
  setHasAmountError: Dispatch<SetStateAction<boolean>>;
};

const FEE_IN_STORE_MOCK = 0.1;

const WithdrawStepEnterAmount: FC<Props> = ({
  hasAmountError,
  setHasAmountError
}) => {
  const [spanValue, setSpanValue] = useState("0");

  const withdrawAmount = useWithdrawStore((state) => state.withdrawAmount);
  const setWithdrawAmount = useWithdrawStore(
    (state) => state.setWithdrawAmount
  );
  const selectedAsset = useWithdrawStore((state) => state.selectedAsset)!;
  const isCalcInUSD = useWithdrawStore((state) => state.isCalcInUSD);
  const setIsCalcInUSD = useWithdrawStore((state) => state.setIsCalcInUSD);
  const withdrawFee = useWithdrawStore((state) => state.withdrawFee);
  const setWithdrawFee = useWithdrawStore((state) => state.setWithdrawFee);
  
  const inputNumberRef = useRef<HTMLInputElement>(null);
  const shortTitleRef = useRef<HTMLDivElement>(null);
  const spanRef = useRef<HTMLSpanElement>(null);

  const validateAmount = useCallback(() => {
    const amount = Number(withdrawAmount);

    if (isNaN(amount)) {
      setHasAmountError(true);
      return;
    }

    if (isCalcInUSD && amount > selectedAsset.balanceUSD) {
      setHasAmountError(true);
      return;
    }

    if (!isCalcInUSD && amount > selectedAsset.balance) {
      setHasAmountError(true);
      return;
    }

    if (
      !isCalcInUSD &&
      selectedAsset.isNative &&
      amount > selectedAsset.balance - withdrawFee
    ) {
      setHasAmountError(true);
      return;
    }

    if (
      isCalcInUSD &&
      selectedAsset.isNative &&
      amount > selectedAsset.balanceUSD - withdrawFee * selectedAsset.price
    ) {
      setHasAmountError(true);
      return;
    }

    setHasAmountError(false);
  }, [
    isCalcInUSD,
    selectedAsset.balance,
    selectedAsset.balanceUSD,
    selectedAsset.isNative,
    selectedAsset.price,
    setHasAmountError,
    withdrawAmount,
    withdrawFee
  ]);

  const handleNumberInputChange = (value: string) => {
    const amount = formatInputNumericValue(value);

    setWithdrawAmount(amount);

    if (!inputNumberRef.current?.validity.badInput) {
      setSpanValue(amount);
    }

    if (inputNumberRef.current?.validity.badInput && spanValue.includes(".")) {
      setSpanValue((prev) => prev.split(".")[0]);
    }
  };

  const maxValue = useMemo(() => {
    const fee = isCalcInUSD ? withdrawFee * selectedAsset.price : withdrawFee;

    const maxValue = BigNumber(
      isCalcInUSD ? selectedAsset.balanceUSD : selectedAsset.balance
    )
      .multipliedBy(100)
      .div(100)
      .minus(selectedAsset.isNative ? fee : 0)
      .decimalPlaces(6, BigNumber.ROUND_DOWN)
      .abs()
      .toFixed();

    return maxValue;
  }, [
    isCalcInUSD,
    selectedAsset.balance,
    selectedAsset.balanceUSD,
    selectedAsset.isNative,
    selectedAsset.price,
    withdrawFee
  ]);

  const handlePasteMaxValue = () => {
    setWithdrawAmount(`${+maxValue || 0}`);
    setSpanValue(`${+maxValue || 0}`);
  };

  useEffect(() => {
    setWithdrawFee(FEE_IN_STORE_MOCK);
  }, [setWithdrawFee]);

  useEffect(() => {
    // Width
    if (inputNumberRef.current) {
      const value = inputNumberRef.current?.value;
      const isPoint = /\./g.test(inputNumberRef.current?.value);

      let width = +value.replace(/\./g, "").length * 26;

      if (isPoint) {
        width = width + 11;
      }

      inputNumberRef.current.style.width = `${width || 26}px`;
    }

    // Validation
    validateAmount();
  }, [validateAmount]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "KeyE" || e.key === "+" || e.key === "-" || e.key === "Enter") {
      e.preventDefault();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleToggleCalcInUSD = () => {
    if (!isCalcInUSD) {
      const newValue = BigNumber(withdrawAmount || "0")
        .multipliedBy(selectedAsset.price)
        .decimalPlaces(6, BigNumber.ROUND_DOWN)
        .toNumber();

      setWithdrawAmount(`${newValue}`);
      setSpanValue(`${newValue}`);
    } else {
      const newValue = BigNumber(withdrawAmount || "0")
        .div(selectedAsset.price)
        .decimalPlaces(6, BigNumber.ROUND_DOWN)
        .toNumber();

      setWithdrawAmount(`${newValue}`);
      setSpanValue(`${newValue}`);
    }

    setIsCalcInUSD(!isCalcInUSD);
  };

  return (
    <div className="relative flex flex-col">
      <div className="mb-2 flex h-8 items-center gap-x-1 font-semibold">
        <span className="text-text-secondary text-[15px]">{`${t("withdraw.available")}: ${maxValue} ${isCalcInUSD ? "USD" : selectedAsset.token}`}</span>
        <button
          type="button"
          onClick={handlePasteMaxValue}
          className="cursor-pointer text-base text-red-100 hover:opacity-85 active:opacity-85"
        >
          {t("withdraw.max")}
        </button>
      </div>

      <div className="flex items-center justify-between gap-x-[5px]">
        <div className="relative h-[72px] w-full flex-col overflow-hidden">
          <div className="number-input-group">
            <form className="relative flex w-full gap-x-1" onSubmit={handleSubmit}>
              <input
                ref={inputNumberRef}
                type="text"
                value={withdrawAmount}
                onChange={(e) => handleNumberInputChange(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="0"
                inputMode="decimal"
                className={cn(hasAmountError && "text-red-100")}
              />

              <div
                ref={shortTitleRef}
                className="text-text-secondary flex items-end pb-[3px] text-2xl font-semibold"
              >
                {isCalcInUSD ? "USD" : selectedAsset.token}
              </div>
            </form>

            <span ref={spanRef}>{spanValue}</span>
          </div>

          <span className="text-text-secondary absolute bottom-0 left-0 block w-full text-base font-medium">{`${spanValue && Number(spanValue.replace(/,/g, "").replace(/\s/g, "")) > 0 ? "~" : ""}${
            spanValue
              ? (
                  Number(spanValue.replace(/,/g, "").replace(/\s/g, "")) *
                  (isCalcInUSD && selectedAsset.price > 0
                    ? 1 / selectedAsset.price
                    : selectedAsset.price)
                )
                  .toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: isCalcInUSD ? 5 : 2
                  })
                  .replace(/,/g, "")
              : "0.00"
          } ${isCalcInUSD ? selectedAsset.token : "USD"}`}</span>
        </div>

        <button
          type="button"
          onClick={handleToggleCalcInUSD}
          className="flex size-8 shrink-0 cursor-pointer items-center justify-center"
        >
          <Icon
            name="switchArrowsIcon"
            width={21}
            height={20}
            className="flex size-8 shrink-0 items-center justify-center"
            aria-label={t("withdraw.switchBetweenUSDAndAsset")}
          />
        </button>
      </div>
    </div>
  );
};

export default WithdrawStepEnterAmount;
