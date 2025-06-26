import { useEffect, useMemo, useState } from "react";

import { BalanceBlock } from "../../components/BalanceBlock";
import Button from "../../components/Button/Button";
import DeliveriesList from "../../components/DeliveriesList/DeliveriesList";
import { Header } from "../../components/Header";
import { Onboarding } from "../../components/Onboarding";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/userStore";

const Home = () => {
  const navigate = useNavigate();
  const [isShown, setIsShown] = useState<boolean>(true);
  const { metadata, userType } = useUserStore();

  const shownOnboarding = useMemo(() => {
    if (Telegram.WebApp.initDataUnsafe?.start_param) {
      if (metadata.senderOnboarding) return true;
      return metadata.recipientOnboarding;
    } else {
      return metadata?.senderOnboarding;
    }
  }, [metadata, Telegram.WebApp.initDataUnsafe?.start_param]);

  useEffect(() => {
    setIsShown(shownOnboarding);
  }, [shownOnboarding]);

  return (
    <main className="page-with-button flex flex-col justify-start overflow-hidden">
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
            {/* <div className="h-full"> */}
            <DeliveriesList />
            {/* </div> */}

            <div className="custom-container primary-button-container">
              <Button actionHandler={() => navigate("/send-package")}>
                {t("home.sendPackage")}
              </Button>
            </div>
          </div>
        ) : (
          <Onboarding userType={userType} close={() => setIsShown(true)} />
        )}
      </div>
    </main>
  );
};

export default Home;
