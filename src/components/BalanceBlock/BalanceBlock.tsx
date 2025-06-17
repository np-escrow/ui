import { t } from "i18next";
import { Button } from "../Button";

const BALANCE_AMOUNT_MOCK = 10;
const BALANCE_SYMBOL_MOCK = "$";

const BalanceBlock = () => {
    return <div className="balance-block flex flex-col justify-between rounded-xl h-[133px] w-full px-[14px] py-[10px] mb-5">
        <div className="flex flex-col">
            <div className="text-text-secondary text-sm mb-1">{t('home.availableBalance')}</div>
            <div className="text-[20px] font-semibold">{BALANCE_SYMBOL_MOCK}{BALANCE_AMOUNT_MOCK}</div>
        </div>

        <div className="flex items-center justify-center gap-x-3">
            <Button variant="secondary">
                {t('home.deposit')}
            </Button>
            <Button variant="secondary">
                {t('home.withdraw')}
            </Button>
        </div>
    </div>
};

export default BalanceBlock;