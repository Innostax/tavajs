#! node
const inquirer = require("inquirer");
const fs = require("fs");
const shell = require("shelljs");
const { render } = require("./utils/template");
const { createDirectoryContents, updatePackage } = require("./utils/helper");
const path = require("path");
const fsExtra = require("fs-extra");
const chalk = require("chalk");
const package = require("../package.json");

const CURR_DIR = process.cwd();
var mongoSelected = false;
var sequelizeSelected = false;
var isDocker = false;
var isCrud = false;
var isAuth0 = false;
var isCognito = false;
var isRedux = false;
var isWinston = false;
var isSentry = false;
var isCrudWithNode = false;
var isCrud = false;
var isNpm = false;
var isYarn = false;
const AUTH_CHOICES = ["Auth0", "Cognito", "Okta"];
const currentPath = path.join(__dirname);

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
  let reactName = "";
  let nodeName = "";
  let vueName = "";
  let angularName = "";
  var dbName = answers["dbName"];
  isRedux = reduxIntegration;
  const templatePath = path.join(__dirname, "templates", projectChoice);
  const defaultRoute = answers["default-route"];
  var reactPath = `${CURR_DIR}/${projectName}`;

  let screenName = "<%= projectName %>";

  fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {
    if (err) {
      console.error(err);
    }
  });
  // //<----------------------------managerChoice------------------------->
  if (answers["managerChoice"] === "npm") isNpm = true;
  if (answers["managerChoice"] === "yarn") isYarn = true;
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
    reactName = answers["FrontEnd-name"];
    nodeName = answers["node-name"];
    let reactTemplatePath = path.join(__dirname, "templates", "react");
    const nodeTemplatePath = path.join(__dirname, "templates", "node-js");
    var nodePath = `${CURR_DIR}/${projectName}/${nodeName}`;
    var reactPath = `${CURR_DIR}/${projectName}/${reactName}`;

    fsExtra.ensureDirSync(`${CURR_DIR}/${projectName}/${reactName}`);
    createDirectoryContents(
      reactTemplatePath,
      `${projectName}/${reactName}`,
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
      reactName,
      nodeName
    );
    shell.cd(`${reactPath}`);
    if (isNpm) {
      console.log(
        "-------------NPM loading on react, Wait for finish--------------------"
      );
      shell.exec("npm install --legacy-peer-deps");
    }
    if (isYarn) {
      console.log(
        "-------------yarn loading on react, Wait for finish--------------------"
      );
      shell.exec("npm install -g yarn");
      shell.exec("yarn");
    }

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
      reactName,
      nodeName,
      projectChoice
    );
    shell.cd(`${nodePath}`);
    if (isNpm) {
      console.log(
        "-------------NPM loading on node, Wait for finish--------------------"
      );
      shell.exec("npm install --legacy-peer-deps");
      console.log("-------------NPM process completed--------------------");
    }
    if (isYarn) {
      console.log(
        "-------------yarn loading on node, Wait for finish--------------------"
      );
      shell.exec("npm install -g yarn");
      shell.exec("yarn");
      console.log("-------------yarn process completed--------------------");
    }

    console.log(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating React project: ${reactName} using ${package.name} ${
          package.version
        }`
      )
    );
    if (answers.authService === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Authentication service: ${
            answers["authentication-choice"]
          }`
        )
      );
    if (isRedux)
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Redux pattern`
        )
      );
    console.log(" ");
    console.log(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating Node project: ${nodeName} using ${package.name} ${
          package.version
        }`
      )
    );
    if (answers["dbService"] === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Database service: ${
            answers["dbName"]
          }`
        )
      );
    if (answers["loggerService"] === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Logger service: ${
            answers["loggerName"]
          }`
        )
      );
    if (emailService == "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Email service: ${
            answers["emailServiceName"]
          }`
        )
      );
    if (blobService == "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Blob service: ${
            answers["blobServiceName"]
          }`
        )
      );
    console.log(
      chalk.green.bold(`${String.fromCodePoint(0x1f4a1)} Powered by Innostax`)
    );
    const newPath = `${CURR_DIR}/${projectName}/${nodeName}`;
    const fileNames = [
      {
        oldName: "route.js",
        folder: "Routes",
        newName: `${defaultRoute}.routes.js`,
      },
      {
        oldName: "controller.js",
        folder: "Controllers",
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
      reactName,
      nodeName
    );
    var projectPath = `${CURR_DIR}/${projectName}/${reactName}`;
    shell.cd(`${projectPath}`);
    if (isNpm) {
      console.log(
        "-------------NPM loading on react, Wait for finish--------------------"
      );
      shell.exec("npm install --legacy-peer-deps");
      console.log("-------------NPM process completed--------------------");
    }
    if (isYarn) {
      console.log(
        "-------------yarn loading on react, Wait for finish--------------------"
      );
      shell.exec("npm install -g yarn");
      shell.exec("yarn");
      console.log("-------------yarn process completed--------------------");
    }

    console.log(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating React project: ${projectName} using ${package.name} ${
          package.version
        }`
      )
    );
    if (answers.authService === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Authentication service: ${
            answers["authentication-choice"]
          }`
        )
      );
    if (isRedux)
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Redux pattern`
        )
      );
    console.log(
      chalk.green.bold(`${String.fromCodePoint(0x1f4a1)} Powered by Innostax`)
    );
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
      isRedux,
      screenName,
      isCrudWithNode,
      isCrud,
      nodeName,
      angularPath,
      angularName
    );
    var projectPath = `${CURR_DIR}/${projectName}/${angularName}`;
    shell.cd(`${projectPath}`);
    if (isNpm) {
      console.log(
        "-------------NPM loading on angular, Wait for finish--------------------"
      );
      shell.exec("npm install --legacy-peer-deps");
      console.log("-------------NPM process completed--------------------");
    }
    if (isYarn) {
      console.log(
        "-------------yarn loading on angular, Wait for finish--------------------"
      );
      shell.exec("npm install -g yarn");
      shell.exec("yarn");
      console.log("-------------yarn process completed--------------------");
    }

    console.log(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating React project: ${projectName} using ${package.name} ${
          package.version
        }`
      )
    );
    if (answers.authService === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Authentication service: ${
            answers["authentication-choice"]
          }`
        )
      );
    if (isRedux)
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Redux pattern`
        )
      );
    console.log(
      chalk.green.bold(`${String.fromCodePoint(0x1f4a1)} Powered by Innostax`)
    );
    }
  else if (projectChoice === "node-js") {
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
      reactName,
      nodeName,
      projectChoice
    );
    console.log(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating Node project: ${projectName} using ${package.name} ${
          package.version
        }`
      )
    );
    if (answers["dbService"] === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Database service: ${
            answers["dbName"]
          }`
        )
      );
    if (answers["loggerService"] === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Logger service: ${
            answers["loggerName"]
          }`
        )
      );
    if (emailService == "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Email service: ${
            answers["emailServiceName"]
          }`
        )
      );
    if (blobService == "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Blob service: ${
            answers["blobServiceName"]
          }`
        )
      );
    console.log(
      chalk.green.bold(`${String.fromCodePoint(0x1f4a1)} Powered by Innostax`)
    );
    const newPath = `${CURR_DIR}/${projectName}`;
    const fileNames = [
      {
        oldName: "route.js",
        folder: "Routes",
        newName: `${defaultRoute}.routes.js`,
      },
      {
        oldName: "controller.js",
        folder: "Controllers",
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
    shell.cd(`${projectPath}`);
    if (isNpm) {
      console.log(
        "-------------NPM loading on node, Wait for finish--------------------"
      );
      shell.exec("npm install --legacy-peer-deps");
      console.log("-------------NPM process completed--------------------");
    }
    if (isYarn) {
      console.log(
        "-------------yarn loading on node, Wait for finish--------------------"
      );
      shell.exec("npm install -g yarn");
      shell.exec("yarn");
      console.log("-------------yarn process completed--------------------");
    }
  } else if (projectChoice === "vue") {
    createDirectoryContents(templatePath, projectName, vueName);
    var projectPath = `${CURR_DIR}/${projectName}/${vueName}`;
    shell.cd(`${projectPath}`);
    if (isNpm) {
      console.log(
        "-------------NPM loading on vue, Wait for finish--------------------"
      );
      shell.exec("npm install --legacy-peer-deps");
      console.log("-------------NPM process completed--------------------");
    }
    if (isYarn) {
      console.log(
        "-------------yarn loading on vue, Wait for finish--------------------"
      );
      shell.exec("npm install -g yarn");
      shell.exec("yarn");
      console.log("-------------yarn process completed--------------------");
    }
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
    createDbConn(nodePath, dbName, defaultRoute);
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
        reactName,
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

  if (!isDocker && projectChoice !== "react" && projectChoice !== "vue" && projectChoice !== "angular") {
    let contents = fs.readFileSync(
      `${currentPath}/envTemplates/.dbEnv`,
      "utf8"
    );
    contents = render(contents, {
      mongoSelected,
      sequelizeSelected,
      dbName,
      projectChoice
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
        destFolder: "/src/Screens/Users",
        destFileName: "users.reducer.js",
      },
      {
        srcFolder: "reduxTemplates/demoUser",
        srcFileName: "users.selectors.js",
        destFolder: "/src/Screens/Users",
        destFileName: "users.selectors.js",
      },
      {
        srcFolder: "reduxTemplates",
        srcFileName: "store.js",
        destFolder: "/src",
        destFileName: "store.js",
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
      defaultRoute
    });
    writePath = `${reactPath}/src/Screens/Users/users.actions.js`;
    fs.writeFileSync(writePath, contents, "utf8");
    
    if (isCrud) {
      fs.copyFile(
        `${currentPath}/reduxTemplates/userform/Adduser.js`,
        `${reactPath}/src/Screens/Users/AddUser.js`,
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
        `${reactPath}/src/Screens/Users/AddUser.js`,
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

  //<--------For authentication----------------------------------------------------------------------------->
  if (answers["authentication-choice"] === "Auth0") {
    const filesMap = [
      {
        srcFolder: "authTemplates",
        srcFileName: "react-spa.js",
        destFolder: reactName + "/src",
        destFileName: "react-spa.js",
      },
      {
        srcFolder: "envTemplates",
        srcFileName: ".authEnv",
        destFolder: "",
        destFileName: ".env",
      },
    ];

    const package = { name: "@auth0/auth0-spa-js", version: "^1.10.0" };
    let packagePath = path.join(CURR_DIR, projectName, reactName);
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
    let packagePath = path.join(CURR_DIR, projectName, reactName);
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
  if (projectChoice != "react_Node") {
    console.log(
      chalk.green.bold(`${String.fromCodePoint(0x2705)} Successfully created`)
    );
    console.log("    ");
    console.log(
      chalk.magentaBright.bold(
        `${String.fromCodePoint(0x1f449)} To get Started:`
      )
    );
    console.log("    ");
    if (isNpm) {
      if (projectChoice === "vue") {
        console.log("   Inside", projectName);
        console.log(chalk.cyanBright.italic.bold(`     npm run serve`));
      } else {
        console.log(chalk.cyanBright.italic.bold(`     npm start`));
      }
    }
    if (isYarn) {
      if (projectChoice === "vue") {
        console.log("   Inside", projectName);
        console.log(chalk.cyanBright.italic.bold(`     yarn run serve`));
      } else {
        console.log(chalk.cyanBright.italic.bold(`     yarn start`));
      }
    }

    console.log(
      chalk.cyanBright.italic.bold(
        `------------------------ Ready to go --------------------------`
      )
    );
  } else {
    console.log(
      chalk.green.bold(`${String.fromCodePoint(0x2705)} Successfully created`)
    );
    console.log("    ");
    console.log(
      chalk.magentaBright.bold(
        `${String.fromCodePoint(0x1f449)} To get Started:`
      )
    );
    console.log(" Inside ", projectName);
    console.log("    ");
    console.log(
      chalk.magentaBright.bold(`${String.fromCodePoint(0x1f449)} For React:`)
    );
    console.log("   Inside", reactName);
    console.log("    ");
    if (isNpm) {
      console.log(chalk.cyanBright.italic.bold(`     npm start`));
    }
    if (isYarn) {
      console.log(chalk.cyanBright.italic.bold(`     yarn start`));
    }
    console.log(
      chalk.magentaBright.bold(`${String.fromCodePoint(0x1f449)} For Node:`)
    );
    console.log("   Inside", nodeName);
    console.log("    ");
    if (isNpm) {
      console.log(chalk.cyanBright.italic.bold(`     npm start`));
    }
    if (isYarn) {
      console.log(chalk.cyanBright.italic.bold(`     yarn start`));
    }
    console.log(
      chalk.cyanBright.italic.bold(
        `------------------------ Ready to go --------------------------`
      )
    );
  }
});

//function to create db service---------------------------------------------->
function createDbConn(nodePath, dbName, defaultRoute) {
  if (dbName === "postgres" || dbName === "mysql") {
    let package = { name: "sequelize", version: "^6.6.5" };
    updatePackage(nodePath, package);
    var fileName = "sequelize.js";
    var modelName = "sequelizeModel.js";
    if (dbName === "mysql") {
      package = { name: "mysql2", version: "^2.3.0" };
      updatePackage(nodePath, package);
    } else {
      package = { name: "pg", version: "^8.7.1" };
      updatePackage(nodePath, package);
    }
  } else {
    let package = { name: "mongoose", version: "^6.0.2" };
    updatePackage(nodePath, package);
    var fileName = "mongoose.js";
    var modelName = "mongooseModel.js";
  }
  const modelPath = nodePath + "/Models";
  fs.mkdirSync(modelPath);

  let writePath = `${nodePath}/${fileName}`;
  let contents = fs.readFileSync(
    `${currentPath}/dbTemplates/` + fileName,
    "utf8"
  );
  contents = render(contents, { defaultRoute });
  fs.writeFileSync(writePath, contents, "utf8");

  writePath = `${modelPath}/${defaultRoute}.js`;
  contents = fs.readFileSync(`${currentPath}/dbTemplates/` + modelName, "utf8");
  contents = render(contents, { defaultRoute });
  fs.writeFileSync(writePath, contents, "utf8");
}

//Function to create logger service ------------------------------------------------------------>
function createLogger(utilpath, loggerName, loggerTemplatePath, defaultRoute) {
  if (loggerName === "winston") {
    let servicePath = path.join(utilpath, "utils", "logger");
    fs.mkdirSync(servicePath);
    let package = { name: "winston", version: "^3.3.3" };
    updatePackage(utilpath, package);
    let contents = fs.readFileSync(
      loggerTemplatePath + "/" + loggerName + ".js",
      "utf-8"
    );
    fs.writeFile(servicePath + "/index" + ".js", contents, function (err) {
      if (err) throw err;
    });
  } else {
    let package = { name: "raven", version: "^2.6.4" };
    updatePackage(utilpath, package);
  }
}

//function to create email services
function createEmailSevice(
  emailServiceName,
  emailTemplatePath,
  nodePath,
  __dirname
) {
  let package = { name: "dotenv", version: "^10.0.0" };
  updatePackage(nodePath, package);

  let contents = fs.readFileSync(emailTemplatePath + ".js", "utf-8");
  let servicePath = path.join(nodePath, "utils", "email");
  fs.mkdirSync(servicePath);
  if (emailServiceName === "sendgrid") {
    fs.copyFileSync(
      __dirname + "/envTemplates/.sendgridEnv",
      servicePath + "/.env"
    );
    package = { name: "@sendgrid/mail", version: "^7.4.6" };
    updatePackage(nodePath, package);
  } else if (emailServiceName === "smtp") {
    fs.copyFileSync(
      __dirname + "/envTemplates/.smtpEnv",
      servicePath + "/.env"
    );
    package = { name: "nodemailer", version: "^6.6.3" };
    updatePackage(nodePath, package);
  } else {
    fs.copyFileSync(__dirname + "/envTemplates/.sesEnv", servicePath + "/.env");
    package = { name: "aws-sdk", version: "^2.971.0" };
    updatePackage(nodePath, package);
  }

  fs.writeFile(
    `${servicePath}` + "/" + `${emailServiceName}` + ".js",
    contents,
    function (err) {
      if (err) throw err;
    }
  );
}

//function to create Blob services------------------------------------------------->
function createBlobService(blobServiceName, blobTemplatePath, nodePath) {
  let contents = fs.readFileSync(blobTemplatePath + ".js", "utf-8");
  let servicePath = path.join(nodePath, "utils", "blob");
  fs.mkdirSync(servicePath);
  fs.writeFile(
    `${servicePath}` + "/" + `${blobServiceName}` + ".js",
    contents,
    function (err) {
      if (err) throw err;
      // console.log("Blob service created successfully.");
    }
  );
}
