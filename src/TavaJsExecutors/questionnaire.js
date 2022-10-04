const fs = require('fs');
const { validateKebabCase } = require("../utils/validators")
module.exports = [
  {
    name: "projectName",
    type: "input",
    message: "Project name:",
    validate: function (input) {
      const isValid = validateKebabCase(input);
      if (isValid) return true;
      else return "Project name should be in kebab-case. e.g. project-name";
    },
  },
  {
    name: "projectDirectoryPath",
    type: "input",
    message: "Which source folder path would you like?",
    default: process.cwd(),
    validate: function(input) {
      if(fs.existsSync(input)) return true;
      else
        return "Invalid source path.";
    },
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
      { name: "MaterialUI", value: "material" },
      { name: "Bootstrap", value: "bootstrap" },
      { name: "TailWind", value: "tailwind" },
    ],
    when: (answers) => {
      return answers.frontEndChoice;
    },
  },
  /*CSS Framework question ended here */
  {
    name: "frontEndName",
    type: "input",
    message: "Front End project name:",
    validate: function (input) {
      const isValid = validateKebabCase(input);
      if (isValid) return true;
      else return "Frontend Project name should be in kebab-case. e.g. font-end-name";
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
      { name: "NightwatchJS", value: "nightwatchJS" },
      { name: "Cypress", value: "cypress" },
      { name: "None", value: false },
    ],
    when: (answers) => {
      return (answers.frontEnd && answers.frontEndChoice=="react");
    },
  },
  {
    name: "testCaseFramework",
    type: "list",
    message: "Select the Test Case Framework",
    choices: [
      { name: "Jasmine", value: "jasmine" },
      //{ name: "Karma", value: "karma" }, // Test Framework Runner
      { name: "NightwatchJS", value: "nightwatchJS" },
      { name: "Cypress", value: "cypress" },
      { name: "None", value: false },
    ],
    when: (answers) => {
      return (answers.frontEnd && answers.frontEndChoice=="angular")
    },
  },
  {
    name: "testCaseFramework",
    type: "list",
    message: "Select the Test Case Framework",
    choices: [
      { name: "MochaJS", value: "mochaJS" },
      { name: "Jest", value: "jest" },
      { name: "NightwatchJS", value: "nightwatchJS" },
      { name: "Cypress", value: "cypress" },
      { name: "None", value: false },
    ],
    when: (answers) => {
      return (answers.frontEnd && answers.frontEndChoice=="vue")
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
    name: "networkInformer",
    type: "list",
    message: "Do you want show Network Connection Informer?",
    choices: [
      { name: "Yes", value: true },
      { name: "No", value: false },
    ],
    when: (answers) => {
      return answers.frontEndChoice;
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
      const isValid = validateKebabCase(input);
      if (isValid) return true;
      else return "Backend Project name should be in kebab-case. e.g. back-end-name";
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
    message: "Do you want angular ngrx with CRUD?",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return (
        answers.store &&
        answers.frontEndChoice === "angular" &&
        !answers.backEnd
      );
    },
  },
  {
    name: "angularNodeCrud",
    type: "list",
    message: "Do you want crud integration with angular-Node boiler plate?",
    choices: [
      { name: "yes", value: true },
      { name: "no", value: false },
    ],
    when: (answers) => {
      return (
        answers.backEnd &&
        answers.dbName &&
        answers.frontEndChoice === "angular"
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
      return answers.frontEndChoice || answers.backEnd;
    },
  },
  {
    name: "cicdPipelineIntegrate",
    type: "list",
    message: "Would you like to integrate CI/CD pipeline?",
    choices: [
      { name: "AWS", value: "aws" },
      { name: "GitHub", value: "github" },
      { name: "None", value: false },
    ],
    when: (answers) => {
      return answers.frontEndChoice;
    },
  },
];
