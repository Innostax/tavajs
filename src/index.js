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
const {
  createDirectoryContents,
  updateProjectDependencies,
  updateProjectScripts,
  copyDirectories,
  copyFiles,
  getFilePaths,
  readFile,
} = require("./utils/helper");
const projectSetUp = require("./utils/projectSetUp");
const projectInfo = require("./utils/projectInfo");
const projectExecutionCommands = require("./utils/projectExecutionCommands");
const { getProjectDetails } = require("./utils/getProjectDetails");
const questionnaire = require("./questionnaire");
const { 
  ANGULAR_THEME_FILE_PATHS,
  AUTH0_FILE_PATHS,
  AUTHENTICATIONS,
  COGNITO_FILE_PATHS,
  CYPRESS_DIRECTORY_PATHS,
  CYPRESS_FILE_PATHS,
  JEST_DIRECTORY_PATHS,
  JEST_FILE_PATHS,
  FRAMEWORKS,
  OKTA_FILES_PATHS,
  REACT_THEME_FILE_PATHS,
  REDUX_FILES,
  VUE_THEME_FILE_PATHS,
  DOCKER_FILE_PATHS,
  REACT_DOCKER_FILE_PATHS,
  NGRX_FILE_PATHS,  
  VUEX_FILE_PATHS,
  INFRASTRUCTURE_FILE_PATHS,
  NGRX_CRUD_FILE_PATHS,
  ANGULAR_CRUD_NODE_FILE_PATHS
 } = require("./constants");
const { SCRIPTS } = require("./scripts")
const { DEPENDENCIES } = require("./dependencies")

const { ANGULAR, REACT, VUE } = FRAMEWORKS;
const { AUTH0, COGNITO, OKTA } = AUTHENTICATIONS;

const currentPath = path.join(__dirname);
const NODE_JS = "node-js";  
let dependencies = [];
let scripts = [];
let filePaths = [];
let directoryPaths = [];

