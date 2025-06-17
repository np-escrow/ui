import { t } from "i18next";
import { Icon } from "../Icon";

const DeliveriesListEmptyState = () => {
    return <div className="flex flex-col items-center justify-center">
        <Icon name="deliveriesListEmptyState" width={153} height={153} />
        <span className="text-center text-sm font-medium">
            {t("home.deliveriesListEmptyStateText")}
        </span>
    </div>
};

export default DeliveriesListEmptyState;