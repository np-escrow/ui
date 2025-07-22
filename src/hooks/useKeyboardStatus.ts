import { useEffect, useState } from "react";

import { EPlatform } from "../types";
import { useUserStore } from "../store/userStore";

export const useKeyboardStatus = () => {
  const { platform } = useUserStore.getState();
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const [minScreenHeight, setMinScreenHeight] = useState(0);
  const [currentTgHeight, setCurrentTgHeight] = useState(0);

  useEffect(() => {
    const checkKeyboard = () => {
      const currentHeight = window.Telegram.WebApp.viewportHeight;
      setCurrentTgHeight(currentHeight);

      const isOpen = currentHeight < window.screen.height * 0.8;
      setIsKeyboardOpen(isOpen);
      setMinScreenHeight(isOpen ? window.screen.height * 0.8 : currentHeight);
    };

    if (
      platform === EPlatform.TDESKTOP ||
      platform === EPlatform.WEB ||
      platform === EPlatform.WEBA
    )
      return;

    window.addEventListener("resize", checkKeyboard);
    checkKeyboard();

    return () => {
      window.removeEventListener("resize", checkKeyboard);
    };
  }, [platform]);

  return { isKeyboardOpen, minScreenHeight, currentTgHeight };
};
