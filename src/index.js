const inquirer = require("inquirer");
const fs = require("fs");
const { render } = require("./utils/template");
const { createDirectoryContents, updatePackage } = require("./utils/helper");
const path = require("path");
const fsExtra = require("fs-extra");
const CURR_DIR = process.cwd();

const AUTH_CHOICES = ["Auth0", "Cognito", "Okta"];
var mongoSelected = false

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
    message: "React project name:",
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
    message: "Do you want Authentication services?",
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
    default:"users",
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
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return (
        answers.projectChoice === "react" ||
        answers.projectChoice === "react_Node"
      );
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
    name: "loggerService",
    type: "list",
    message: "Do you want logger services?",
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
      return (
        answers.projectChoice == "react_Node" ||
        answers.projectChoice == "node-js"
      );
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
      return (
        answers.projectChoice == "react_Node" ||
        answers.projectChoice == "node-js"
      );
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
];

inquirer.prompt(QUESTIONS).then(async (answers) => {
  const projectChoice = answers["projectChoice"];
  const projectName = answers["project-name"];
  const emailService = answers["emailService"];
  const blobService = answers["blobService"];
  mongoSelected = answers["dbName"] === "mongoose"
  dbName = answers[""]
  let newDefaultRoute="";
  const reduxIntegration = answers["redux"];
  let reactName = "";
  var isAuth0 = false;
  var isCognito = false;
  var isRedux = reduxIntegration;
  const templatePath = path.join(__dirname, "templates", projectChoice);
  const defaultRoute = answers["default-route"];
  var reactPath = `${CURR_DIR}\\${projectName}`;
  fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {
    if (err) {
      console.error(err);
    }
  });
  let screenName = "<%= projectName %>";

  //----------------------------------------------------------------------//
  if (answers["authentication-choice"] === "Auth0") {
    isAuth0 = true;
  }
  if (answers["authentication-choice"] === "Cognito") {
    isCognito = true;
  }
  //for react + node
  if (projectChoice == "react_Node") {
    reactName = answers["react-name"];
    const nodeName = answers["node-name"];
    let reactTemplatePath = path.join(__dirname, "templates", "react");
    const nodeTemplatePath = path.join(__dirname, "templates", "node-js");
    var nodePath = `${CURR_DIR}/${projectName}/${nodeName}`;
    var reactPath = `${CURR_DIR}\\${projectName}\\${reactName}`;

    fsExtra.ensureDirSync(`${CURR_DIR}\\${projectName}\\${reactName}`);
    createDirectoryContents(
      reactTemplatePath,
      `${projectName}/${reactName}`,
      newDefaultRoute,
      isAuth0,
      isCognito,
      isRedux,
      reactPath,
      screenName,
      mongoSelected
    );

    fsExtra.ensureDirSync(`${CURR_DIR}\\${projectName}\\${nodeName}`);
    createDirectoryContents(
      nodeTemplatePath,
      `${projectName}/${nodeName}`,
      defaultRoute,
      isAuth0,
      isCognito,
      isRedux,
      reactPath,
      screenName,
      mongoSelected,
    );
    const newPath = `${CURR_DIR}\\${projectName}\\${nodeName}`
    const fileNames=[{oldName:'route.js', folder:'Routes',newName:`${defaultRoute}.routes.js`},{oldName:'controller.js', folder:'Controllers',newName:`${defaultRoute}.controllers.js`}]
    
    fileNames.map((each)=>
      fs.rename( `${newPath}\\${each.folder}\\${each.oldName}`, `${newPath}\\${each.folder}\\${each.newName}`,()=>{}))
  }

  // for react
  else if (projectChoice === "react") {
    createDirectoryContents(
      templatePath,
      projectName,
      newDefaultRoute,
      isAuth0,
      isCognito,
      isRedux,
      reactPath,
      screenName
    );
  } else if (projectChoice === "node-js") {
    var nodePath = path.join(CURR_DIR, projectName);
    createDirectoryContents(templatePath, projectName, defaultRoute,      
      isAuth0,
      isCognito,
      isRedux,
      reactPath,
      screenName,
      mongoSelected)
    const newPath = `${CURR_DIR}\\${projectName}`
    const fileNames=[{oldName:'route.js', folder:'Routes',newName:`${defaultRoute}.routes.js`},{oldName:'controller.js', folder:'Controllers',newName:`${defaultRoute}.controllers.js`}]
    
    fileNames.map((each)=>
      fs.rename( `${newPath}\\${each.folder}\\${each.oldName}`, `${newPath}\\${each.folder}\\${each.newName}`,()=>{}))
   
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

  //<-----------For Logger service---------------------------------------------------------------------------->
  if (answers["loggerService"] === "yes") {
    let loggerServiceName = answers["loggerName"];
    const loggerTemplatePath = path.join(__dirname, "logger");
    createLogger(nodePath, loggerServiceName, loggerTemplatePath, defaultRoute);
  }

  //<------------------------------------------------------------------------------------------->
  if(answers['dbService']==="yes"){
    let dbName=answers["dbName"];
    let connectionString= answers["connectionString"];
    createDbConn(nodePath,dbName,__dirname,defaultRoute,connectionString,projectName);
  }

  // <--------------------REDUX INTEGRATION------------------------->

  if (reduxIntegration) {
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
        `${reactPath}\\${each.destFolder}\\${each.destFileName}`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
    });

    fsExtra.copy(
      `${CURR_DIR}\\src\\reduxTemplates\\infrastructure`,
      `${reactPath}\\src\\infrastructure`,
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
  }
});

//function to create db connection---------------------------------------------->
function createDbConn(
  nodePath,
  dbName,
  templatePath,
  defaultRoute,
  connectionString,
  projectName
) {
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
    const modelPath = nodePath + "\\Models";
    fs.mkdirSync(modelPath);
    const filesMap = [
      {
        srcFolder: "dbTemplates",
        srcFileName: "mongoose.js",
        destFolder: nodePath,
        destFileName: "mongoose.js",
      },
    ];

    filesMap.map((each) => {
      fs.copyFile(
        `${CURR_DIR}\\src\\${each.srcFolder}\\${each.srcFileName}`,
        `${each.destFolder}\\${each.destFileName}`,
        (err) => {
          if (err) {
            console.log("Error Found:", err);
          }
        }
      );
    });
    const writePath = `${modelPath}\\${defaultRoute}.js`;
    let contents = fs.readFileSync(
      `${CURR_DIR}\\src\\dbTemplates\\mongooseModel.js`,
      "utf8"
    );
    contents = render(contents, { defaultRoute });
    fs.writeFileSync(writePath, contents, "utf8");
  }
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
  fs.writeFile(
    `${servicePath}` + "/" + `${blobServiceName}` + ".js",
    contents,
    function (err) {
      if (err) throw err;
      console.log("Blob service created successfully.");
    }
  );
}
