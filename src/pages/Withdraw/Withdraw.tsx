import { Button } from "../../components/Button";
import { NavHeader } from "../../components/NavHeader";
import classNames from "classnames";
import cn from "classnames";
import loader from "../../assets/images/loader.webp";
import { t } from "i18next";
import { useKeyboardStatus } from "../../hooks/useKeyboardStatus";
import { useWithdrawn } from "../../hooks/useWithdrawn";

const Withdraw = () => {
  const { isKeyboardOpen } = useKeyboardStatus();
  const { loading, backBtnConfig, btnConfig, switchTab } = useWithdrawn();

  return (
    <main
      className={classNames("page-with-button flex flex-col justify-start", {
        "translate-y-[40px] transform": isKeyboardOpen
      })}
    >
      <div className="custom-container mb-[30px] mt-5">
        <NavHeader {...backBtnConfig} />
      </div>

      <div className="custom-container flex-1 overflow-y-auto">
        <div className="flex h-full flex-col">{switchTab()}</div>

        <div
          className={classNames("custom-container primary-button-container", {
            "!bottom-[-80px]": isKeyboardOpen
          })}
        >
          <Button
            actionHandler={btnConfig.action}
            disabled={btnConfig.disabled}
            className={cn({
              "!bg-red-100": loading
            })}
          >
            {loading ? (
              <img
                className="animate-spin"
                src={loader}
                width={24}
                height={24}
              />
            ) : (
              t("withdraw.continue")
            )}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Withdraw;
