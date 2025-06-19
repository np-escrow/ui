import { Button } from "../Button";
import {
  ESendPakageTab,
  type ICreatePackage
} from "../../pages/SendPackage/SendPackage.type";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";
import { Icon } from "../Icon";
import loader from "../../assets/images/loader.webp";
import { t } from "i18next";

interface ISendPackagePaymentCreateProps {
  setActiveTab: Dispatch<SetStateAction<ESendPakageTab>>;
  setCreatedPackage: Dispatch<SetStateAction<ICreatePackage | null>>;
  ttn: string;
}
const FEE_PERCENTAGE = 0.05; // Example fee percentage

const SendPackagePaymentCreate: FC<ISendPackagePaymentCreateProps> = ({
  setActiveTab,
  setCreatedPackage
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace("$", "");

    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const formattedAmount = amount ? `$${amount}` : "";

  const handlePaymentCreate = async () => {
    if (loading) return; // Prevent multiple clicks while loading

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);

    setCreatedPackage({
      id: "32423423",
      ttn: "12345678901234",
      paymentLink: "https://example.com/payment-link",
      weight: "0.5kg",
      route: "Kiev to Lviv",
      price: amount,
      fee: calculateFee()
    });

    setActiveTab(ESendPakageTab.PaymentSend);
  };

  const calculateFee = () => {
    const amountNumber = parseFloat(amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      return "0.00";
    }

    return (amountNumber * FEE_PERCENTAGE).toFixed(2);
  };

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
      <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
        <Button actionHandler={handlePaymentCreate} disabled={!amount}>
          {loading ? (
            <img
              className="spinner"
              src={loader}
              width={"24px"}
              height={"24px"}
            />
          ) : (
            t("sendPackage.createButton")
          )}
        </Button>
      </div>
    </>
  );
};

export default SendPackagePaymentCreate;
