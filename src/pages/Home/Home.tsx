import { t } from "i18next";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Header } from "../../components/Header";
import Button from "../../components/Button/Button";
import { Onboarding } from "../../components/Onboarding";

import { useUserStore } from "../../store/userStore";
import { BalanceBlock } from "../../components/BalanceBlock";
import DeliveriesList from "../../components/DeliveriesList/DeliveriesList";

const Home = () => {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState<boolean>(true);
  const { metadata, userType } = useUserStore();

  const shownOnboarding = metadata?.senderOnboarding;

  useEffect(() => {
    setIsShown(shownOnboarding);
  }, [shownOnboarding]);

  const handleClose = () => {
    console.log("todo send request to change user metadata");
    setIsShown(true);
  };

  return (
    <main className="page-with-button flex flex-col justify-start overflow-y-hidden">
      <div className="custom-container flex-1 !px-0">
        {isShown ? (
          <div
            className="flex h-full w-full flex-col"
            // style={{ outline: "1px solid tomato" }}
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
              <Button actionHandler={() => navigate("/send-package")}>
                {t("home.sendPackage")}
              </Button>
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
