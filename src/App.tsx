import { EPlatform, EUserLanguage, EUserType } from "./types";
import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

import classNames from "classnames";
import useExpand from "./hooks/useExpand";
import { useTranslation } from "react-i18next";
import { useUserStore } from "./store/userStore";
import { Loader } from "./components/Loader";

const Home = lazy(() => import("./pages/Home/Home"));
const Withdraw = lazy(() => import("./pages/Withdraw/Withdraw"));
const Scan = lazy(() => import("./pages/Scan/Scan"));
const ShipmentInformation = lazy(
  () => import("./pages/ShipmentInformation/ShipmentInformation")
);
const SendPackage = lazy(() => import("./pages/SendPackage/SendPackage"));

function App() {
  const { i18n } = useTranslation();
  const { handleExpand, isExpanded } = useExpand();
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();
  const setUserType = useUserStore((state) => state.setUserType);
  const setLanguage = useUserStore((state) => state.setLanguage);
  const setPlatform = useUserStore((state) => state.setPlatform);
  const setUsername = useUserStore((state) => state.setUsername);

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
      
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (isMobileDevice && Number(version) >= 8 && typeof (Telegram.WebApp as any).requestFullscreen === 'function') {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (Telegram.WebApp as any).requestFullscreen();
      }

      // Username
      const username = Telegram.WebApp.initDataUnsafe?.user?.username;
      setUsername(username);

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
    }
  }, [
    handleExpand,
    isExpanded,
    i18n,
    location.search,
    setUserType,
    setLanguage,
    setPlatform,
    setUsername
  ]);

  return (
    <Suspense fallback={<Loader />}>
      <div className={classNames("h-screen", { "mobile-padding": isMobile })}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/withdraw" element={<Withdraw />} />
          <Route path="/scan" element={<Scan />} />
          <Route path="/shipment-info/:id" element={<ShipmentInformation />} />
          <Route path="/send-package" element={<SendPackage />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
