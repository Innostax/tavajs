// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  <% if(isOkta){ %>
  ANGULAR_APP_API_URL: 'Backend API URL',
  ANGULAR_APP_OKTA_ISSUER: 'https://{yourOktaDomain}/oauth2/default',
  ANGULAR_APP_OKTA_CLIENT_ID: '{clientId}',
  <% } %>
  <% if(isAuth0) { %>
  AUTH0_YOUR_DOMAIN: 'YOUR DOMAIN',
  AUTH0_CLIENT_ID: 'YOUR CLIENT ID',
  <% } %>
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
