import { useEffect, useState } from "react";
import { NavHeader } from "../../components/NavHeader";
import { cryptoMock, type Crypto, type Network } from "./mock";

// import Button from "../../components/Button/Button";
// import { EUserType } from "../../types";

import { t } from "i18next";
// import { EWithdrawStep, useWithdrawStore } from "../../store/withdrawStore";
import Icon from "../../components/Icon/Icon";

const Withdraw = () => {
  const [cryptoList, setCryptoList] = useState<Crypto[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string>(cryptoList[0]?.id || '');
  const [selectedNetwork, setSelectedNetwork] = useState<Network | null>(null);

  // const step = useWithdrawStore((state) => state.step);
  // const setStep = useWithdrawStore((state) => state.setStep);

  useEffect(() => {
    if (!cryptoList.length) {
      // todo get crypto list from backend
      setCryptoList(cryptoMock);
    }

    if (!selectedCrypto && cryptoList.length) {
      setSelectedCrypto(cryptoList[0]?.id || '');
      setSelectedNetwork(cryptoList[0]?.networks[0]);
    }

  }, [cryptoList, selectedCrypto]);

  const handleSelectCrypto = (id: string) => {
    setSelectedCrypto(id);
    setSelectedNetwork(cryptoList.find((crypto) => crypto.id === id)?.networks[0] || null);
  }

  return <main className="page-with-button flex flex-col justify-center">
    <div className="custom-container flex-1">
      <div className="flex flex-col h-full">
        <div className="mt-5 mb-[30px]">
          <NavHeader />
        </div>

        {/* Select crypto */}
        <div className="flex flex-col mb-[26px]">
          <div className="mb-[14px] text-sm font-semibold">
            {t('withdraw.selectCrypto')}
          </div>

          <div className="flex flex-col gap-y-3">
            {cryptoList.map((crypto) => (
              <label key={crypto.id} className="flex items-center gap-x-3 cursor-pointer relative">
                <input
                  type="radio"
                  name="crypto"
                  value={crypto.id}
                  checked={selectedCrypto === crypto.id}
                  onChange={() => handleSelectCrypto(crypto.id)}
                  className="peer absolute opacity-0 w-0 h-0"
                />
                <span className="w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center peer-checked:border-4 peer-checked:border-red-100 transition-colors"></span>
                <span className="text-[17px]">{crypto.token}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Select network */}
        <div className="flex flex-col">
          <div className="mb-[14px] text-sm font-semibold">
            {t('withdraw.selectNetwork')}
          </div>

          <button type="button" className="flex items-center justify-between w-full h-[46px] border border-gray-300/50 bg-gray-200 rounded-lg pl-3 pr-[10px]">
            <span className="text-[17px] text-text-secondary">{selectedNetwork?.name}</span>
            <Icon name="chevron" width={24} height={24} />
          </button>

        </div>
      </div>
    </div>
  </main>;
};

export default Withdraw;