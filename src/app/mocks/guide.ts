import {
  IGuide,
  IGuideSegment,
  IGuideComponent,
  GuideComponentTypes,
  IGuideConfig,
} from 'src/app/models/guide';
import {
  EmulatorCreateUserMock,
  EmulatorAuthUserMock,
  EmulatorPickBankMock,
  EmulatorWalletTransferMock,
  EmulatorPaymentMock,
  EmulatorSendMoneyMock,
  EmulatorKYCMock,
} from './emulator';
import {
  CodeConnectBankMock,
  CodeCreateUserMock,
  CodeAuthMock,
  CodeWalletTransferMock,
  CodePaymentMock,
  CodeGoodToKnowMock,
} from './code';

export const GuideCreateAccountCodeComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.code,
    config: CodeCreateUserMock(config),
  };
};

export const GuideGoodToKnowCodeComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.code,
    config: CodeGoodToKnowMock(config),
  };
};

export const GuideAuthCodeComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.code,
    config: CodeAuthMock(config),
  };
};

export const GuideAuthEmulatorComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.emulator,
    config: EmulatorAuthUserMock(config),
  };
};

export const GuideKYCEmulatorComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.emulator,
    config: EmulatorKYCMock(config)
  }
}

export const GuideCreateAccountEmulatorComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.emulator,
    config: EmulatorCreateUserMock(config),
  };
};

export const GuideWelcomeSegmentMock = (
  config: IGuideConfig
): IGuideSegment => {
  return {
    hideInNav: true,
    image: 'undraw_runner_start_x-0-uu.svg',
  };
};

export const GuideStartSegmentMock = (config: IGuideConfig): IGuideSegment => {
  return {
    headline: 'Getting started',
    text: `
      Hi and welcome to the API section of the portal. Here you will find demo's and code examples for all segments.
      If you have any trouble or want to provide with some improvements or new cool ideas. Please feel free to share them with us.
      We always strive to be better.
    `,
    hideInNav: false,
    
    components: [],
  };
};

export const GuideGoodToKnowImageSegmentMock = (
  config: IGuideConfig
): IGuideSegment => {
  return {
    hideInNav: true,
    image: 'undraw_engineering_team_a7n2.svg',
  };
};

export const GuideGoodToKnowSegmentMock = (
  config: IGuideConfig
): IGuideSegment => {
  return {
    headline: 'Good to know',
    text: `Before you start. This some of the most essentials we think you should know.
    In order to test, you should start by authenticate in the first step. Then you can try any example as you wish.
    Please keep in mind that the authorization is "live" and will acctually send you a code. So please type your phone correctly.
    \n
    Below you can see a word-list with common used words. These words have a type and a format.
    Some of them are required in all requests.
    `,
    hideInNav: false,
    components: [GuideGoodToKnowCodeComponent(config)],
  };
};

export const GuideAuthSegmentMock = (config: IGuideConfig): IGuideSegment => {
  return {
    headline: 'Authenticate by mobile',
    text: `
      Authenitcating a user will return a token, this token is needed in every request.
      The token includes your client id. And will only work for that application.
      If a user doesn´t exists, a new user will be created.
      Important to follow the format of "+nn nn nnnnnnn" Next step is to complete user account. See "complete new user"segment`,
    hideInNav: false,
    components: [
      GuideAuthCodeComponent(config),
      GuideAuthEmulatorComponent(config),
    ],
  };
};

export const GuideKYCSegmentMock = (
  config: IGuideConfig
): IGuideSegment => {
  return {
    headline: 'KYC',
    text: 'You need to complete your account to do any further actions. \n Complete your account by calling user endpoint with your {peyyaUserId}. In your body you need to pass {firstName} and {lastName}. You´ll always need your {authToken} in your headers. See example below.',
    hideInNav: false,
    components: [
      GuideCreateAccountCodeComponent(config),
      GuideKYCEmulatorComponent(config)
    ]
  }
}

