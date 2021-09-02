const inquirer = require("inquirer");
const fs = require("fs");
const { render } = require("./utils/template");
const path = require("path");
const fsExtra = require("fs-extra");
const CURR_DIR = process.cwd();

const AUTH_CHOICES = ["Auth0", "Cognito", "Okta"];

const QUESTIONS = [
  {
    name: "projectChoice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: [
      { name: "React", value: "react" },
      { name: "Node", value: "node-js" },
      { name: "React + Node", value: "react_Node" },
      { name: "React-Query-Boilerplate", value: "react-query-boilerplate" },
    ],
  },
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
    name: "react-name",
    type: "input",
    message: "React project  name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "React Project name may only include letters, numbers, underscores and hashes.";
    },
    when: (answers) => {
      return answers.projectChoice == "react_Node";
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
      return answers.projectChoice == "react_Node";
    },
  },
  {
    name: "authService",
    type: "list",
    message: "do you want Authentication services?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
    when: (answers) => {
      return (
        answers.projectChoice == "react_Node" ||
        answers.projectChoice == "react"
      );
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
    name: "default-route",
    type: "input",
    message: "Enter the default route",
    when: (answers) => {
      return (
        answers.projectChoice == "node-js" ||
        answers.projectChoice == "react_Node"
      );
    },
  },
  {
    name: "redux",
    type: "list",
    message: "Do you want redux integration?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
    when: (answers) => {
      return answers.projectChoice == "react";
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
      return (
        answers.projectChoice == "node-js" ||
        answers.projectChoice == "react_Node"
      );
    },
  },
  {
    name: "dbName",
    type: "list",
    message: "which db service do you want?",
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
    name: "connectionString",
    type: "input",
    message: "Enter your connection string?",
    when: (answers) => {
      return answers.dbService == "yes";
    },
  },
  {
    name: "loggerService",
    type: "list",
    message: "do you want logger services?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
    when: (answers) => {
      return (
        answers.projectChoice == "react_Node" ||
        answers.projectChoice == "node-js"
      );
    },
  },
  {
    name: "loggerName",
    type: "list",
    message: "which logger service do you want?",
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
    message: "do you want e-mail services?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
    when: (answers) => {
      return (
        answers.projectChoice == "react_Node" ||
        answers.projectChoice == "node-js"
      );
    },
  },
  {
    name: "emailServiceName",
    type: "list",
    message: "which Email service do you want?",
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
    message: "do you want blob services?",
    choices: [
      { name: "yes", value: "yes" },
      { name: "no", value: "no" },
    ],
    when: (answers) => {
      return (
        answers.projectChoice == "react_Node" ||
        answers.projectChoice == "node-js"
      );
    },
  },
  {
    name: "blobServiceName",
    type: "list",
    message: "which Blob service do you want?",
    choices: [
      { name: "AWS-s3", value: "aws-s3" },
      { name: "Azure", value: "azure" },
    ],
    when: (answers) => {
      return answers.blobService == "yes";
    },
  },
];

