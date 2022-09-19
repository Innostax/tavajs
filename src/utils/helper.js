const fs = require("fs");
const fsExtra = require("fs-extra");
const { render } = require("ejs");
const {
  BOOTSTRAP,
  MATERIAL,
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
} = require("../constants");
//<-----------------------To create Directory Contents------------------------------------>
function createDirectoryContents(
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
) {
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
        const isBootstrapFile = file === BOOTSTRAP;
        const isMaterialUIFile = file === MATERIAL;
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
}

//to update package.json------------------------------------------------>
function updateProjectDependencies(path, dependencies) {
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
}

// To update the scripts in Package.json
function updateProjectScripts(path, updatedscripts) {
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
}

function copyFiles(paths) {
  paths.forEach((each) => {
    fs.copyFileSync(each.source, each.destination, (err) => {
      if (err) {
        console.log("Error Found:", err);
      }
    });
  });
}

function copyDirectories(paths) {
  paths.forEach((each) => {
    fsExtra.copy(each.source, each.destination, function (err) {
      if (err) {
        console.log("An error is occured");
        return console.error(err);
      }
    });
  });
}

function readFile(path) {
  return fs.readFileSync(path, "utf8");
}

function getFilePaths(name, srcDir, destDir, backendDir) {
  switch (name) {
    case name === REACT_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/themeProviderTemplates/react-themes/theme.js`,
          destination: `${destDir}/src/theme.js`,
        },
        {
          source: `${srcDir}/themeProviderTemplates/theme.constants.js`,
          destination: `${destDir}/src/theme.constants.js`,
        },
      ];
    case name === VUE_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/themeProviderTemplates/vue-themes/theme.vue`,
          destination: `${destDir}/src/theme.vue`,
        },
        {
          source: `${srcDir}/themeProviderTemplates/theme.constants.js`,
          destination: `${destDir}/src/theme.constants.js`,
        },
      ];
    case name === ANGULAR_THEME_FILE_PATHS:
      return [
        {
          source: `${srcDir}/themeTemplates/angular-themes/dark-theme.css`,
          destination: `${destDir}/src/angular-themes/dark-theme.css`,
        },
      ];
    case name === CYPRESS_DIRECTORY_PATHS:
      return [
        {
          source: `${srcDir}/uiTests/CypressTests/TestScripts`,
          destination: `${destDir}`,
        },
      ];
    case name === CYPRESS_FILE_PATHS:
      return [
        {
          source: `${srcDir}/uiTests/CypressTests/cypress.config.js`,
          destination: `${destDir}/cypress.config.js`,
        },
      ];
    case name === DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/dockerTemplate/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
        },
        {
          source: `${srcDir}/dockerTemplate/Dockerfile`,
          destination: `${backendDir}/Dockerfile`,
        },
      ];
    case name === REACT_DOCKER_FILE_PATHS:
    case name === NODE_JS_DOCKER_FILE_PATHS:
      return [
        {
          source: `${srcDir}/Dockerfile`,
          destination: `${destDir}/Dockerfile`,
        },
      ];
    case name === NGRX_FILE_PATHS:
      return [
        {
          source: `${srcDir}/ngrxTemplates/reducers`,
          destination: `${destDir}/src/app/reducers`
        },
        {
          source: `${srcDir}/ngrxTemplates/store`,
          destination: `${destDir}/src/app/utils/store`
        },
        {
          source: `${srcDir}/ngrxTemplates/add-user-modal`,
          destination: `${destDir}/src/app/shared/components/add-user-modal`
        }
      ];
    case name === VUEX_FILE_PATHS:
      return [
        {
          source: `${srcDir}/vuexTemplates/doAsync`,
          destination: `${destDir}/src/doAsync`
        },
        {
          source: `${srcDir}/vuexTemplates/httpMethod`,
          destination: `${destDir}/src/httpMethod`
        }
      ];
    case name === INFRASTRUCTURE_FILE_PATHS:
      return [
        {
          source: `${srcDir}/reduxTemplates/infrastructure`,
          destination: `${destDir}/src/infrastructure`,
        }
      ];
    default:
      return [];
  }
}

module.exports = {
  createDirectoryContents,
  updateProjectDependencies,
  updateProjectScripts,
  copyDirectories,
  copyFiles,
  getFilePaths,
  readFile,
};
