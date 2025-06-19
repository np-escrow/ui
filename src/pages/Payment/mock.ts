import { EDeliveryStatus, EUserType, type Crypto, type IDeliveries } from "../../types";
import imgMock from '../../assets/images/user-avatar-mock.jpg'
import imgMock2 from '../../assets/images/mock.jpg'

export const cryptoMock: Crypto[] = [
    {
        id: '1',
        token: 'USDT',
        balance: 100,
        balanceUSD: 200,
        price: 2,
        isNative: false,
        logoToken: imgMock2,
        logoNetwork: imgMock,
        networks: [
            {
                id: '1',
                name: 'TRC20',
                address: '0x0000000000000000000000000000000000000000',
            },
            {
                id: '2',
                name: 'Binance Smart Chain',
                address: '0x0000000000000000000000000000000000000000',
            },
            {
                id: '3',
                name: 'Tron',
                address: '0x0000000000000000000000000000000000000000',
            },
            {
                id: '4',
                name: 'Ethereum',
                address: '0x0000000000000000000000000000000000000000',
            },
            {
                id: '5',
                name: 'Polygon',
                address: '0x0000000000000000000000000000000000000000',
            },
            {
                id: '6',
                name: 'Solana',
                address: '0x0000000000000000000000000000000000000000',
            },
        ],
    },
    {
        id: '2',
        token: 'USDC',
        balance: 100,
        balanceUSD: 300,
        price: 3,
        isNative: false,
        logoToken: imgMock2,
        logoNetwork: imgMock,
        networks: [
            {
                id: '1',
                name: 'TRC20',
                address: '0x0000000000000000000000000000000000000000',
            },
            {
                id: '2',
                name: 'Binance Smart Chain',
                address: '0x0000000000000000000000000000000000000000',
            },
            {
                id: '3',
                name: 'Tron',
                address: '0x0000000000000000000000000000000000000000',
            },
            {
                id: '4',
                name: 'Ethereum',
                address: '0x0000000000000000000000000000000000000000',
            },
        ],
    },


]

export const mockDeliveries: Array<IDeliveries> = [
    {
      id: "1",
      ttn: "123456789065",
      userType: EUserType.RECIPIENT,
      status: EDeliveryStatus.PENDING,
      price: "100",
      currency: "UAH",
      info: {
        createdAt: "2023-10-01T12:00:00Z",
        deliveryDate: "2023-10-02T12:00:00Z",
        sellerCity: "Kyiv",
        seller: "Andrew",
        recipient: "Oleg",
        recipientCity: "Lviv/Ukraine"
      },
      archive: false
    },
    {
      id: "12",
      ttn: "100456789065",
      userType: EUserType.RECIPIENT,
      status: EDeliveryStatus.PAID,
      price: "164",
      currency: "UAH",
      info: {
        createdAt: "2023-10-01T12:00:00Z",
        deliveryDate: "2027-10-02T12:00:00Z",
        sellerCity: "Kyiv",
        seller: "Andrew",
        recipient: "Oleg",
        recipientCity: "Lviv"
      },
      archive: false
    },
    {
      id: "2",
      ttn: "123431789065",
      userType: EUserType.SELLER,
      status: EDeliveryStatus.COMPLETED,
      price: "90",
      currency: "UAH",
      info: {
        createdAt: "2023-10-01T12:00:00Z",
        deliveryDate: "2023-10-02T12:00:00Z",
        sellerCity: "Kyiv",
        recipientCity: "Lviv",
        seller: "Andrew",
        recipient: "Oleg"
      },
      archive: false
    },
    {
      id: "32",
      ttn: "123431789065",
      userType: EUserType.SELLER,
      status: EDeliveryStatus.COMPLETED,
      price: "90",
      currency: "UAH",
      info: {
        createdAt: "2023-10-01T12:00:00Z",
        deliveryDate: "2023-10-02T12:00:00Z",
        sellerCity: "Kyiv",
        recipientCity: "Lviv",
        seller: "Andrew",
        recipient: "Oleg"
      },
      archive: true
    }
  ];