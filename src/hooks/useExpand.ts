import { type DispatchWithoutAction, useCallback, useEffect, useState } from "react";

import { getWebAppFromGlobal } from "../helpers/getWebAppFromGlobal";

export default function useExpand(): {
  isExpanded: boolean;
  handleExpand: DispatchWithoutAction;
} {
  const webApp = getWebAppFromGlobal();

  const [isExpanded, setIsExpanded] = useState(Boolean(webApp?.isExpanded));

  useEffect(() => {
    if (!webApp) return;
    const handleEvent = (payload: { isStateStable: boolean }) => {
      if (payload.isStateStable) {
        setIsExpanded(Boolean(webApp.isExpanded));
      }
    };

    webApp.onEvent("viewportChanged", handleEvent);
    return () => webApp.offEvent("viewportChanged", handleEvent);
  }, [webApp]);

  const handleExpand = useCallback(() => webApp?.expand?.(), [webApp]);

  return { isExpanded, handleExpand };
};
