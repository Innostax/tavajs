const FRAMEWORKS = {
    ANGULAR: "angular",
    REACT: "react",
    VUE: "vue",
};
const DATABASES = {
    POSTGRES: "postgres",
    MYSQL: "mysql",
    MONGOOSE: "mongoose",
};
const CSS_FRAMEWORKS = {
    BOOTSTRAP: "bootstrap",
    MATERIAL: "material",
    TAILWIND: "tailwind",
};
const AUTHENTICATIONS = {
    AUTH0: "Auth0",
    OKTA: "Okta",
    COGNITO: "Cognito",
};
const LOGGER_SERVICES = {
    WINSTON: "winston",
    SENTRY: "sentry",
};
const EMAIL_SERVICES = {
    SMTP: "smtp",
    SENDGRID: "sendgrid",
    AMAZON_SES: "amazon_ses",
};
const TESTCASE_FRAMEWORKS = {
    CYPRESS: "cypress",
    JEST: "jest",
    MOCHAJS: "mochaJS",
    NIGHTWATCHJS: "nightwatchJS",
};
const BLOB_SERVICES = {
    AWS_S3: "aws-s3",
    AZURE: "azure"
};
const PACKAGE_MANAGERS = {
    NPM: "npm",
    YARN: "yarn"
};

const OKTA_FILE_PATH = "oktaFilePath";
const REACT_THEME_FILE_PATH = "reactThemeFilePath";
const ANGULAR_THEME_FILE_PATH = "angularThemeFilePath";
const ANGULAR_MATERIAL_FILE_PATH = "angularMaterialFilePath";
const VUE_THEME_FILE_PATH = "vueThemeFilePath";
const CYPRESS_FILE_PATH = "cypressFilePath";
const JEST_FILE_PATH = "jestFilePath";
const MOCHA_FILE_PATH = "mochaFilePath";
const NIGHTWATCH_FILE_PATH = "nightwatchFilePath";
const REACT_DOCKER_FILE_PATH = "reactDockerFilePath";
const ANGULAR_DOCKER_FILE_PATH = "angularDockerFilePath";
const VUE_DOCKER_FILE_PATH = "vueDockerFilePath";
const REDUX_FILE_PATH = "reduxFilePath";
const NGRX_FILE_PATH = "ngrxFilePath";
const VUEX_FILE_PATH = "vuexFilePath";
const VUEX_NODE_FILE_PATH = "vuexNodeFilePath";
const VUEX_USERMODAL_FILE_PATH = "vuexUserModalFilePath";
const NGRX_CRUD_FILE_PATH = "ngrxCrudFilePath";
const ANGULAR_CRUD_NODE_FILE_PATH = "angularCrudNodeFilePath";
const TAILWIND_REACT_FILE_PATH = "tailwindReactFilePath";
const TAILWIND_ANGULAR_FILE_PATH = "tailwindAngularFilePath";
const TAILWIND_VUE_FILE_PATH = "tailwindVuefilePath";
const VUE_NETWORKSTATUS_FILE_PATH = "vueNetworkStatusFilePath";
const REACT_NETWORKSTATUS_FILE_PATH = "reactNetworkStatusFilePath";

module.exports = {
    FRAMEWORKS,
    CSS_FRAMEWORKS,
    TESTCASE_FRAMEWORKS,
    DATABASES,
    AUTHENTICATIONS,
    LOGGER_SERVICES,
    EMAIL_SERVICES,
    OKTA_FILE_PATH,
    REACT_THEME_FILE_PATH,
    ANGULAR_THEME_FILE_PATH,
    VUE_THEME_FILE_PATH,
    CYPRESS_FILE_PATH,
    JEST_FILE_PATH,
    MOCHA_FILE_PATH,
    NIGHTWATCH_FILE_PATH,
    REACT_DOCKER_FILE_PATH,
    ANGULAR_DOCKER_FILE_PATH,
    VUE_DOCKER_FILE_PATH,
    REDUX_FILE_PATH,
    NGRX_FILE_PATH,
    VUEX_FILE_PATH,
    VUEX_NODE_FILE_PATH,
    VUEX_USERMODAL_FILE_PATH,
    NGRX_CRUD_FILE_PATH,
    ANGULAR_CRUD_NODE_FILE_PATH,
    TAILWIND_REACT_FILE_PATH,
    TAILWIND_ANGULAR_FILE_PATH,
    TAILWIND_VUE_FILE_PATH,
    VUE_NETWORKSTATUS_FILE_PATH,
    REACT_NETWORKSTATUS_FILE_PATH,
    BLOB_SERVICES,
    ANGULAR_MATERIAL_FILE_PATH,
    PACKAGE_MANAGERS
};
