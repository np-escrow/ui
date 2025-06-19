import { Route, Routes } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

import classNames from "classnames";
import useExpand from "./hooks/useExpand";
import { useTranslation } from "react-i18next";
import { useUserStore } from "./store/userStore";

const Home = lazy(() => import("./pages/Home/Home"));
const Scan = lazy(() => import("./pages/Scan/Scan"));
const Withdraw = lazy(() => import("./pages/Withdraw/Withdraw"));
const ShipmentInformation = lazy(
  () => import("./pages/ShipmentInformation/ShipmentInformation")
);

import { EPlatform, EUserLanguage, EUserType } from "./types";

function App() {
  const { i18n } = useTranslation();
  const { signin, loadings } = useUserStore();
  const { handleExpand, isExpanded } = useExpand();
  const [isMobile, setIsMobile] = useState(false);
  const setUserType = useUserStore((state) => state.setUserType);
  const setLanguage = useUserStore((state) => state.setLanguage);
  const setPlatform = useUserStore((state) => state.setPlatform);

  useEffect(() => {
    if (!isExpanded) handleExpand();
    if (Telegram.WebApp) {
      const version = Telegram.WebApp.version;
      const platform = Telegram.WebApp.platform as EPlatform;

      // Platform
      if (platform) setPlatform(platform);

      const isMobileDevice =
        platform === EPlatform.IOS || platform === EPlatform.ANDROID;
      setIsMobile(isMobileDevice);

      if (
        isMobileDevice &&
        Number(version) >= 8 &&
        typeof (Telegram.WebApp as any).requestFullscreen === "function"
      ) {
        (Telegram.WebApp as any).requestFullscreen();
      }

      // User type
      const params = new URLSearchParams(location.search);
      const userType = params.has("recepient")
        ? EUserType.RECIPIENT
        : EUserType.SELLER;
      setUserType(userType);

      // Language
      const lang = Telegram.WebApp.initDataUnsafe?.user?.language_code;
      let targetLang: EUserLanguage = EUserLanguage.EN;
      if (lang === "uk") targetLang = EUserLanguage.UK;
      else if (lang === "ru") targetLang = EUserLanguage.RU;
      setLanguage(targetLang);
      i18n.changeLanguage(targetLang.toLowerCase());

      const param = Telegram.WebApp.initDataUnsafe?.start_param
        ?.split("_")?.[1]
        ?.replace(/([A-Z])/g, "/$1");
      const ttn = param ? +param : undefined;

      signin(ttn);
    }
  }, [handleExpand, isExpanded, i18n]);

  // TODO add loader
  if (loadings.auth) {
    return "Loading....";
  }

  return (
    <Suspense>
      <div className={classNames("h-screen", { "mobile-padding": isMobile })}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/shipment-info/:id" element={<ShipmentInformation />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
