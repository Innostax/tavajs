#! node
const inquirer = require("inquirer");
const fs = require("fs");
const { createDirectoryContents, updatePackage } = require("./utils/helper");
const path = require("path");
const fsExtra = require("fs-extra");
const AUTH_CHOICES = ["Auth0", "Cognito", "Okta"];
const CURR_DIR = process.cwd();
let mongoSelected = false;
let sequelizeSelected = false;
let isDocker = false;
let isCrud = false;
let isAuth0 = false;
let isCognito = false;
let isRedux = false;
let isVuex = false;
let isWinston = false;
let isSentry = false;
let isCrudWithNode = false;
let isDark = false;
let isNgrx = false;
let isMaterialUI = false;
const currentPath = path.join(__dirname);
const { render } = require("ejs");
const createBlobService = require("./utils/createBlobService");
const createDbConn = require("./utils/createDbConn");
const createLogger = require("./utils/createLogger");
const createEmailSevice = require("./utils/createEmailSevice");
const projectSetUp = require("./utils/projectSetUp");
const projectInfo = require("./utils/projectInfo");
const projectExecutionCommands = require("./utils/projectExecutionCommands");

const QUESTIONS = [
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "managerChoice",
    type: "list",
    message: "Select Package Manager",
    choices: [
      { name: "NPM", value: "npm" },
      { name: "YARN", value: "yarn" },
    ],
  },
  {
    name: "frontEnd",
    type: "list",
    message: "Do you want template for Frontend?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
  },
  {
    name: "frontEndChoice",
    type: "list",
    message: "Select the Framework",
    choices: [
      { name: "React", value: "react" },
      { name: "Angular", value: "angular" },
      { name: "Vue", value: "vue" },
    ],
    when: (answers) => {
      return answers.frontEnd == "yes";
    },
  },

  /* CSS Framework question added here */
  {
    name: "materialuiChoice",
    type: "list",
    message: "Which CSS Framework do you want?",
    choices: [
      {name: "MaterialUi", value: true},
      {name: "Bootstrap", value: false }
    ],
    when: (answers) => {
      return answers.frontEndChoice == "react";
    },
  },
  /*CSS Framework question ended here */
  {
    name: "FrontEnd-name",
    type: "input",
    message: "Front End project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "React Project name may only include letters, numbers, underscores and hashes.";
    },
    when: (answers) => {
      return answers.frontEnd == "yes";
    },
  },
  {
    name: "theme",
    type: "list",
    message: "Do you want Dark Mode?",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return answers.frontEndChoice === "react";
    },
  },
  {
    name: "authService",
    type: "list",
    message: "Do you want Authentication services?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
    when: (answers) => {
      return answers.frontEndChoice == "react";
    },
  },
  {
    name: "authentication-choice",
    type: "list",
    message: "What Authentication Service you want to use?",
    choices: AUTH_CHOICES,
    when: (answers) => answers.authService === "yes",
  },
  {
    name: "redux",
    type: "list",
    message: "Do you want redux integration?",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return answers.frontEndChoice === "react";
    },
  },
  {
    name: "vuex",
    type: "list",
    message: "Do you want vuex integration?",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return answers.frontEndChoice === "vue";
    },
  },
  {
    name: "ngrx",
    type: "list",
    message: "Do you want ngrx integration?",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return answers.frontEndChoice === "angular";
    },
  },
  {
    name: "backEnd",
    type: "list",
    message: "Do you want template for Backend?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
  },
  {
    name: "backEndChoice",
    type: "list",
    message: "Select the Framework",
    choices: [{ name: "Node", value: "node" }],
    when: (answers) => {
      return answers.backEnd == "yes";
    },
  },
  {
    name: "node-name",
    type: "input",
    message: "Node Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
    when: (answers) => {
      return answers.backEnd == "yes";
    },
  },
  {
    name: "default-route",
    type: "input",
    message: "Enter the default route",
    default: "users",
    when: (answers) => {
      return answers.backEnd == "yes";
    },
  },
  {
    name: "dbService",
    type: "list",
    message: "Do you need database service?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
    when: (answers) => {
      return answers.backEnd == "yes";
    },
  },
  {
    name: "dbName",
    type: "list",
    message: "Which db service do you want?",
    choices: [
      { name: "Postgres", value: "postgres" },
      { name: "MySql", value: "mysql" },
      { name: "Mongoose", value: "mongoose" },
    ],
    when: (answers) => {
      return answers.dbService == "yes";
    },
  },
  {
    name: "CRUD",
    type: "list",
    message: "Do you want React with CRUD",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false }, 
    ],
    when: (answers) => {
      return (
        answers.redux &&
        answers.frontEndChoice === "react" &&
        answers.backEnd === "no"
      );
    },
  },
  {
    name: "reactNodeCrud",
    type: "list",
    message: "Do you want crud integration with React-Node boiler plate?",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return (
        answers.backEnd == "yes" &&
        answers.frontEnd == "yes" &&
        answers.redux === true
      );
    },
  },
  {
    name: "loggerService",
    type: "list",
    message: "Do you want logger services?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
    when: (answers) => {
      return answers.backEnd == "yes";
    },
  },
  {
    name: "loggerName",
    type: "list",
    message: "Which logger service do you want?",
    choices: [
      { name: "Winston", value: "winston" },
      { name: "sentry", value: "sentry" },
    ],
    when: (answers) => {
      return answers.loggerService == "yes";
    },
  },
  {
    name: "emailService",
    type: "list",
    message: "Do you want e-mail services?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
    when: (answers) => {
      return answers.backEnd == "yes";
    },
  },
  {
    name: "emailServiceName",
    type: "list",
    message: "Which Email service do you want?",
    choices: [
      { name: "SendGrid", value: "sendgrid" },
      { name: "Amazon Ses", value: "amazon_ses" },
      { name: "SMTP", value: "smtp" },
    ],
    when: (answers) => {
      return answers.emailService == "yes";
    },
  },
  {
    name: "blobService",
    type: "list",
    message: "Do you want blob services?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
    when: (answers) => {
      return answers.backEnd == "yes";
    },
  },
  {
    name: "blobServiceName",
    type: "list",
    message: "Which Blob service do you want?",
    choices: [
      { name: "AWS-s3", value: "aws-s3" },
      { name: "Azure", value: "azure" },
    ],
    when: (answers) => {
      return answers.blobService == "yes";
    },
  },
  {
    name: "dockerService",
    type: "list",
    message: "Do you want Docker services",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return (
        answers.frontEndChoice == "react" || answers.backEndChoice == "node"
      );
    },
  },
];

