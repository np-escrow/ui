import { Button } from "../Button";
import {
  ESendPakageTab,
  type IPackage
} from "../../pages/SendPackage/SendPackage.type";
import { useState, type FC } from "react";
import { Icon } from "../Icon";
import loader from "../../assets/images/loader.webp";
import { t } from "i18next";
import { Trans } from "react-i18next";

interface ISendPackageValidateTTNProps {
  setActiveTab: (tab: ESendPakageTab) => void;
  setPackage: (pkg: IPackage) => void;
}

const SendPackageValidateTTN: FC<ISendPackageValidateTTNProps> = ({
  setActiveTab,
  setPackage
}) => {
  const [loading, setLoading] = useState(false);
  const [ttn, setTtn] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length <= 14) {
        setTtn(value);
      }
    }
  };

  const handleValidateTTN = async () => {
    if (loading) return; // Prevent multiple clicks while loading

    setLoading(true);
    // TODO: Implement TTN validation logic

    await new Promise((resolve) => setTimeout(resolve, 2000));
    setLoading(false);
    setPackage({
      id: "1",
      ttn,
      weight: "0.5kg",
      from: "Alex P., Kiev, Ukraine",
      to: "Linda H., Lviv, Ukraine ",
      dimensions: "30x20x10 cm"
    });

    setActiveTab(ESendPakageTab.PackageDetails);
  };

  return (
    <>
      <label className="relative mt-[8px] flex flex-col gap-y-[8px]">
        <div className="flex items-center justify-between gap-x-[10px] rounded-lg border border-gray-300/50 bg-gray-200 pl-3 pr-[10px] focus-within:border-blue-300">
          <input
            type="tel"
            inputMode="numeric"
            pattern="\d*"
            value={ttn}
            onChange={handleChange}
            placeholder={t("sendPackage.validatePlaceholder")}
            onFocus={() => setIsFocused(true)}
            onBlur={() =>
              setTimeout(() => {
                setIsFocused(false);
              }, 100)
            }
            className="h-[46px] flex-1 bg-transparent focus:outline-none"
          />

          {/* Paste and Scan buttons */}
          {isFocused && (
            <div className="flex items-center">
              <button
                type="button"
                className="font-sf-pro-text cursor-pointer text-sm"
                onClick={() => setTtn("")}
              >
                <Icon name="clear" size={24} />
              </button>
            </div>
          )}
        </div>
        <span className="text-text-secondary text-[12px] text-sm font-normal">
          {t("sendPackage.validateExample")}
        </span>
      </label>
      <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
        <Button actionHandler={handleValidateTTN} disabled={ttn.length !== 14}>
          {loading ? (
            <img
              className="spinner"
              src={loader}
              width={"24px"}
              height={"24px"}
            />
          ) : (
            <Trans i18nKey="sendPackage.validateButton"></Trans>
          )}
        </Button>
      </div>
    </>
  );
};

export default SendPackageValidateTTN;
