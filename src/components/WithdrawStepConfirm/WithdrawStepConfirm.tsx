import { t } from "i18next";

import { useWithdrawStore } from "../../store/withdrawStore";

const WithdrawStepConfirm = () => {
  const withdrawAddress = useWithdrawStore((state) => state.withdrawAddress);
  const selectedNetwork = useWithdrawStore((state) => state.selectedNetwork);
  const withdrawAmount = useWithdrawStore((state) => state.withdrawAmount);
  const selectedAsset = useWithdrawStore((state) => state.selectedAsset);
  const withdrawFee = useWithdrawStore((state) => state.withdrawFee);
  const isCalcInUSD = useWithdrawStore((state) => state.isCalcInUSD);

  const calculateAlternateValue = (amount: string) => {
    if (!selectedAsset || !selectedAsset.price || !amount) {
      return "0.00";
    }

    const numericAmount = Number(amount.replace(/,/g, "").replace(/\s/g, ""));

    if (isNaN(numericAmount)) {
      return "0.00";
    }

    const convertedValue =
      isCalcInUSD && selectedAsset.price > 0
        ? numericAmount / selectedAsset.price
        : numericAmount * selectedAsset.price;

    return convertedValue
      .toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: isCalcInUSD ? 5 : 2
      })
      .replace(/,/g, "");
  };

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex w-full flex-1 flex-col justify-evenly">
        {/* Logo block */}
        <div className="relative flex items-center justify-center">
          <img
            src={
              selectedAsset?.isNative
                ? selectedAsset?.logoNetwork
                : selectedAsset?.logoToken
            }
            alt={`${selectedAsset?.token} logo`}
            className="size-[60px] rounded-full"
          />

          {!selectedAsset?.isNative && (
            <div className="absolute -bottom-[6px] left-1/2 size-[26px] -translate-x-[calc(50%-20px)]">
              <img
                src={selectedAsset?.logoNetwork}
                alt={`${selectedAsset?.token} logo`}
                className="size-full rounded-full"
              />
            </div>
          )}
        </div>
        {/* Description block */}
        <div className="flex flex-col items-center justify-evenly bg-green-777">
          <span className="text-lg font-semibold">
            {t("withdraw.youSend")} {selectedAsset?.token}{" "}
            {selectedNetwork?.name}
          </span>

          <div className="flex flex-col items-center">
            <span className="text-[40px] font-semibold">
              {withdrawAmount} {isCalcInUSD ? selectedAsset?.token : "USD"}
            </span>

            <span className="text-text-secondary">
              {isCalcInUSD ? "$" : ""}
              {calculateAlternateValue(withdrawAmount)}
              {isCalcInUSD ? ` ${selectedAsset?.token}` : ""}
            </span>
          </div>
        </div>
      </div>

      {/* Withdraw info */}
      <div className="shadow-100 mb-[14px] flex w-full flex-col rounded-2xl p-4">
        <div className="mb-[10px] flex flex-col border-b border-gray-400 pb-[10px] leading-[1]">
          <span className="text-text-secondary mb-1 text-sm">
            {t("withdraw.recipientAddress")}
          </span>
          <span className="truncate font-medium">{withdrawAddress}</span>
        </div>

        <div className="mb-[10px] flex flex-col border-b border-gray-400 pb-[10px] leading-[1]">
          <span className="text-text-secondary mb-1 text-sm">
            {t("withdraw.fee")}
          </span>
          <div>
            <span>
              {withdrawFee} {isCalcInUSD ? "USD" : selectedAsset?.token}
              {" ~ "}
            </span>
            <span className="text-text-secondary">
              {calculateAlternateValue(withdrawFee.toString())}{" "}
              {isCalcInUSD ? selectedAsset?.token : "USD"}
            </span>
          </div>
        </div>

        <div className="mb-[10px] flex flex-col border-b border-gray-400 pb-[10px] leading-[1]">
          <span className="text-text-secondary mb-1 text-sm">
            {t("withdraw.amount")}
          </span>
          <div>
            <span>
              {withdrawAmount} {isCalcInUSD ? "USD" : selectedAsset?.token}
              {" ~ "}
            </span>
            <span className="text-text-secondary">
              {calculateAlternateValue(withdrawAmount)}{" "}
              {isCalcInUSD ? selectedAsset?.token : "USD"}
            </span>
          </div>
        </div>

        <div className="flex flex-col leading-[1]">
          <span className="text-text-secondary mb-1 text-sm">
            {t("withdraw.network")}
          </span>
          <span>{selectedNetwork?.name}</span>
        </div>
      </div>

      {/* Bottom alert description */}
      <p className="text-text-secondary text-[13px] mb-7">
        {t("withdraw.bottomAlertDescription")}
      </p>
    </div>
  );
};

export default WithdrawStepConfirm;
