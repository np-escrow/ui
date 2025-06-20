import { t } from "i18next";
import { useEffect } from "react";

import { Button } from "../Button";

import { useBalanceStore } from "../../store/balanceStore";

const BalanceBlock = () => {
  const { data, getBalance } = useBalanceStore((state) => state);

  useEffect(() => {
    getBalance();
  }, []);

  const balance = data?.accessible || 0;

  return (
    <div className="balance-block mb-5 flex h-[133px] w-full flex-col justify-between rounded-xl px-[14px] py-[10px]">
      <div className="flex flex-col">
        <div className="text-text-secondary mb-1 text-sm">
          {t("home.availableBalance")}
        </div>
        <div className="text-[20px] font-semibold">
          {balance}
        </div>
      </div>

      <div className="flex w-1/2 items-center justify-center gap-x-3">
        {/* <Button isLink linkto="/deposit" variant="secondary">
          {t("home.deposit")}
        </Button> */}
        <Button isLink linkto="/withdraw" variant="secondary">
          {t("home.withdraw")}
        </Button>
      </div>
    </div>
  );
};

export default BalanceBlock;
