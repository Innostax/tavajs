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

  const isStore = Boolean(answers["store"]);
  const isDark = Boolean(answers["theme"] == "light-dark-mode");
  const isCrud = Boolean(answers["CRUD"]);
  const isDocker = Boolean(answers["dockerService"]);
  const isCrudWithNode = Boolean(answers["reactNodeCrud"] || answers["vueNodeCrud"]);

  const isAuth0 = authenticationChoice === "Auth0";
  const isCognito = authenticationChoice === "Cognito";
  const isOkta = authenticationChoice === "Okta";
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
      isOkta,
      isCognito,
      isStore,
      isCrudWithNode,
      isCrud,
      frontEndName,
      backEndName,
      choice,
      isDark
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
      isOkta,
      isCognito,
      isStore,
      isCrudWithNode,
      isCrud,
      frontEndName,
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
        isOkta
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
        fs.copyFile(
          `${currentPath}/reduxTemplates/userform/Adduser.js`,
          `${frontEnd.path}/src/screens/Users/AddUser.js`,
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
          `${frontEnd.path}/src/screens/Users/AddUser.js`,
          (err) => {
            if (err) {
              console.log("Error Found:", err);
            }
          }
        );
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
    //<--------------------------------- Vuex ---------------------------->
    if (frontEnd?.choice === "vue") {
      const { choice, path: frontEndPath } = frontEnd;
      const templates = [path.join(__dirname, "vuexTemplates", "store"), path.join(__dirname, "vuexTemplates", "userModal")]
      const backEndStorePath = `${projectName}/${frontEndName}/src/store`;
      const backEndUserModalPath = `${projectName}/${frontEndName}/src/userModal`;
      const frontEndStorePath = `${projectName}/src/store`;
      const frontEndUserModalPath = `${projectName}/src/userModal`;

      fs.mkdirSync(backEnd ? backEndStorePath : frontEndStorePath);
      fs.mkdirSync(backEnd ? backEndUserModalPath : frontEndUserModalPath);

      const projectPaths = backEnd ? [backEndStorePath, backEndUserModalPath] : [frontEndStorePath, frontEndUserModalPath];

      templates.forEach((templatePath, index) => {
        fsExtra.ensureDirSync(frontEndPath);
        createDirectoryContents(
          templatePath,
          projectPaths[index],
          defaultRoute,
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
          backEndName,
          choice,
          isDark,
        );
      })

      if (isCrudWithNode) {
        fsExtra.copy(
          `${currentPath}/vuexTemplates/doAsync`,
          `${frontEnd.path}/src/doAsync`,
          function (err) {
            if (err) {
              console.log("An error is occured");
              return console.error(err);
            }
          }
        );
        fsExtra.copy(
          `${currentPath}/vuexTemplates/httpMethod`,
          `${frontEnd.path}/src/httpMethod`,
          function (err) {
            if (err) {
              console.log("An error is occured");
              return console.error(err);
            }
          }
        );
      }
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

    filesMap.map((each) => {
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
  } else if (answers["authenticationChoice"] === "Okta") {
    fsExtra.copy(
      `${currentPath}/authTemplates/oktaTemplate`,
      `${frontEnd.path}/src/oktaFiles`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
    const filesMap = [
      {
        srcFolder: "envTemplates",
        srcFileName: ".oktaEnv",
        destFolder:  frontEndName,
        destFileName: ".env",
      },
    ];
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

  }

  projectInfo(frontEnd, backEnd, answers);
  projectSetUp(frontEnd, backEnd, answers);
  projectExecutionCommands(frontEnd, backEnd, answers);
});