inquirer.prompt(QUESTIONS).then(async (answers) => {
  let projectChoice = "";
  const frontEndChoice = answers["frontEndChoice"];
  const backEndChoice = answers["backEndChoice"];

  if (frontEndChoice === "react" && backEndChoice === "node")
    projectChoice = "react_Node";
  else if (frontEndChoice === "react") projectChoice = "react";
  else if (frontEndChoice === "angular") projectChoice = "angular";
  else if (frontEndChoice === "vue") projectChoice = "vue";
  else if (backEndChoice === "node") projectChoice = "node-js";
  const projectName = answers["project-name"];
  const emailService = answers["emailService"];
  const blobService = answers["blobService"];
  const reactNodeCrudOperations = answers["reactNodeCrud"];
  isCrudWithNode = reactNodeCrudOperations;
  let newDefaultRoute = "";
  const reduxIntegration = answers["redux"];
  const dockerService = answers["dockerService"];
  isDocker = dockerService;
  const crudOperation = answers["CRUD"];
  isCrud = crudOperation;
  let frontEndName = "";
  let nodeName = "";
  let managerChoice = answers["managerChoice"];
  var dbName = answers["dbName"];
  isRedux = reduxIntegration;
  const materialLib = answers["materialuiChoice"];
  isMaterialUI = materialLib;
  isVuex = answers["vuex"];
  isNgrx = answers["ngrx"];
  const templatePath = path.join(__dirname, "templates", projectChoice);
  const defaultRoute = answers["default-route"];
  var reactPath = `${CURR_DIR}/${projectName}`;
  var vuePath = `${CURR_DIR}/${projectName}`;
  isDark = answers["theme"];
  var angularPath = `${CURR_DIR}/${projectName}`;
  const authenticationChoice = answers["authentication-choice"];
  const loggerName = answers["loggerName"];
  const emailServiceName = answers["emailServiceName"];
  const blobServiceName = answers["blobServiceName"];
  let screenName = "<%= projectName %>";

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
    let reactTemplatePath = path.join(__dirname, "templates", "react");
    const nodeTemplatePath = path.join(__dirname, "templates", "node-js");
    var nodePath = `${CURR_DIR}/${projectName}/${nodeName}`;
    var reactPath = `${CURR_DIR}/${projectName}/${frontEndName}`;
    fsExtra.ensureDirSync(`${CURR_DIR}/${projectName}/${frontEndName}`);
    createDirectoryContents(
      reactTemplatePath,
      `${projectName}/${frontEndName}`,
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
      isDark,
      isMaterialUI
    );
    fsExtra.ensureDirSync(`${CURR_DIR}/${projectName}/${nodeName}`);
    createDirectoryContents(
      nodeTemplatePath,
      `${projectName}/${nodeName}`,
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
      isMaterialUI
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
      isDark,
      isMaterialUI
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
      isDark,
      isMaterialUI
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
      isDark,
      isMaterialUI
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
      isDark,
      isMaterialUI
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

  if (reduxIntegration) {
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
    // Start
    let newContent = fs.readFileSync(`${currentPath}/reduxTemplates/userform/Adduser.js`, "utf8");
    newContent = render(newContent, { isMaterialUI,isCrud,isCrudWithNode });
    writePath = `${reactPath}/src/screens/Users/AddUser.js`;
    fs.writeFileSync(writePath, newContent, "utf8");
    
    let newModalContent = fs.readFileSync(`${currentPath}/reduxTemplates/widgets/modal/Modal.js`, "utf8");
    newModalContent = render (newContent, {isMaterialUI,isCrud, isCrudWithNode});

   
    }
    if (isCrudWithNode) {
      let newContent = fs.readFileSync(`${currentPath}/reduxTemplates/userform/Adduser.js`, "utf8");
      newContent = render(newContent, { isMaterialUI });
      writePath = `${reactPath}/src/screens/Users/AddUser.js`;
      fs.writeFileSync(writePath, newContent, "utf8");

      let newModalContent = fs.readFileSync(`${currentPath}/reduxTemplates/widgets/modal/Modal.js`, "utf8");
      newModalContent = render (newContent, {isMaterialUI,isCrud, isCrudWithNode});
     
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
  //<---------------------------------MaterialUI Dark Theme----------------------->

  if (isDark) {
    // Start
    let newContent = fs.readFileSync(`${currentPath}/templates/react/src/App.js`, "utf8");
    newContent = render(newContent, { isMaterialUI,isCrud,isCrudWithNode,isAuth0,isDark });
    writePath = `${reactPath}/src/App.js`;
    fs.writeFileSync(writePath, newContent, "utf8");

    }
   
  //<---------------------------------VUEX INTEGRATION---------------------------->
  if (isVuex) {
    fsExtra.copy(
      `${currentPath}/vuexTemplates/store`,
      `${vuePath}/src/store`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
    fsExtra.copy(
      `${currentPath}/vuexTemplates/userModal`,
      `${vuePath}/src/userModal`,
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
      `${angularPath}/src/app/reducers`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
    fsExtra.copy(
      `${currentPath}/ngrxTemplates/modules`,
      `${angularPath}/src/app/modules`,
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