export const GuideCompleteAccountSegmentMock = (
  config: IGuideConfig
): IGuideSegment => {
  return {
    headline: 'KYC',
    text: 'You need to complete your account to do any further actions. \n Complete your account by calling user endpoint with your {peyyaUserId}. In your body you need to pass {firstName} and {lastName}. You´ll always need your {authToken} in your headers. See example below.',
    hideInNav: false,
    components: [
      GuideCreateAccountCodeComponent(config),
      GuideCreateAccountEmulatorComponent(config),
    ],
  };
};

// Connect bank

export const GuideConnectBankCodeComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.code,
    config: CodeConnectBankMock(config),
  };
};

export const GuideConnectBankEmulatorComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.emulator,
    config: EmulatorPickBankMock(config),
  };
};

export const GuideConnectBankSegmentMock = (
  config: IGuideConfig
): IGuideSegment => {
  return {
    headline: 'Connect bank',
    text: `
      To be able to create seamless transactions. A user needs to be connected to a bank.
      Do this by fetching banks for your users country. In our demo, Sweden is the default.
      This should return a list of banks. Every bank contains a label, image, and id (bicFi).
      Then initiate the consent by passing the selected bank bicFi.
      This should return a selection of authorization options. The user must now pick an option.
    `,
    hideInNav: false,
    components: [
      GuideConnectBankCodeComponent(config),
      GuideConnectBankEmulatorComponent(config),
    ],
  };
};

// Wallet

export const GuideWalletCodeComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.code,
    config: CodeWalletTransferMock(config),
  };
};

export const GuideWalletEmulatorComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.emulator,
    config: EmulatorWalletTransferMock(config),
  };
};

export const GuideTransferBankSegmentMock = (
  config: IGuideConfig
): IGuideSegment => {
  return {
    headline: 'Top up wallet',
    text: 'Make a seamless transfer between your wallet and your bank. You will be able to setup rules.',
    hideInNav: false,
    components: [
      GuideWalletCodeComponent(config),
      GuideWalletEmulatorComponent(config),
    ],
  };
};

// Send money

export const GuideSendMoneyEmulatorComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.emulator,
    config: EmulatorSendMoneyMock(config),
  };
};

export const GuideSendMoneySegmentMock = (
  config: IGuideConfig
): IGuideSegment => {
  return {
    headline: 'Send money',
    text: 'Send money to a wallet or iban. First of all, pick your reciever. Is it a bank or another peyya user? Enter amount and wallet/iban number. Then send. It´s that simple',
    hideInNav: false,
    components: [GuideSendMoneyEmulatorComponent(config)],
  };
};

// Payment

export const GuidePaymentCodeComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.code,
    config: CodePaymentMock(config),
  };
};

export const GuidePaymentEmulatorComponent = (
  config: IGuideConfig
): IGuideComponent => {
  return {
    type: GuideComponentTypes.emulator,
    config: EmulatorPaymentMock(config),
  };
};

export const GuideCreatePaymentSegmentMock = (
  config: IGuideConfig
): IGuideSegment => {
  return {
    headline: 'Create payment',
    text: 'Create a payment with your wallet.',
    hideInNav: false,
    components: [
      GuidePaymentCodeComponent(config),
      GuidePaymentEmulatorComponent(config),
    ],
  };
};

export const GuideMock = (config: IGuideConfig): IGuide => {
  return {
    segments: [
      GuideStartSegmentMock(config),
      GuideWelcomeSegmentMock(config),
      GuideGoodToKnowSegmentMock(config),
      GuideGoodToKnowImageSegmentMock(config),
      GuideAuthSegmentMock(config),
      GuideKYCSegmentMock(config),
      GuideConnectBankSegmentMock(config),
      GuideTransferBankSegmentMock(config),
      GuideSendMoneySegmentMock(config),
      GuideCreatePaymentSegmentMock(config),
    ],
  };
};
