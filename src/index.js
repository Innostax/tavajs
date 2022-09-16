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
const { createDirectoryContents, updateProjectDependencies, updateProjectScripts } = require("./utils/helper");
const projectSetUp = require("./utils/projectSetUp");
const projectInfo = require("./utils/projectInfo");
const projectExecutionCommands = require("./utils/projectExecutionCommands");
const { getProjectDetails } = require("./utils/getProjectDetails");
const questionnaire = require("./questionnaire");
const { FRAMEWORKS, AUTHENTICATIONS } = require("./constants")

const { ANGULAR, REACT, VUE } = FRAMEWORKS
const { AUTH0, COGNITO, OKTA } = AUTHENTICATIONS

const currentPath = path.join(__dirname);
const CURR_DIR = process.cwd();
const NODE_JS = "node-js"
const EMPTY_STRING = ""

inquirer.prompt(questionnaire).then(async (answers) => {
  const projectName = answers["projectName"];
  const frontEndName = answers["frontEndName"];
  const frontEndChoice = answers["frontEndChoice"];
  const authenticationChoice = answers["authenticationChoice"];
  const backEndName = answers["backEndName"];
  const defaultRoute = answers["defaultRoute"];
  const dbName = answers["dbName"];
  const emailServiceName = answers["emailServiceName"];
  const blobServiceName = answers["blobServiceName"];
  const loggerServiceName = answers["loggerServiceName"];
  const isMaterialUI = answers["materialuiChoice"];

  const isStore = Boolean(answers["store"]);
  const isThemeProvider = Boolean(answers["theme"] == "light-dark-mode");
  const isCrud = Boolean(answers["CRUD"]);
  const isDocker = Boolean(answers["dockerService"]);
  const isCrudWithNode = Boolean(answers["reactNodeCrud"] || answers["vueNodeCrud"] || answers["angularNodeCrud"]);
  
  const isAuth0 = authenticationChoice === AUTH0;
  const isCognito = authenticationChoice === COGNITO ;
  const isOkta = authenticationChoice === OKTA;
  const mongoSelected = dbName === "mongoose";
  const sequelizeSelected = dbName === "postgres" || dbName === "mysql";
  const isWinston = loggerServiceName === "winston";
  const isSentry = loggerServiceName === "sentry";

  /* START: Testcases Framework */
  const isTestCasesFramework = Boolean(answers["testCaseFramework"]);
  const isCypress = answers["testCaseFramework"] === "cypress";
  /* END: Testcases Framework */

  const isSMTP = emailServiceName === "smtp";
  
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
      backEndName,
      choice,
      isThemeProvider,
      isMaterialUI
    );

    //<---------------------------- For Themes integration ---------------------------------->
    if (isThemeProvider && frontEndChoice === REACT) {
      fs.copyFile(
        `${currentPath}/themeProviderTemplates/react-themes/theme.js`,
        `${frontEnd.path}/src/theme.js`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );

      fs.copyFile(
        `${currentPath}/themeProviderTemplates/theme.constants.js`,
        `${frontEnd.path}/src/theme.constants.js`,
        (err) => {
          if (err) {
            console.error(`Error while copying theme's static files: ${err}`);
          }
        }
      );
    }

    //<----------------------------------- Light/Dark Mode + Vue ------------------------------------------------>
    if (isThemeProvider && frontEndChoice === VUE) {
      fs.copyFile(
        `${currentPath}/themeProviderTemplates/vue-themes/theme.vue`,
        `${frontEnd.path}/src/theme.vue`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
      
      fs.copyFile(
        `${currentPath}/themeProviderTemplates/theme.constants.js`,
        `${frontEnd.path}/src/theme.constants.js`,
        (err) => {
          if (err) {
            console.error(`Error while copying theme's static files: ${err}`);
          }
        }
      );
    }

    //<----------------------------------- Light/Dark Mode + Angular ------------------------------------------------>
    if (isThemeProvider && frontEndChoice === ANGULAR) {
      fsExtra.copy(
        `${currentPath}/themeTemplates/angular-themes`,
        `${frontEnd.path}/src/angular-themes`,
        (err) => {
          if (err) console.log("Unable to integrate theme template, Ref:", err);
        }
      );
    }

    //<---------------------------- For TestCases Framework ------------------------------------>
    if (isTestCasesFramework) {
      // CYPRESSS
      if (isCypress) {
        fs.copyFile(
          `${currentPath}/uiTests/CypressTests/cypress.config.js`,
          `${frontEnd.path}/cypress.config.js`,
          (err) => {
            if (err) {
              console.error(
                `Error occurred while coping the config file for cypress: ${err}`
              );
            }
          }
        );
        fsExtra.copy(
          `${currentPath}/uiTests/CypressTests/TestScripts`,
          `${frontEnd.path}`,
          (err) => {
            if (err) {
              console.error(
                `Error occurred while coping the test scripts for cypress: ${err}`
              );
            }
          }
        );

        const cypressDependency = { name: "cypress", version: "^10.7.0" };
        updateProjectDependencies(frontEnd.path, cypressDependency);

        const cypressScript = {
          name: "cypress",
          command:
            "npm install cypress --dev && npx cypress install && npx cypress open",
        };
        updateProjectScripts(frontEnd.path, cypressScript);
      }
      // MochaJS
      // JEST
      // JESMINE
      // KARMA
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
      backEndName,
      choice,
      isThemeProvider,
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
      let dbEnvFile = fs.readFileSync(
        `${currentPath}/envTemplates/.dbEnv`,
        "utf8"
      );
      dbEnvFile = render(dbEnvFile, {
        dbName,
        frontEnd,
        backEnd,
        isAuth0,
        isOkta,
        isSMTP
      });
      const envFilePath = frontEnd?.choice && backEnd?.choice ? `${backEnd.path}/.env` : `${CURR_DIR}/${projectName}/.env`
      fs.writeFileSync(envFilePath, dbEnvFile, "utf8");
    }
  }

  //<---------------------------- For Docker integration ---------------------------------->
  if (isDocker) {
    const dockerPath = path.join(__dirname, "dockerTemplate");
    if (frontEnd?.choice === REACT && backEnd?.choice === NODE_JS) {
      let dockerFile = fs.readFileSync(
        `${dockerPath}/db-docker-compose.yml`,
        "utf8"
      );
      dockerFile = render(dockerFile, {
        frontEndName,
        backEndName,
        mongoSelected,
        sequelizeSelected,
      });
      const dockerFilePath = `${CURR_DIR}/${projectName}/docker-compose.yml`;
      fs.writeFileSync(dockerFilePath, dockerFile, "utf8");

      fs.copyFileSync(
        `${currentPath}/dockerTemplate/Dockerfile`,
        `${frontEnd.path}/Dockerfile`
      );
      fs.copyFileSync(
        `${currentPath}/dockerTemplate/Dockerfile`,
        `${backEnd.path}/Dockerfile`
      );
    } else if (frontEnd?.choice === REACT) {
      fs.copyFileSync(
        `${dockerPath}/Dockerfile`,
        `${frontEnd.path}/Dockerfile`
      );
    } else if (backEnd?.choice === NODE_JS) {
      fs.copyFileSync(`${dockerPath}/Dockerfile`, `${backEnd.path}/Dockerfile`);
    }
  }

  //<---------------------------- For Store integration ---------------------------------->
  if (isStore) {
    //<---------------------------- Redux ---------------------------------->
    if (frontEnd?.choice === REACT) {
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
      let usersActionsFile = fs.readFileSync(
        `${currentPath}/reduxTemplates/demoUser/users.actions.js`,
        "utf8"
      );
      usersActionsFile = render(usersActionsFile, {
        defaultRoute,
      });
      const usersActionsFilePath = `${frontEnd.path}/src/screens/Users/users.actions.js`;
      fs.writeFileSync(usersActionsFilePath, usersActionsFile, "utf8");

      if (isCrud) {
        let addUserFile = fs.readFileSync(`${currentPath}/reduxTemplates/userform/Adduser.js`, "utf8");
        addUserFile = render(addUserFile, { isMaterialUI, isCrud, isCrudWithNode });
        const addUserFilePath = `${frontEnd.path}/src/screens/Users/AddUser.js`;
        fs.writeFileSync(addUserFilePath, addUserFile, "utf8");
        
        // let modalFile = fs.readFileSync(`${currentPath}/reduxTemplates/widgets/modal/Modal.js`, "utf8");
        // modalFile = render (modalFile, { isMaterialUI, isCrud, isCrudWithNode });
      }
      if (isCrudWithNode) {
        let addUserFormFile = fs.readFileSync(`${currentPath}/reduxTemplates/userform/AdduserForm.js`, "utf8");
        addUserFormFile = render(addUserFormFile, { isMaterialUI });
        const addUserFilePath = `${frontEnd.path}/src/screens/Users/AddUser.js`;
        fs.writeFileSync(addUserFilePath, addUserFormFile, "utf8");

        // let modalFile = fs.readFileSync(`${currentPath}/reduxTemplates/widgets/modal/Modal.js`, "utf8");
        // modalFile = render (modalFile, { isMaterialUI, isCrud, isCrudWithNode });
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

    if (isThemeProvider) {
      let appFile = fs.readFileSync(`${currentPath}/templates/react/src/App.js`, "utf8");
      appFile = render(appFile, { isMaterialUI, isCrud, isCrudWithNode, isAuth0, isThemeProvider, isOkta });
      const appFilePath = `${frontEnd.path}/src/App.js`;
      fs.writeFileSync(appFilePath, appFile, "utf8");
    }

    //<--------------------------------- Vuex ---------------------------->
    if (frontEnd?.choice === VUE) {
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
          backEndName,
          choice,
          isThemeProvider,
          isMaterialUI,
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
    if (frontEnd?.choice === ANGULAR ) {
      fsExtra.copy(
        `${currentPath}/ngrxTemplates/store`,
        `${frontEnd.path}/src/app/utils/store`,
        function (err) {
          if (err) {
            console.log("An error is occured");
            return console.error(err);
          }
        }
      );
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
      if(isCrud) {
        fsExtra.copy(
          `${currentPath}/ngrxTemplates/add-user-modal`,
          `${frontEnd.path}/src/app/shared/components/add-user-modal`,
          function (err) {
            if (err) {
              console.log("An error is occured");
              return console.error(err);
            }
          }
        );
      }
    }
  }

  //<-------------- For angular node crud ------------------->
  if (frontEnd?.choice === ANGULAR && isCrudWithNode) {
    
    fsExtra.copy(
      `${currentPath}/angularApiTemplates/services`,
      `${frontEnd.path}/src/app/shared/services`,
      function (err) {
        if (err) {
          console.error(`Error while copying Services component: ${err}`);
        }
      }
    );
    fsExtra.copy(
      `${currentPath}/angularApiTemplates/add-user-modal`,
      `${frontEnd.path}/src/app/shared/components/add-user-modal`,
      function (err) {
        if (err) {
          console.error(`Error while copying add-user-modal component: ${err}`);
        }
      }
    );
  }

  //<---------------------------- For Authentication service ---------------------------------->
  if (answers["authenticationChoice"] === AUTH0) {
    const filesMap = [
      {
        srcFolder: "envTemplates",
        srcFileName: ".authEnv",
        destFileName: ".env",
      },
    ];

    filesMap.map((each) => {
      let envFile = fs.readFileSync( `${currentPath}/${each.srcFolder}/${each.srcFileName}`, "utf8");
      envFile = render(envFile, { frontEndChoice });
      const envFilePath = `${frontEnd.path}/${each.destFileName}`;
      fs.writeFileSync(envFilePath, envFile, "utf8");
    });
    
    if (frontEndChoice === "react") {
      const auth0Dependency = { name: "@auth0/auth0-spa-js", version: "^1.10.0" };
      updateProjectDependencies(frontEnd.path, auth0Dependency);

      const reactSpaPath = path.join(__dirname, "authTemplates");
      let reactAuth0SPAFile = fs.readFileSync(`${reactSpaPath}/react-spa.js`, "utf8");
      reactAuth0SPAFile = render(reactAuth0SPAFile, { isStore });
      const auth0SPAFilePath = `${frontEnd.path}/src/react-spa.js`;
      fs.writeFileSync(auth0SPAFilePath, reactAuth0SPAFile, "utf8");
    }
    if (frontEndChoice === VUE) {
      const auth0Dependency = { name: "@auth0/auth0-vue", version: "^1.0.2" };
      updateProjectDependencies(frontEnd.path, auth0Dependency);
    }
  } else if (answers["authenticationChoice"] === COGNITO) {
    const filesMap = [
      {
        srcFolder: "envTemplates",
        srcFileName: ".cognitoEnv",
        destFolder: EMPTY_STRING,
        destFileName: ".env",
      },
    ];
    const auth0Dependency = { name: "@auth0/auth0-spa-js", version: "^1.10.0" };
    updateProjectDependencies(frontEnd.path, auth0Dependency);

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
  } else if (answers["authenticationChoice"] === OKTA) {
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
    if (frontEndChoice === ANGULAR) {
      const oktaDependencies = [
        { name: "@okta/okta-angular", version: "5.1" },
        { name: "@okta/okta-auth-js", version: "6.0" }
      ]
      oktaDependencies.forEach(each => {
        updateProjectDependencies(frontEnd.path, each);
      });
    }  
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
