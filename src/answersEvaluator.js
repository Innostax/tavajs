#! node
const fsExtra = require("fs-extra");
const path = require("path");
const fs = require("fs");
const createBlobService = require("./utils/createBlobService");
const createDbConn = require("./utils/createDbConn");
const createLogger = require("./utils/createLogger");
const createEmailSevice = require("./utils/createEmailSevice");
const {
  createDirectoryContents,
  updateProjectDependencies,
  updateProjectScripts,
  copyDirectories,
  copyFiles,
  getFilePaths,
} = require("./utils/helper");
// const projectSetUp = require("./utils/projectSetUp");
const projectInfo = require("./utils/projectInfo");
// const projectExecutionCommands = require("./utils/projectExecutionCommands");
const { getProjectDetails } = require("./utils/getProjectDetails");
const { handleRenderEJS } = require("./utils/handleRenderEJS");

const {
  ANGULAR_THEME_FILE_PATHS,
  AUTH0_FILE_PATHS,
  AUTHENTICATIONS,
  COGNITO_FILE_PATHS,
  CYPRESS_DIRECTORY_PATHS,
  CYPRESS_FILE_PATHS,
  JEST_DIRECTORY_PATHS,
  JEST_FILE_PATHS,
  MOCHA_DIRECTORY_PATHS,
  MOCHA_FILE_PATHS,
  NIGHTWATCH_DIRECTORY_PATHS,
  NIGHTWATCH_FILE_PATHS,
  FRAMEWORKS,
  OKTA_FILES_PATHS,
  REACT_THEME_FILE_PATHS,
  REDUX_FILES,
  VUE_THEME_FILE_PATHS,
  // DOCKER_FILE_PATHS,
  REACT_DOCKER_FILE_PATHS,
  NGRX_FILE_PATHS,
  VUEX_FILE_PATHS,
  INFRASTRUCTURE_FILE_PATHS,
  NGRX_CRUD_FILE_PATHS,
  ANGULAR_CRUD_NODE_FILE_PATHS,
  TAILWIND_CSS_FILE_PATHS,
  ANGULAR_DOCKER_FILE_PATHS,
  SMTP,
  SENDGRID,
  AMAZON_SES,
  CICD_FILE_PATHS
} = require("./constants");
const { SCRIPTS } = require("./scripts");
const { DEPENDENCIES, DEV_DEPENDENCIES } = require("./dependencies");

const { ANGULAR, REACT, VUE } = FRAMEWORKS;
const { AUTH0, COGNITO, OKTA } = AUTHENTICATIONS;

const currentPath = path.join(__dirname);
const NODE_JS = "node-js";

let dependencies = [];
let devDependencies = [];
let scripts = [];
let filePaths = [];
let directoryPaths = [];

