export type TierDataTypes = {
  tier: number;
  price: string;
  whitelist: number;
  amount: number;
  walletPerCap: number | null;
};

export const TierData: Array<TierDataTypes> = [
  {
    tier: 1,
    price: '0.0060',
    whitelist: 2000,
    amount: 5000,
    walletPerCap: 30,
  },
  {
    tier: 2,
    price: '0.0648',
    whitelist: 2000,
    amount: 4800,
    walletPerCap: 30,
  },
  {
    tier: 3,
    price: '0.0700',
    whitelist: 2000,
    amount: 4600,
    walletPerCap: 30,
  },
  {
    tier: 4,
    price: '0.0756',
    whitelist: 1000,
    amount: 4400,
    walletPerCap: 30,
  },
  {
    tier: 5,
    price: '0.0081',
    whitelist: 1000,
    amount: 4200,
    walletPerCap: 30,
  },
  {
    tier: 6,
    price: '0.0000882',
    whitelist: 0,
    amount: 4000,
    walletPerCap: null,
  },
  {
    tier: 7,
    price: '0.0000882',
    whitelist: 0,
    amount: 4000,
    walletPerCap: null,
  },
  {
    tier: 8,
    price: '0.0000882',
    whitelist: 0,
    amount: 4000,
    walletPerCap: null,
  },
  {
    tier: 9,
    price: '0.0000882',
    whitelist: 0,
    amount: 4000,
    walletPerCap: null,
  },
  {
    tier: 10,
    price: '0.0000882',
    whitelist: 0,
    amount: 4000,
    walletPerCap: null,
  },
  {
    tier: 11,
    price: '0.0000882',
    whitelist: 0,
    amount: 4000,
    walletPerCap: null,
  },
  {
    tier: 12,
    price: '0.0000882',
    whitelist: 0,
    amount: 4000,
    walletPerCap: null,
  },
];
