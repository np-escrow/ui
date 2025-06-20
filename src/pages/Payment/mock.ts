import { NetworkCode, type Crypto } from "../../types";
import imgMock from "../../assets/images/user-avatar-mock.jpg";
import imgMock2 from "../../assets/images/mock.jpg";

export const cryptoMock: Crypto[] = [
  {
    token: "USDT",
    code: "USDT",
    logoToken: imgMock2,
    logoNetwork: imgMock,
    networks: [
      {
        id: "2",
        name: "Binance Smart Chain",
        code: NetworkCode.BINANCE_SMART_CHAIN
      },
      {
        id: "3",
        name: "Tron",
        code: NetworkCode.TRON
      },
      {
        id: "4",
        name: "Ethereum",
        code: NetworkCode.ETHEREUM
      }
    ]
  },
  {
    token: "USDC",
    code: "USDC",
    logoToken: imgMock2,
    logoNetwork: imgMock,
    networks: [
      {
        id: "2",
        name: "Binance Smart Chain",
        code: NetworkCode.BINANCE_SMART_CHAIN
      },
      {
        id: "3",
        name: "Tron",
        code: NetworkCode.TRON
      },
      {
        id: "4",
        name: "Ethereum",
        code: NetworkCode.ETHEREUM
      }
    ]
  }
];
