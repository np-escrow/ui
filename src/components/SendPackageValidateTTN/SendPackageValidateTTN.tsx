import { t } from "i18next";
import { Trans } from "react-i18next";
import { useState, type FC } from "react";

import { Icon } from "../Icon";
import { Button } from "../Button";
import loader from "../../assets/images/loader.webp";
import { usePackageStore } from "../../store/packageStore";
import classNames from "classnames";

const SendPackageValidateTTN: FC = () => {
  const [ttn, setTtn] = useState("");
  const { error, loadings, prepare } = usePackageStore();
  const [isFocused, setIsFocused] = useState(false);
  const loading = loadings.create;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length <= 14) {
        setTtn(value);
      }
    }
  };

  const handleValidateTTN = async () => {
    prepare({ ttn });
  };

  return (
    <>
      <label className="relative mt-[8px] flex flex-col gap-y-[8px]">
        <div
          className={classNames(
            "flex items-center justify-between gap-x-[10px] rounded-lg border border-gray-300/50 bg-gray-200 pl-3 pr-[10px] focus-within:border-blue-300",
            {
              "!border-[#F95721]": error.create
            }
          )}
        >
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
        {error.create ? (
          <span className="text-[12px] text-sm font-normal text-[#F95721]">
            {t("sendPackage.ttnError")}
          </span>
        ) : (
          <span className="text-text-secondary text-[12px] text-sm font-normal">
            {t("sendPackage.validateExample")}
          </span>
        )}
      </label>
      <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
        <Button
          actionHandler={handleValidateTTN}
          disabled={ttn.length !== 14 || loading}
        >
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