const handleAnswersEvaluator = async (answers) => {
  const {
    projectName,
    frontEndName,
    frontEndChoice,
    authenticationChoice,
    backEndName,
    defaultRoute,
    dbName,
    emailServiceName,
    blobServiceName,
    loggerServiceName,
    materialuiChoice,
    store,
    CRUD,
    dockerService,
    reactNodeCrud,
    vueNodeCrud,
    theme,
    projectDirectoryPath,
    angularNodeCrud,
    tailwindCssChoice,
    cicdPipelineIntegrate
  } = answers;

  // Project Directory Path
  const CURR_DIR = projectDirectoryPath;
  const isStore = Boolean(store);
  const isThemeProvider = Boolean(theme == "light-dark-mode");
  const isCrud = Boolean(CRUD);
  const isDocker = Boolean(dockerService);
  const isCrudWithNode = Boolean(
    reactNodeCrud || vueNodeCrud || angularNodeCrud
  );
  const isMaterialUI = materialuiChoice;
  const isTailwindCSS = tailwindCssChoice;
  const isCICDPipelineIntegrate = cicdPipelineIntegrate

  const isAuth0 = authenticationChoice === AUTH0;
  const isCognito = authenticationChoice === COGNITO;
  const isOkta = authenticationChoice === OKTA;
  const mongoSelected = dbName === "mongoose";
  const sequelizeSelected = dbName === "postgres" || dbName === "mysql";
  const isWinston = loggerServiceName === "winston";
  const isSentry = loggerServiceName === "sentry";

  /* START: Testcases Framework */
  const isTestCasesFramework = Boolean(answers["testCaseFramework"]);
  const isCypress = answers["testCaseFramework"] === "cypress";
  const isJest = answers["testCaseFramework"] === "jest";
  const isMocha = answers["testCaseFramework"] === "mochaJS";
  const isNightWatch = answers["testCaseFramework"] === "nightwatchJS";
  /* END: Testcases Framework */

  const isSMTP = emailServiceName === SMTP;
  const isSendgrid = emailServiceName === SENDGRID;
  const isAmazonSes = emailServiceName === AMAZON_SES;

  fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {
    if (err) {
      console.error(err);
    }
  });

  const { frontEnd, backEnd } = getProjectDetails(
    `${CURR_DIR}/${projectName}`,
    answers
  );

  const isFrontEndChoiceReact = frontEndChoice === REACT;
  const isFrontEndChoiceAngular = frontEndChoice === ANGULAR;
  const isFrontEndChoiceVue = frontEndChoice === VUE;

  //<---------------------------- For react, angular, vue ---------------------------------->
  if (frontEnd) {
    const { choice, path: frontEndPath } = frontEnd;
    //<------------------------- For Start: CSS Framework dependency ---------------------------->

    if (isFrontEndChoiceReact) {
      if (isMaterialUI) {
        dependencies = [...dependencies, ...DEPENDENCIES.MATERIALUI];
      } else {
        dependencies = [...dependencies, ...DEPENDENCIES.BOOTSTRAP];
      }
    }

    if (isFrontEndChoiceAngular) {
      if (isTailwindCSS) {
        dependencies = [...dependencies, ...DEPENDENCIES.TAILWINDCSS];

        const res = getFilePaths(
          TAILWIND_CSS_FILE_PATHS,
          currentPath,
          frontEnd.path
        );
        filePaths = [...filePaths, ...res];
      } else {
        dependencies = [...dependencies, ...DEPENDENCIES.ANGULARBOOTSTRAP];
      }
    }
    //<------------------------- For End: CSS Framework dependency ---------------------------->
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
      isSendgrid,
      isAmazonSes,
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
      CURR_DIR,
      isJest,
      isCypress,
      isMocha,
      isNightWatch,
      isTailwindCSS,
      blobServiceName,
      isCICDPipelineIntegrate
    );

    //<---------------------------- For Themes integration ---------------------------------->
    if (isThemeProvider && isFrontEndChoiceReact) {
      const res = getFilePaths(
        REACT_THEME_FILE_PATHS,
        currentPath,
        frontEnd.path
      );
      filePaths = [...filePaths, ...res];
    }

    //<----------------------------------- Light/Dark Mode + Vue ------------------------------------------------>
    if (isThemeProvider && isFrontEndChoiceVue) {
      const res = getFilePaths(
        VUE_THEME_FILE_PATHS,
        currentPath,
        frontEnd.path
      );
      filePaths = [...filePaths, ...res];
    }

    //<----------------------------------- Light/Dark Mode + Angular ------------------------------------------------>
    if (isThemeProvider && isFrontEndChoiceAngular) {
      const res = getFilePaths(
        ANGULAR_THEME_FILE_PATHS,
        currentPath,
        frontEnd.path
      );
      filePaths = [...filePaths, ...res];
    }

    //<---------------------------- For TestCases Framework ------------------------------------>
    if (isTestCasesFramework) {
      // CYPRESSS
      if (isCypress) {
        const res = getFilePaths(
          CYPRESS_FILE_PATHS,
          currentPath,
          frontEnd.path
        );
        filePaths = [...filePaths, ...res];

        const cypressDirectoryPaths = getFilePaths(
          CYPRESS_DIRECTORY_PATHS,
          currentPath,
          frontEnd.path
        );
        directoryPaths = [...directoryPaths, ...cypressDirectoryPaths];

        devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.CYPRESS];

        scripts = [...scripts, ...SCRIPTS.CYPRESS];
      }

      if (isJest && isFrontEndChoiceVue) {
        const res = getFilePaths(JEST_FILE_PATHS, currentPath, frontEnd.path);
        filePaths = [...filePaths, ...res];

        const jestDirectoryPaths = getFilePaths(
          JEST_DIRECTORY_PATHS,
          currentPath,
          frontEnd.path
        );
        directoryPaths = [...directoryPaths, ...jestDirectoryPaths];

        devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.JEST];

        scripts = [...scripts, ...SCRIPTS.JEST];
      }

      if (isMocha && isFrontEndChoiceVue) {
        const res = getFilePaths(MOCHA_FILE_PATHS, currentPath, frontEnd.path);
        filePaths = [...filePaths, ...res];

        const mochaDirectoryPaths = getFilePaths(
          MOCHA_DIRECTORY_PATHS,
          currentPath,
          frontEnd.path
        );
        directoryPaths = [...directoryPaths, ...mochaDirectoryPaths];

        devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.MOCHA];

        scripts = [...scripts, ...SCRIPTS.MOCHA];
      }

      if (isNightWatch) {
        const res = getFilePaths(
          NIGHTWATCH_FILE_PATHS,
          currentPath,
          frontEnd.path
        );
        filePaths = [...filePaths, ...res];

        const nightwatchDirectoryPaths = getFilePaths(
          NIGHTWATCH_DIRECTORY_PATHS,
          currentPath,
          frontEnd.path
        );
        directoryPaths = [...directoryPaths, ...nightwatchDirectoryPaths];

        devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.NIGHTWATCH];

        scripts = [...scripts, ...SCRIPTS.NIGHTWATCH];
      }
    }
  }

  //<------------------ CI CD Pipeline ----------------------------------->
  if(frontEnd?.choice === ANGULAR) {
    res = getFilePaths(
      CICD_FILE_PATHS,
      currentPath,
      frontEnd.path
    );
    filePaths = [...filePaths, ...res];
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
      isSendgrid,
      isAmazonSes,
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
      CURR_DIR,
      isJest,
      isCypress,
      isMocha,
      isNightWatch,
      isTailwindCSS,
      blobServiceName,
      isCICDPipelineIntegrate
    );

    const ROUTE_FILES = [
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

    ROUTE_FILES.forEach((each) =>
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
      createBlobService(
        backEnd.path,
        blobServiceName,
        blobTemplatePath,
        backEnd.path
      );
    }

    //<---------------------------- For Logger service ---------------------------------->
    if (loggerServiceName) {
      const loggerTemplatePath = path.join(__dirname, "logger/template");

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
      const envFilePath =
        frontEnd?.choice && backEnd?.choice
          ? `${backEnd.path}/.env`
          : `${CURR_DIR}/${projectName}/.env`;
      handleRenderEJS(
        `${currentPath}/envTemplates/.dbEnv`,
        {
          dbName,
          frontEnd,
          backEnd,
          isAuth0,
          isOkta,
          isSMTP,
          isSendgrid,
          isAmazonSes,
          blobServiceName,
        },
        envFilePath
      );
    }
  }

  //<---------------------------- For Docker integration ---------------------------------->
  if (isDocker) {
    const dockerPath = path.join(__dirname, "dockerTemplate");
    let res = [];

    if (frontEnd?.choice && backEnd?.choice === NODE_JS) {
      if (frontEnd?.choice === REACT) {
        res = getFilePaths(REACT_DOCKER_FILE_PATHS, dockerPath, frontEnd.path);
        filePaths = [...filePaths, ...res];
      } else if (frontEnd?.choice === ANGULAR) {
        res = getFilePaths(
          ANGULAR_DOCKER_FILE_PATHS,
          dockerPath,
          frontEnd.path
        );
        filePaths = [...filePaths, ...res];
      }

      handleRenderEJS(
        `${dockerPath}/db-docker-compose.yml`,
        {
          frontEnd,
          projectName,
          frontEndChoice,
          frontEndName,
          backEndName,
          mongoSelected,
          sequelizeSelected,
        },
        `${CURR_DIR}/${projectName}/docker-compose.yml`
      );

      res = getFilePaths(REACT_DOCKER_FILE_PATHS, dockerPath, backEnd.path);
      filePaths = [...filePaths, ...res];
    } else if (frontEnd?.choice) {
      if (frontEnd?.choice === REACT) {
        res = getFilePaths(REACT_DOCKER_FILE_PATHS, dockerPath, frontEnd.path);
        filePaths = [...filePaths, ...res];
      } else if (frontEnd?.choice === ANGULAR) {
        res = getFilePaths(
          ANGULAR_DOCKER_FILE_PATHS,
          dockerPath,
          frontEnd.path,
          dockerPath
        );
        filePaths = [...filePaths, ...res];
      }

      handleRenderEJS(
        `${dockerPath}/docker-compose.yml`,
        {
          backEnd,
          frontEnd,
          projectName,
          frontEndChoice,
          frontEndName,
          backEndName,
          mongoSelected,
          sequelizeSelected,
        },
        `${CURR_DIR}/docker-compose.yml`
      );
    } else if (backEnd?.choice === NODE_JS) {
      res = getFilePaths(REACT_DOCKER_FILE_PATHS, dockerPath, backEnd.path);
      filePaths = [...filePaths, ...res];

      handleRenderEJS(
        `${dockerPath}/db-docker-compose.yml`,
        {
          frontEnd,
          backEnd,
          projectName,
          frontEndChoice,
          frontEndName,
          backEndName,
          mongoSelected,
          sequelizeSelected,
        },
        `${CURR_DIR}/docker-compose.yml`
      );
    }
  }

  //<---------------------------- For Store integration ---------------------------------->
  if (isStore) {
    //<---------------------------- Redux ---------------------------------->
    if (frontEnd?.choice === REACT) {
      dependencies = [...dependencies, ...DEPENDENCIES.REACT];

      REDUX_FILES.forEach((each) => {
        filePaths = [
          ...filePaths,
          {
            source: `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
            destination: `${frontEnd.path}/${each.destFolder}/${each.destFileName}`,
          },
        ];
      });

      handleRenderEJS(
        `${currentPath}/reduxTemplates/demoUser/users.actions.js`,
        { defaultRoute },
        `${frontEnd.path}/src/screens/Users/users.actions.js`
      );

        handleRenderEJS(
          `${currentPath}/reduxTemplates/userform/DeleteConfirmationModal.js`,
          { isMaterialUI },
          `${frontEnd.path}/src/screens/Users/DeleteConfirmationModal.js`
        );      

      if (isCrud) {
        handleRenderEJS(
          `${currentPath}/reduxTemplates/userform/Adduser.js`,
          { isMaterialUI, isCrud, isCrudWithNode },
          `${frontEnd.path}/src/screens/Users/AddUser.js`
        );
      }
      if (isCrudWithNode) {
        handleRenderEJS(
          `${currentPath}/reduxTemplates/userform/AdduserForm.js`,
          { isMaterialUI },
          `${frontEnd.path}/src/screens/Users/AddUser.js`
        );
      }

      const res = getFilePaths(
        INFRASTRUCTURE_FILE_PATHS,
        currentPath,
        frontEnd.path
      );
      directoryPaths = [...directoryPaths, ...res];
    }

    //<---------------------------------MaterialUI Dark Theme----------------------->

    if (isThemeProvider && isFrontEndChoiceReact) {
      handleRenderEJS(
        `${currentPath}/templates/react/src/App.js`,
        {
          isMaterialUI,
          isCrud,
          isCrudWithNode,
          isAuth0,
          isThemeProvider,
          isOkta,
          isCognito,
        },
        `${frontEnd.path}/src/App.js`
      );
    }

    //<--------------------------------- Vuex ---------------------------->
    if (frontEnd?.choice === VUE) {
      const { choice, path: frontEndPath } = frontEnd;
      const templates = [
        path.join(__dirname, "vuexTemplates", "store"),
        path.join(__dirname, "vuexTemplates", "userModal"),
      ];
      const backEndStorePath = `${projectName}/${frontEndName}/src/store`;
      const backEndUserModalPath = `${projectName}/${frontEndName}/src/userModal`;
      const frontEndStorePath = `${projectName}/src/store`;
      const frontEndUserModalPath = `${projectName}/src/userModal`;

      fs.mkdirSync(
        backEnd
          ? `${CURR_DIR}/${backEndStorePath}`
          : `${CURR_DIR}/${frontEndStorePath}`
      );
      fs.mkdirSync(
        backEnd
          ? `${CURR_DIR}/${backEndUserModalPath}`
          : `${CURR_DIR}/${frontEndUserModalPath}`
      );

      const projectPaths = backEnd
        ? [backEndStorePath, backEndUserModalPath]
        : [frontEndStorePath, frontEndUserModalPath];

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
          isSendgrid,
          isAmazonSes,
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
          CURR_DIR,
          isJest,
          isCypress,
          isMocha,
          isNightWatch,
          isTailwindCSS,
          blobServiceName,
          isCICDPipelineIntegrate
        );
      });

      if (isCrudWithNode) {
        const res = getFilePaths(VUEX_FILE_PATHS, currentPath, frontEnd.path);
        directoryPaths = [...directoryPaths, ...res];
      }
    }
    //<--------------------------------- Ngrx ---------------------------->
    if (frontEnd?.choice === ANGULAR) {
      const res = getFilePaths(NGRX_FILE_PATHS, currentPath, frontEnd.path);
      directoryPaths = [...directoryPaths, ...res];

      if (isCrud) {
        fs.mkdirSync(
          `${frontEnd.path}/src/app/shared/components/user-actions-modal`
        );
        const res = getFilePaths(
          NGRX_CRUD_FILE_PATHS,
          currentPath,
          frontEnd.path
        );
        directoryPaths = [...directoryPaths, ...res];
        handleRenderEJS(
          `${currentPath}/ngrxTemplates/user-actions-modal/user-actions-modal.component.html`,
          { isTailwindCSS },
          `${frontEnd.path}/src/app/shared/components/user-actions-modal/user-actions-modal.component.html`
        );
      }
    }
  }

  //<-------------- For angular node crud ------------------->
  if (frontEnd?.choice === ANGULAR && isCrudWithNode) {
    fs.mkdirSync(
      `${frontEnd.path}/src/app/shared/components/user-actions-modal`
    );
    const res = getFilePaths(
      ANGULAR_CRUD_NODE_FILE_PATHS,
      currentPath,
      frontEnd.path
    );
    directoryPaths = [...directoryPaths, ...res];
    handleRenderEJS(
      `${currentPath}/ngrxTemplates/user-actions-modal/user-actions-modal.component.html`,
      { isTailwindCSS },
      `${frontEnd.path}/src/app/shared/components/user-actions-modal/user-actions-modal.component.html`
    );
    handleRenderEJS(
      `${currentPath}/angularApiTemplates/base-url.ts`,
      { defaultRoute },
      `${frontEnd.path}/src/app/shared/base-url.ts`
    );
  }

  //<---------------------------- For Authentication service ---------------------------------->
  if (answers["authenticationChoice"] === AUTH0) {
    AUTH0_FILE_PATHS.forEach((each) => {
      handleRenderEJS(
        `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
        { frontEndChoice },
        `${frontEnd.path}/${each.destFileName}`
      );
    });

    if (isFrontEndChoiceAngular) {
      dependencies = [...dependencies, ...DEPENDENCIES.AUTH0_SPA];
      dependencies = [...dependencies, ...DEPENDENCIES.AUTH0_ANGULAR];
    }

    if (isFrontEndChoiceReact) {
      dependencies = [...dependencies, ...DEPENDENCIES.AUTH0_SPA];

      const reactSpaPath = path.join(__dirname, "authTemplates");
      handleRenderEJS(
        `${reactSpaPath}/react-spa.js`,
        { isStore },
        `${frontEnd.path}/src/react-spa.js`
      );
    }
    if (isFrontEndChoiceVue) {
      dependencies = [...dependencies, ...DEPENDENCIES.AUTH0_VUE];
    }
  } else if (answers["authenticationChoice"] === COGNITO) {
    if (isFrontEndChoiceVue) {
      COGNITO_FILE_PATHS.forEach((each) => {
        handleRenderEJS(
          `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
          { frontEndChoice },
          `${frontEnd.path}/${each.destFileName}`
        );
      });
      dependencies = [...dependencies, ...DEPENDENCIES.COGNITO_VUE];
    }
    if (isFrontEndChoiceAngular) {
      dependencies = [...dependencies, ...DEPENDENCIES.COGNITO_ANGULAR];
      COGNITO_FILE_PATHS.forEach((each) => {
        filePaths = [
          ...filePaths,
          {
            source: `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
            destination: `${frontEnd.path}/${each.destFolder}/${each.destFileName}`,
          },
        ];
      });
      copyFiles(filePaths);
    }
    if (isFrontEndChoiceReact) {
      dependencies = [...dependencies, ...DEPENDENCIES.COGNITO_REACT];

      COGNITO_FILE_PATHS.forEach((each) => {
        handleRenderEJS(
          `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
          { frontEndChoice },
          `${frontEnd.path}/${each.destFileName}`
        );
      });
    }
  } else if (answers["authenticationChoice"] === OKTA) {
    dependencies = [...dependencies, ...DEPENDENCIES.OKTA_AUTH_JS];
    if (isFrontEndChoiceReact)
      dependencies = [...dependencies, ...DEPENDENCIES.OKTA_REACT];
    else if (isFrontEndChoiceAngular)
      dependencies = [...dependencies, ...DEPENDENCIES.OKTA_ANGULAR];
    else if (isFrontEndChoiceVue)
      dependencies = [...dependencies, ...DEPENDENCIES.OKTA_VUE];

    if (isFrontEndChoiceReact || isFrontEndChoiceAngular) {
      directoryPaths = [
        ...directoryPaths,
        {
          source: `${currentPath}/authTemplates/oktaTemplate`,
          destination: `${frontEnd.path}/src/oktaFiles`,
        },
      ];
    }

    OKTA_FILES_PATHS.forEach((each) => {
      handleRenderEJS(
        `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
        { frontEndChoice },
        `${frontEnd.path}/${each.destFileName}`
      );
    });
  }

  copyDirectories(directoryPaths);
  copyFiles(filePaths);

  // These methods are used to update the dependencies and scripts respectively.
  if (frontEnd) {
    updateProjectDependencies(frontEnd.path, dependencies, devDependencies);
    updateProjectScripts(frontEnd.path, scripts);
  }

  projectInfo(frontEnd, backEnd, answers);
  // projectSetUp(frontEnd, backEnd, answers);
  // projectExecutionCommands(frontEnd, backEnd, answers);
};

module.exports = { handleAnswersEvaluator };
