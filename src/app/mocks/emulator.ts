import { IGuideConfig } from 'src/app/models/guide';
import { IEmulator } from 'src/app/models/emulator';
import { Demos } from './demo';

export const EmulatorKYCMock = (config: IGuideConfig): IEmulator => {
  return {
    name: 'KYC',
    toggleApi: true,
    segment: {
      name: Demos.kyc,
      authRequired: true
    },
    config
  }
}

export const EmulatorCreateUserMock = (config: IGuideConfig): IEmulator => {
  return {
    name: 'Update new user',
    toggleApi: true,
    segment: {
      name: Demos.createUser,
      authRequired: true,
    },
    config,
  };
};

export const EmulatorAuthUserMock = (config: IGuideConfig): IEmulator => {
  return {
    name: 'Authenticate user',
    toggleApi: true,
    segment: {
      name: Demos.auth,
      authRequired: false,
    },
    config,
  };
};

export const EmulatorPickBankMock = (config: IGuideConfig): IEmulator => {
  return {
    name: 'Pick bank',
    toggleApi: true,
    segment: { name: Demos.banks, authRequired: true },
    config,
  };
};

export const EmulatorWalletTransferMock = (config: IGuideConfig): IEmulator => {
  return {
    name: 'Wallet transfer',
    toggleApi: true,
    segment: { name: Demos.wallet, authRequired: true },
    config,
  };
};

export const EmulatorPaymentMock = (config: IGuideConfig): IEmulator => {
  return {
    name: 'Payment',
    toggleApi: true,
    segment: { name: Demos.payment, authRequired: true },
    config,
  };
};

export const EmulatorSendMoneyMock = (config: IGuideConfig): IEmulator => {
  return {
    name: 'Send money',
    toggleApi: true,
    segment: { name: Demos.sendmoney, authRequired: true },
    config,
  };
};