inquirer.prompt(QUESTIONS).then(async (answers) => {
  const projectChoice = answers["projectChoice"];
  const projectName = answers["project-name"];
  const emailService = answers["emailService"];
  const blobService = answers["blobService"];
  const reduxIntegration = answers["redux"];

  let useEffectImport = "";
  let UseEffect = "";
  let renderCondition = "";
  // let renderContent=''
  let Imports = "";
  let reactName = "";
  let newDefaultRoute = "";
  const templatePath = path.join(__dirname, "templates", projectChoice);
  const defaultRoute = answers["default-route"];
  var reactPath = `${CURR_DIR}\\${projectName}`;
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  let screenName = "<%= projectName %>";
  let demoUserIndexForRedux = "";
  let demoUserComponentImports = "";
  let demoUserDispatch = "";
  let demoUserDataRender = "";
  if (reduxIntegration === "yes") {
    demoUserIndexForRedux = `import reducers from "./users.reducer";
import * as selectors from "./users.selectors";
import * as actions from "./users.actions";
export const { getUsers } = actions;
export const { name, reducer } = reducers;
export const { selectAllUsers } = selectors;`;

    demoUserComponentImports = `import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "./users.actions";
import { selectAllUsers } from "./users.selectors";
`;

    demoUserDispatch = `const dispatch = useDispatch();
const users = useSelector(selectAllUsers);

useEffect(() => {
  dispatch(getUsers());
}, [dispatch]);
`;
    demoUserDataRender = `
<h4>Welcome to React Redux Toolkit Crash Course</h4>
      {users && users.map((user, i) => <p key={i}>{user.name}</p>)}`;
  }
  //----------------------------------------------------------------------//
  //for react + node
  if (projectChoice == "react_Node") {
    reactName = answers["react-name"];
    const nodeName = answers["node-name"];
    fs.mkdirSync(`${CURR_DIR}/${projectName}/${reactName}`);
    fs.mkdirSync(`${CURR_DIR}/${projectName}/${nodeName}`);
    let reactTemplatePath = path.join(__dirname, "templates", "react");
    const nodeTemplatePath = path.join(__dirname, "templates", "node-js");
    var nodePath = `${CURR_DIR}/${projectName}/${nodeName}`;
    var reactPath = `${CURR_DIR}\\${projectName}\\${reactName}`;
    if (answers["authentication-choice"] === "Auth0") {
      renderCondition = "isUserAuthenticated&&";
    }
    createDirectoryContents(
      reactTemplatePath,
      `${projectName}/${reactName}`,
      newDefaultRoute,
      useEffectImport,
      UseEffect,
      Imports,
      renderCondition,
      reactPath,
      screenName,
      demoUserIndexForRedux,
      demoUserComponentImports,
      demoUserDispatch,
      demoUserDataRender
    );
    createDirectoryContents(
      nodeTemplatePath,
      `${projectName}/${nodeName}`,
      defaultRoute
    );
  }
  // for react
  else if (projectChoice === "react") {
    if (answers["authentication-choice"] === "Auth0") {
      renderCondition = "isUserAuthenticated&&";
    }
    createDirectoryContents(
      templatePath,
      projectName,
      newDefaultRoute,
      useEffectImport,
      UseEffect,
      Imports,
      renderCondition,
      reactPath,
      screenName,
      demoUserIndexForRedux,
      demoUserComponentImports,
      demoUserDispatch,
      demoUserDataRender
    );
  } else if (projectChoice === "node-js") {
    var nodePath = path.join(CURR_DIR, projectName);
    createDirectoryContents(templatePath, projectName, defaultRoute);
  } else {
    // var nodePath = path.join(CURR_DIR, projectName);
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
      "code_templates",
      emailServiceName
    );

    createEmailSevice(emailServiceName, emailTemplatePath, nodePath, __dirname);
  }

  //for Blob service---------------------------------------------------------->
  if (blobService == "yes") {
    const blobServiceName = answers["blobServiceName"];
    const blobTemplatePath = path.join(
      __dirname,
      "code_templates",
      blobServiceName
    );

    createBlobService(blobServiceName, blobTemplatePath, nodePath);
  }
  console.log("Boiler-Plate created successfully");

  //<--------------------------------------------------------------------------------------->
  if (answers["loggerService"] === "yes") {
    let loggerServiceName = answers["loggerName"];
    const loggerTemplatePath = path.join(__dirname, "logger");
    createLogger(nodePath, loggerServiceName, loggerTemplatePath, defaultRoute);
  }

  //<------------------------------------------------------------------------------------------->
  if (answers["dbService"] === "yes") {
    let dbName = answers["dbName"];
    let connectionString = answers["connectionString"];
    createDbConn(nodePath, dbName, __dirname, defaultRoute, connectionString);
  }

  // <--------------------REDUX INTEGRATION------------------------->

  if (reduxIntegration === "yes") {
    const reduxFiles = [
      {
        srcFolder: "reduxTemplates/demoUser",
        srcFileName: "users.actions.js",
        destFolder: "/src/Screens/Users",
        destFileName: "users.actions.js",
      },
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
    ];

    reduxFiles.map((each) => {
      fs.copyFile(
        `${CURR_DIR}\\src\\${each.srcFolder}\\${each.srcFileName}`,
        `${CURR_DIR}\\${projectName}\\${each.destFolder}\\${each.destFileName}`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
    });

    // C:\Users\HIMANSHU GAUTAM\Desktop\nodeCli\poc-cli-templates\src\reduxTemplates\abc

    fsExtra.copy(
      `${CURR_DIR}\\src\\reduxTemplates\\infrastructure`,
      `${CURR_DIR}\\${projectName}\\src\\infrastructure`,
      function (err) {
        if (err) {
          console.log("An error is occured");
          return console.error(err);
        }
      }
    );
  }
  //<------------------------------------------------------------------------------------->
  if (answers["authentication-choice"] === "Auth0") {
    choice = "Auth0";
    writeIndexfile(choice, reactPath);

    const filesMap = [
      {
        srcFolder: "authTemplates",
        srcFileName: "react-spa.js",
        destFolder: reactName + "/src",
        destFileName: "react-spa.js",
      },
      {
        srcFolder: "envTemplates",
        srcFileName: ".authenv",
        destFolder: "",
        destFileName: ".env",
      },
    ];

    const package = { name: "@auth0/auth0-spa-js", version: "^1.10.0" };
    const package1 = { name: "@auth0/asdfsduth0-spa-js", version: "^1.112.0" };
    let packagePath = path.join(CURR_DIR, projectName, reactName);
    updatePackage(packagePath, package);
    updatePackage(packagePath, package1);

    filesMap.map((each) => {
      fs.copyFile(
        `${CURR_DIR}\\src\\${each.srcFolder}\\${each.srcFileName}`,
        `${CURR_DIR}\\${projectName}\\${each.destFolder}\\${each.destFileName}`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
    });
  } else if (answers["authentication-choice"] === "Cognito") {
    choice = "cognito";
    writeIndexfile(choice, reactPath);
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
        `${CURR_DIR}\\src\\${each.srcFolder}\\${each.srcFileName}`,
        `${CURR_DIR}\\${projectName}\\${each.destFolder}\\${each.destFileName}`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
    });
  } else {
    if (projectChoice === "react" || projectChoice === "react_Node") {
      writeIndexfile("", reactPath, reduxIntegration);
    }
  }
});

