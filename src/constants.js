const FRAMEWORKS = {
  ANGULAR: "angular",
  REACT: "react",
  VUE: "vue",
};

const CSS_FRAMEWORKS = {
  BOOTSTRAP: "bootstrap",
  MATERIAL: "material"
}

const AUTHENTICATIONS = {
  AUTH0: "Auth0",
  OKTA: "Okta",
  COGNITO: "Cognito",
};

const REDUX_FILES = [
  {
    srcFolder: "reduxTemplates/demoUser",
    srcFileName: "users.reducer.js",
    destFolder: "/src/screens/Users",
    destFileName: "users.reducer.js",
  },
  {
    srcFolder: "reduxTemplates/demoUser",
    srcFileName: "users.selectors.js",
    destFolder: "/src/screens/Users",
    destFileName: "users.selectors.js",
  },
  {
    srcFolder: "reduxTemplates",
    srcFileName: "createStore.js",
    destFolder: "/src",
    destFileName: "createStore.js",
  },
  {
    srcFolder: "reduxTemplates",
    srcFileName: "rootReducer.js",
    destFolder: "/src",
    destFileName: "rootReducer.js",
  },
];

const AUTH0_FILE_PATHS = [
  {
    srcFolder: "envTemplates",
    srcFileName: ".authEnv",
    destFileName: ".env",
  },
];

const COGNITO_FILE_PATHS = [
  {
    srcFolder: "envTemplates",
    srcFileName: ".cognitoEnv",
    destFolder: "/src",
    destFileName: ".env",
  },
];

const OKTA_FILES_PATHS = [
  {
    srcFolder: "envTemplates",
    srcFileName: ".oktaEnv",
    destFileName: ".env",
  },
];

const REACT_THEME_FILE_PATHS = "reactThemeFilePaths";

const VUE_THEME_FILE_PATHS = "vueThemeFilePaths";

const ANGULAR_THEME_FILE_PATHS = "angularThemeFilePaths";

const CYPRESS_DIRECTORY_PATHS = "cypressDirectoryPaths";

const CYPRESS_FILE_PATHS = "cypressFilePaths";

const DOCKER_FILE_PATHS = "dockerFilePaths";

const REACT_DOCKER_FILE_PATHS = "reactDockerFilePaths";

const NODE_JS_DOCKER_FILE_PATHS = "nodejsDockerFilePaths";

module.exports = {
  ANGULAR_THEME_FILE_PATHS,
  AUTH0_FILE_PATHS,
  AUTHENTICATIONS,
  COGNITO_FILE_PATHS,
  CSS_FRAMEWORKS,
  CYPRESS_DIRECTORY_PATHS,
  CYPRESS_FILE_PATHS,
  FRAMEWORKS,
  OKTA_FILES_PATHS,
  REACT_THEME_FILE_PATHS,
  REDUX_FILES,
  VUE_THEME_FILE_PATHS,
  DOCKER_FILE_PATHS,
  REACT_DOCKER_FILE_PATHS,
  NODE_JS_DOCKER_FILE_PATHS,
};
