import { Demos } from '../mocks/demo';

export interface IDemo {
  name: Demos;
  authRequired: boolean;
}

export interface IDemoCurrency {
  symbol: string;
  code: string;
}
