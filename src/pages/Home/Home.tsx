import { useEffect, useState } from "react";

import { BalanceBlock } from "../../components/BalanceBlock";
import Button from "../../components/Button/Button";
import DeliveriesList from "../../components/DeliveriesList/DeliveriesList";
import { EUserType } from "../../types";
import { Header } from "../../components/Header";
import { Onboarding } from "../../components/Onboarding";
import { t } from "i18next";

// import { useUIStore } from "../../store/uiStore";

const Home = () => {
  const [isShown, setIsShown] = useState<boolean>(true);
  // todo: get user type from backend
  const [userType] = useState<EUserType>(EUserType.RECIPIENT);

  const shownOnboarding = true;
  // todo
  // const shownPrivateModeOnboarding =
  // userData?.authData?.user.metadata?.shownPrivateModeOnboarding;

  useEffect(() => {
    setIsShown(shownOnboarding);
  }, [shownOnboarding]);

  const handleClose = () => {
    console.log("todo send request to change user metadata");
    setIsShown(true);
  };

  return (
    <main className="page-with-button flex flex-col justify-start overflow-y-hidden">
      <div className="custom-container flex-1">
        {isShown ? (
          <div
            className="flex h-full w-full flex-col"
            style={{ outline: "1px solid tomato" }}
          >
            {/* Balance block */}
            <div className="my-5 px-[1rem]">
              <Header />
            </div>
            <div className="px-[1rem]">
              <BalanceBlock />
            </div>

            {/* Deliveries list */}
            <div className="">
              <DeliveriesList />
            </div>

            <div className="custom-container fixed bottom-7 left-1/2 z-[11] -translate-x-1/2 px-[1rem]">
              <Button>{t("home.sendPackage")}</Button>
            </div>
          </div>
        ) : (
          <Onboarding userType={userType} close={handleClose} />
        )}
      </div>
    </main>
  );
};

export default Home;
