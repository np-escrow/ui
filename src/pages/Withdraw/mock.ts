import type { Crypto } from "../../types";
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