const fs = require("fs");
const fsExtra = require("fs-extra");
const { render } = require("ejs");
const {
  CSS_FRAMEWORKS,
  REACT_THEME_FILE_PATHS,
  VUE_THEME_FILE_PATHS,
  ANGULAR_THEME_FILE_PATHS,
  CYPRESS_FILE_PATHS,
  JEST_FILE_PATHS,
  MOCHA_FILE_PATHS,
  NIGHTWATCH_FILE_PATHS,
  REACT_DOCKER_FILE_PATHS,
  REDUX_FILES_PATH,
  NGRX_FILE_PATHS,
  VUEX_FILE_PATHS,
  NGRX_CRUD_FILE_PATHS,
  ANGULAR_CRUD_NODE_FILE_PATHS,
  TAILWIND_CSS_FILE_PATHS,
  ANGULAR_DOCKER_FILE_PATHS,
  TAILWIND_REACT_FILE_PATHS,
  NETWORK_INFORMER_VUE_FILE_PATHS,
  REACT_NETWORKSTATUS_FILES_PATH,
  OKTA_DIRECTORY_PATH,
} = require("../TavaJsExecutors/constants");
//<-----------------------To create Directory Contents------------------------------------>
const createDirectoryContents = (
  templatePath,
  newProjectPath,
  newDefaultRoute,
  mongoSelected,
  sequelizeSelected,
  dbName,
  isSMTP,
  isSendgrid,
  isAmazonSes,
  isSentry,
  isWinston,
  isAuth0,
  isOkta,
  isCognito,
  isStore,
  isCrudWithNode,
  isCrud,
  frontEndName,
  nodeName,
  projectChoice,
  isThemeProvider,
  isMaterialUI,
  isBootstrap,
  isTailWind,
  currentDirectory,
  isJest,
  isCypress,
  isMocha,
  isNightWatch,
  blobServiceName,
  isNetworkInformer
) => {
  const CURR_DIR = currentDirectory;
  const filesToCreate = fs.readdirSync(templatePath);
  filesToCreate.forEach((file) => {
    if (file !== ".git") {
      const origFilePath = `${templatePath}/${file}`;
      // get stats about the current file
      const stats = fs.statSync(origFilePath);
      if (stats.isFile()) {
        let contents = fs.readFileSync(origFilePath, "utf8");

        const elements = newProjectPath.split("/");
        const NameProject = elements[elements.length - 1];

        contents = render(
          contents,
          {
            projectName: NameProject,
            defaultRoute: newDefaultRoute,
            mongoSelected,
            sequelizeSelected,
            dbName,
            isSMTP,
            isSendgrid,
            isAmazonSes,
            isSentry,
            isWinston,
            isAuth0,
            isOkta,
            isCognito,
            isStore,
            isCrudWithNode,
            isCrud,
            frontEndName,
            nodeName,
            projectChoice,
            isThemeProvider,
            isMaterialUI,
            isBootstrap,
            isTailWind,
            currentDirectory,
            isJest,
            isCypress,
            isMocha,
            isNightWatch,
            blobServiceName,
            isNetworkInformer,
          },
          (autoescape = false)
        );
        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, "utf8");
      } else if (stats.isDirectory()) {
        const isBootstrapFile = file === CSS_FRAMEWORKS.BOOTSTRAP;
        const isMaterialUIFile = file === CSS_FRAMEWORKS.MATERIAL;
        const isTailWindFile = file === CSS_FRAMEWORKS.TAILWIND;
        // recursive call
        let isRequiredFile;
        if (isBootstrap) {
          isRequiredFile = !(isTailWindFile || isMaterialUIFile);
        } else if (isMaterialUI) {
          isRequiredFile = !(isBootstrapFile || isTailWindFile);
        } else if (isTailWind) {
          isRequiredFile = !(isBootstrapFile || isMaterialUIFile);
        }
        if (isRequiredFile) {
          const newUpadtedProjectPath =
            isBootstrapFile || isMaterialUIFile || isTailWindFile
              ? `${newProjectPath}`
              : `${newProjectPath}/${file}`;

          fsExtra.ensureDirSync(`${CURR_DIR}/${newUpadtedProjectPath}`);
          createDirectoryContents(
            `${templatePath}/${file}`,
            `${newUpadtedProjectPath}`,
            newDefaultRoute,
            mongoSelected,
            sequelizeSelected,
            dbName,
            isSMTP,
            isSendgrid,
            isAmazonSes,
            isSentry,
            isWinston,
            isAuth0,
            isOkta,
            isCognito,
            isStore,
            isCrudWithNode,
            isCrud,
            frontEndName,
            nodeName,
            projectChoice,
            isThemeProvider,
            isMaterialUI,
            isBootstrap,
            isTailWind,
            currentDirectory,
            isJest,
            isCypress,
            isMocha,
            isNightWatch,
            blobServiceName,
            isNetworkInformer
          );
        }
      }
    }
  });
};

