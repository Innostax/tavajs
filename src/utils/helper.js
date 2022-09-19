const fs = require("fs");
const fsExtra = require("fs-extra");
const { render } = require("ejs");
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
        const isBootstrapFile = file === "bootstrap";
        const isMaterialUIFile = file === "material";
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

module.exports = {
  createDirectoryContents,
  updateProjectDependencies,
  updateProjectScripts,
};
