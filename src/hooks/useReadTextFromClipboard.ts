import { useCallback } from "react";
import { getWebAppFromGlobal } from "../helpers/getWebAppFromGlobal";

export type ReadTextFromClipboardFunction = () => Promise<string | null>;

const useReadTextFromClipboard = (): ReadTextFromClipboardFunction => {
    const webApp = getWebAppFromGlobal();
  
    return useCallback(
      () =>
        new Promise<string | null>(resolve => {
          webApp?.readTextFromClipboard?.(resolve);
        }),
      [webApp],
    );
  };

export default useReadTextFromClipboard;
