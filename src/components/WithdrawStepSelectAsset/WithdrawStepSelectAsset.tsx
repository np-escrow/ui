import { useEffect, useRef, useState, type FC } from "react";
import { useWithdrawStore } from "../../store/withdrawStore";

import { t } from "i18next";
import cn from "classnames";

import { Icon } from "../Icon";

import type { Crypto } from "../../types";

type Props = {
  cryptoList: Crypto[];
};

const WithdrawStepSelectAsset: FC<Props> = ({ cryptoList }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const selectedAsset = useWithdrawStore((state) => state.selectedAsset);
  const setSelectedAsset = useWithdrawStore((state) => state.setSelectedAsset);
  const selectedNetwork = useWithdrawStore((state) => state.selectedNetwork);
  const setSelectedNetwork = useWithdrawStore(
    (state) => state.setSelectedNetwork
  );

  const dropdownRef = useRef<HTMLUListElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        buttonRef.current &&
        !buttonRef.current.contains(target)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const handleSelectCrypto = (code: string) => {
    setSelectedAsset(cryptoList.find((crypto) => crypto.code === code) || null);
    setSelectedNetwork(
      cryptoList.find((crypto) => crypto.code === code)?.networks[0] || null
    );
  };

  const handleSelectNetwork = (id: string) => {
    setSelectedNetwork(
      selectedAsset?.networks.find((network) => network.id === id) || null
    );

    setIsDropdownOpen(false);
  };
  return (
    <>
      {/* Select crypto */}
      <div className="mb-[26px] flex flex-col">
        <div className="mb-[14px] text-sm font-semibold">
          {t("withdraw.selectCrypto")}
        </div>

        <div className="flex flex-col gap-y-3">
          {cryptoList.map((crypto) => (
            <label
              key={crypto.code}
              className="relative flex cursor-pointer items-center gap-x-3"
            >
              <input
                type="radio"
                name="crypto"
                value={crypto.code}
                checked={selectedAsset?.code === crypto.code}
                onChange={() => handleSelectCrypto(crypto.code)}
                className="peer absolute h-0 w-0 opacity-0"
              />
              <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 transition-colors peer-checked:border-4 peer-checked:border-red-100"></span>
              <span className="text-[17px]">{crypto.token}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Select network */}
      <div className="relative flex flex-col">
        <div className="mb-[14px] text-sm font-semibold">
          {t("withdraw.selectNetwork")}
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="flex h-[46px] w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300/50 bg-gray-200 pl-3 pr-[10px]"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span
            className={cn("text-[17px]", {
              "text-text-primary": isDropdownOpen,
              "text-text-secondary": !isDropdownOpen
            })}
          >
            {selectedNetwork?.name}
          </span>
          <Icon name="chevron" width={24} height={24} />
        </button>

        {isDropdownOpen && (
          <ul
            ref={dropdownRef}
            className="bg-white-100 font-sf-pro-text shadow-100 absolute left-0 top-[calc(100%+5px)] flex max-h-[158px] w-full flex-col overflow-y-auto overscroll-contain rounded-lg text-[17px]"
          >
            {selectedAsset?.networks
              .filter((network) => network.id !== selectedNetwork?.id)
              .map((network) => (
                <li key={network.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectNetwork(network.id)}
                    className="flex h-[38px] w-full cursor-pointer items-center px-4 text-left hover:bg-blue-100 hover:text-blue-200"
                  >
                    {network.name}
                  </button>
                </li>
              ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default WithdrawStepSelectAsset;
