import { Icon } from "../Icon";
import { Link } from "react-router-dom";
import { t } from "i18next";

const NavHeader = () => {
  const getHeaderTitle = () => {
    const path = location.pathname;

    if (path.startsWith("/shipment-info/")) {
      return t("header.shipmentInfo");
    }

    switch (path) {
      case "/withdraw":
        return t("header.withdraw");
      case "/deposit":
        return t("header.deposit");
      case "/send-package":
        return t("header.sendPackage");
      case "/package-payment":
        return t("header.packagePayment");
    }
  };

  const getBackLink = () => {
    // используем switch вместо navigate('/') для того чтобы не было перерисовки при возврате

    switch (location.pathname) {
      case "/withdraw":
        return "/";
      // case '/deposit':
      //     return '/';
      // case '/shipment-info':
      //     return '/';
      // case '/send-package':
      //     return '/';
      // case '/package-payment':
      //     return '/';
    }
  };

  return (
    <header className="relative flex h-11 items-center gap-x-[10px]">
      <Link
        to={getBackLink() || "/"}
        className="flex size-9 items-center justify-center rounded-full bg-gray-200"
      >
        <Icon name="arrow" width={22} height={22} />
      </Link>

      <h1 className="absolute left-1/2 -translate-x-1/2 text-[20px] font-semibold">
        {getHeaderTitle()}
      </h1>
    </header>
  );
};

export default NavHeader;