inquirer.prompt(questionnaire).then(async (answers) => {
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
    angularNodeCrud
  } = answers;

  // Project Directory Path 
  const CURR_DIR = projectDirectoryPath ? projectDirectoryPath : process.cwd();
  const isStore = Boolean(store);
  const isThemeProvider = Boolean(theme == "light-dark-mode");
  const isCrud = Boolean(CRUD);
  const isDocker = Boolean(dockerService);
  const isCrudWithNode = Boolean(reactNodeCrud || vueNodeCrud || angularNodeCrud);
  const isMaterialUI = materialuiChoice;

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
        dependencies = [...dependencies, ...DEPENDENCIES.BOOTSTRAP]
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
      CURR_DIR
    );

    //<---------------------------- For Themes integration ---------------------------------->
    if (isThemeProvider && isFrontEndChoiceReact) {
      const res = getFilePaths(REACT_THEME_FILE_PATHS, currentPath, frontEnd.path);
      filePaths = [...filePaths, ...res];
    }

    //<----------------------------------- Light/Dark Mode + Vue ------------------------------------------------>
    if (isThemeProvider && isFrontEndChoiceVue) {
      const res = getFilePaths(VUE_THEME_FILE_PATHS, currentPath, frontEnd.path);
      filePaths = [...filePaths, ...res];
    }

    //<----------------------------------- Light/Dark Mode + Angular ------------------------------------------------>
    if (isThemeProvider && isFrontEndChoiceAngular) {
      const res = getFilePaths(ANGULAR_THEME_FILE_PATHS, currentPath, frontEnd.path);
      filePaths = [...filePaths, ...res];
    }

    //<---------------------------- For TestCases Framework ------------------------------------>
    if (isTestCasesFramework) {
      // CYPRESSS
      if (isCypress) {
        const res = getFilePaths(CYPRESS_FILE_PATHS, currentPath, frontEnd.path);
        filePaths = [...filePaths, ...res];

        const cypressDirectoryPaths = getFilePaths(CYPRESS_DIRECTORY_PATHS, currentPath, frontEnd.path);
        directoryPaths = [ ...directoryPaths, ...cypressDirectoryPaths];

        dependencies = [...dependencies, ...DEPENDENCIES.CYPRESS]

        scripts = [...scripts, ...SCRIPTS.CYPRESS];
      }

      if (isJest && isFrontEndChoiceVue) {
        const res = getFilePaths(JEST_FILE_PATHS, currentPath, frontEnd.path);
        filePaths = [...filePaths, ...res];
        
        const jestDirectoryPaths = getFilePaths(JEST_DIRECTORY_PATHS, currentPath, frontEnd.path);
        directoryPaths = [...directoryPaths, ...jestDirectoryPaths];

        dependencies = [...dependencies, ...DEPENDENCIES.JEST]

        scripts = [...scripts, ...SCRIPTS.JEST];
      }
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
      isMaterialUI,
      CURR_DIR
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
      createBlobService(blobServiceName, blobTemplatePath, backEnd.path);
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
      let dbEnvFile = readFile(`${currentPath}/envTemplates/.dbEnv`);
      dbEnvFile = render(dbEnvFile, {
        dbName,
        frontEnd,
        backEnd,
        isAuth0,
        isOkta,
        isSMTP,
      });
      const envFilePath =
        frontEnd?.choice && backEnd?.choice
          ? `${backEnd.path}/.env`
          : `${CURR_DIR}/${projectName}/.env`;
      fs.writeFileSync(envFilePath, dbEnvFile, "utf8");
    }
  }

  //<---------------------------- For Docker integration ---------------------------------->
  if (isDocker) {
    const dockerPath = path.join(__dirname, "dockerTemplate");
    let res =  [];

    if (frontEnd?.choice === REACT && backEnd?.choice === NODE_JS) {
      let dockerFile = readFile(`${dockerPath}/db-docker-compose.yml`);
      dockerFile = render(dockerFile, {
        frontEndName,
        backEndName,
        mongoSelected,
        sequelizeSelected,
      });
      const dockerFilePath = `${CURR_DIR}/${projectName}/docker-compose.yml`;
      fs.writeFileSync(dockerFilePath, dockerFile, "utf8");
      res = getFilePaths(DOCKER_FILE_PATHS, currentPath, frontEnd.path, backEnd.path);
      filePaths = [...filePaths, ...res];
    }
    else if(frontEnd?.choice === REACT || backEnd?.choice === NODE_JS) 
      res = getFilePaths(REACT_DOCKER_FILE_PATHS, dockerPath, frontEnd.path);

    filePaths = [...filePaths, ...res];
  }

  //<---------------------------- For Store integration ---------------------------------->
  if (isStore) {
    //<---------------------------- Redux ---------------------------------->
    if (frontEnd?.choice === REACT) {
      let addUserFile;
      let addUserFilePath;

      dependencies = [...dependencies, ...DEPENDENCIES.REACT];
      
      REDUX_FILES.forEach((each) => {
        filePaths = [...filePaths, {
          source: `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
          destination: `${frontEnd.path}/${each.destFolder}/${each.destFileName}`
        }]
      });

      let usersActionsFile = readFile(`${currentPath}/reduxTemplates/demoUser/users.actions.js`);
      usersActionsFile = render(usersActionsFile, {
        defaultRoute,
      });
      const usersActionsFilePath = `${frontEnd.path}/src/screens/Users/users.actions.js`;
      fs.writeFileSync(usersActionsFilePath, usersActionsFile, "utf8");

      if (isCrud) {
        addUserFile = readFile(`${currentPath}/reduxTemplates/userform/Adduser.js`);
        addUserFile = render(addUserFile, {
          isMaterialUI,
          isCrud,
          isCrudWithNode,
        });
      }
      if (isCrudWithNode) {
        addUserFile = readFile(`${currentPath}/reduxTemplates/userform/AdduserForm.js`);
        addUserFile = render(addUserFile, { isMaterialUI });
        
      }

      if(isCrud || isCrudWithNode) {
        addUserFilePath = `${frontEnd.path}/src/screens/Users/AddUser.js`;
        fs.writeFileSync(addUserFilePath, addUserFile, "utf8");
      }
      const res = getFilePaths(INFRASTRUCTURE_FILE_PATHS, currentPath, frontEnd.path);
      directoryPaths = [...directoryPaths, ...res];
    }

    //<---------------------------------MaterialUI Dark Theme----------------------->

    if (isThemeProvider && isFrontEndChoiceReact) {
      let appFile = readFile(`${currentPath}/templates/react/src/App.js`);
      appFile = render(appFile, {
        isMaterialUI,
        isCrud,
        isCrudWithNode,
        isAuth0,
        isThemeProvider,
        isOkta,
      });
      const appFilePath = `${frontEnd.path}/src/App.js`;
      fs.writeFileSync(appFilePath, appFile, "utf8");
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

      fs.mkdirSync(backEnd ? `${CURR_DIR}/${backEndStorePath}` : `${CURR_DIR}/${frontEndStorePath}`);
      fs.mkdirSync(backEnd ? `${CURR_DIR}/${backEndUserModalPath}` : `${CURR_DIR}/${frontEndUserModalPath}`);

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
          CURR_DIR
        );
      });

      if (isCrudWithNode) {
        const res = getFilePaths(VUEX_FILE_PATHS, currentPath, frontEnd.path);
        directoryPaths = [...directoryPaths, ...res];
      }
    }
    //<--------------------------------- Ngrx ---------------------------->
    if (frontEnd?.choice === ANGULAR ) {
      const res = getFilePaths(NGRX_FILE_PATHS, currentPath, frontEnd.path);
      directoryPaths = [...directoryPaths, ...res];

      if(isCrud) {
        const res = getFilePaths(NGRX_CRUD_FILE_PATHS, currentPath, frontEnd.path);
        directoryPaths = [...directoryPaths, ...res];
      }
    }
  }

  //<-------------- For angular node crud ------------------->
  if (frontEnd?.choice === ANGULAR && isCrudWithNode) {
    const res = getFilePaths(ANGULAR_CRUD_NODE_FILE_PATHS, currentPath, frontEnd.path);
    directoryPaths = [...directoryPaths, ...res];
    
    let baseUrl = fs.readFileSync(`${currentPath}/angularApiTemplates/base-url.ts`, "utf8")
    baseUrl = render(baseUrl, { defaultRoute })
    const baseUrlPath = `${frontEnd.path}/src/app/shared/base-url.ts`
    fs.writeFileSync(baseUrlPath, baseUrl, "utf8")
  }

  //<---------------------------- For Authentication service ---------------------------------->
  if (answers["authenticationChoice"] === AUTH0) {
    AUTH0_FILE_PATHS.forEach((each) => {
      let envFile = readFile(`${currentPath}/${each.srcFolder}/${each.srcFileName}`);
      envFile = render(envFile, { frontEndChoice });
      const envFilePath = `${frontEnd.path}/${each.destFileName}`;
      fs.writeFileSync(envFilePath, envFile, "utf8");
    });

    if (isFrontEndChoiceAngular) {
      dependencies = [...dependencies, ...DEPENDENCIES.AUTH0_SPA]
      dependencies = [...dependencies, ...DEPENDENCIES.AUTH0_ANGULAR]
    }

    if (isFrontEndChoiceReact) {
      dependencies = [...dependencies, ...DEPENDENCIES.AUTH0_SPA]

      const reactSpaPath = path.join(__dirname, "authTemplates");
      let reactAuth0SPAFile = readFile(`${reactSpaPath}/react-spa.js`);
      reactAuth0SPAFile = render(reactAuth0SPAFile, { isStore });
      const auth0SPAFilePath = `${frontEnd.path}/src/react-spa.js`;
      fs.writeFileSync(auth0SPAFilePath, reactAuth0SPAFile, "utf8");
    }
    if (isFrontEndChoiceVue) {
      dependencies = [...dependencies, ...DEPENDENCIES.AUTH0_VUE]
    }
  } else if (answers["authenticationChoice"] === COGNITO) {
    COGNITO_FILE_PATHS.forEach((each) => {
      filePaths = [...filePaths, {
        source: `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
        destination: `${frontEnd.path}/${each.destFolder}/${each.destFileName}`
      }]
    });

    copyFiles(filePaths)
  } else if (answers["authenticationChoice"] === OKTA) {
    dependencies = [...dependencies, ...DEPENDENCIES.OKTA_AUTH_JS];
    if(isFrontEndChoiceReact) dependencies = [...dependencies, ...DEPENDENCIES.OKTA_REACT]
    else if(isFrontEndChoiceAngular) dependencies = [...dependencies, ...DEPENDENCIES.OKTA_ANGULAR]
    else if(isFrontEndChoiceVue) dependencies = [...dependencies, ...DEPENDENCIES.OKTA_VUE]
    
    scripts = [...scripts, ...SCRIPTS.PRETTY];

    if(isFrontEndChoiceReact || isFrontEndChoiceAngular){
      directoryPaths = [...directoryPaths, 
      {
        source: `${currentPath}/authTemplates/oktaTemplate`,
        destination: `${frontEnd.path}/src/oktaFiles`
      }];
    }

    OKTA_FILES_PATHS.forEach((each) => {
      // filePaths = [...filePaths, {
      //   source: `${currentPath}/${each.srcFolder}/${each.srcFileName}`,
      //   destination: `${frontEnd.path}/${each.destFileName}`
      // }]
      let envFile = readFile(`${currentPath}/${each.srcFolder}/${each.srcFileName}`);
      envFile = render(envFile, { frontEndChoice });
      const envFilePath = `${frontEnd.path}/${each.destFileName}`;
      fs.writeFileSync(envFilePath, envFile, "utf8");
    });
  }

  copyDirectories(directoryPaths);
  copyFiles(filePaths);

  // These methods are used to update the dependencies and scripts respectively.
  if(frontEnd) {
    updateProjectDependencies(frontEnd.path, dependencies);
    updateProjectScripts(frontEnd.path, scripts);
  }

  projectInfo(frontEnd, backEnd, answers);
  projectSetUp(frontEnd, backEnd, answers);
  projectExecutionCommands(frontEnd, backEnd, answers);
});
