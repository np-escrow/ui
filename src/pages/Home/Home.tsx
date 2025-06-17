import { useEffect, useState } from "react";
import { t } from "i18next";

import { Onboarding } from "../../components/Onboarding";

import { EUserType } from "../../types";
import Button from "../../components/Button/Button";
import { DeliveriesListEmptyState } from "../../components/DeliveriesListEmptyState";
import { BalanceBlock } from "../../components/BalanceBlock";
import { Header } from "../../components/Header";

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

  return <main className="page-with-button flex flex-col justify-center">
    <div className="custom-container flex-1">
      {isShown ? <div className="flex flex-col h-full">

        <div className="my-5">
          <Header />
        </div>

        {/* Balance block */}
        <BalanceBlock />


        {/* Deliveries list */}
        <div className="">
          <span className="text-[15px] font-semibold">{t('home.deliveries')}</span>
          <div className="mt-[30px]">
            <DeliveriesListEmptyState />
          </div>
        </div>

        <div className="custom-container fixed bottom-7 left-1/2 -translate-x-1/2 z-[11]">
          <Button>{t('home.sendPackage')}</Button>
        </div>
      </div>
        : <Onboarding userType={userType} close={handleClose} />}
    </div>
  </main>;
};

export default Home;