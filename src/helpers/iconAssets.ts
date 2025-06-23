import trxImage from "../assets/images/TRX.png";
import ethImage from "../assets/images/ETH.png";
import bnbImage from "../assets/images/BNB.svg";
import usdtImage from "../assets/images/USDT.png";
import usdcImage from "../assets/images/USDC.png";

export const getAssetImg = (data: { token: string; network: string }) => {
  let token = "";
  let network = "";

  if (data.network === "BINANCE_SMART_CHAIN") {
    network = bnbImage;
  }

  if (data.network === "ETHEREUM") {
    network = ethImage;
  }

  if (data.network === "TRON") {
    network = trxImage;
  }

  if (data.token === "USDT") {
    token = usdtImage;
  }

  if (data.token === "USDC") {
    token = usdcImage;
  }

  return {
    token,
    network
  };
};
