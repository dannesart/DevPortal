export type WalletId = string;

export interface IWallet {
  id: WalletId;
  address: string;
  balance: number;
  description: string;
  displayAddress: string;
  iban: string;
  status: string;
}
