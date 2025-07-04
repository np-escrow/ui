import { EPlatform, EUserLanguage, EUserType } from "./types";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";

import { Loader } from "./components/Loader";
import { Onboarding } from "./components/Onboarding";
import { ToastContainer } from "react-toastify";
import classNames from "classnames";
import useExpand from "./hooks/useExpand";
import { useLoadingStore } from "./store/loadingStore";
import { useOnboarding } from "./hooks/useOnboarding";
import { useTranslation } from "react-i18next";
import { useUserStore } from "./store/userStore";

const Home = lazy(() => import("./pages/Home/Home"));
const Scan = lazy(() => import("./pages/Scan/Scan"));
const Withdraw = lazy(() => import("./pages/Withdraw/Withdraw"));
const ShipmentInformation = lazy(
  () => import("./pages/ShipmentInformation/ShipmentInformation")
);
const SendPackage = lazy(() => import("./pages/SendPackage/SendPackage"));
const Payment = lazy(() => import("./pages/Payment/Payment"));

function App() {
  const { isShown, userType, onClose } = useOnboarding();
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const { signin } = useUserStore();
  const { handleExpand, isExpanded } = useExpand();
  const [isMobile, setIsMobile] = useState(false);
  const setUserType = useUserStore((state) => state.setUserType);
  const setLanguage = useUserStore((state) => state.setLanguage);
  const setPlatform = useUserStore((state) => state.setPlatform);
  const setIsRequestFullscreenAllowed = useUserStore((state) => state.setIsRequestFullscreenAllowed);
  const { isMainLoading } = useLoadingStore();

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
        setIsRequestFullscreenAllowed(true);
      }

      // Language
      const lang = Telegram.WebApp.initDataUnsafe?.user?.language_code;
      let targetLang: EUserLanguage = EUserLanguage.EN;
      if (lang === "uk") targetLang = EUserLanguage.UK;
      else if (lang === "ru") targetLang = EUserLanguage.RU;
      setLanguage(targetLang);
      i18n.changeLanguage(targetLang.toLowerCase());
    }
  }, [handleExpand, isExpanded, i18n]);

  useEffect(() => {
    // User type
    const param = Telegram.WebApp.initDataUnsafe?.start_param;
    const ttn = param ? +param : undefined;

    const userType = ttn ? EUserType.RECIPIENT : EUserType.SELLER;
    setUserType(userType);

    signin(navigate, ttn);
  }, []);

  return (
    <>
      <Suspense>
        <div
          className={classNames("h-screen", {
            "mobile-padding": isMobile,
            "pointer-events-none opacity-0": isMainLoading,
            "pointer-events-auto opacity-100": !isMainLoading
          })}
        >
          {isShown ? (
            <>
              <ToastContainer
                position="top-center"
                autoClose={3000}
                closeOnClick={true}
                limit={1}
                theme="light"
                className="!z-[1000] !mx-[16px] !mt-[90px] !w-[calc(100%-32px)] !max-w-[400px]"
                // transition={Bounce}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/payment/:id" element={<Payment />} />
                <Route path="/scan" element={<Scan />} />
                <Route
                  path="/shipment-info/:id"
                  element={<ShipmentInformation />}
                />
                <Route path="/send-package" element={<SendPackage />} />
              </Routes>
            </>
          ) : (
            <Onboarding close={onClose} userType={userType} />
          )}
        </div>
      </Suspense>

      {isMainLoading && <Loader />}
    </>
  );
}

export default App;
