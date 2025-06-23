import {
  useState,
  useEffect,
  type FC,
  type Dispatch,
  type SetStateAction
} from "react";
import { t } from "i18next";
import cn from "classnames";
import classNames from "classnames";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "../../store/userStore";
import { useWithdrawStore } from "../../store/withdrawStore";
import useReadTextFromClipboard from "../../hooks/useReadTextFromClipboard";

import { Icon } from "../Icon";
import { EPlatform } from "../../types";

type Props = {
  selectedCryptoName: string;

  error: string;
  setError: Dispatch<SetStateAction<string>>;
  validate: () => Promise<void>;
};

const WithdrawStepEnterAddress: FC<Props> = ({
  selectedCryptoName,
  validate,
  error,
  setError
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const platform = useUserStore((state) => state.platform);
  const [isClipboardAllowed, setIsClipboardAllowed] = useState(false);

  const navigate = useNavigate();

  const withdrawAddress = useWithdrawStore((state) => state.withdrawAddress);
  const setWithdrawAddress = useWithdrawStore(
    (state) => state.setWithdrawAddress
  );
  const selectedNetwork = useWithdrawStore((state) => state.selectedNetwork);

  const readTextFromClipboardFunction = useReadTextFromClipboard();

  useEffect(() => {
    if (platform === EPlatform.MACOS || platform === EPlatform.TDESKTOP) {
      setIsClipboardAllowed(true);
    }
  }, [platform]);

  const handlePaste = () => {
    readTextFromClipboardFunction().then((value) => {
      if (!value) {
        navigator.clipboard.readText().then((text) => {
          setWithdrawAddress(text || "test1");
        });
      } else {
        setWithdrawAddress(value || "test2");
      }
    });
  };

  return (
    <form>
      <label className="relative flex flex-col gap-y-[14px]">
        <span className="text-sm font-semibold">
          {t("withdraw.sendToAddress")}
        </span>

        <div
          className={classNames(
            "flex items-center justify-between gap-x-[10px] rounded-lg border border-gray-300/50 bg-gray-200 pl-3 pr-[10px] focus-within:border-blue-300",
            {
              "!border-[#F95721]": error
            }
          )}
        >
          <input
            type="text"
            value={withdrawAddress}
            onChange={(e) => {
              setWithdrawAddress(e.target.value);
            }}
            placeholder={`${selectedCryptoName} ${selectedNetwork?.name} ${t("withdraw.address")}`}
            onFocus={() => {
              setError("");
              setIsFocused(true);
            }}
            onBlur={() => {
              validate();
              setTimeout(() => {
                setIsFocused(false);
              }, 100);
            }}
            className={cn("h-[46px] flex-1 bg-transparent focus:outline-none", {
              truncate: !isFocused
            })}
          />

          {/* Paste and Scan buttons */}
          {isFocused && !withdrawAddress && (
            <div className="flex items-center">
              {isClipboardAllowed && (
                <button
                  type="button"
                  className="font-sf-pro-text cursor-pointer text-sm"
                  onClick={handlePaste}
                >
                  {t("common.paste")}
                </button>
              )}

              {(platform === EPlatform.IOS ||
                platform === EPlatform.ANDROID) && (
                <button
                  type="button"
                  className="ml-[10px]"
                  onClick={() => navigate("/scan")}
                >
                  <Icon name="scan" width={24} height={24} />
                </button>
              )}
            </div>
          )}

          {isFocused && withdrawAddress.length > 0 && (
            <button
              type="button"
              onClick={() => {
                setWithdrawAddress("");
                setTimeout(() => {
                  setIsFocused(true);
                }, 100);
              }}
              className="cursor-pointer"
            >
              <Icon name="close-icon" width={24} height={24} />
            </button>
          )}
        </div>
        {error && (
          <span className="text-[12px] text-sm font-normal text-[#F95721]">
            {error}
          </span>
        )}
      </label>
    </form>
  );
};

export default WithdrawStepEnterAddress;
