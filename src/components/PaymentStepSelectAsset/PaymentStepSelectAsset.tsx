import { useEffect, useRef, useState, type FC } from "react";

import { t } from "i18next";

import { Icon } from "../Icon";

import type { IDeliveries } from "../../types";
import { usePaymentStore } from "../../store/paymentStore";
import parcelImage from "../../assets/images/parcel.png";
import { Link } from "react-router-dom";
import { useAssetStore } from "../../store/assetStore";

type Props = {
  delivery: IDeliveries;
};

const PaymentStepSelectAsset: FC<Props> = ({ delivery }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const assets = useAssetStore((state) => state.data.assets);
  const selectedAsset = usePaymentStore((state) => state.selectedAsset);
  const selectedNetwork = usePaymentStore((state) => state.selectedNetwork);
  const setSelectedAsset = usePaymentStore((state) => state.setSelectedAsset);
  const setSelectedNetwork = usePaymentStore(
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
    const asset = assets.find((crypto) => crypto.code === code) || null;
    setSelectedAsset(asset!);
    setSelectedNetwork(asset!.networks[0]);
  };

  const handleSelectNetwork = (code: string) => {
    setSelectedNetwork(
      selectedAsset?.networks.find((network) => network.code === code) || null
    );

    setIsDropdownOpen(false);
  };

  return (
    <>
      {/* Description */}
      <p className="text-text-secondary mb-5 text-sm">
        {t("payment.paymentDescription")}
      </p>

      {/* Parcel info */}
      <Link
        to={`/shipment-info/${delivery.id}`}
        className="shadow-200 mb-5 flex items-center rounded-sm p-[10px]"
      >
        <div className="flex w-full items-center gap-x-3">
          <div className="flex size-11 items-center justify-center rounded-[6px] bg-gray-200">
            <img src={parcelImage} width={40} height={40} alt="Parcel image" />
          </div>

          <div className="flex flex-1 items-start justify-between">
            <div className="flex flex-col gap-y-1">
              <span className="font-medium">{`#${delivery.ttn}`}</span>
              <span className="text-text-secondary text-[13px]">{`${t("shipment.detailsFrom")} ${delivery.info.sellerCity}`}</span>
            </div>

            <span className="text-[15px] font-semibold">{`$${delivery.price}`}</span>
          </div>
        </div>
      </Link>

      {/* Select crypto */}
      <div className="mb-[26px] flex flex-col">
        <div className="mb-[14px] text-sm font-semibold">
          {t("payment.selectCrypto")}
        </div>

        <div className="flex flex-col gap-y-3">
          {assets.map((crypto) => (
            <label
              key={crypto.code}
              className="relative flex cursor-pointer items-center gap-x-3"
            >
              <input
                type="radio"
                name="crypto"
                value={crypto.code}
                checked={selectedAsset?.code === crypto.code}
                onChange={() => {
                  handleSelectCrypto(crypto.code);
                }}
                className="peer absolute h-0 w-0 opacity-0"
              />
              <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-gray-300 transition-colors peer-checked:border-4 peer-checked:border-red-100"></span>
              <span className="text-[17px]">{crypto.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Select network */}
      <div className="relative flex flex-col">
        <div className="mb-[14px] text-sm font-semibold">
          {t("payment.selectNetwork")}
        </div>

        <button
          ref={buttonRef}
          type="button"
          className="flex h-[46px] w-full cursor-pointer items-center justify-between rounded-lg border border-gray-300/50 bg-gray-200 pl-3 pr-[10px]"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="text-[17px]">{selectedNetwork?.name}</span>
          <Icon name="chevron" width={24} height={24} />
        </button>

        {isDropdownOpen && (
          <ul
            ref={dropdownRef}
            className="bg-white-100 font-sf-pro-text shadow-100 absolute left-0 top-[calc(100%+5px)] flex max-h-[158px] w-full flex-col overflow-y-auto overscroll-contain rounded-lg text-[17px] z-20"
          >
            {selectedAsset?.networks
              .filter((network) => network.code !== selectedNetwork?.code)
              .map((network) => (
                <li key={network.code}>
                  <button
                    type="button"
                    onClick={() => handleSelectNetwork(network.code)}
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

export default PaymentStepSelectAsset;
