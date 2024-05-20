import { environment } from 'src/environments/environment';
export const ApiHost = environment.apiHost;
export const ApiEndpoints = {
  developer: '/developer',
  wallet: '/wallet',
  payment: '/payment',
  transactions: "/transactions",
  banks: '/banks',
  application: '/developer/application',
  auth: '/authorize/phone',
  authValidate: '/authorize/phone/validate',
  user: '/users',
};
