import { t } from "i18next";

import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import type { FC } from "react";
import cn from "classnames";

type Props = {
  isLink: boolean;
  link?: string;
  action?: () => void;
  className?: string;
};

const NavHeader: FC<Props> = ({ isLink, link, action, className }) => {
  const getHeaderTitle = () => {
    switch (location.pathname) {
      case "/withdraw":
        return t("header.withdraw");
      case "/scan":
        return t("header.withdraw");
      case "/deposit":
        return t("header.deposit");
      case "/shipment-info":
        return t("header.shipmentInfo");
      case "/send-package":
        return t("header.sendPackage");
      case "/package-payment":
        return t("header.packagePayment");
    }
  };

  return (
    <header className={cn("relative flex h-11 items-center gap-x-[10px]", className)}>
      {isLink ? (
        <Link
          to={link || "/"}
          className="flex size-9 items-center justify-center rounded-full bg-gray-200"
        >
          <Icon name="arrow" width={22} height={22} />
        </Link>
      ) : (
        <button
          type="button"
          onClick={action}
          className="flex size-9 items-center justify-center rounded-full bg-gray-200"
        >
          <Icon name="arrow" width={22} height={22} />
        </button>
      )}

      <h1 className="absolute left-1/2 -translate-x-1/2 text-[20px] font-semibold">
        {getHeaderTitle()}
      </h1>
    </header>
  );
};

export default NavHeader;
