import { t } from "i18next";
import { useState, type Dispatch, type FC, type SetStateAction } from "react";

import { Icon } from "../Icon";
import { usePackageStore } from "../../store/packageStore";
import classNames from "classnames";

interface ISendPackageValidateTTNProps {
  ttn: string;
  setTtn: Dispatch<SetStateAction<string>>;
}

const SendPackageValidateTTN: FC<ISendPackageValidateTTNProps> = ({
  ttn,
  setTtn
}) => {
  const { error } = usePackageStore();
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value.length <= 14) {
        setTtn(value);
      }
    }
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
    </>
  );
};

export default SendPackageValidateTTN;