//to update package.json------------------------------------------------>
const updateProjectDependencies = (
  path,
  dependencies = [],
  devDependencies = []
) => {
  const packageJsonFile = fs.readFileSync(`${path}/package.json`, "utf-8");
  const packageJson = JSON.parse(packageJsonFile);
  dependencies?.forEach((each) => {
    packageJson.dependencies = {
      ...packageJson.dependencies,
      [each.name]: each.version,
    };
  });
  devDependencies?.forEach((each) => {
    packageJson.devDependencies = {
      ...packageJson.devDependencies,
      [each.name]: each.version,
    };
  });
  const newPackageJsonFile = JSON.stringify(packageJson);
  fs.writeFileSync(`${path}/package.json`, newPackageJsonFile, "utf-8");
};

// To update the scripts in Package.json
const updateProjectScripts = (path, updatedscripts) => {
  updatedscripts.forEach((each) => {
    const packageJsonFile = fs.readFileSync(`${path}/package.json`, "utf-8");
    const packageJson = JSON.parse(packageJsonFile);
    const updatedPackageJson = {
      ...packageJson,
      scripts: {
        ...packageJson.scripts,
        [each.name]: each.command,
      },
    };

    const newPackageJsonFile = JSON.stringify(updatedPackageJson);
    fs.writeFileSync(`${path}/package.json`, newPackageJsonFile, "utf-8");
  });
};

const copyFiles = (paths) => {
  paths.forEach((each) => {
    fsExtra.copy(each.source, each.destination, function (err) {
      if (err) {
        console.log("An error is occured");
        return console.error(err);
      }
    });
  });
};

const handleRenderEJS = (readFilePath, props, writeFilePath) => {
  let content = fs.readFileSync(readFilePath, "utf8");
  content = render(content, { ...props });
  fs.writeFileSync(writeFilePath, content, "utf8");
};

