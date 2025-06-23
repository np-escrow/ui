import { t } from "i18next";

import { useWithdrawStore } from "../../store/withdrawStore";
import { getAssetImg } from "../../helpers/iconAssets";

const WithdrawStepConfirm = () => {
  const withdrawAddress = useWithdrawStore((state) => state.withdrawAddress);
  const selectedNetwork = useWithdrawStore((state) => state.selectedNetwork);
  const withdrawAmount = useWithdrawStore((state) => state.withdrawAmount);
  const selectedAsset = useWithdrawStore((state) => state.selectedAsset);
  const isCalcInUSD = useWithdrawStore((state) => state.isCalcInUSD);

  const imgs = getAssetImg({
    token: selectedAsset!.code,
    network: selectedNetwork!.code
  });
  const fee = selectedNetwork!.fee;
  console.log(222, withdrawAmount, fee);
  const withdrawFee = +Math.abs(
    +withdrawAmount * fee.withdraw.mult - fee.withdraw.fix
  ).toFixed(2);

  const calculateAlternateValue = (amount: string) => {
    if (!selectedAsset || !amount) {
      return "0.00";
    }

    const numericAmount = Number(amount.replace(/,/g, "").replace(/\s/g, ""));

    if (isNaN(numericAmount)) {
      return "0.00";
    }

    const convertedValue = isCalcInUSD ? numericAmount : numericAmount;

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
            src={imgs.token}
            alt={`${selectedAsset?.code} logo`}
            className="size-[60px] rounded-full"
          />

          {
            <div className="absolute -bottom-[6px] left-1/2 size-[26px] -translate-x-[calc(50%-20px)]">
              <img
                src={imgs.network}
                alt={`${selectedAsset?.code} logo`}
                className="size-full rounded-full"
              />
            </div>
          }
        </div>
        {/* Description block */}
        <div className="bg-green-777 flex flex-col items-center justify-evenly">
          <span className="text-lg font-semibold">
            {t("withdraw.youSend")} {selectedAsset?.code}{" "}
            {selectedNetwork?.name}
          </span>

          <div className="flex flex-col items-center">
            <span className="text-[40px] font-semibold">
              {withdrawAmount} {isCalcInUSD ? "USD" : selectedAsset?.code}
            </span>

            <span className="text-text-secondary">
              {isCalcInUSD ? "$" : ""}
              {calculateAlternateValue(withdrawAmount)}
              {isCalcInUSD ? ` ${selectedAsset?.code}` : ""}
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
              {withdrawFee} {isCalcInUSD ? "USD" : selectedAsset?.code}
              {" ~ "}
            </span>
            <span className="text-text-secondary">
              {calculateAlternateValue(withdrawFee.toString())}{" "}
              {isCalcInUSD ? selectedAsset?.code : "USD"}
            </span>
          </div>
        </div>

        <div className="mb-[10px] flex flex-col border-b border-gray-400 pb-[10px] leading-[1]">
          <span className="text-text-secondary mb-1 text-sm">
            {t("withdraw.amount")}
          </span>
          <div>
            <span>
              {withdrawAmount} {isCalcInUSD ? "USD" : selectedAsset?.code}
              {" ~ "}
            </span>
            <span className="text-text-secondary">
              {calculateAlternateValue(withdrawAmount)}{" "}
              {isCalcInUSD ? selectedAsset?.code : "USD"}
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
      <p className="text-text-secondary mb-7 text-[13px]">
        {t("withdraw.bottomAlertDescription")}
      </p>
    </div>
  );
};

export default WithdrawStepConfirm;