//function to create db connection---------------------------------------------->
function createDbConn(
  nodePath,
  dbName,
  templatePath,
  defaultRoute,
  connectionString
) {
  connPath = nodePath + "/connections";
  fs.mkdirSync(connPath);
  if (dbName === "postgres" || dbName === "mysql") {
    let contents = fs.readFileSync(
      templatePath + "/dbTemplates/sequelize.js",
      "utf-8"
    );
    contents = render(
      contents,
      { connectionString, dbName },
      (autoescape = false)
    );
    fs.writeFileSync(connPath + "/" + dbName + ".js", contents, "utf-8");
    let package = { name: "sequelize", version: "^6.6.5" };
    updatePackage(nodePath, package);
  } else {
    let package = { name: "mongoose", version: "^6.0.2" };
    updatePackage(nodePath, package);
    let contents = fs.readFileSync(
      templatePath + "/dbTemplates/mongoose/mongoose.js",
      "utf-8"
    );
    fs.writeFileSync(connPath + "/" + dbName + ".js", contents, "utf-8");
    contents = fs.readFileSync(
      templatePath + "/dbTemplates/mongoose/routes.js",
      "utf-8"
    );
    contents = render(contents, { defaultRoute });
    fs.writeFileSync(connPath + "/routes" + ".js", contents, "utf-8");
  }
  contents = fs.readFileSync(templatePath + "/envTemplates/." + dbName + "Env");
  fs.writeFileSync(connPath + "/.env", contents, "utf-8");
}

