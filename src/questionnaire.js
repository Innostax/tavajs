module.exports = [
  {
    name: "projectName",
    type: "input",
    message: "Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
  },
  {
    name: "projectDirectoryPath",
    type: "input",
    message: "Enter destination folder path?",
    when: (answers) => {
      return answers.projectName;
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
      { name: "yes", value: true },
      { name: "no", value: false },
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
      return answers.frontEnd;
    },
  },
   /* CSS Framework question added here */
  {
    name: "cssFrameworkChoice",
    type: "list",
    message: "Which CSS Framework do you want?",
    choices: [
      {name: "MaterialUI", value: "materialUI"},
      {name: "Bootstrap", value: "bootstrap" }
    ],
    when: (answers) => {
      return answers.frontEndChoice == "react";
    },
  },
  /*CSS Framework question ended here */
  {
    name: "frontEndName",
    type: "input",
    message: "Front End project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
    when: (answers) => {
      return answers.frontEnd;
    },
  },
  {
    name: "testCaseFramework",
    type: "list",
    message: "Select the Test Case Framework",
    choices: [
      { name: "MochaJS", value: "mochaJS" },
      { name: "Jest", value: "jest" },
      { name: "Jasmine", value: "jasmine" },
      { name: "Karma", value: "karma" },
      { name: "Puppeteer (Node Library)", value: "puppeteer" },
      { name: "NightwatchJS", value: "nightwatchJS" },
      { name: "Cypress", value: "cypress" },
      { name: "None", value: false },
    ],
    when: (answers) => {
      return answers.frontEnd;
    },
  },
  {
    name: "theme",
    type: "list",
    message: "Do you want Theme-provider?",
    choices: [
      { name: "Light/Dark Mode", value: "light-dark-mode" },
      { name: "None", value: false },
    ],
    when: (answers) => {
      return answers.frontEnd;
    },
  },
  {
    name: "authenticationChoice",
    type: "list",
    message: "What Authentication Service you want to use?",
    choices: [
      { name: "Auth0", value: "Auth0" },
      { name: "Cognito", value: "Cognito" },
      { name: "Okta", value: "Okta" },
      { name: "None", value: false },
    ],
    when: (answers) => answers.frontEnd,
  },
  {
    name: "store",
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
    name: "store",
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
    name: "store",
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
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
  },
  {
    name: "backEndChoice",
    type: "list",
    message: "Select the Framework",
    choices: [{ name: "Node", value: "node-js" }],
    when: (answers) => {
      return answers.backEnd;
    },
  },
  {
    name: "backEndName",
    type: "input",
    message: "BackEnd Project name:",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
    when: (answers) => {
      return answers.backEnd;
    },
  },
  {
    name: "defaultRoute",
    type: "input",
    message: "Enter the default route",
    default: "users",
    when: (answers) => {
      return answers.backEnd;
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
      { name: "None", value: false },
    ],
    when: (answers) => {
      return answers.backEnd;
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
        answers.store && answers.frontEndChoice === "react" && !answers.backEnd
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
        answers.backEnd && answers.frontEnd && answers.store && answers.dbName && answers.frontEndChoice === "react"
      );
    },
  },
  {
    name: "CRUD",
    type: "list",
    message: "Do you want Vue with CRUD?",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return (
        answers.store && answers.frontEndChoice === "vue" && !answers.backEnd
      );
    },
  },
  {
    name: "vueNodeCrud",
    type: "list",
    message: "Do you want crud integration with Vue-Node boiler plate?",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return (
        answers.backEnd && answers.frontEnd && answers.store && answers.dbName && answers.frontEndChoice === "vue"
      );
    },
  },
  {
    name: "loggerServiceName",
    type: "list",
    message: "Which logger service do you want?",
    choices: [
      { name: "Winston", value: "winston" },
      { name: "Sentry", value: "sentry" },
      { name: "None", value: false },
    ],
    when: (answers) => {
      return answers.backEnd;
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
      { name: "None", value: false },
    ],
    when: (answers) => {
      return answers.backEnd;
    },
  },
  {
    name: "blobServiceName",
    type: "list",
    message: "Which Blob service do you want?",
    choices: [
      { name: "AWS-s3", value: "aws-s3" },
      { name: "Azure", value: "azure" },
      { name: "None", value: false },
    ],
    when: (answers) => {
      return answers.backEnd;
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
      return answers.frontEndChoice === "react" || answers.backEnd;
    },
  },
];
