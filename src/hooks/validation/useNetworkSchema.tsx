import * as yup from "yup";
import { t } from "i18next";

import { NetworkCode } from "../../types";

const networkMatches: Record<NetworkCode, RegExp> = {
  [NetworkCode.TRON]: /^T[a-zA-Z0-9]{33}$/,
  [NetworkCode.ETHEREUM]: /^0x[a-fA-F0-9]{40}$/,
  [NetworkCode.BINANCE_SMART_CHAIN]: /^0x[a-fA-F0-9]{40}$/
};

export const useNetworkSchema = () => {
  return (network: NetworkCode | null) => {
    if (!network) return yup.mixed().required("Network is required");

    return yup.object().shape({
      network: yup
        .string()
        .matches(
          networkMatches[network],
          t("withdraw.invalidNetworkFormat", { network })
        )
        .required(t("withdraw.walletRequired"))
    });
  };
};
