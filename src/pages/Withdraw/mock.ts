import { NetworkCode, type Crypto } from "../../types";
import imgMock from "../../assets/images/user-avatar-mock.jpg";
import imgMock2 from "../../assets/images/mock.jpg";

// export enum NetworkCode {
//   TRC20 = "TRC20",
//   TRON = "TRON",
//   BITCOIN = "BITCOIN",
//   ETHEREUM = "ETHEREUM",
//   BINANCE_SMART_CHAIN = "BINANCE_SMART_CHAIN"
// }

export const cryptoMock: Crypto[] = [
  {
    id: "1",
    token: "USDT",
    balance: 100,
    balanceUSD: 200,
    price: 1,
    isNative: false,
    logoToken: imgMock2,
    logoNetwork: imgMock,
    networks: [
      //   {
      //     id: "1",
      //     name: "TRC20",
      //     code: NetworkCode.TRC20,
      //     address: "0x0000000000000000000000000000000000000000"
      //   },
      {
        id: "2",
        name: "Binance Smart Chain",
        code: NetworkCode.BINANCE_SMART_CHAIN,
        address: "0x0000000000000000000000000000000000000000"
      },
      {
        id: "3",
        name: "Tron",
        code: NetworkCode.TRON,
        address: "0x0000000000000000000000000000000000000000"
      },
      {
        id: "4",
        name: "Ethereum",
        code: NetworkCode.ETHEREUM,
        address: "0x0000000000000000000000000000000000000000"
      }
      //   {
      //     id: "5",
      //     name: "Polygon",
      //     code: NetworkCode.POLYGON,
      //     address: "0x0000000000000000000000000000000000000000"
      //   }
      //   {
      //     id: "6",
      //     name: "Solana",
      //     address: "0x0000000000000000000000000000000000000000"
      //   }
    ]
  },
  {
    id: "2",
    token: "USDC",
    balance: 100,
    balanceUSD: 300,
    price: 1,
    isNative: false,
    logoToken: imgMock2,
    logoNetwork: imgMock,
    networks: [
      //   {
      //     id: "1",
      //     name: "TRC20",
      //     code: NetworkCode.TRC20,
      //     address: "0x0000000000000000000000000000000000000000"
      //   },
      // {
      //     id: "3",
      //     name: "Tron",
      //     code: NetworkCode.TRON,
      //     address: "0x0000000000000000000000000000000000000000"
      //   },
      {
        id: "2",
        name: "Binance Smart Chain",
        code: NetworkCode.BINANCE_SMART_CHAIN,
        address: "0x0000000000000000000000000000000000000000"
      },

      {
        id: "4",
        name: "Ethereum",
        code: NetworkCode.ETHEREUM,
        address: "0x0000000000000000000000000000000000000000"
      },
      {
        id: "5",
        name: "Polygon",
        code: NetworkCode.POLYGON,
        address: "0x0000000000000000000000000000000000000000"
      }
    ]
  }
];
