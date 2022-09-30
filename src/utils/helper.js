const fs = require("fs");
const fsExtra = require("fs-extra");
const { render } = require("ejs");
const {
  CSS_FRAMEWORKS,
  REACT_THEME_FILE_PATHS,
  VUE_THEME_FILE_PATHS,
  ANGULAR_THEME_FILE_PATHS,
  CYPRESS_DIRECTORY_PATHS,
  CYPRESS_FILE_PATHS,
  JEST_DIRECTORY_PATHS,
  JEST_FILE_PATHS,
  MOCHA_DIRECTORY_PATHS,
  MOCHA_FILE_PATHS,
  NIGHTWATCH_DIRECTORY_PATHS,
  NIGHTWATCH_FILE_PATHS,
  DOCKER_FILE_PATHS,
  REACT_DOCKER_FILE_PATHS,
  NODE_JS_DOCKER_FILE_PATHS,
  NGRX_FILE_PATHS,
  VUEX_FILE_PATHS,
  INFRASTRUCTURE_FILE_PATHS,
  NGRX_CRUD_FILE_PATHS,
  ANGULAR_CRUD_NODE_FILE_PATHS,
  TAILWIND_CSS_FILE_PATHS,
  ANGULAR_DOCKER_FILE_PATHS,
  TAILWIND_REACT_FILE_PATHS,
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
  const CURR_DIR = currentDirectory || process.cwd();
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
        let isRequiredFile = true;
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
    if (each.isFile) {
      fs.copyFile(each.source, each.destination, (err) => {
        if (err) {
          console.log("Error Found:", err);
        }
      });
    } else {
      fsExtra.copy(each.source, each.destination, function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      });
    }
  });
};

const copyDirectories = (paths) => {
  paths.forEach((each) => {
    fsExtra.copy(each.source, each.destination, function (err) {
      if (err) {
        console.log("An error is occured");
        return console.error(err);
      }
    });
  });
};

const readFile = (path) => {
  return fs.readFileSync(path, "utf8");
};

const getFilePaths = (name, srcDir, destDir, backendDir) => {
  switch (name) {
    case REACT_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Providers/ThemeProviders/theme.constants.js`,
          destination: `${destDir}/src/theme.constants.js`,
          isFile: true,
        },
      ];
    case VUE_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Providers/ThemeProviders/vue-themes/theme.vue`,
          destination: `${destDir}/src/theme.vue`,
          isFile: true,
        },
        {
          source: `${srcDir}/Providers/ThemeProviders/theme.constants.js`,
          destination: `${destDir}/src/theme.constants.js`,
          isFile: true,
        },
      ];
    case ANGULAR_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Providers/ThemeProviders/angular-themes`,
          destination: `${destDir}/src/angular-themes`,
          isFile: false,
        },
      ];
    case CYPRESS_DIRECTORY_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/CypressTests/TestScripts`,
          destination: `${destDir}`,
          isFile: false,
        },
      ];
    case CYPRESS_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/CypressTests/cypress.config.js`,
          destination: `${destDir}/cypress.config.js`,
          isFile: true,
        },
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/CypressTests/cypress.constants.js`,
          destination: `${destDir}/cypress.constants.js`,
          isFile: true,
        },
      ];
    case JEST_DIRECTORY_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/JestTests/TestScripts`,
          destination: `${destDir}/__tests__`,
          isFile: false,
        },
      ];
    case JEST_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/JestTests/jest.config.js`,
          destination: `${destDir}/jest.config.js`,
          isFile: true,
        },
      ];
    case MOCHA_DIRECTORY_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/MochaTests/TestScripts`,
          destination: `${destDir}/tests/unit`,
          isFile: false,
        },
      ];
    case MOCHA_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/MochaTests/.eslintrc.js`,
          destination: `${destDir}/.eslintrc.js`,
          isFile: true,
        },
      ];
    case NIGHTWATCH_DIRECTORY_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/NightwatchTests/TestScripts`,
          destination: `${destDir}/tests/`,
          isFile: false,
        },
      ];
    case NIGHTWATCH_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/TestCasesFrameworks/NightwatchTests/nightwatch.conf.js`,
          destination: `${destDir}/nightwatch.conf.js`,
          isFile: true,
        },
      ];
    case DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/react-docker/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          isFile: false,
        },
      ];
    case REACT_DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/react-docker/.dockerignore`,
          destination: `${destDir}/.dockerignore`,
          isFile: false,
        },
        {
          source: `${srcDir}/react-docker/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          isFile: false,
        },
      ];
    case NODE_JS_DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          isFile: false,
        },
      ];
    case ANGULAR_DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/angular-docker/.dockerignore`,
          destination: `${destDir}/.dockerignore`,
          isFile: false,
        },
        {
          source: `${srcDir}/angular-docker/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          isFile: false,
        },
      ];
    case NGRX_FILE_PATHS:
      return [
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/reducers`,
          destination: `${destDir}/src/app/reducers`,
          isFile: false,
        },
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/store`,
          destination: `${destDir}/src/app/utils/store`,
          isFile: false,
        },
      ];
    case NGRX_CRUD_FILE_PATHS:
      return [
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.css`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.css`,
          isFile: true,
        },
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.spec.ts`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.spec.ts`,
          isFile: true,
        },
      ];
    case VUEX_FILE_PATHS:
      return [
        {
          source: `${srcDir}/StateManagement/vuexTemplates/doAsync`,
          destination: `${destDir}/src/doAsync`,
          isFile: false,
        },
        {
          source: `${srcDir}/StateManagement/vuexTemplates/httpMethod`,
          destination: `${destDir}/src/httpMethod`,
          isFile: false,
        },
      ];
    case INFRASTRUCTURE_FILE_PATHS:
      return [
        {
          source: `${srcDir}/StateManagement/reduxTemplates/infrastructure`,
          destination: `${destDir}/src/infrastructure`,
          isFile: false,
        },
      ];
    case ANGULAR_CRUD_NODE_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Services/HttpServices/AngularServices/services`,
          destination: `${destDir}/src/app/shared/services`,
          isFile: false,
        },
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.css`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.css`,
          isFile: true,
        },
        {
          source: `${srcDir}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.spec.ts`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.spec.ts`,
          isFile: true,
        },
      ];
    case TAILWIND_CSS_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/FrontendFrameworks/TailwindFrameworks/angular/tailwind.config.js`,
          destination: `${destDir}/tailwind.config.js`,
          isFile: true,
        },
      ];
    case TAILWIND_REACT_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Frameworks/FrontendFrameworks/TailwindFrameworks/react/tailwind.config.js`,
          destination: `${destDir}/tailwind.config.js`,
          isFile: true,
        },
        {
          source: `${srcDir}/Frameworks/FrontendFrameworks/TailwindFrameworks/react/postcss.config.js`,
          destination: `${destDir}/postcss.config.js`,
          isFile: true,
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
  copyDirectories,
  copyFiles,
  getFilePaths,
  readFile,
};
