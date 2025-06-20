import * as yup from "yup";

import { NetworkCode } from "../../types";
import { t } from "i18next";

const networkMatches: Record<NetworkCode, RegExp> = {
  // [NetworkCode.TRC20]: /^T[a-zA-Z0-9]{33}$/, // то же что и TRON
  [NetworkCode.TRON]: /^T[a-zA-Z0-9]{33}$/,
  // [NetworkCode.BITCOIN]: /^[13][a-km-zA-HJ-NP-Z1-9]{25,34}$/, // классический формат
  [NetworkCode.ETHEREUM]: /^0x[a-fA-F0-9]{40}$/,
  [NetworkCode.BINANCE_SMART_CHAIN]: /^0x[a-fA-F0-9]{40}$/
  // [NetworkCode.POLYGON]: /^0x[a-fA-F0-9]{40}$/ // тоже EVM-сеть
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
