const FRAMEWORKS = {
  ANGULAR: "angular",
  REACT: "react",
  VUE: "vue",
};

const DATABASES = {
  POSTGRES: "postgres",
  MYSQL: "mysql",
  MONGOOSE: "mongoose"
}

const CSS_FRAMEWORKS = {
  BOOTSTRAP: "bootstrap",
  MATERIAL: "material",
  TAILWIND: "tailwind",
}

const AUTHENTICATIONS = {
  AUTH0: "Auth0",
  OKTA: "Okta",
  COGNITO: "Cognito",
};

const LOGGER_SERVICES = {
  WINSTON: "winston",
  SENTRY: "sentry",
}

const EMAIL_SERVICES = {
  SMTP: "smtp",
  SENDGRID: "sendgrid",
  AMAZON_SES: "amazon_ses",
}

const TESTCASE_FRAMEWORKS = {
  CYPRESS: "cypress",
  JEST: "jest",
  MOCHAJS: "mochaJS",
  NIGHTWATCHJS: "nightwatchJS",
}

const REDUX_FILES = [
  {
    srcFolder: "StateManagement/reduxTemplates/demoUser",
    srcFileName: "users.reducer.js",
    destFolder: "/src/screens/Users",
    destFileName: "users.reducer.js",
  },
  {
    srcFolder: "StateManagement/reduxTemplates/demoUser",
    srcFileName: "users.selectors.js",
    destFolder: "/src/screens/Users",
    destFileName: "users.selectors.js",
  },
  {
    srcFolder: "StateManagement/reduxTemplates",
    srcFileName: "createStore.js",
    destFolder: "/src",
    destFileName: "createStore.js",
  },
  {
    srcFolder: "StateManagement/reduxTemplates",
    srcFileName: "rootReducer.js",
    destFolder: "/src",
    destFileName: "rootReducer.js",
  },
];

const AUTH0_FILE_PATHS = [
  {
    srcFolder: "Environments/FrontendEnvironment",
    srcFileName: ".authEnv",
    destFileName: ".env",
  },
];

const COGNITO_FILE_PATHS = [
  {
    srcFolder: "Environments/FrontendEnvironment",
    srcFileName: ".cognitoEnv",
    destFileName: ".env",
  },
];

const OKTA_FILES_PATHS = [
  {
    srcFolder: "Environments/FrontendEnvironment",
    srcFileName: ".oktaEnv",
    destFileName: ".env",
  },
];

const REACT_THEME_FILE_PATHS = "reactThemeFilePaths";

const VUE_THEME_FILE_PATHS = "vueThemeFilePaths";

const ANGULAR_THEME_FILE_PATHS = "angularThemeFilePaths";

const CYPRESS_DIRECTORY_PATHS = "cypressDirectoryPaths";

const CYPRESS_FILE_PATHS = "cypressFilePaths";

const JEST_DIRECTORY_PATHS = "jestDirectoryPaths";

const JEST_FILE_PATHS = "jestFilePaths";

const MOCHA_DIRECTORY_PATHS = "mochaDirectoryPaths";

const MOCHA_FILE_PATHS = "mochaFilePaths";

const NIGHTWATCH_DIRECTORY_PATHS = "nightwatchDirectoryPaths";

const NIGHTWATCH_FILE_PATHS = "nightwatchFilePaths";

const DOCKER_FILE_PATHS = "dockerFilePaths";

const REACT_DOCKER_FILE_PATHS = "reactDockerFilePaths";

const NODE_JS_DOCKER_FILE_PATHS = "nodejsDockerFilePaths";

const NGRX_FILE_PATHS = "ngrxFilePaths";

const VUEX_FILE_PATHS = "vuexFilePaths";

const INFRASTRUCTURE_FILE_PATHS = "infrastructureFilePath";

const NGRX_CRUD_FILE_PATHS = "ngrxCrudFilePaths";

const ANGULAR_CRUD_NODE_FILE_PATHS = "angularCrudNodeFilePaths";

const TAILWIND_CSS_FILE_PATHS = "tailwindCssfilePaths";

const TAILWIND_VUE_FILE_PATHS="tailwindVuefilePaths";

const TAILWIND_REACT_FILE_PATHS = "reactTailwindCssfilePaths";

const NETWORK_INFORMER_VUE_FILE_PATHS = "vueNetworkInformerFilePaths"

const REACT_NETWORKSTATUS_FILES_PATH = "reactNetworkStatusFilePath";

module.exports = {
  ANGULAR_THEME_FILE_PATHS,
  AUTH0_FILE_PATHS,
  AUTHENTICATIONS,
  COGNITO_FILE_PATHS,
  CSS_FRAMEWORKS,
  CYPRESS_DIRECTORY_PATHS,
  CYPRESS_FILE_PATHS,
  JEST_DIRECTORY_PATHS,
  JEST_FILE_PATHS,
  MOCHA_DIRECTORY_PATHS,
  MOCHA_FILE_PATHS,
  NIGHTWATCH_DIRECTORY_PATHS,
  NIGHTWATCH_FILE_PATHS,
  FRAMEWORKS,
  NGRX_FILE_PATHS,
  OKTA_FILES_PATHS,
  REACT_THEME_FILE_PATHS,
  REDUX_FILES,
  VUE_THEME_FILE_PATHS,
  VUEX_FILE_PATHS,
  DOCKER_FILE_PATHS,
  REACT_DOCKER_FILE_PATHS,
  NODE_JS_DOCKER_FILE_PATHS,
  INFRASTRUCTURE_FILE_PATHS,
  DATABASES,
  NGRX_CRUD_FILE_PATHS,
  ANGULAR_CRUD_NODE_FILE_PATHS,
  TAILWIND_CSS_FILE_PATHS,
  TAILWIND_VUE_FILE_PATHS,
  TAILWIND_REACT_FILE_PATHS,
  LOGGER_SERVICES,
  EMAIL_SERVICES,
  TESTCASE_FRAMEWORKS,
  NETWORK_INFORMER_VUE_FILE_PATHS,
  REACT_NETWORKSTATUS_FILES_PATH
};
