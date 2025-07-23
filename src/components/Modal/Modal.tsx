import React, { useEffect, useState, type FC } from "react";

import ReactDOM from "react-dom";
import classNames from "classnames";
import styles from "./Modal.module.css";
import { Button } from "../Button";
import { Icon } from "../Icon";

type Props = {
  open: boolean;
  onClose?: () => void;
  onWrapperClick?: () => void;
  children: React.ReactNode;
  wrapperClassName?: string;
  backdropClassName?: string;
  wrapperStyles?: React.CSSProperties;
  fadeTimeoutMs?: number;
  disableBackdropClick?: boolean;
  isButton?: boolean;
  buttonTitle?: string;
};

const Modal: FC<Props> = ({
  open,
  onClose,
  children,
  backdropClassName,
  wrapperClassName,
  wrapperStyles,
  fadeTimeoutMs = 250,
  disableBackdropClick = false,
  isButton = true,
  buttonTitle
}) => {
  const [isActive, setIsActive] = useState(false);

  const handleBackdropClick = () => {
    if (onClose) {
      setIsActive(false);
      setTimeout(onClose, fadeTimeoutMs);
    }
  };

  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && onClose) {
      setIsActive(false);
      setTimeout(onClose, fadeTimeoutMs);
    }
  };

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => setIsActive(true), 10); // Slight delay to trigger animation
    } else {
      document.body.style.overflow = "";
    }

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  if (!open) return null;

  return ReactDOM.createPortal(
    <div
      className={classNames(
        "fixed inset-0 z-[105] flex items-end justify-center bg-[#1D202366] transition-all",
        `duration-${fadeTimeoutMs}`,
        {
          "opacity-0": !isActive,
          "opacity-100": isActive
        },
        backdropClassName
      )}
      onClick={disableBackdropClick ? undefined : handleBackdropClick}
    >
      <div
        className={classNames(
          styles.modalBox,
          { [styles.closed]: !isActive, [styles.open]: isActive },
          wrapperClassName
        )}
        onClick={(e) => e.stopPropagation()}
        style={{
          ...wrapperStyles,
          animationDuration: `${fadeTimeoutMs}ms`
        }}
      >
        <button
          className={styles.closeButton}
          onClick={handleBackdropClick}
          aria-label="Close modal"
        >
          <Icon name="close-revert" size={28} />
        </button>
        {children}
        {isButton && (
          <Button actionHandler={handleBackdropClick}>
            {buttonTitle ?? "Ok"}
          </Button>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
