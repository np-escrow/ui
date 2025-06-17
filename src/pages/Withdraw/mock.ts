export type Crypto = {
    id: string;
    token: string;
    networks: Network[];
}

export type Network = {
    id: string;
    name: string;
    address: string;
}

export const cryptoMock: Crypto[] = [
    {
        id: '1',
        token: 'USDT',
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
    {
        id: '2',
        token: 'USDC',
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