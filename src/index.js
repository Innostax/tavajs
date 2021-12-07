#! node
const inquirer = require("inquirer");
const fsExtra = require("fs-extra");
const path = require("path");
const fs = require("fs");
const { render } = require("ejs");
const createBlobService = require("./utils/createBlobService");
const createDbConn = require("./utils/createDbConn");
const createLogger = require("./utils/createLogger");
const createEmailSevice = require("./utils/createEmailSevice");
const { createDirectoryContents, updatePackage } = require("./utils/helper");
const projectSetUp = require("./utils/projectSetUp");
const projectInfo = require("./utils/projectInfo");
const projectExecutionCommands = require("./utils/projectExecutionCommands");
const questionnaire = require("./questionnaire");

const currentPath = path.join(__dirname);
const CURR_DIR = process.cwd();

var mongoSelected = false;
var sequelizeSelected = false;
var isDocker = false;
var isCrud = false;
var isAuth0 = false;
var isCognito = false;
var isRedux = false;
var isVuex = false;
var isWinston = false;
var isSentry = false;
var isCrudWithNode = false;
var isCrud = false;
var isDark = false;
var isNgrx = false;

inquirer.prompt(questionnaire).then(async (answers) => {
  let projectChoice = "";
  let newDefaultRoute = "";
  let frontEndName = "";
  let nodeName = "";
  const projectName = answers["project-name"];
  const managerChoice = answers["managerChoice"];
  const frontEndChoice = answers["frontEndChoice"];
  const authenticationChoice = answers["authentication-choice"];
  const backEndChoice = answers["backEndChoice"];
  const defaultRoute = answers["default-route"];
  const dbName = answers["dbName"];
  const emailService = answers["emailService"];
  const emailServiceName = answers["emailServiceName"];
  const blobService = answers["blobService"];
  const blobServiceName = answers["blobServiceName"];
  const loggerName = answers["loggerName"];
  const screenName = "<%= projectName %>";
  isVuex = answers["vuex"];
  isNgrx = answers["ngrx"];
  isRedux = answers["redux"];
  isDark = answers["theme"];
  isCrud = answers["CRUD"];
  isCrudWithNode = answers["reactNodeCrud"];
  isDocker = answers["dockerService"];

  if (frontEndChoice === "react" && backEndChoice === "node")
    projectChoice = "react_Node";
  else if (frontEndChoice === "react") projectChoice = "react";
  else if (frontEndChoice === "angular") projectChoice = "angular";
  else if (frontEndChoice === "vue") projectChoice = "vue";
  else if (backEndChoice === "node") projectChoice = "node-js";

  const templatePath = path.join(__dirname, "templates", projectChoice);
  var reactPath = `${CURR_DIR}/${projectName}`;

  fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {
    if (err) {
      console.error(err);
    }
  });

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

  //-----------------------------------------for react + node---------------------------
  if (projectChoice == "react_Node") {
    frontEndName = answers["FrontEnd-name"];
    nodeName = answers["node-name"];

    const reactTemplatePath = path.join(__dirname, "templates", "react");
    const nodeTemplatePath = path.join(__dirname, "templates", "node-js");

    const reactPath = `${projectName}/${frontEndName}`;
    const nodePath = `${projectName}/${nodeName}`;

    fsExtra.ensureDirSync(`${CURR_DIR}/${reactPath}`);
    createDirectoryContents(
      reactTemplatePath,
      reactPath,
      defaultRoute,
      mongoSelected,
      sequelizeSelected,
      dbName,
      isSentry,
      isWinston,
      isAuth0,
      isCognito,
      isRedux,
      screenName,
      isCrudWithNode,
      isCrud,
      frontEndName,
      nodeName,
      projectChoice,
      isVuex,
      isNgrx,
      isDark
    );
    fsExtra.ensureDirSync(`${CURR_DIR}/${nodePath}`);
    createDirectoryContents(
      nodeTemplatePath,
      nodePath,
      defaultRoute,
      mongoSelected,
      sequelizeSelected,
      dbName,
      isSentry,
      isWinston,
      isAuth0,
      isCognito,
      isRedux,
      screenName,
      isCrudWithNode,
      isCrud,
      frontEndName,
      nodeName,
      projectChoice,
      isVuex,
      isNgrx
    );
    const newPath = `${CURR_DIR}/${projectName}/${nodeName}`;
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
        `${newPath}/${each.folder}/${each.oldName}`,
        `${newPath}/${each.folder}/${each.newName}`,
        () => {}
      )
    );
  }

  //<---------------------------- for react---------------------------------->
  else if (projectChoice === "react") {
    createDirectoryContents(
      templatePath,
      projectName,
      defaultRoute,
      mongoSelected,
      sequelizeSelected,
      dbName,
      isSentry,
      isWinston,
      isAuth0,
      isCognito,
      reactPath,
      isRedux,
      screenName,
      isCrudWithNode,
      isCrud,
      frontEndName,
      nodeName,
      projectChoice,
      isVuex,
      isNgrx,
      isDark
    );
    var projectPath = `${CURR_DIR}/${projectName}`;
  }
  //<---------------------------- for angular---------------------------------->
  else if (projectChoice === "angular") {
    createDirectoryContents(
      templatePath,
      projectName,
      newDefaultRoute,
      mongoSelected,
      sequelizeSelected,
      dbName,
      isSentry,
      isWinston,
      isAuth0,
      isCognito,
      reactPath,
      isRedux,
      screenName,
      isCrudWithNode,
      isCrud,
      frontEndName,
      nodeName,
      projectChoice,
      isVuex,
      isNgrx,
      isDark
    );
    var projectPath = `${CURR_DIR}/${projectName}/${frontEndName}`;
  } else if (projectChoice === "node-js") {
    var nodePath = path.join(CURR_DIR, projectName);
    createDirectoryContents(
      templatePath,
      projectName,
      defaultRoute,
      mongoSelected,
      sequelizeSelected,
      dbName,
      isSentry,
      isWinston,
      isAuth0,
      isCognito,
      reactPath,
      isRedux,
      screenName,
      isCrudWithNode,
      isCrud,
      frontEndName,
      nodeName,
      projectChoice,
      isVuex,
      isNgrx,
      isDark
    );
    const newPath = `${CURR_DIR}/${projectName}`;
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
        `${newPath}/${each.folder}/${each.oldName}`,
        `${newPath}/${each.folder}/${each.newName}`,
        () => {}
      )
    );
    var projectPath = `${CURR_DIR}/${projectName}/${nodeName}`;
  } else if (projectChoice === "vue") {
    createDirectoryContents(
      templatePath,
      projectName,
      defaultRoute,
      mongoSelected,
      sequelizeSelected,
      dbName,
      isSentry,
      isWinston,
      isAuth0,
      isCognito,
      reactPath,
      isRedux,
      screenName,
      isCrudWithNode,
      isCrud,
      frontEndName,
      nodeName,
      projectChoice,
      isVuex,
      isNgrx,
      isDark
    );
    var projectPath = `${CURR_DIR}/${projectName}/${frontEndName}`;
  } else {
    createDirectoryContents(templatePath, projectName);
  }

  //creating utils dir
  if (
    emailService === "yes" ||
    blobService === "yes" ||
    answers["loggerService"] === "yes"
  ) {
    fs.mkdirSync(nodePath + "/utils");
  }
  //for email Sevices
  if (emailService == "yes") {
    const emailServiceName = answers["emailServiceName"];
    const emailTemplatePath = path.join(
      __dirname,
      "emailTemplates",
      emailServiceName
    );

    createEmailSevice(emailServiceName, emailTemplatePath, nodePath, __dirname);
  }

  //for Blob service---------------------------------------------------------->
  if (blobService == "yes") {
    const blobServiceName = answers["blobServiceName"];
    const blobTemplatePath = path.join(
      __dirname,
      "blobTemplates",
      blobServiceName
    );

    createBlobService(blobServiceName, blobTemplatePath, nodePath);
  }

  //<-----------For Logger service---------------------------------------------------------------------------->
  if (answers["loggerService"] === "yes") {
    let loggerServiceName = answers["loggerName"];
    const loggerTemplatePath = path.join(__dirname, "logger");
    createLogger(nodePath, loggerServiceName, loggerTemplatePath, defaultRoute);
  }

  //<------------------------------------------------------------------------------------------->
  if (answers["dbService"] === "yes") {
    createDbConn(nodePath, dbName, defaultRoute, `${currentPath}`);
  }

  //for Docker INTEGRATION-------------------------
  if (isDocker) {
    const dockerPath = path.join(__dirname, "dockerTemplate");
    if (projectChoice === "react") {
      fs.copyFileSync(`${dockerPath}/Dockerfile`, `${reactPath}/Dockerfile`);
    } else if (projectChoice === "node-js") {
      fs.copyFileSync(`${dockerPath}/Dockerfile`, `${nodePath}/Dockerfile`);
    } else if (projectChoice === "react_Node") {
      let contents = fs.readFileSync(
        `${dockerPath}/db-docker-compose.yml`,
        "utf8"
      );
      contents = render(contents, {
        frontEndName,
        nodeName,
        mongoSelected,
        sequelizeSelected,
      });
      writePath = `${CURR_DIR}/${projectName}/docker-compose.yml`;
      fs.writeFileSync(writePath, contents, "utf8");

      fs.copyFileSync(
        `${currentPath}/dockerTemplate/Dockerfile`,
        `${reactPath}/Dockerfile`
      );
      fs.copyFileSync(
        `${currentPath}/dockerTemplate/Dockerfile`,
        `${nodePath}/Dockerfile`
      );
    }
  }

  if (
    !isDocker &&
    projectChoice !== "react" &&
    projectChoice !== "vue" &&
    projectChoice !== "angular"
  ) {
    let contents = fs.readFileSync(
      `${currentPath}/envTemplates/.dbEnv`,
      "utf8"
    );
    contents = render(contents, {
      dbName,
      projectChoice,
      isAuth0,
    });
    if (projectChoice === "node-js") {
      writePath = `${CURR_DIR}/${projectName}/.env`;
    } else {
      writePath = `${nodePath}/.env`;
    }
    fs.writeFileSync(writePath, contents, "utf8");
  }
  // <--------------------REDUX INTEGRATION------------------------->

  if (isRedux) {
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
        `${reactPath}/${each.destFolder}/${each.destFileName}`,
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
    writePath = `${reactPath}/src/screens/Users/users.actions.js`;

    fs.writeFileSync(writePath, contents, "utf8");

    if (isCrud) {
      fs.copyFile(
        `${currentPath}/reduxTemplates/userform/Adduser.js`,
        `${reactPath}/src/screens/Users/AddUser.js`,
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
        `${reactPath}/src/screens/Users/AddUser.js`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
    }
    fsExtra.copy(
      `${currentPath}/reduxTemplates/infrastructure`,
      `${reactPath}/src/infrastructure`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
  }
  //<---------------------------------VUEX INTEGRATION---------------------------->
  if (isVuex) {
    fsExtra.copy(
      `${currentPath}/vuexTemplates/store`,
      `${reactPath}/src/store`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
    fsExtra.copy(
      `${currentPath}/vuexTemplates/userModal`,
      `${reactPath}/src/userModal`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
  }
  //<---------------------------------ngrx INTEGRATION---------------------------->
  if (isNgrx) {
    fsExtra.copy(
      `${currentPath}/ngrxTemplates/reducers`,
      `${reactPath}/src/app/reducers`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
    fsExtra.copy(
      `${currentPath}/ngrxTemplates/modules`,
      `${reactPath}/src/app/modules`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
  }
  //<--------For authentication----------------------------------------------------------------------------->
  if (answers["authentication-choice"] === "Auth0") {
    const filesMap = [
      {
        srcFolder: "envTemplates",
        srcFileName: ".authEnv",
        destFolder: frontEndName + "",
        destFileName: ".env",
      },
    ];

    const package = { name: "@auth0/auth0-spa-js", version: "^1.10.0" };
    let packagePath = path.join(CURR_DIR, projectName, frontEndName);
    updatePackage(packagePath, package);

    filesMap.map((each) => {
      fs.copyFile(
        `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
        `${CURR_DIR}/${projectName}/${each.destFolder}/${each.destFileName}`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
    });
    let reactSpaPath = path.join(__dirname, "authTemplates");
    let newContent = fs.readFileSync(`${reactSpaPath}/react-spa.js`, "utf8");
    newContent = render(newContent, { isRedux });
    writePath = `${CURR_DIR}/${projectName}/${frontEndName}/src/react-spa.js`;
    fs.writeFileSync(writePath, newContent, "utf8");
  } else if (answers["authentication-choice"] === "Cognito") {
    choice = "cognito";

    const filesMap = [
      {
        srcFolder: "envTemplates",
        srcFileName: ".cognitoEnv",
        destFolder: "",
        destFileName: ".env",
      },
    ];
    const package = { name: "@auth0/auth0-spa-js", version: "^1.10.0" };
    let packagePath = path.join(CURR_DIR, projectName, frontEndName);
    updatePackage(packagePath, package);

    filesMap.map((each) => {
      fs.copyFile(
        `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
        `${CURR_DIR}/${projectName}/${each.destFolder}/${each.destFileName}`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
    });
  }
  //<-----------------------themes----------------------------->
  if (isDark) {
    fs.copyFile(
      `${currentPath}/themeTemplates/themes.js`,
      `${reactPath}/src/themes.js`,
      (err) => {
        if (err) {
          console.log("Error Found:", err);
        }
      }
    );
  }

  if (projectChoice === "react_Node") {
    projectPath = [
      {
        projectChoice: "react",
        projectPath: `${reactPath}`,
      },
      {
        projectChoice: "node",
        projectPath: `${nodePath}`,
      },
    ];
  }

  projectInfo(
    projectName,
    frontEndName,
    nodeName,
    projectChoice,
    dbName,
    loggerName,
    emailServiceName,
    blobServiceName,
    authenticationChoice,
    isNgrx,
    isRedux,
    isVuex
  );
  projectSetUp(managerChoice, projectChoice, projectPath);
  projectExecutionCommands(
    projectName,
    frontEndName,
    nodeName,
    managerChoice,
    projectChoice
  );
});
