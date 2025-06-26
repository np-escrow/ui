import { Button } from "../Button";
import { formatPriceValue } from "../../helpers/formatPriceValue";
import { t } from "i18next";
import { useBalanceStore } from "../../store/balanceStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BalanceBlock = () => {
  const { data, getBalance } = useBalanceStore((state) => state);
  const navigate = useNavigate();

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
          {formatPriceValue(balance)}
        </div>
      </div>

      <div className="flex w-1/2 items-center justify-center gap-x-3">
        {/* <Button isLink linkto="/deposit" variant="secondary">
          {t("home.deposit")}
        </Button> */}
        <Button actionHandler={() => navigate("/withdraw")} variant="secondary">
          {t("home.withdraw")}
        </Button>
      </div>
    </div>
  );
};

export default BalanceBlock;
