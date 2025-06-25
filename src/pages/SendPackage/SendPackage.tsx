import { Button } from "../../components/Button";
import { ESendPakageTab } from "./SendPackage.type";
import { NavHeader } from "../../components/NavHeader";
import classNames from "classnames";
import loader from "../../assets/images/loader.webp";
import styles from "./SendPackage.module.css";
import { useKeyboardStatus } from "../../hooks/useKeyboardStatus";
import { useSendPackage } from "../../hooks/useSendPackage";

const SendPackage = () => {
  const { btnData, backData, titleTab, data, switchTab } = useSendPackage();
  const { isKeyboardOpen } = useKeyboardStatus();

  return (
    <main
      className={classNames("page-with-button flex flex-col justify-start", {
        "translate-y-[40px] transform": isKeyboardOpen
      })}
    >
      <div className="custom-container max-h-full flex-1 !px-0">
        <div className="flex h-full flex-col">
          <div className="mb-[30px] mt-5 px-[1rem]">
            <NavHeader
              isLink={backData.isLink}
              link={backData.link}
              action={backData.action}
            />
          </div>
          <div className={styles.tab__box}>
            {data.activeTab !== ESendPakageTab.PaymentSend && (
              <p className={styles.tab__title}>{titleTab}</p>
            )}
            {switchTab()}
          </div>
          <div className="custom-container primary-button-container">
            <Button
              actionHandler={btnData.action}
              disabled={btnData.disabled}
              className={classNames({
                "!translate-y-[80px]": isKeyboardOpen
              })}
            >
              {btnData.loading ? (
                <img
                  className="spinner"
                  src={loader}
                  width={"24px"}
                  height={"24px"}
                />
              ) : (
                <p>{btnData.title}</p>
              )}
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default SendPackage;
