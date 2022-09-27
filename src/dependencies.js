const DEPENDENCIES = {
  BOOTSTRAP: [
    { name: "bootstrap", version: "^4.6.0" },
    { name: "react-bootstrap", version: "^1.6.6" },
    { name: "react-datepicker", version: "^4.2.1" },
    { name: "@musicstory/react-bootstrap-table-next", version: "^1.0.5" },
  ],
  MATERIALUI: [
    { name: "@mui/material", version: "^5.10.2" },
    { name: "@mui/icons-material", version: "^5.10.3" },
  ],
  TAILWINDCSS: [
    { name: "tailwindcss", version: "^3.1.8" }
  ],
  ANGULARBOOTSTRAP: [
    { name: "bootstrap", version: "^5.2.1" }
  ],
  REACT: [
    { name: "@reduxjs/toolkit", version: "^1.6.1" },
    { name: "react-redux", version: "^7.2.4" },
  ],
  AUTH0_SPA: [{ name: "@auth0/auth0-spa-js", version: "^1.10.0" }],
  AUTH0_VUE: [{ name: "@auth0/auth0-vue", version: "^1.0.2" }],
  AUTH0_ANGULAR: [{ name: "@auth0/auth0-angular", version: "^1.10.1" }],
  OKTA_AUTH_JS: [{ name: "@okta/okta-auth-js", version: "^5.8.0" }],
  OKTA_REACT: [{ name: "@okta/okta-react", version: "^6.3.0" }],
  OKTA_ANGULAR: [{ name: "@okta/okta-angular", version: "5.1" }],
  OKTA_VUE: [{ name: "@okta/okta-vue", version: "5.4.0" }],
  COGNITO_ANGULAR: [
    { name: "@aws-amplify/cli", version: "^10.0.0" },
    { name: "@aws-amplify/ui-angular", version: "^2.4.22" },
  ],
};

const DEV_DEPENDENCIES = {
  CYPRESS: [{ name: "cypress", version: "^10.7.0" }],
  JEST: [
    { name: "@vue/cli-plugin-unit-jest", version: "^5.0.8" },
    { name: "@vue/test-utils", version: "^2.0.2" },
    { name: "@vue/vue3-jest", version: "^27.0.0" },
  ],
  MOCHA: [
    { name: "@vue/cli-plugin-unit-mocha", version: "~5.0.0" },
    { name: "@vue/test-utils", version: "^2.0.0-0" },
    { name: "chai", version: "^4.2.0" },
  ],
  NIGHTWATCH: [
    { name: "nightwatch", version: "^2.3.7" },
    { name: "chromedriver", version: "^105.0.1" },
  ],
}

module.exports = {
  DEPENDENCIES,
  DEV_DEPENDENCIES,
};
