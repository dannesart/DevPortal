export const environment = {
  production: true,
  apiHost: 'https://api.peyya.io/v1',
  auth: {
    domain: 'dev-ibqj5g5m.us.auth0.com',
    clientId: '18KmUu5qurxczk50GaZ3eCxQy8zD5H5O',
    redirectUri: window.location.origin,
    // Request this audience at user authentication time
    audience: 'https://peyya.api',

    // Request this scope at user authentication time
    scope: 'read:current_user read:email',

    // Specify configuration for the interceptor
    httpInterceptor: {
      allowedList: [
        {
          // Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
          uri: 'https://api.peyya.io/v1/developer',
          tokenOptions: {
            // The attached token should target this audience
            audience: 'https://peyya.api',

            // The attached token should have these scopes
            scope: 'read:current_user read:email',
          },
        },
        {
          // Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
          uri: 'https://api.peyya.io/v1/developer/*',
          tokenOptions: {
            // The attached token should target this audience
            audience: 'https://peyya.api',

            // The attached token should have these scopes
            scope: 'read:current_user read:email',
          },
        }
      ],
    },
  },
};
