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
const { getProjectDetails } = require("./utils/getProjectDetails");
const questionnaire = require("./questionnaire");

const currentPath = path.join(__dirname);
const CURR_DIR = process.cwd();

inquirer.prompt(questionnaire).then(async (answers) => {
  const projectName = answers["project-name"];
  const managerChoice = answers["managerChoice"];
  const frontEndName = answers["FrontEnd-name"];
  const authenticationChoice = answers["authentication-choice"];
  const backEndName = answers["node-name"];
  const defaultRoute = answers["default-route"];
  const dbService = answers["dbService"];
  const dbName = answers["dbName"];
  const emailService = answers["emailService"];
  const emailServiceName = answers["emailServiceName"];
  const blobService = answers["blobService"];
  const blobServiceName = answers["blobServiceName"];
  const loggerService = answers["loggerService"];
  const loggerServiceName = answers["loggerName"];

  const isVuex = Boolean(answers["vuex"]);
  const isNgrx = Boolean(answers["ngrx"]);
  const isRedux = Boolean(answers["redux"]);
  const isDark = Boolean(answers["theme"]);
  const isCrud = Boolean(answers["CRUD"]);
  const isDocker = Boolean(answers["dockerService"]);
  const isCrudWithNode = Boolean(answers["reactNodeCrud"]);

  const isAuth0 = authenticationChoice === "Auth0";
  const isCognito = authenticationChoice === "Cognito";
  const mongoSelected = dbName === "mongoose";
  const sequelizeSelected = dbName === "postgres" || dbName === "mysql";
  const isWinston = loggerServiceName === "winston";
  const isSentry = loggerServiceName === "sentry";

  fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {
    if (err) {
      console.error(err);
    }
  });

  const { projectChoice, projectPath } = getProjectDetails(
    `${CURR_DIR}/${projectName}`,
    answers
  );

  let frontEndPath = `${CURR_DIR}/${projectName}`;
  let backEndPath = `${CURR_DIR}/${projectName}`;

  const templatePath = path.join(__dirname, "templates", projectChoice);

  //<---------------------------- for react + node-js ---------------------------------->
  if (projectChoice == "react_Node") {
    frontEndPath = `${frontEndPath}/${frontEndName}`;
    backEndPath = `${backEndPath}/${backEndName}`;

    const reactTemplatePath = path.join(__dirname, "templates", "react");
    const nodeTemplatePath = path.join(__dirname, "templates", "node-js");

    const reactPath = `${projectName}/${frontEndName}`;
    const nodePath = `${projectName}/${backEndName}`;

    fsExtra.ensureDirSync(frontEndPath);
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
      isCrudWithNode,
      isCrud,
      frontEndName,
      backEndName,
      projectChoice,
      isVuex,
      isNgrx,
      isDark
    );
    fsExtra.ensureDirSync(backEndPath);
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
      isCrudWithNode,
      isCrud,
      frontEndName,
      backEndName,
      projectChoice,
      isVuex,
      isNgrx
    );
  }

  //<---------------------------- For react, angular, vue, node-js ---------------------------------->
  else if (
    projectChoice === "react" ||
    projectChoice === "angular" ||
    projectChoice === "vue" ||
    projectChoice === "node-js"
  ) {
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
      isRedux,
      isCrudWithNode,
      isCrud,
      frontEndName,
      backEndName,
      projectChoice,
      isVuex,
      isNgrx,
      isDark
    );
  }
  if (projectChoice === "node-js" || projectChoice === "react_Node") {
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
        `${backEndPath}/${each.folder}/${each.oldName}`,
        `${backEndPath}/${each.folder}/${each.newName}`,
        () => {}
      )
    );
  }

  //creating utils dir
  if (
    emailService === "yes" ||
    blobService === "yes" ||
    loggerService === "yes"
  ) {
    fs.mkdirSync(backEndPath + "/utils");
  }

  //<---------------------------- For Email service ---------------------------------->
  if (emailService == "yes") {
    const emailTemplatePath = path.join(
      __dirname,
      "emailTemplates",
      emailServiceName
    );

    createEmailSevice(
      emailServiceName,
      emailTemplatePath,
      backEndPath,
      __dirname
    );
  }

  //<---------------------------- For Blob service ---------------------------------->
  if (blobService == "yes") {
    const blobTemplatePath = path.join(
      __dirname,
      "blobTemplates",
      blobServiceName
    );

    createBlobService(blobServiceName, blobTemplatePath, backEndPath);
  }

  //<---------------------------- For Logger service ---------------------------------->
  if (loggerService === "yes") {
    const loggerTemplatePath = path.join(__dirname, "logger");

    createLogger(
      backEndPath,
      loggerServiceName,
      loggerTemplatePath,
      defaultRoute
    );
  }

  //<---------------------------- For Database service ---------------------------------->
  if (dbService === "yes") {
    createDbConn(backEndPath, dbName, defaultRoute, `${currentPath}`);
  }

  //<---------------------------- For Docker integration ---------------------------------->
  if (isDocker) {
    const dockerPath = path.join(__dirname, "dockerTemplate");
    if (projectChoice === "react") {
      fs.copyFileSync(`${dockerPath}/Dockerfile`, `${frontEndPath}/Dockerfile`);
    } else if (projectChoice === "node-js") {
      fs.copyFileSync(`${dockerPath}/Dockerfile`, `${backEndPath}/Dockerfile`);
    } else if (projectChoice === "react_Node") {
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
      writePath = `${CURR_DIR}/${projectName}/docker-compose.yml`;
      fs.writeFileSync(writePath, contents, "utf8");

      fs.copyFileSync(
        `${currentPath}/dockerTemplate/Dockerfile`,
        `${frontEndPath}/Dockerfile`
      );
      fs.copyFileSync(
        `${currentPath}/dockerTemplate/Dockerfile`,
        `${backEndPath}/Dockerfile`
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
      writePath = `${backEndPath}/.env`;
    }
    fs.writeFileSync(writePath, contents, "utf8");
  }

  //<---------------------------- For Redux integration ---------------------------------->
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
        `${frontEndPath}/${each.destFolder}/${each.destFileName}`,
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
    writePath = `${frontEndPath}/src/screens/Users/users.actions.js`;

    fs.writeFileSync(writePath, contents, "utf8");

    if (isCrud) {
      fs.copyFile(
        `${currentPath}/reduxTemplates/userform/Adduser.js`,
        `${frontEndPath}/src/screens/Users/AddUser.js`,
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
        `${frontEndPath}/src/screens/Users/AddUser.js`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
    }
    fsExtra.copy(
      `${currentPath}/reduxTemplates/infrastructure`,
      `${frontEndPath}/src/infrastructure`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
  }

  //<---------------------------- For Vuex integration ---------------------------------->
  if (isVuex) {
    fsExtra.copy(
      `${currentPath}/vuexTemplates/store`,
      `${frontEndPath}/src/store`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
    fsExtra.copy(
      `${currentPath}/vuexTemplates/userModal`,
      `${frontEndPath}/src/userModal`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
  }

  //<---------------------------- For Ngrx integration ---------------------------------->
  if (isNgrx) {
    fsExtra.copy(
      `${currentPath}/ngrxTemplates/reducers`,
      `${frontEndPath}/src/app/reducers`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
    fsExtra.copy(
      `${currentPath}/ngrxTemplates/modules`,
      `${frontEndPath}/src/app/modules`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
  }

  //<---------------------------- For Authentication service ---------------------------------->
  if (answers["authentication-choice"] === "Auth0") {
    const filesMap = [
      {
        srcFolder: "envTemplates",
        srcFileName: ".authEnv",
        destFileName: ".env",
      },
    ];

    const package = { name: "@auth0/auth0-spa-js", version: "^1.10.0" };
    updatePackage(frontEndPath, package);

    filesMap.map((each) => {
      fs.copyFile(
        `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
        `${frontEndpath}/${each.destFileName}`,
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

  //<---------------------------- For Themes integration ---------------------------------->
  if (isDark) {
    fs.copyFile(
      `${currentPath}/themeTemplates/themes.js`,
      `${frontEndPath}/src/themes.js`,
      (err) => {
        if (err) {
          console.log("Error Found:", err);
        }
      }
    );
  }

  projectInfo(
    projectName,
    frontEndName,
    backEndName,
    projectChoice,
    dbName,
    loggerServiceName,
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
    backEndName,
    managerChoice,
    projectChoice
  );
});
