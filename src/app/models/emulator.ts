import { IDemo } from './demo';
export interface IEmulator {
  name: string;
  toggleApi: boolean;
  segment: IDemo; // Handle this so we can define specific segment in Peyya-application. egs. Create user, send money.
  config?: {
    clientsecret: string;
    clientid: string;
    name?: string;
    ApiHost?: string;
    ApiEndpoints?: { [key: string]: string };
  };
}
