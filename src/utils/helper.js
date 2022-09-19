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
  DOCKER_FILE_PATHS,
  REACT_DOCKER_FILE_PATHS,
  NODE_JS_DOCKER_FILE_PATHS,
  NGRX_FILE_PATHS,
  VUEX_FILE_PATHS,
  INFRASTRUCTURE_FILE_PATHS,
  NGRX_CRUD_FILE_PATHS,
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
  currentDirectory
) => {
  const CURR_DIR = currentDirectory ? currentDirectory : process.cwd();
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
          },
          (autoescape = false)
        );
        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, "utf8");
      } else if (stats.isDirectory()) {
        const isBootstrapFile = file === CSS_FRAMEWORKS.BOOTSTRAP;
        const isMaterialUIFile = file === CSS_FRAMEWORKS.MATERIAL;
        // recursive call
        const isRequiedFile = isMaterialUI
          ? !isBootstrapFile
          : !isMaterialUIFile;

        if (isRequiedFile) {
          const newUpadtedProjectPath =
            isBootstrapFile || isMaterialUIFile
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
            currentDirectory
          );
        }
      }
    }
  });
};

//to update package.json------------------------------------------------>
const updateProjectDependencies = (path, dependencies) => {
  dependencies.forEach((each) => {
    const packageJsonFile = fs.readFileSync(`${path}/package.json`, "utf-8");
    const packageJson = JSON.parse(packageJsonFile);
    const updatedPackageJson = {
      ...packageJson,
      dependencies: {
        ...packageJson.dependencies,
        [each.name]: each.version,
      },
    };

    const newPackageJsonFile = JSON.stringify(updatedPackageJson);
    fs.writeFileSync(`${path}/package.json`, newPackageJsonFile, "utf-8");
  });
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
      ];
    case DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/dockerTemplate/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          isfile: false,
        },
        {
          source: `${srcDir}/dockerTemplate/Dockerfile`,
          destination: `${backendDir}/Dockerfile`,
          isfile: false,
        },
      ];
    case REACT_DOCKER_FILE_PATHS:
    case NODE_JS_DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
          isfile: false,
        },
      ];
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
          source: `${srcDir}/ngrxTemplates/add-user-modal`,
          destination: `${destDir}/src/app/shared/components/add-user-modal`,
          isfile: false,
        },
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
