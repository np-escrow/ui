import { BalanceBlock } from "../../components/BalanceBlock";
import Button from "../../components/Button/Button";
import DeliveriesList from "../../components/DeliveriesList/DeliveriesList";
import { Header } from "../../components/Header";
import { Modal } from "../../components/Modal";
import money from "../../assets/images/money-wings.webp";
import { t } from "i18next";
// import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePaymentStore } from "../../store/paymentStore";

const Home = () => {
  const navigate = useNavigate();
  const { modal, setPaymentModalOpen } = usePaymentStore();

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
          <DeliveriesList />

          <div className="custom-container primary-button-container">
            <Button actionHandler={() => navigate("/send-package")}>
              {t("home.sendPackage")}
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={modal.paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
      >
        <img src={money} alt="Money wings" className="h-[44px] w-[44px]" />
        <div className="flex flex-col items-center justify-center gap-[8px]">
          <h3 className="text-center text-[17px] font-semibold leading-[24px] text-[#1D2023]">
            {t("home.modal.title")}
          </h3>
          <p className="text-center text-[14px] leading-[20px] text-[#1D2023]">
            {t("home.modal.subtitle")}
          </p>
        </div>
      </Modal>
    </main>
  );
};

export default Home;
