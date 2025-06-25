import { Button } from "../../components/Button";
import { NavHeader } from "../../components/NavHeader";
import classNames from "classnames";
import loader from "../../assets/images/loader.webp";
import styles from "./SendPackage.module.css";
import { t } from "i18next";
import { useKeyboardStatus } from "../../hooks/useKeyboardStatus";
import { useSendPackage } from "../../hooks/useSendPackage";

const SendPackage = () => {
  const {
    btnData,
    isSharePage,
    backData,
    titleTab,
    switchTab,
    handleBackToHomepage
  } = useSendPackage();
  const { isKeyboardOpen, minScreenHeight } = useKeyboardStatus();

  return (
    <main
      className={classNames("page-with-button flex flex-col justify-start", {
        "translate-y-[40px]": isKeyboardOpen
      })}
      style={{ minHeight: minScreenHeight }}
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
            {isSharePage && <p className={styles.tab__title}>{titleTab}</p>}
            {switchTab()}
          </div>
          <div
            className={classNames("custom-container primary-button-container", {
              "!bottom-[270px]": isKeyboardOpen
            })}
          >
            <Button actionHandler={btnData.action} disabled={btnData.disabled}>
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
            {isSharePage && (
              <Button
                actionHandler={handleBackToHomepage}
                disabled={btnData.disabled}
                className="mt-[10px] !bg-transparent !text-[#1D2023]"
              >
                <p>{t("sendPackage.backHomePageBtn")}</p>
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default SendPackage;