//function to create directory--------------------------------------------------->
function createDirectoryContents(
  templatePath,
  newProjectPath,
  newDefaultRoute,
  useEffectImport,
  UseEffect,
  Imports,
  renderCondition,
  reactPath,
  screenName,
  demoUserIndexForRedux,
  demoUserComponentImports,
  demoUserDispatch,
  demoUserDataRender
) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach((file) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);
    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");
      const elements = newProjectPath.split("/");
      const NameProject = elements[elements.length - 1];
      if (
        path.join(CURR_DIR, newProjectPath, file) !=
        reactPath + "\\src\\index.js"
      ) {
        contents = render(
          contents,
          {
            projectName: NameProject,
            defaultRoute: newDefaultRoute,
            useEffectImport,
            UseEffect,
            Imports,
            renderCondition,
            screenName,
            demoUserIndexForRedux,
            demoUserComponentImports,
            demoUserDispatch,
            demoUserDataRender,
          },
          (autoescape = false)
        );

        const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;

        fs.writeFileSync(writePath, contents, "utf8");
      }
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`,
        newDefaultRoute,
        useEffectImport,
        UseEffect,
        Imports,
        renderCondition,
        reactPath,
        screenName,
        demoUserIndexForRedux,
        demoUserComponentImports,
        demoUserDispatch,
        demoUserDataRender
      );
    }
  });
}
function createLogger(utilpath, loggerName, loggerTemplatePath, defaultRoute) {
  let contents = fs.readFileSync(
    loggerTemplatePath + "/template/" + loggerName + ".js",
    "utf-8"
  );
  contents = render(contents, { defaultRoute });
  fs.writeFileSync(utilpath + "/index.js", contents, "utf-8");
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
      console.log("Email service created successfully.");
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
      console.log("Email service created successfully.");
    }
  );
}

//function to create Blob services------------------------------------------------->
function createBlobService(blobServiceName, blobTemplatePath, nodePath) {
  let contents = fs.readFileSync(blobTemplatePath + ".js", "utf-8");
  let servicePath = path.join(nodePath, "utils", "blob");
  fs.mkdirSync(servicePath);
  // contents = render(contents, { projectName: projectName });
  fs.writeFile(
    `${servicePath}` + "/" + `${blobServiceName}` + ".js",
    contents,
    function (err) {
      if (err) throw err;
      console.log("Blob service created successfully.");
    }
  );
}
//to update package.json------------------------------------------------>
function updatePackage(path, package) {
  let packagefile = fs.readFileSync(`${path}\\package.json`, "utf-8");
  packagefile = JSON.parse(packagefile);
  let newPackageFile = {
    ...packagefile,
    dependencies: {
      ...packagefile.dependencies,
      [package.name]: package.version,
    },
  };
  newPackageFile = JSON.stringify(newPackageFile);
  fs.writeFileSync(`${path}\\package.json`, newPackageFile, "utf-8");
}

//to write index.js file for authentication ----------------------------------------->
function writeIndexfile(choice, reactPath, reduxIntegration) {
  let imports = "";
  let envInfo = "";
  let providerStart = "";
  let providerEnd = "";
  let reduxProviderStart = "";
  let reduxProviderEnd = "";
  let reduxImport = "";
  let templatePath = path.join(__dirname, "templates/react/src", "index.js");

  if (reduxIntegration === "yes") {
    reduxProviderStart = "<Provider store={store}>";
    reduxProviderEnd = "</Provider>";
    reduxImport = `import { store } from "./store";
import { Provider } from "react-redux";`;
  }

  if (choice === "Auth0") {
    imports = `import { Auth0Provider } from './react-spa'`;
    envInfo = `const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENT_ID} = process.env`;
    providerStart = `<Auth0Provider
domain={REACT_APP_AUTH0_DOMAIN}
client_id={REACT_APP_AUTH0_CLIENT_ID}
redirect_uri={window.location.origin}
  >`;
    providerEnd = `</Auth0Provider>`;
  } else if (choice === "cognito") {
    imports = `import Amplify from 'aws-amplify';
import { AmplifyAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';`;
    envInfo = `const {
      REACT_APP_REGION,
      REACT_APP_USER_POOL_ID,
      REACT_APP_USER_POOL_WEB_CLIENT_IT,
  } = process.env;
  Amplify.configure( REACT_APP_REGION,
    REACT_APP_USER_POOL_ID,
    REACT_APP_USER_POOL_WEB_CLIENT_IT)`;
    providerStart = `<AmplifyAuthenticator>`;
    providerEnd = `<AmplifySignOut />
    </AmplifyAuthenticator>`;
  }

  let contents = fs.readFileSync(templatePath, "utf8");

  contents = render(
    contents,
    {
      imports,
      envInfo,
      providerStart,
      providerEnd,
      reduxImport,
      reduxProviderStart,
      reduxProviderEnd,
    },
    (autoescape = false)
  );

  const writePath = `${reactPath}` + "/src/index.js";

  fs.writeFileSync(writePath, contents, "utf8");
}
