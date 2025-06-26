import { useEffect, useMemo, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/userStore";

export const useOnboarding = () => {
  const [isShown, setIsShown] = useState<boolean>(true);
  const { metadata, userType } = useUserStore();
  const navigate = useNavigate();

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

  const onClose = () => {
    setIsShown(true);
    if (Telegram.WebApp.initDataUnsafe.start_param) {
      navigate(`/payment/${Telegram.WebApp.initDataUnsafe.start_param}`);
    }
  };

  return { isShown, userType, onClose };
};
