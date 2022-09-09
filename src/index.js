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
  const projectName = answers["projectName"];
  const frontEndName = answers["frontEndName"];
  const authenticationChoice = answers["authenticationChoice"];
  const backEndName = answers["backEndName"];
  const defaultRoute = answers["defaultRoute"];
  const dbName = answers["dbName"];
  const emailServiceName = answers["emailServiceName"];
  const blobServiceName = answers["blobServiceName"];
  const loggerServiceName = answers["loggerServiceName"];
  const isMaterialUI = answers["materialuiChoice"];

  const isStore = Boolean(answers["store"]);
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

  const { frontEnd, backEnd } = getProjectDetails(
    `${CURR_DIR}/${projectName}`,
    answers
  );

  //<---------------------------- For react, angular, vue ---------------------------------->
  if (frontEnd) {
    const { choice, path: frontEndPath } = frontEnd;
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
      backEndName,
      choice,
      isDark,
      isMaterialUI
    );

    //<---------------------------- For Themes integration ---------------------------------->
    if (isDark) {
      fs.copyFile(
        `${currentPath}/themeTemplates/themes.js`,
        `${frontEnd.path}/src/themes.js`,
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
    const { choice, path: backEndPath } = backEnd;
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
      backEndName,
      choice,
      isDark,
      isMaterialUI
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
        `${backEnd.path}/${each.folder}/${each.oldName}`,
        `${backEnd.path}/${each.folder}/${each.newName}`,
        () => {}
      )
    );

    //creating utils dir
    if (emailServiceName || blobServiceName || loggerServiceName) {
      fs.mkdirSync(backEnd.path + "/utils");
    }

    //<---------------------------- For Email service ---------------------------------->
    if (emailServiceName) {
      const emailTemplatePath = path.join(
        __dirname,
        "emailTemplates",
        emailServiceName
      );

      createEmailSevice(
        emailServiceName,
        emailTemplatePath,
        backEnd.path,
        __dirname
      );
    }

    //<---------------------------- For Blob service ---------------------------------->
    if (blobServiceName) {
      const blobTemplatePath = path.join(
        __dirname,
        "blobTemplates",
        blobServiceName
      );
      createBlobService(blobServiceName, blobTemplatePath, backEnd.path);
    }

    //<---------------------------- For Logger service ---------------------------------->
    if (loggerServiceName) {
      const loggerTemplatePath = path.join(__dirname, "logger");

      createLogger(
        backEnd.path,
        loggerServiceName,
        loggerTemplatePath,
        defaultRoute
      );
    }

    //<---------------------------- For Database service ---------------------------------->
    if (dbName) {
      createDbConn(backEnd.path, dbName, defaultRoute, `${currentPath}`);
    }

    //<---------------------------- For ENV file ---------------------------------->
    if (!isDocker) {
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
        writePath = `${backEnd.path}/.env`;
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
      writePath = `${CURR_DIR}/${projectName}/docker-compose.yml`;
      fs.writeFileSync(writePath, contents, "utf8");

      fs.copyFileSync(
        `${currentPath}/dockerTemplate/Dockerfile`,
        `${frontEnd.path}/Dockerfile`
      );
      fs.copyFileSync(
        `${currentPath}/dockerTemplate/Dockerfile`,
        `${backEnd.path}/Dockerfile`
      );
    } else if (frontEnd?.choice === "react") {
      fs.copyFileSync(
        `${dockerPath}/Dockerfile`,
        `${frontEnd.path}/Dockerfile`
      );
    } else if (backEnd?.choice === "node-js") {
      fs.copyFileSync(`${dockerPath}/Dockerfile`, `${backEnd.path}/Dockerfile`);
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
          `${frontEnd.path}/${each.destFolder}/${each.destFileName}`,
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
      writePath = `${frontEnd.path}/src/screens/Users/users.actions.js`;
      fs.writeFileSync(writePath, contents, "utf8");

      if (isCrud) {
        let newContent = fs.readFileSync(`${currentPath}/reduxTemplates/userform/Adduser.js`, "utf8");
        newContent = render(newContent, { isMaterialUI,isCrud,isCrudWithNode });
        writePath = `${frontEnd.path}/src/screens/Users/AddUser.js`;
        fs.writeFileSync(writePath, newContent, "utf8");
        
        let newModalContent = fs.readFileSync(`${currentPath}/reduxTemplates/widgets/modal/Modal.js`, "utf8");
        newModalContent = render (newContent, {isMaterialUI,isCrud, isCrudWithNode});
      }
      if (isCrudWithNode) {
        let newContent = fs.readFileSync(`${currentPath}/reduxTemplates/userform/AdduserForm.js`, "utf8");
        newContent = render(newContent, { isMaterialUI });
        writePath = `${frontEnd.path}/src/screens/Users/AddUser.js`;
        fs.writeFileSync(writePath, newContent, "utf8");

        let newModalContent = fs.readFileSync(`${currentPath}/reduxTemplates/widgets/modal/Modal.js`, "utf8");
        newModalContent = render (newContent, {isMaterialUI,isCrud, isCrudWithNode});
      }
      fsExtra.copy(
        `${currentPath}/reduxTemplates/infrastructure`,
        `${frontEnd.path}/src/infrastructure`,
        function (err) {
          if (err) {
            console.log("An error is occured");
            return console.error(err);
          }
        }
      );
    }

    //<---------------------------------MaterialUI Dark Theme----------------------->

    if (isDark) {
      let newContent = fs.readFileSync(`${currentPath}/templates/react/src/App.js`, "utf8");
      newContent = render(newContent, { isMaterialUI,isCrud,isCrudWithNode,isAuth0,isDark });
      writePath = `${frontEnd.path}/src/App.js`;
      fs.writeFileSync(writePath, newContent, "utf8");
    }

    //<--------------------------------- Vuex ---------------------------->
    if (frontEnd?.choice === "vue") {
      fsExtra.copy(
        `${currentPath}/vuexTemplates/store`,
        `${frontEnd.path}/src/store`,
        function (err) {
          if (err) {
            console.log("An error is occured");
            return console.error(err);
          }
        }
      );
      fsExtra.copy(
        `${currentPath}/vuexTemplates/userModal`,
        `${frontEnd.path}/src/userModal`,
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
        `${frontEnd.path}/src/app/reducers`,
        function (err) {
          if (err) {
            console.log("An error is occured");
            return console.error(err);
          }
        }
      );
      fsExtra.copy(
        `${currentPath}/ngrxTemplates/modules`,
        `${frontEnd.path}/src/app/modules`,
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

    const package = { name: "@auth0/auth0-spa-js", version: "^1.10.0" };
    updatePackage(frontEnd.path, package);

    filesMap.map((each) => {
      fs.copyFile(
        `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
        `${frontEnd.path}/${each.destFileName}`,
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
    writePath = `${frontEnd.path}/src/react-spa.js`;
    fs.writeFileSync(writePath, newContent, "utf8");
  } else if (answers["authenticationChoice"] === "Cognito") {
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
    updatePackage(frontEnd.path, package);

    filesMap.map(() => {
      fs.copyFile(
        `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
        `${frontEnd.path}/${each.destFolder}/${each.destFileName}`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
    });
  }

  projectInfo(frontEnd, backEnd, answers);
  projectSetUp(frontEnd, backEnd, answers);
  projectExecutionCommands(frontEnd, backEnd, answers);
});
