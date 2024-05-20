// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiHost: 'http://localhost:5002/v1',
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
          uri: 'http://localhost:5002/v1/developer',
          tokenOptions: {
            // The attached token should target this audience
            audience: 'https://peyya.api',
            // The attached token should have these scopes
            scope: 'read:current_user read:email',
          },
        },
        {
          // Match any request that starts 'https://YOUR_DOMAIN/api/v2/' (note the asterisk)
          uri: 'http://localhost:5002/v1/developer/*',
          tokenOptions: {
            // The attached token should target this audience
            audience: 'https://peyya.api',
            // The attached token should have these scopes
            scope: 'read:current_user read:email',
          },
        },
      ],
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
