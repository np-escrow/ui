import { BalanceBlock } from "../../components/BalanceBlock";
import Button from "../../components/Button/Button";
import DeliveriesList from "../../components/DeliveriesList/DeliveriesList";
import { Header } from "../../components/Header";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="page-with-button flex flex-col justify-start overflow-hidden">
      <div className="custom-container flex-1 !px-0">
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
      </div>
    </main>
  );
};

export default Home;
