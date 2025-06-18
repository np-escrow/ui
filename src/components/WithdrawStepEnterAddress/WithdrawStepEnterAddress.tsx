import { useEffect, useState, type FC } from "react";
import { useNavigate } from "react-router-dom";

import { useWithdrawStore } from "../../store/withdrawStore";

import { t } from "i18next";

import { useUserStore } from "../../store/userStore";
import useReadTextFromClipboard from "../../hooks/useReadTextFromClipboard";

import { Icon } from "../Icon";
import { EPlatform } from "../../types";

type Props = {
  selectedCryptoName: string;
};

const WithdrawStepEnterAddress: FC<Props> = ({ selectedCryptoName }) => {
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
    console.log("handlePaste");
    readTextFromClipboardFunction().then((value) => {
      if (!value) {
        console.log("no value");
        navigator.clipboard.readText().then((text) => {
          setWithdrawAddress(text || "test1");
        });
      } else {
        console.log("value", value);
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

        <div className="flex items-center justify-between gap-x-[10px] rounded-lg border border-gray-300/50 bg-gray-200 pl-3 pr-[10px] focus-within:border-blue-300">
          <input
            type="text"
            value={withdrawAddress}
            onChange={(e) => setWithdrawAddress(e.target.value)}
            placeholder={`${selectedCryptoName} ${selectedNetwork?.name} ${t("withdraw.address")}`}
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
        </div>
      </label>
    </form>
  );
};

export default WithdrawStepEnterAddress;