const getFilePaths = (name, srcDir, destDir) => {
  switch (name) {
    case REACT_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Providers/ThemeProviders/theme.constants.js`,
          destination: `${destDir}/src/theme.constants.js`,
          // isFile: true,
        },
      ];
    case VUE_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Providers/ThemeProviders/theme.constants.js`,
          destination: `${destDir}/src/theme.constants.js`,
          // isFile: true,
        },
      ];
    case ANGULAR_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Providers/ThemeProviders/angular-themes`,
          destination: `${destDir}/src/angular-themes`,
          // isFile: false,
        },
      ];
    case CYPRESS_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/CypressTests/TestScripts`,
          destination: `${destDir}`,
          // isFile: false,
        },
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/CypressTests/cypress.config.js`,
          destination: `${destDir}/cypress.config.js`,
          // isFile: true,
        },
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/CypressTests/cypress.constants.js`,
          destination: `${destDir}/cypress.constants.js`,
          // isFile: true,
        },
      ];
    case JEST_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/JestTests/jest.config.js`,
          destination: `${destDir}/jest.config.js`,
          // isFile: true,
        },
      ];
    case MOCHA_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/MochaTests/TestScripts`,
          destination: `${destDir}/tests/unit`,
          // isFile: false,
        },
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/MochaTests/.eslintrc.js`,
          destination: `${destDir}/.eslintrc.js`,
          // isFile: true,
        },
      ];
    case NIGHTWATCH_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/NightwatchTests/TestScripts`,
          destination: `${destDir}/tests/`,
          // isFile: false,
        },
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/NightwatchTests/nightwatch.conf.js`,
          destination: `${destDir}/nightwatch.conf.js`,
          // isFile: true,
        },
      ];
    case REACT_DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/react-docker/.dockerignore`,
          destination: `${destDir}/.dockerignore`,
          // isFile: true
        },
        {
          source: `${srcDir}/react-docker/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          // isFile: true
        },
      ];
    case ANGULAR_DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/angular-docker/.dockerignore`,
          destination: `${destDir}/.dockerignore`,
          // isFile: true
        },
        {
          source: `${srcDir}/angular-docker/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          // isFile: true
        },
      ];
    case REDUX_FILES_PATH:
      return [
        {
          source: `${srcDir}/StateManagement/reduxTemplates/demoUser/users.reducer.js`,
          destination: `${destDir}/src/screens/Users/users.reducer.js`,
          // isFile: true,
        },
        {
          source: `${srcDir}/StateManagement/reduxTemplates/demoUser/users.selectors.js`,
          destination: `${destDir}/src/screens/Users/users.selectors.js`,
          // isFile: true,
        },
        {
          source: `${srcDir}/StateManagement/reduxTemplates/createStore.js`,
          destination: `${destDir}/src/createStore.js`,
          // isFile: true,
        },
        {
          source: `${srcDir}/StateManagement/reduxTemplates/rootReducer.js`,
          destination: `${destDir}/src/rootReducer.js`,
          // isFile: true,
        },
        {
          source: `${srcDir}/StateManagement/reduxTemplates/infrastructure`,
          destination: `${destDir}/src/infrastructure`,
          // isFile: false,
        },
      ];
    case NGRX_FILE_PATHS:
      return [
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/reducers`,
          destination: `${destDir}/src/app/reducers`,
          // isFile: false,
        },
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/store`,
          destination: `${destDir}/src/app/utils/store`,
          // isFile: false,
        },
      ];
    case NGRX_CRUD_FILE_PATHS:
      return [
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.css`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.css`,
          // isFile: true,
        },
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.spec.ts`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.spec.ts`,
          // isFile: true, 
        },
      ];
    case VUEX_FILE_PATHS:
      return [
        {
          source: `${srcDir}/vuexTemplates/doAsync`,
          destination: `${destDir}/src/doAsync`,
          // isFile: false,
        },
        {
          source: `${srcDir}/vuexTemplates/httpMethod`,
          destination: `${destDir}/src/httpMethod`,
          // isFile: false,
        },
      ];
    case ANGULAR_CRUD_NODE_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Services/HttpServices/AngularServices/services`,
          destination: `${destDir}/src/app/shared/services`,
          // isFile: false,
        },
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.css`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.css`,
          // isFile: true,
        },
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.spec.ts`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.spec.ts`,
          // isFile: true, 
        },
      ];
    case TAILWIND_CSS_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/CSSFrameworks/TailwindCSSFramework/angular/tailwind.config.js`,
          destination: `${destDir}/tailwind.config.js`,
          // isFile: true,
        },
      ];
    case TAILWIND_REACT_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/CSSFrameworks/TailwindCSSFramework/react/tailwind.config.js`,
          destination: `${destDir}/tailwind.config.js`,
          // isFile: true,
        },
        {
          source: `${srcDir}/Frameworks/CSSFrameworks/TailwindCSSFramework/react/postcss.config.js`,
          destination: `${destDir}/postcss.config.js`,
          // isFile: true,
        },
      ];
    case OKTA_DIRECTORY_PATH:
      return [
        {
          source: `${srcDir}/Services/AuthenticationServices/authTemplates/oktaTemplate/`,
          destination: `${destDir}/src/oktaFiles`,
          // isFile: false,
        },
      ];
    case TAILWIND_VUE_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/CSSFrameworks/TailwindCSSFramework/vue/tailwind.config.js`,
          destination: `${destDir}/tailwind.config.js`,
          // isFile: true,
        },
        {
          source: `${srcDir}/Frameworks/CSSFrameworks/TailwindCSSFramework/vue/postcss.config.js`,
          destination: `${destDir}/postcss.config.js`,
          // isFile: true,
        },
      ]; 
    case NETWORK_INFORMER_VUE_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Services/NetworkInformerServices/vue/NetworkStatus`,
          destination: `${destDir}/src/networkStatus`,
          // isFile: false,
        },
      ]; 
    case REACT_NETWORKSTATUS_FILES_PATH:
      return [
        {
          source: `${srcDir}/Services/NetworkInformerServices/react/NetworkStatus.js`,
          destination: `${destDir}/src/components/NetworkStatus.js`,
          // isFile:true,
        },
      ];    
    default:
      return [];
  }
};

module.exports = {
  createDirectoryContents,
  updateProjectDependencies,
  updateProjectScripts,
  copyFiles,
  getFilePaths,
  handleRenderEJS
};
