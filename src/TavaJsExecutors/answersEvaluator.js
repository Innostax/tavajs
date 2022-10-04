#! node
const fsExtra = require("fs-extra");
const path = require("path");
const fs = require("fs");
const createBlobService = require("../utils/createBlobService");
const createDbConn = require("../utils/createDbConn");
const createLogger = require("../utils/createLogger");
const createEmailSevice = require("../utils/createEmailSevice");
const {
  createDirectoryContents,
  updateProjectDependencies,
  updateProjectScripts,
  copyDirectories,
  copyFiles,
  getFilePaths,
} = require("../utils/helper");
const projectInfo = require("../utils/projectInfo");
const { getProjectDetails } = require("../utils/getProjectDetails");
const { handleRenderEJS } = require("../utils/handleRenderEJS");

const {
  ANGULAR_THEME_FILE_PATHS,
  AUTH0_FILE_PATHS,
  AUTHENTICATIONS,
  COGNITO_FILE_PATHS,
  CSS_FRAMEWORKS,
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
  TAILWIND_REACT_FILE_PATHS,
  TAILWIND_VUE_FILE_PATHS,
  ANGULAR_DOCKER_FILE_PATHS,
  DATABASES,
  LOGGER_SERVICES,
  EMAIL_SERVICES,
  TESTCASE_FRAMEWORKS,
  NETWORK_INFORMER_VUE_FILE_PATHS,
  REACT_NETWORKSTATUS_FILES_PATH,
  CICD_FILE_PATHS_VUE,
  CICD_FILE_PATHS_REACT,
} = require("./constants");
const { SCRIPTS } = require("./scripts");
const { DEPENDENCIES, DEV_DEPENDENCIES } = require("./dependencies");

const { ANGULAR, REACT, VUE } = FRAMEWORKS;
const { AUTH0, COGNITO, OKTA } = AUTHENTICATIONS;
const { POSTGRES, MYSQL, MONGOOSE } = DATABASES;
const { WINSTON, SENTRY } = LOGGER_SERVICES;
const { SMTP, SENDGRID, AMAZON_SES } = EMAIL_SERVICES;
const { CYPRESS, JEST, MOCHAJS, NIGHTWATCHJS } = TESTCASE_FRAMEWORKS;
const { MATERIAL, BOOTSTRAP, TAILWIND } = CSS_FRAMEWORKS;

