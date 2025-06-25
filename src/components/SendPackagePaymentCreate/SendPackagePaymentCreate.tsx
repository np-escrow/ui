import { t } from "i18next";
import { useState, type FC } from "react";

import { Icon } from "../Icon";

interface ISendPackagePaymentCreateProps {
  amount: string;
  setAmount: (value: string) => void;
}

const SendPackagePaymentCreate: FC<ISendPackagePaymentCreateProps> = ({
  amount,
  setAmount
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace("$", "");

    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const calculateFee = () => {
    const fee = {
      fixed: 1,
      percent: 0.05
    };

    const res = +amount - (+amount * fee.percent + fee.fixed);
    return res < 0 ? 0 : res;
  };

  const formattedAmount = amount ? `$${amount}` : "";

  return (
    <>
      <label className="relative mt-[8px] flex flex-col gap-y-[8px]">
        <div className="flex items-center justify-between gap-x-[10px] rounded-lg border border-gray-300/50 bg-gray-200 pl-3 pr-[10px] focus-within:border-blue-300">
          <input
            type="tel"
            inputMode="numeric"
            pattern="\d*"
            value={formattedAmount}
            onChange={handleChange}
            placeholder={`$0`}
            onFocus={() => setIsFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setIsFocused(false);
              }, 100)
            }
            className="h-[46px] flex-1 bg-transparent focus:outline-none"
          />

          {isFocused && (
            <div className="flex items-center">
              <button
                type="button"
                className="font-sf-pro-text cursor-pointer text-sm"
                onClick={() => setAmount("")}
              >
                <Icon name="clear" size={24} />
              </button>
            </div>
          )}
        </div>
        <span className="text-text-secondary text-[12px] text-sm font-normal">
          {!amount
            ? t("sendPackage.createEmptyDescription")
            : t("sendPackage.createFullfiledDescription", {
                fee: calculateFee()
              })}
        </span>
      </label>
    </>
  );
};

export default SendPackagePaymentCreate;
