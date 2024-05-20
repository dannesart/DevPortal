import { CodeStyles, CodeTypes, ICode } from 'src/app/models/code';
import { IGuideConfig } from 'src/app/models/guide';

export const CodeGoodToKnowMock = (config: IGuideConfig): ICode => {
  return {
    type: CodeTypes.ts,
    style: CodeStyles.default,
    snippet: `
      /** @type string - Name of the user */
      {firstName}
      /** @type string - Lastname of the user */
      {lastName}
      /** @type string - Unique identifier for each peyya user */
      {peyyaUserId}
      /** @type string - Bearer token. Needed for all (except authorization) endpoints. */
      {authToken}
    `,
  };
};

export const CodeMock = (config: IGuideConfig): ICode => {
  return {
    type: CodeTypes.ts,
    style: CodeStyles.default,
    snippet: `
      const config = {
        clientid: "${config.clientid}"
      }
    `,
  };
};

export const CodeAuthMock = (config: IGuideConfig): ICode => {
  return {
    type: CodeTypes.ts,
    style: CodeStyles.default,
    snippet: `

      //# - Step 1
      // Initate authorization by passing clientid in the headers
      // And phoneNumber in the body. Important with the format.
      const url = "${config.ApiHost}${config.ApiEndpoints?.['auth']}";

      ${ config.use_credentials ? `const config = {
        clientid: "${config.clientid}",
        clientsecret: "${config.clientsecret}"
      }` : `const validationConfig = {
        clientid: "${config.clientid}"
      }` }

      const body = {
        phoneNumber: "+nn nn nnnnnnn"
      }

      const headers = { ...config }

      axios.post(url, data, headers).then((response) => { ... })

      //# - Step 2. 
      // If step 1 was successful. Go ahead and do the next call.
      // Once the user gets a sms with a code.
      // You need to do a new request to the validation endpoint.
      // Same headers. But this time you need to add the otp in the body together with phoneNumber.

      const validationUrl = "${config.ApiHost}${config.ApiEndpoints?.['authValidate']}";

      ${ config.use_credentials ? `const validationConfig = {
        clientid: "${config.clientid}",
        clientsecret: "${config.clientsecret}"
      }` : `const validationConfig = {
        clientid: "${config.clientid}"
      }` }

      const validationBody = {
        phoneNumber: "+nn nn nnnnnnn",
        otp: "xxxxxx"
      }

      const validationHeaders = { ...validationConfig }

      axios.post(validationUrl, validationBody, validationHeaders).then((response) => { ... })

      // IF everything is successful you'll get an accesstoken object.

    `,
  };
};

export const CodeCreateUserMock = (config: IGuideConfig): ICode => {
  return {
    type: CodeTypes.ts,
    style: CodeStyles.default,
    snippet: `

      const url = "${config.ApiHost}${config.ApiEndpoints?.['user']}/:peyyaUserId";

      const config = {
        authorization: "Bearer ... "
      }

      const body = {
        firstName: {firstName},
        lastName: {lastName},
      }

      const headers = { ...config }

      axios.patch(url, data, headers).then((response) => { ... })

    `,
  };
};

export const CodeConnectBankMock = (config: IGuideConfig): ICode => {
  return {
    type: CodeTypes.ts,
    style: CodeStyles.default,
    snippet: `
      /**
      * Step 1 - Get banks for your country.
      */

      const url = "${config.ApiHost}${config.ApiEndpoints?.['banks']}?isoCountry={CountryCode}";

      const headers = { authorization: {authToken} }
      axios.get(url, headers).then((response) => { ... });

      /**
      * Step 2 - Init consent with your pick of bank
      */

      const url = "${config.ApiHost}${config.ApiEndpoints?.['banks']}/consent/init";
      const data = { bicFi: {bicFi} }
      const headers = { authorization: {authToken} }
      axios.post(url, data, headers).then((response) => { ... });

      /**
      * Step 3 - Authorize with your choice of provider
      */

      const url = "${config.ApiHost}${config.ApiEndpoints?.['banks']}/consent/auth";

      const headers = { authorization: {authToken} }
      const body = { 
        authMethodId: {authenticationMethodId},
        consentAuthId: {authorisationId},
        bicFi: {bicFi}, 
        consentId: {consentId} 
      }
      axios.post(url, body, headers).then((response) => { ... });

      /**
      * Step 4 - Get status
      */

      const url = "${config.ApiHost}${config.ApiEndpoints?.['banks']}/consent/status";

      const headers = { authorization: {authToken} }
      const body = { bicFi: {bicFi}, consentId: {consentId} }
      axios.get(url, body, headers).then((response) => { ... });


      `,
  };
};

export const CodeWalletTransferMock = (config: IGuideConfig): ICode => {
  return {
    type: CodeTypes.ts,
    style: CodeStyles.default,
    snippet: `
      /**
      * Step 1 - Get connected accounts
      */

      const url = "${config.ApiHost}${config.ApiEndpoints?.['banks']}/accounts";

      const headers = { ...authToken, ...config }
      axios.get(url, {}, headers).then((response) => { ... });

      /**
      * Step 2 - Get wallet
      */

      const url = "${config.ApiHost}${config.ApiEndpoints?.['wallet']}";

      const headers = { ...authToken, ...config }
      axios.get(url, {}, headers).then((response) => { ... });

      /**
      * Step 3 - Do a transfer
      */

      const url = "${config.ApiHost}${config.ApiEndpoints?.['wallet']}/transfer";

      const headers = { ...authToken, ...config, walletId }
      const body = { amount: 10.00 }
      axios.post(url, body, headers).then((response) => { ... });

      `,
  };
};

export const CodePaymentMock = (config: IGuideConfig): ICode => {
  return {
    type: CodeTypes.ts,
    style: CodeStyles.default,
    snippet: `

      /**
      * Step 1 - Get wallet
      */

      const url = "${config.ApiHost}${config.ApiEndpoints?.['wallet']}";

      const headers = { ...authToken, ...config }
      axios.get(url, {}, headers).then((response) => { ... });

      /**
      * Step 2 - Initiate payment
      */

      const url = "${config.ApiHost}${config.ApiEndpoints?.['payment']}/init";

      const headers = { ...authToken, ...config, walletId }
      const body = {
        amount: 10.00,
        target: {walletId | iban },
        paymentType: {paymentType}
      }
      axios.post(url, body, headers).then((response) => { ... });

      `,
  };
};
