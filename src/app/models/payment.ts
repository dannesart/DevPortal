import { WalletId } from './wallet';

export interface IPaymentAmount {
  currency: string;
  amount: number;
  keyCurrency: boolean;
}

export interface IPaymentItem {
  name: string;
  address: string;
  id: string;
  amount: Array<IPaymentAmount>;
}

export enum PaymentStatus {
  pending = 'pending',
  completed = 'completed',
  failed = 'failed',
  canceled = 'canceled',
}

export type PaymentId = string;

export interface IPayment {
  id: PaymentId;
  items: Array<IPaymentItem>;
  totals: Array<IPaymentAmount>;
  from: WalletId;
  target: WalletId | string;
  date: Date;
  status: PaymentStatus;
}
