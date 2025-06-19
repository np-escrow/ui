import { Button } from "../Button";
import { t } from "i18next";

const BALANCE_AMOUNT_MOCK = 10;
const BALANCE_SYMBOL_MOCK = "$";

const BalanceBlock = () => {
  return (
    <div className="balance-block mb-5 flex h-[133px] w-full flex-col justify-between rounded-xl px-[14px] py-[10px]">
      <div className="flex flex-col">
        <div className="text-text-secondary mb-1 text-sm">
          {t("home.availableBalance")}
        </div>
        <div className="text-[20px] font-semibold">
          {BALANCE_SYMBOL_MOCK}
          {BALANCE_AMOUNT_MOCK}
        </div>
      </div>

      <div className="flex items-center justify-center gap-x-3 w-1/2">
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
