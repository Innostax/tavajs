#! node
const inquirer = require("inquirer");
const fs = require("fs");
const { createDirectoryContents, updatePackage } = require("./utils/helper");
const path = require("path");
const fsExtra = require("fs-extra");
// const chalk = require("chalk");
// const projectMetaData = require("../package.json");
const projectSetUp = require("./utils/projectSetUp");
const projectInfo = require("./utils/projectInfo");
const projectExecutionCommands = require("./utils/projectExecutionCommands");
const { getProjectDetails } = require("./utils/getProjectDetails");
const questionnaire = require("./questionnaire");

const CURR_DIR = process.cwd();
const currentPath = path.join(__dirname);
const { render } = require("ejs");
const createBlobService = require("./utils/createBlobService");
const createDbConn = require("./utils/createDbConn");
const createLogger = require("./utils/createLogger");
const createEmailSevice = require("./utils/createEmailSevice");

inquirer.prompt(questionnaire).then(async (answers) => {
  console.log("answers===>", answers)
  const { frontEnd, backEnd, frontEndName, backEndName } = answers;
  let projectName = answers["projectName"];
  // let frontEndName = answers["frontEndName"];
  let authenticationChoice = answers["authenticationChoice"];
  let defaultRoute = answers["defaultRoute"];
  let dbService = answers["dbService"];
  let dbName = answers["dbName"];
  let emailService = answers["emailService"];
  let emailServiceName = answers["emailServiceName"];
  let blobService = answers["blobService"];
  // let defaultRoute = answers["default-route"];
  // var reactPath = `${CURR_DIR}/${projectName}`;
  // var vuePath = `${CURR_DIR}/${projectName}`;
  // var angularPath = `${CURR_DIR}/${projectName}`;

  // let screenName = "<%= projectName %>";
  let blobServiceName = answers["blobServiceName"];
  let loggerService = answers["loggerService"];
  let loggerServiceName = answers["loggerServiceName"];

  let isStore = Boolean(answers["store"]);
  let isDark = Boolean(answers["theme"]);
  let isCrud = Boolean(answers["CRUD"]);
  let isDocker = Boolean(answers["dockerService"]);
  let isCrudWithNode = Boolean(answers["reactNodeCrud"]);
  let cacheService = Boolean(answers["cacheService"]);
  let isRedis = cacheService;

  let isAuth0 = authenticationChoice === "Auth0";
  let isCognito = authenticationChoice === "Cognito";
  let mongoSelected = dbName === "mongoose";
  let sequelizeSelected = dbName === "postgres" || dbName === "mysql";
  let isWinston = loggerServiceName === "winston";
  let isSentry = loggerServiceName === "sentry";

  fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {
    if (err) {
      console.error(err);
    }
  });
  
  /* <---------------------------  Get Project Details  ----------------------------> */
  const { frontEnd: frontEndAttributes, backEnd: backEndAttributes } = getProjectDetails(
    `${CURR_DIR}/${projectName}`,
    answers
  );

  // //<------------------------------for logger-------------------------------->
  if (answers["loggerName"] === "winston") isWinston = true;
  if (answers["loggerName"] === "sentry") isSentry = true;
  //<----------------------------------Db ----------------------------------->
  if (answers["dbName"] === "mongoose") {
    mongoSelected = true;
  }
  if (answers["dbName"] === "postgres" || answers["dbName"] === "mysql") {
    sequelizeSelected = true;
  }

  //---------------------------Authentication-------------------------------------------
  if (answers["authentication-choice"] === "Auth0") {
    isAuth0 = true;
  }
  if (answers["authentication-choice"] === "Cognito") {
    isCognito = true;
  }

  //---------------------------Redis----------------------------------------------------
  if (answers["cacheServiceName"] === "redis") {
    isRedis = true;
  }

  //-----------------------------------------for react + node---------------------------
  // if (projectChoice == "react_Node") {
  //   frontEndName = answers["FrontEnd-name"];
  //   let reactTemplatePath = path.join(__dirname, "templates", "react");
  //   const nodeTemplatePath = path.join(__dirname, "templates", "node-js");
  //   var nodePath = `${CURR_DIR}/${projectName}/${nodeName}`;
  //   var reactPath = `${CURR_DIR}/${projectName}/${frontEndName}`;

  //   fsExtra.ensureDirSync(`${CURR_DIR}/${projectName}/${frontEndName}`);
  //   createDirectoryContents(
  //     reactTemplatePath,
  //     `${projectName}/${frontEndName}`,
  //     defaultRoute,
  //     mongoSelected,
  //     sequelizeSelected,
  //     dbName,
  //     isSentry,
  //     isWinston,
  //     isAuth0,
  //     isCognito,
  //     reactPath,
  //     screenName,
  //     isCrudWithNode,
  //     isCrud,
  //     frontEndName,
  //     nodeName,
  //     projectChoice,
  //     isRedis,
  //   );
  //   fsExtra.ensureDirSync(`${CURR_DIR}/${projectName}/${nodeName}`);
  //   createDirectoryContents(
  //     nodeTemplatePath,
  //     `${projectName}/${nodeName}`,
  //     defaultRoute,
  //     mongoSelected,
  //     sequelizeSelected,
  //     dbName,
  //     isSentry,
  //     isWinston,
  //     isAuth0,
  //     isCognito,
  //     reactPath,
  //     screenName,
  //     isCrudWithNode,
  //     isCrud,
  //     frontEndName,
  //     nodeName,
  //     projectChoice,
  //     isRedis,
  //   );
  //   console.log(
  //     chalk.green.bold(
  //       `${String.fromCodePoint(
  //         0x1f4c2
  //       )} Creating React project: ${frontEndName} using ${
  //         projectMetaData.name
  //       } ${projectMetaData.version}`
  //     )
  //   );
  //   if (answers.authService === "yes")
  //     console.log(
  //       chalk.green.bold(
  //         `   ${String.fromCodePoint(
  //           0x231b
  //         )} Integrating Authentication service: ${
  //           answers["authentication-choice"]
  //         }`
  //       )
  //     );
  //   if (isRedux)  // Use isStore instead
  //     console.log(
  //       chalk.green.bold(
  //         `   ${String.fromCodePoint(0x231b)} Integrating Redux pattern`
  //       )
  //     );
  //   console.log(" ");
  //   console.log(
  //     chalk.green.bold(
  //       `${String.fromCodePoint(
  //         0x1f4c2
  //       )} Creating Node project: ${nodeName} using ${projectMetaData.name} ${
  //         projectMetaData.version
  //       }`
  //     )
  //   );
  //   if (answers["dbService"] === "yes")
  //     console.log(
  //       chalk.green.bold(
  //         `   ${String.fromCodePoint(0x231b)} Integrating Database service: ${
  //           answers["dbName"]
  //         }`
  //       )
  //     );
  //   if (answers["loggerService"] === "yes")
  //     console.log(
  //       chalk.green.bold(
  //         `   ${String.fromCodePoint(0x231b)} Integrating Logger service: ${
  //           answers["loggerName"]
  //         }`
  //       )
  //     );
  //   if (emailService == "yes")
  //     console.log(
  //       chalk.green.bold(
  //         `   ${String.fromCodePoint(0x231b)} Integrating Email service: ${
  //           answers["emailServiceName"]
  //         }`
  //       )
  //     );
  //   if (blobService == "yes")
  //     console.log(
  //       chalk.green.bold(
  //         `   ${String.fromCodePoint(0x231b)} Integrating Blob service: ${
  //           answers["blobServiceName"]
  //         }`
  //       )
  //     );
  //   console.log(
  //     chalk.green.bold(`${String.fromCodePoint(0x1f4a1)} Powered by Innostax`)
  //   );

  //   const { frontEnd, backEnd } = getProjectDetails(
  //     `${CURR_DIR}/${projectName}`,
  //     answers
  //   );
  // }

    //<---------------------------- For react, angular, vue ---------------------------------->
    if (frontEnd) {
      const { choice, path: frontEndPath } = frontEndAttributes;
      const templatePath = path.join(__dirname, "templates", choice);
      const projectPath = backEnd
        ? `${projectName}/${frontEndName}`
        : projectName;

      fsExtra.ensureDirSync(frontEndPath);
      createDirectoryContents(
        templatePath,
        projectPath,
        defaultRoute,
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
        isRedis,
        backEndName,
        choice,
        isDark
      );
      // var projectPath = `${CURR_DIR}/${projectName}`;
      // console.log(
      //   chalk.green.bold(
      //     `${String.fromCodePoint(
      //       0x1f4c2
      //     )} Creating React project: ${projectName} using ${projectMetaData.name} ${
      //       projectMetaData.version
      //     }`
      //   )
      // );

      //<---------------------------- For Themes integration ---------------------------------->
      if (isDark) {
        fs.copyFile(
          `${currentPath}/themeTemplates/themes.js`,
          `${frontEndAttributes.path}/src/themes.js`,
          (err) => {
            if (err) {
              console.log("Error Found:", err);
            }
          }
        );
      }
    }

    //<---------------------------- node-js ---------------------------------->
    if (backEnd) {
      const { choice, path: backEndPath } = backEndAttributes;
      const templatePath = path.join(__dirname, "templates", choice);
      const projectPath = frontEnd
        ? `${projectName}/${backEndName}`
        : projectName;

      fsExtra.ensureDirSync(backEndPath);
      createDirectoryContents(
        templatePath,
        projectPath,
        defaultRoute,
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
        isRedis,
        backEndName,
        choice,
        isDark
      );
      const fileNames = [
        {
          oldName: "route.js",
          folder: "routes",
          newName: `${defaultRoute}.routes.js`,
        },
        {
          oldName: "controller.js",
          folder: "controllers",
          newName: `${defaultRoute}.controllers.js`,
        },
      ];
      fileNames.map((each) =>
        fs.rename(
          `${backEndAttributes.path}/${each.folder}/${each.oldName}`,
          `${backEndAttributes.path}/${each.folder}/${each.newName}`,
          () => {}
        )
      );

      //creating utils dir
      if (emailService || blobService || loggerService) {
        fs.mkdirSync(backEndAttributes.path + "/utils");
      }

      //<---------------------------- For Email service ---------------------------------->
      if (emailService) {
        const emailTemplatePath = path.join(
          __dirname,
          "emailTemplates",
          emailServiceName
        );

        createEmailSevice(
          emailServiceName,
          emailTemplatePath,
          backEndAttributes.path,
          __dirname
        );
      }

      //<---------------------------- For Blob service ---------------------------------->
      if (blobService) {
        const blobTemplatePath = path.join(
          __dirname,
          "blobTemplates",
          blobServiceName
        );
        createBlobService(blobServiceName, blobTemplatePath, backEndAttributes.path);
      }

      //<---------------------for Redis service---------------------------------------------------------->
      if (cacheService == "yes") {
        const cacheServiceName = answers["cacheServiceName"];
        const cacheTemplatePath = path.join(
          __dirname,
          "cacheTemplates",
          cacheServiceName
        );
        createCacheService(cacheServiceName, cacheTemplatePath, nodePath);
      }

      //<-----------For Logger service---------------------------------------------------------------------------->
      // if (answers["loggerService"] === "yes") {
      //   let loggerServiceName = answers["loggerName"];
      //   const loggerTemplatePath = path.join(__dirname, "logger");
      //   createLogger(nodePath, loggerServiceName, loggerTemplatePath, defaultRoute);
      // }
      // TODO: Need to verify above code.
      //<---------------------------- For Logger service ---------------------------------->
      if (loggerService) {
        const loggerTemplatePath = path.join(__dirname, "logger");

        createLogger(
          backEndAttributes.path,
          loggerServiceName,
          loggerTemplatePath,
          defaultRoute
        );
      }

      //<---------------------------- For Database service ---------------------------------->
      if (dbService) {
        createDbConn(backEndAttributes.path, dbName, defaultRoute, `${currentPath}`);
      }

      //<---------------------------- For ENV file ---------------------------------->
      if (!isDocker) {
        let writePath = "";
        let contents = fs.readFileSync(
          `${currentPath}/envTemplates/.dbEnv`,
          "utf8"
        );
        contents = render(contents, {
          dbName,
          frontEnd,
          backEnd,
          isAuth0,
        });
        if (frontEnd?.choice && backEnd?.choice) {
          writePath = `${backEndAttributes.path}/.env`;
        } else {
          writePath = `${CURR_DIR}/${projectName}/.env`;
        }
        fs.writeFileSync(writePath, contents, "utf8");
      }
    }

    //<---------------------------- For Docker integration ---------------------------------->
    if (isDocker) {
      const dockerPath = path.join(__dirname, "dockerTemplate");
      if (frontEnd?.choice === "react" && backEnd?.choice === "node-js") {
        let contents = fs.readFileSync(
          `${dockerPath}/db-docker-compose.yml`,
          "utf8"
        );
        contents = render(contents, {
          frontEndName,
          backEndName,
          mongoSelected,
          sequelizeSelected,
        });
        const writePath = `${CURR_DIR}/${projectName}/docker-compose.yml`;
        fs.writeFileSync(writePath, contents, "utf8");

        fs.copyFileSync(
          `${currentPath}/dockerTemplate/Dockerfile`,
          `${frontEndAttributes.path}/Dockerfile`
        );
        fs.copyFileSync(
          `${currentPath}/dockerTemplate/Dockerfile`,
          `${backEndAttributes.path}/Dockerfile`
        );
      } else if (frontEnd?.choice === "react") {
        fs.copyFileSync(
          `${dockerPath}/Dockerfile`,
          `${frontEndAttributes.path}/Dockerfile`
        );
      } else if (backEnd?.choice === "node-js") {
        fs.copyFileSync(
          `${dockerPath}/Dockerfile`,
          `${backEndAttributes.path}/Dockerfile`
        );
      }
    }

    //<---------------------------- For Store integration ---------------------------------->
    if (isStore) {
      //<---------------------------- Redux ---------------------------------->
      if (frontEnd?.choice === "react") {
        const reduxFiles = [
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
        reduxFiles.map((each) => {
          fs.copyFile(
            `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
            `${frontEndAttributes.path}/${each.destFolder}/${each.destFileName}`,
            (err) => {
              if (err) {
                console.log("Error Found:", err);
              }
            }
          );
        });
        let contents = fs.readFileSync(
          `${currentPath}/reduxTemplates/demoUser/users.actions.js`,
          "utf8"
        );
        contents = render(contents, {
          defaultRoute,
        });
        const writePath = `${frontEndAttributes.path}/src/screens/Users/users.actions.js`;
        fs.writeFileSync(writePath, contents, "utf8");
        if (isCrud) {
          fs.copyFile(
            `${currentPath}/reduxTemplates/userform/Adduser.js`,
            `${frontEndAttributes.path}/src/screens/Users/AddUser.js`,
            (err) => {
              if (err) {
                console.log("Error Found:", err);
              }
            }
          );
        }
        if (isCrudWithNode) {
          fs.copyFile(
            `${currentPath}/reduxTemplates/userform/AddUserForm.js`,
            `${frontEndAttributes.path}/src/screens/Users/AddUser.js`,
            (err) => {
              if (err) {
                console.log("Error Found:", err);
              }
            }
          );
        }
        fsExtra.copy(
          `${currentPath}/reduxTemplates/infrastructure`,
          `${frontEndAttributes.path}/src/infrastructure`,
          function (err) {
            if (err) {
              console.log("An error is occured");
              return console.error(err);
            }
          }
        );
      }
      //<--------------------------------- Vuex ---------------------------->
      if (frontEnd?.choice === "vue") {
        fsExtra.copy(
          `${currentPath}/vuexTemplates/store`,
          `${frontEndAttributes.path}/src/store`,
          function (err) {
            if (err) {
              console.log("An error is occured");
              return console.error(err);
            }
          }
        );
        fsExtra.copy(
          `${currentPath}/vuexTemplates/userModal`,
          `${frontEndAttributes.path}/src/userModal`,
          function (err) {
            if (err) {
              console.log("An error is occured");
              return console.error(err);
            }
          }
        );
      }
      //<--------------------------------- Ngrx ---------------------------->
      if (frontEnd?.choice === "angular") {
        fsExtra.copy(
          `${currentPath}/ngrxTemplates/reducers`,
          `${frontEndAttributes.path}/src/app/reducers`,
          function (err) {
            if (err) {
              console.log("An error is occured");
              return console.error(err);
            }
          }
        );
        fsExtra.copy(
          `${currentPath}/ngrxTemplates/modules`,
          `${frontEndAttributes.path}/src/app/modules`,
          function (err) {
            if (err) {
              console.log("An error is occured");
              return console.error(err);
            }
          }
        );
      }
    }

    //<---------------------------- For Authentication service ---------------------------------->
    if (answers["authenticationChoice"] === "Auth0") {
      const filesMap = [
        {
          srcFolder: "envTemplates",
          srcFileName: ".authEnv",
          destFileName: ".env",
        },
      ];

      const projectMetaData = {
        name: "@auth0/auth0-spa-js",
        version: "^1.10.0",
      };
      updatePackage(frontEndAttributes.path, projectMetaData);

      filesMap.map((each) => {
        fs.copyFile(
          `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
          `${frontEndAttributes.path}/${each.destFileName}`,
          (err) => {
            if (err) {
              console.log("Error Found:", err);
            }
          }
        );
      });

      const reactSpaPath = path.join(__dirname, "authTemplates");
      let newContent = fs.readFileSync(`${reactSpaPath}/react-spa.js`, "utf8");
      newContent = render(newContent, { isStore });
      const writePath = `${frontEndAttributes.path}/src/react-spa.js`;
      fs.writeFileSync(writePath, newContent, "utf8");
    } else if (answers["authenticationChoice"] === "Cognito") {
      // const choice = "cognito";  // Need to figure out
      const filesMap = [
        {
          srcFolder: "envTemplates",
          srcFileName: ".cognitoEnv",
          destFolder: "",
          destFileName: ".env",
        },
      ];
      const projectMetaData = {
        name: "@auth0/auth0-spa-js",
        version: "^1.10.0",
      };
      updatePackage(frontEndAttributes.path, projectMetaData);

      filesMap.map(() => {
        fs.copyFile(
          `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
          `${frontEndAttributes.path}/${each.destFolder}/${each.destFileName}`,
          (err) => {
            if (err) {
              console.log("Error Found:", err);
            }
          }
        );
      });
    }

    projectInfo(frontEndAttributes, backEndAttributes, answers);
    projectSetUp(frontEndAttributes, backEndAttributes, answers);
    projectExecutionCommands(frontEndAttributes, backEndAttributes, answers);
});
//function to create Cache services------------------------------------------------->
function createCacheService(cacheServiceName, cacheTemplatePath, nodePath) {
  let contents = fs.readFileSync(cacheTemplatePath + ".js", "utf-8");

  fs.writeFile(
    `${nodePath}` + "/" + `${cacheServiceName}` + ".js",
    contents,
    function (err) {
      if (err) throw err;
    }
  );
}
