const DEPENDENCIES = {
  BOOTSTRAP: [
    { name: "bootstrap", version: "^4.6.0" },
    { name: "react-bootstrap", version: "^1.6.6" },
    { name: "react-datepicker", version: "^4.2.1" },
    { name: "@musicstory/react-bootstrap-table-next", version: "^1.0.5" },
    { name: "bootstrap-switch-button-react", version: "^1.2.0"},
  ],
  MATERIALUI: [
    { name: "@mui/material", version: "^5.10.2" },
    { name: "@mui/icons-material", version: "^5.10.3" },
    { name: "material-react-table", version: "^1.1.1"},
    { name: "@material-ui/core", version:"^4.12.4"},
    { name: "@emotion/react", version: "^11.10.0"},
    { name: "@emotion/styled", version: "^11.10.0"},
  ],
  TAILWINDVUE: [
    { name: "autoprefixer", version: "^9.8.8" },
    { name: "postcss", version: "^7.0.39" },
    { name: "tailwindcss", version: "npm:@tailwindcss/postcss7-compat@^2.2.17", }
  ],
  BOOTSTRAPVUE: [
    { name: "bootstrap", version: "^5.1.3" },
    { name: "bootstrap-vue-3", version: "^0.3.3" },
  ],
  TAILWINDCSS: [
    { name: "tailwindcss", version: "^3.1.8" }
  ],
  TAILWINDREACT:[
    { name: "tailwindcss", version: "^3.1.8" },
    { name: "autoprefixer", version: "^10.4.12" },
    { name: "postcss", version: "^8.4.16" },
    { name: "react-scripts", version: "^5.0.1" },
  ],
  ANGULARBOOTSTRAP: [
    { name: "bootstrap", version: "^5.2.1" }
  ],
  ANGULARMATERIALUI: [
    { name: "@angular/material", version: "^14.2.3" },
    { name: "@angular/cdk", version: "^14.2.3" }
  ],
  REACT: [
    { name: "@reduxjs/toolkit", version: "^1.8.5" },
    { name: "react-redux", version: "^7.2.4" },
  ],
  AUTH0_SPA: [{ name: "@auth0/auth0-spa-js", version: "^1.10.0" }],
  AUTH0_VUE: [{ name: "@auth0/auth0-vue", version: "^1.0.2" }],
  AUTH0_ANGULAR: [{ name: "@auth0/auth0-angular", version: "^1.10.1" }],
  OKTA_AUTH_JS: [{ name: "@okta/okta-auth-js", version: "^5.8.0" }],
  OKTA_REACT: [{ name: "@okta/okta-react", version: "^6.3.0" }],
  OKTA_ANGULAR: [{ name: "@okta/okta-angular", version: "5.1" }],
  OKTA_VUE: [{ name: "@okta/okta-vue", version: "5.4.0" }],
  COGNITO_REACT: [
    { name: "@aws-amplify/ui-react", version: "^3.5.4" },
    { name: "aws-amplify", version: "^4.3.36" },
  ], 
  COGNITO_VUE: [
    { name: "aws-amplify", version: "^4.3.36" },
    { name: "@aws-amplify/ui-vue", version: "^2.4.22" }],    
  COGNITO_ANGULAR: [
    { name: "aws-amplify", version: "^4.3.36" },
    { name: "@aws-amplify/ui-angular", version: "^2.4.22" },
  ],
};

const DEV_DEPENDENCIES = {
  CYPRESS: [{ name: "cypress", version: "^10.9.0" }],
  JEST_VUE: [
    { name: "@vue/cli-plugin-unit-jest", version: "^5.0.8" },
    { name: "@vue/test-utils", version: "^2.0.2" },
    { name: "@vue/vue3-jest", version: "^27.0.0" },
  ],
  JEST_REACT: [
    { name: "@testing-library/jest-dom", version: "^5.11.4" },
    { name: "@testing-library/react", version: "^11.1.0" },
    { name: "@testing-library/user-event", version: "^12.1.10" },
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
