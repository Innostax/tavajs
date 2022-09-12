const fs = require("fs");
const fsExtra = require("fs-extra");
const CURR_DIR = process.cwd();
const { render } = require("ejs");
//<-----------------------To create Directory Contents------------------------------------>
function createDirectoryContents(
  templatePath,
  newProjectPath,
  newDefaultRoute,
  mongoSelected,
  sequelizeSelected,
  dbName,
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
  isDark,
  isMaterialUI
) {
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
            isAuth0,
            isOkta,
            isCognito,
            isStore,
            mongoSelected,
            sequelizeSelected,
            dbName,
            isSentry,
            isWinston,
            isAuth0,
            isCognito,
            isStore,
            isCrudWithNode,
            isCrud,
            frontEndName,
            nodeName,
            projectChoice,
            isDark,
            isMaterialUI
          },
          (autoescape = false)
        );
        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
        fs.writeFileSync(writePath, contents, "utf8");
      } 
      else if (stats.isDirectory()) 
      {
        
        // recursive call
        if(isMaterialUI === true && `${file}`=== 'material'){
        fsExtra.ensureDirSync(`${CURR_DIR}/${newProjectPath}`);
        createDirectoryContents(
          `${templatePath}/${file}`,
          `${newProjectPath}`,
          newDefaultRoute,
          mongoSelected,
          sequelizeSelected,
          dbName,
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
          isDark,
          isMaterialUI
        );}
        else if(isMaterialUI === false && `${file}` === "material"){ 
          return ;
         }
        else if(isMaterialUI === false && `${file}`=== 'bootstrap')
        {
          fsExtra.ensureDirSync(`${CURR_DIR}/${newProjectPath}`);
          createDirectoryContents(
            `${templatePath}/${file}`,
            `${newProjectPath}`,
            newDefaultRoute,
            mongoSelected,
            sequelizeSelected,
            dbName,
            isSentry,
            isWinston,
            isAuth0,
            isCognito,
            isStore,
            isCrudWithNode,
            isCrud,
            frontEndName,
            nodeName,
            projectChoice,
            isDark,
            isMaterialUI
          );
        }
        else if(isMaterialUI === true && `${file}`=== 'bootstrap')
        {
          return;
        }
          else
          {
            fsExtra.ensureDirSync(`${CURR_DIR}/${newProjectPath}/${file}`);
            createDirectoryContents(
              `${templatePath}/${file}`,
              `${newProjectPath}/${file}`,
              newDefaultRoute,
              mongoSelected,
              sequelizeSelected,
              dbName,
              isSentry,
              isWinston,
              isAuth0,
              isCognito,
              isStore,
              isCrudWithNode,
              isCrud,
              frontEndName,
              nodeName,
              projectChoice,
              isDark,
              isMaterialUI
            );
          }
        
      }
    }
  });
}

//to update package.json------------------------------------------------>
function updatePackage(path, package) {
  let packagefile = fs.readFileSync(`${path}/package.json`, "utf-8");
  packagefile = JSON.parse(packagefile);
  let newPackageFile = {
    ...packagefile,
    dependencies: {
      ...packagefile.dependencies,
      [package.name]: package.version,
    },
  };
  newPackageFile = JSON.stringify(newPackageFile);
  fs.writeFileSync(`${path}/package.json`, newPackageFile, "utf-8");
}

module.exports = {
  createDirectoryContents,
  updatePackage,
};