const currentPath = path.join(__dirname, "../");
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
    cssFrameworkChoice,
    store,
    CRUD,
    dockerService,
    reactNodeCrud,
    vueNodeCrud,
    theme,
    projectDirectoryPath,
    angularNodeCrud,
    networkInformer,
    cicdPipelineIntegrate,
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
  const isMaterialUI = cssFrameworkChoice === MATERIAL;
  const isBootstrap = cssFrameworkChoice === BOOTSTRAP;
  const isTailWind = cssFrameworkChoice === TAILWIND;
  const isNetworkInformer = networkInformer;
  const isCICDPipelineIntegrate = cicdPipelineIntegrate;

  const isAuth0 = authenticationChoice === AUTH0;
  const isCognito = authenticationChoice === COGNITO;
  const isOkta = authenticationChoice === OKTA;
  const mongoSelected = dbName === MONGOOSE;
  const sequelizeSelected = dbName === POSTGRES || dbName === MYSQL;
  const isWinston = loggerServiceName === WINSTON;
  const isSentry = loggerServiceName === SENTRY;

  /* START: Testcases Framework */
  const isTestCasesFramework = Boolean(answers?.testCaseFramework);
  const isCypress = answers?.testCaseFramework === CYPRESS;
  const isJest = answers?.testCaseFramework === JEST;
  const isMocha = answers?.testCaseFramework === MOCHAJS;
  const isNightWatch = answers?.testCaseFramework === NIGHTWATCHJS;
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
  const isBackEnd = Boolean(backEnd);

  //<---------------------------- For react, angular, vue ---------------------------------->
  if (frontEnd) {
    const { choice, path: frontEndPath } = frontEnd;
    //<------------------------- For Start: CSS Framework dependency ---------------------------->

    if (isFrontEndChoiceReact) {
      if (isMaterialUI) {
        dependencies = [...dependencies, ...DEPENDENCIES.MATERIALUI];
      }
      if (isBootstrap) {
        dependencies = [...dependencies, ...DEPENDENCIES.BOOTSTRAP];
      }
      if (isTailWind) {
        dependencies = [...dependencies, ...DEPENDENCIES.TAILWINDREACT];
        const res = getFilePaths(
          TAILWIND_REACT_FILE_PATHS,
          currentPath,
          frontEnd.path
        );
        filePaths = [...filePaths, ...res];
      }
      if (isNetworkInformer) {
        const res = getFilePaths(
          REACT_NETWORKSTATUS_FILES_PATH,
          currentPath,
          frontEnd.path
        );
        filePaths = [...filePaths, ...res];
      }
    }

    if (isFrontEndChoiceAngular) {
      if (isTailWind) {
        dependencies = [...dependencies, ...DEPENDENCIES.TAILWINDCSS];

        const res = getFilePaths(
          TAILWIND_CSS_FILE_PATHS,
          currentPath,
          frontEnd.path
        );
        filePaths = [...filePaths, ...res];
      } else if (isBootstrap) {
        dependencies = [...dependencies, ...DEPENDENCIES.ANGULARBOOTSTRAP];
      }
    }
    if (isFrontEndChoiceVue) {
      if (isTailWind) {
        dependencies = [...dependencies, ...DEPENDENCIES.TAILWINDVUE];
        const res = getFilePaths(
          TAILWIND_VUE_FILE_PATHS,
          currentPath,
          frontEnd.path
        );
        filePaths = [...filePaths, ...res];
      } else {
        dependencies = [...dependencies, ...DEPENDENCIES.BOOTSTRAPVUE];
      }
    }
    //<------------------------- For End: CSS Framework dependency ---------------------------->
    const templatePath = path.join(
      currentPath,
      "Frameworks/WebFrameworks",
      choice
    );

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
      isBootstrap,
      isTailWind,
      CURR_DIR,
      isJest,
      isCypress,
      isMocha,
      isNightWatch,
      blobServiceName,
      isNetworkInformer,
      isBackEnd,
      isCICDPipelineIntegrate
    );

    //<------------------------------- Light/Dark Mode + React ---------------------------------->
    if (isThemeProvider && isFrontEndChoiceReact) {
      const res = getFilePaths(
        REACT_THEME_FILE_PATHS,
        currentPath,
        frontEnd.path
      );
      filePaths = [...filePaths, ...res];
      if (isBootstrap || isTailWind) {
        handleRenderEJS(
          `${currentPath}/Providers/ThemeProviders/react-themes/theme.js`,
          { isBootstrap, isTailWind },
          `${frontEnd.path}/src/theme.js`
        );
      }
    }

    //<----------------------------------- Light/Dark Mode + Vue ------------------------------------------------>
    if (isThemeProvider && isFrontEndChoiceVue) {
      const res = getFilePaths(
        VUE_THEME_FILE_PATHS,
        currentPath,
        frontEnd.path
      );
      res.forEach((each) => {
        handleRenderEJS(
          each.source,
          { isBootstrap, isTailWind },
          each.destination
        );
      });
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

    //<----------------------------------- Network Informer + Vue ------------------------------------------------>
    if (isNetworkInformer && isFrontEndChoiceVue) {
      const res = getFilePaths(
        NETWORK_INFORMER_VUE_FILE_PATHS,
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

        fs.mkdirSync(`${frontEnd.path}/__tests__`);
        handleRenderEJS(
          `${currentPath}/Frameworks/TestCasesFrameworks/JestTests/TestScripts/app.spec.js`,
          { frontEndChoice },
          `${frontEnd.path}/__tests__/app.spec.js`
        );
        devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.JEST_VUE];

        scripts = [...scripts, ...SCRIPTS.JEST_VUE];
      }
      
      if (isJest && isFrontEndChoiceReact) {
        fs.mkdirSync(`${frontEnd.path}/src/__tests__`);

        handleRenderEJS(
          `${currentPath}/Frameworks/TestCasesFrameworks/JestTests/TestScripts/app.spec.js`,
          { frontEndChoice },
          `${frontEnd.path}/src/__tests__/app.spec.js`
        );
        devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.JEST_REACT];

        scripts = [...scripts, ...SCRIPTS.JEST_REACT];
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
  if (isCICDPipelineIntegrate) {
    let res;

    fs.mkdirSync(`${frontEnd.path}/.github`);
    fs.mkdirSync(`${frontEnd.path}/.github/workflows`);
  
    if(isFrontEndChoiceAngular) {
      handleRenderEJS(
        `${currentPath}/Providers/CICDWorkflow/angular-build.yml`,
        { isCICDPipelineIntegrate },
        `${frontEnd.path}/.github/workflows/build.yml`,
      );
    }
    if(isFrontEndChoiceVue) {
      res = getFilePaths(CICD_FILE_PATHS_VUE, currentPath, frontEnd.path);
      filePaths = [...filePaths, ...res];
    }
    if(isFrontEndChoiceReact) {
      res = getFilePaths(CICD_FILE_PATHS_REACT, currentPath, frontEnd.path);
      filePaths = [...filePaths, ...res];
    }
  }

  //<---------------------------- node-js ---------------------------------->
  if (backEnd) {
    const { choice, path: backEndPath } = backEnd;
    const templatePath = path.join(
      currentPath,
      "Frameworks/BackendFrameworks",
      choice
    );
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
      isBootstrap,
      isTailWind,
      CURR_DIR,
      isJest,
      isCypress,
      isMocha,
      isNightWatch,
      blobServiceName,
      isNetworkInformer,
      isBackEnd,
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
        currentPath,
        "Services/EmailServices",
        emailServiceName
      );
      createEmailSevice(
        emailServiceName,
        emailTemplatePath,
        backEnd.path,
        currentPath
      );
    }

    //<---------------------------- For Blob service ---------------------------------->
    if (blobServiceName) {
      const blobTemplatePath = path.join(
        currentPath,
        "Services/BlobServices",
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
      const loggerTemplatePath = path.join(
        currentPath,
        "Services/LoggerServices"
      );

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
        `${currentPath}/Environments/BackendEnvironment/.dbEnv`,
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
    const dockerPath = path.join(currentPath, "Services/DockerServices");
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
        `${currentPath}/StateManagement/reduxTemplates/demoUser/users.actions.js`,
        { defaultRoute },
        `${frontEnd.path}/src/screens/Users/users.actions.js`
      );
      handleRenderEJS(
        `${currentPath}/StateManagement/reduxTemplates/userform/DeleteConfirmationModal.js`,
        { isBootstrap, isTailWind, isMaterialUI },
        `${frontEnd.path}/src/screens/Users/DeleteConfirmationModal.js`
      );
      if (!isBackEnd) {
        handleRenderEJS(
          `${currentPath}/StateManagement/reduxTemplates/userform/Adduser.js`,
          { isMaterialUI, isBootstrap, isTailWind, isBackEnd },
          `${frontEnd.path}/src/screens/Users/AddUser.js`
        );
      }
      if (isBackEnd) {
        handleRenderEJS(
          `${currentPath}/StateManagement/reduxTemplates/userform/AdduserForm.js`,
          { isMaterialUI, isBootstrap, isTailWind },
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
        `${currentPath}/Frameworks/WebFrameworks/react/src/App.js`,
        {
          isMaterialUI,
          isBootstrap,
          isTailWind,
          isBackEnd,
          isAuth0,
          isThemeProvider,
          isOkta,
          isCognito,
          isNetworkInformer,
        },
        `${frontEnd.path}/src/App.js`
      );
    }

    //<--------------------------------- Vuex ---------------------------->
    if (frontEnd?.choice === VUE) {
      const { choice, path: frontEndPath } = frontEnd;
      const templates = [
        path.join(currentPath, "StateManagement/vuexTemplates", "store"),
        isBootstrap
          ? path.join(
              currentPath,
              "StateManagement/vuexTemplates/bootstrap",
              "userModal"
            )
          : path.join(
              currentPath,
              "StateManagement/vuexTemplates/tailwind",
              "userModal"
            ),
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
          isBootstrap,
          isTailWind,
          CURR_DIR,
          isJest,
          isCypress,
          isMocha,
          isNightWatch,
          blobServiceName,
          isNetworkInformer,
          isBackEnd,
          isCICDPipelineIntegrate
        );
      });

      if (isBackEnd) {
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
          `${currentPath}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.html`,
          { isTailWind, isBootstrap },
          `${frontEnd.path}/src/app/shared/components/user-actions-modal/user-actions-modal.component.html`
        );
        handleRenderEJS(
          `${currentPath}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.ts`,
          { isCrud, isCrudWithNode },
          `${frontEnd.path}/src/app/shared/components/user-actions-modal/user-actions-modal.component.ts`
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
      `${currentPath}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.html`,
      { isTailWind, isBootstrap },
      `${frontEnd.path}/src/app/shared/components/user-actions-modal/user-actions-modal.component.html`
    );
    handleRenderEJS(
      `${currentPath}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.ts`,
      { isCrud, isCrudWithNode },
      `${frontEnd.path}/src/app/shared/components/user-actions-modal/user-actions-modal.component.ts`
    );
    handleRenderEJS(
      `${currentPath}/Services/HttpServices/AngularServices/base-url.ts`,
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

      const reactSpaPath = path.join(
        currentPath,
        "Services/AuthenticationServices/authTemplates/"
      );
      handleRenderEJS(
        `${reactSpaPath}react-spa.js`,
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
          source: `${currentPath}/Services/AuthenticationServices/authTemplates/oktaTemplate/`,
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
};

module.exports = { handleAnswersEvaluator };
