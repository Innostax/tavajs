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
  TAILWIND_VUE_FILE_PATHS,
  ANGULAR_DOCKER_FILE_PATHS,
} = require("../constants");
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
  isTailwindCSS,
  blobServiceName
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
            isTailwindCSS,
            blobServiceName,
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
            isBootstrapFile || isTailWindFile || isMaterialUIFile
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
            isTailwindCSS,
            blobServiceName
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
          source: `${srcDir}/themeProviderTemplates/react-themes/theme.js`,
          destination: `${destDir}/src/theme.js`,
          isfile: true,
        },
        {
          source: `${srcDir}/themeProviderTemplates/theme.constants.js`,
          destination: `${destDir}/src/theme.constants.js`,
          isfile: true,
        },
      ];
    case VUE_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/themeProviderTemplates/vue-themes/theme.vue`,
          destination: `${destDir}/src/theme.vue`,
          isfile: true,
        },
        {
          source: `${srcDir}/themeProviderTemplates/theme.constants.js`,
          destination: `${destDir}/src/theme.constants.js`,
          isfile: true,
        },
      ];
    case ANGULAR_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/themeProviderTemplates/angular-themes`,
          destination: `${destDir}/src/angular-themes`,
          isfile: false,
        },
      ];
    case CYPRESS_DIRECTORY_PATHS:
      return [
        {
          source: `${srcDir}/uiTests/CypressTests/TestScripts`,
          destination: `${destDir}`,
          isfile: false,
        },
      ];
    case CYPRESS_FILE_PATHS:
      return [
        {
          source: `${srcDir}/uiTests/CypressTests/cypress.config.js`,
          destination: `${destDir}/cypress.config.js`,
          isfile: true,
        },
        {
          source: `${srcDir}/uiTests/CypressTests/cypress.constants.js`,
          destination: `${destDir}/cypress.constants.js`,
          isfile: true,
        },
      ];
    case JEST_DIRECTORY_PATHS:
      return [
        {
          source: `${srcDir}/uiTests/JestTests/TestScripts`,
          destination: `${destDir}/__tests__`,
          isfile: false,
        },
      ];
    case JEST_FILE_PATHS:
      return [
        {
          source: `${srcDir}/uiTests/JestTests/jest.config.js`,
          destination: `${destDir}/jest.config.js`,
          isfile: true,
        },
      ];
    case MOCHA_DIRECTORY_PATHS:
      return [
        {
          source: `${srcDir}/uiTests/MochaTests/TestScripts`,
          destination: `${destDir}/tests/unit`,
          isfile: false,
        },
      ];
    case MOCHA_FILE_PATHS:
      return [
        {
          source: `${srcDir}/uiTests/MochaTests/.eslintrc.js`,
          destination: `${destDir}/.eslintrc.js`,
          isfile: true,
        },
      ];
    case NIGHTWATCH_DIRECTORY_PATHS:
      return [
        {
          source: `${srcDir}/uiTests/NightwatchTests/TestScripts`,
          destination: `${destDir}/tests/`,
          isfile: false,
        },
      ];
    case NIGHTWATCH_FILE_PATHS:
      return [
        {
          source: `${srcDir}/uiTests/NightwatchTests/nightwatch.conf.js`,
          destination: `${destDir}/nightwatch.conf.js`,
          isfile: true,
        },
      ];
    case DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/react-docker/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          isfile: false,
        },
      ];
    case REACT_DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/react-docker/.dockerignore`,
          destination: `${destDir}/.dockerignore`,
          isfile: false
        },
        {
          source: `${srcDir}/react-docker/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          isfile: false
        },
      ]
    case NODE_JS_DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          isfile: false,
        },
      ];
    case ANGULAR_DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/angular-docker/.dockerignore`,
          destination: `${destDir}/.dockerignore`,
          isfile: false
        },
        {
          source: `${srcDir}/angular-docker/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          isfile: false
        },
      ]
    case NGRX_FILE_PATHS:
      return [
        {
          source: `${srcDir}/ngrxTemplates/reducers`,
          destination: `${destDir}/src/app/reducers`,
          isfile: false,
        },
        {
          source: `${srcDir}/ngrxTemplates/store`,
          destination: `${destDir}/src/app/utils/store`,
          isfile: false,
        },
      ];
    case NGRX_CRUD_FILE_PATHS:
      return [
        {
          source: `${srcDir}/ngrxTemplates/user-actions-modal/user-actions-modal.component.css`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.css`,
          isfile: true,
        },
        {
          source: `${srcDir}/ngrxTemplates/user-actions-modal/user-actions-modal.component.spec.ts`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.spec.ts`,
          isfile: true, 
        },
        {
          source: `${srcDir}/ngrxTemplates/user-actions-modal/user-actions-modal.component.ts`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.ts`,
          isfile: true,
        }
      ];
    case VUEX_FILE_PATHS:
      return [
        {
          source: `${srcDir}/vuexTemplates/doAsync`,
          destination: `${destDir}/src/doAsync`,
          isfile: false,
        },
        {
          source: `${srcDir}/vuexTemplates/httpMethod`,
          destination: `${destDir}/src/httpMethod`,
          isfile: false,
        },
      ];
    case INFRASTRUCTURE_FILE_PATHS:
      return [
        {
          source: `${srcDir}/reduxTemplates/infrastructure`,
          destination: `${destDir}/src/infrastructure`,
          isfile: false,
        },
      ];
    case ANGULAR_CRUD_NODE_FILE_PATHS:
      return [
        {
          source: `${srcDir}/angularApiTemplates/services`,
          destination: `${destDir}/src/app/shared/services`,
          isFile: false,
        },
        {
          source: `${srcDir}/angularApiTemplates/user-actions-modal/user-actions-modal.component.css`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.css`,
          isfile: true,
        },
        {
          source: `${srcDir}/angularApiTemplates/user-actions-modal/user-actions-modal.component.spec.ts`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.spec.ts`,
          isfile: true, 
        },
        {
          source: `${srcDir}/angularApiTemplates/user-actions-modal/user-actions-modal.component.ts`,
          destination: `${destDir}/src/app/shared/components/user-actions-modal/user-actions-modal.component.ts`,
          isfile: true,
        }
      ];
    case TAILWIND_CSS_FILE_PATHS: 
      return [
        {
          source: `${srcDir}/tailwindCssTemplates/angular/tailwind.config.js`,
          destination: `${destDir}/tailwind.config.js`,
          isFile: true,
        },
      ] ;
      case TAILWIND_VUE_FILE_PATHS:
        return[
          {
            source: `${srcDir}/tailwindCssTemplates/vue/tailwind.config.js`,
            destination: `${destDir}/tailwind.config.js`,
            isFile: true,
          },
          {
            source: `${srcDir}/tailwindCssTemplates/vue/postcss.config.js`,
            destination: `${destDir}/postcss.config.js`,
            isFile: true,
          },

        ]  
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
