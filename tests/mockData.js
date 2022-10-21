const EXPECTED_RESULT = {
  frontend: {
    react: "Creating react project: front-end using dev-tava 1.0.0",
    angular: "Creating angular project: front-end using dev-tava 1.0.0",
    vue: "Creating vue project: front-end using dev-tava 1.0.0",
  },
  css: {
    bootstrap: "Integrating CSS Framework: bootstrap",
    material: "Integrating CSS Framework: material",
    tailwind: "Integrating CSS Framework: tailwind",
  },
  testcase: {
    mocha: "Integrating Test Case framework: mochaJS",
    jest: "Integrating Test Case framework: jest",
    nightwatch: "Integrating Test Case framework: nightwatchJS",
    cypress: "Integrating Test Case framework: cypress",
    jasmine: "Integrating Test Case framework: jasmine",
    puppeteer: "Integrating Test Case framework: puppeteer",
    karma: "Integrating Test Case framework: karma",
  },
  theme: {
    light_dark_mode: "Integrating Theme Provider: light-dark-mode",
  },
  networkInformer: "Integrating Network Informer",
  authentication: {
    auth0: "Integrating Authentication service: Auth0",
    cognito: "Integrating Authentication service: Cognito",
    okta: "Integrating Authentication service: Okta",
  },
  store: {
    redux: "Integrating Redux store",
    ngrx: "Integrating Ngrx store",
    vuex: "Integrating Vuex store",
  },
  docker: "Integrating Docker Service",
  ci_cd: {
    aws: "Integrating CI/CD Pipeline: aws",
    github: "Integrating CI/CD Pipeline: github",
  },
  backend: {
    node: "Creating node-js project: backend using dev-tava 1.0.0",
  },
  database: {
    postgress: "Integrating Database service: postgres",
    mysql: "Integrating Database service: mysql",
    mongoose: "Integrating Database service: mongoose",
  },
  logger: {
    winston: "Integrating Logger service: winston",
    sentry: "Integrating Logger service: sentry",
  },
  email: {
    sendgrid: "Integrating Email service: sendgrid",
    ses: "Integrating Email service: amazon_ses",
    smtp: "Integrating Email service: smtp",
  },
  blob: {
    aws: "Integrating Blob service: aws-s3",
    azure: "Integrating Blob service: azure",
  },
  copyright: "Powered by Innostax",
  success: "Successfully created",
  getStarted: "To get Started",
  executionMsg: {
    react: "For react",
    angular: "For angular",
    vue: "For vue",
    node: "For node-js"
  },
  package: {
    npm: "npm",
    yarn: "yarn"
  },
  ready: "Ready to go"
};

const ANSWERS = {
  TCN001: {
    //npm,node,database,loggerService,emailService,blobService
    projectName: "node-project",
    projectDirectoryPath: process.cwd(),
    managerChoice: "npm",
    frontEnd: false,
    backEnd: true,
    backEndChoice: "node-js",
    backEndName: "backend",
    defaultRoute: "users",
    dbName: "mongoose",
    loggerServiceName: "winston",
    emailServiceName: "smtp",
    blobServiceName: "azure",
    dockerService: false,
  },
  TCV001: {
    //npm,vue,bootstrap,mocha,theme,networkInformer,auth0,store,docker,aws
    projectName: "vue-project-001",
    projectDirectoryPath: process.cwd(),
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "vue",
    cssFrameworkChoice: "bootstrap",
    frontEndName: "front-end",
    testCaseFramework: "mochaJS",
    theme: "light-dark-mode",
    networkInformer: true,
    authenticationChoice: "Auth0",
    store: true,
    backEnd: false,
    dockerService: true,
    cicdPipelineIntegrate: "aws",
  },
  TCV002: {
    //yarn,vue,tailwind,jest,cognito,github
    projectName: "vue-project-002",
    projectDirectoryPath: process.cwd(),
    managerChoice: "yarn",
    frontEnd: true,
    frontEndChoice: "vue",
    cssFrameworkChoice: "tailwind",
    frontEndName: "front-end",
    testCaseFramework: "jest",
    theme: false,
    networkInformer: false,
    authenticationChoice: "Cognito",
    store: false,
    backEnd: false,
    dockerService: false,
    cicdPipelineIntegrate: "github",
  },
  TCV003: {
    //npm,vue,bootstrap,nightwatch,okta,backend,mongoose,winston,smtp,azure
    projectName: "vue-project-003",
    projectDirectoryPath: process.cwd(),
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "vue",
    cssFrameworkChoice: "bootstrap",
    frontEndName: "front-end",
    testCaseFramework: "nightwatchJS",
    theme: false,
    networkInformer: false,
    authenticationChoice: "Okta",
    store: false,
    backEnd: true,
    backEndChoice: "node-js",
    backEndName: "backend",
    defaultRoute: "users",
    dbName: "mongoose",
    loggerServiceName: "winston",
    emailServiceName: "smtp",
    blobServiceName: "azure",
    dockerService: true,
    cicdPipelineIntegrate: false,
  },
  TCA001: {
    //npm,angular,bootstrap,mocha,theme,networkInformer,auth0,store,docker,aws
    projectName: "angular-project-001",
    projectDirectoryPath: process.cwd(),
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "angular",
    cssFrameworkChoice: "bootstrap",
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: "light-dark-mode",
    networkInformer: true,
    authenticationChoice: "Auth0",
    store: true,
    backEnd: false,
    dockerService: true,
    cicdPipelineIntegrate: "aws",
  },
  TCA002: {
    //yarn,angular,tailwind,jest,cognito,github
    projectName: "angular-project-002",
    projectDirectoryPath: process.cwd(),
    managerChoice: "yarn",
    frontEnd: true,
    frontEndChoice: "angular",
    cssFrameworkChoice: "tailwind",
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: false,
    networkInformer: false,
    authenticationChoice: "Cognito",
    store: false,
    backEnd: false,
    dockerService: false,
    cicdPipelineIntegrate: "github",
  },
  TCA003: {
    //npm,angular,material,nightwatch,okta,backend,mongoose,winston,smtp,azure
    projectName: "angular-project-003",
    projectDirectoryPath: process.cwd(),
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "angular",
    cssFrameworkChoice: "tailwind",
    frontEndName: "front-end",
    testCaseFramework: "nightwatchJS",
    theme: false,
    networkInformer: false,
    authenticationChoice: "Okta",
    store: false,
    backEnd: true,
    backEndChoice: "node-js",
    backEndName: "backend",
    defaultRoute: "users",
    dbName: "mongoose",
    loggerServiceName: "winston",
    emailServiceName: "smtp",
    blobServiceName: "azure",
    dockerService: true,
    cicdPipelineIntegrate: false,
  },
  TCR001: {
    //npm,react,bootstrap,mocha,theme,networkInformer,auth0,store,docker,aws
    projectName: "react-project-001",
    projectDirectoryPath: process.cwd(),
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "react",
    cssFrameworkChoice: "bootstrap",
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: "light-dark-mode",
    networkInformer: true,
    authenticationChoice: "Auth0",
    store: true,
    backEnd: false,
    dockerService: true,
    cicdPipelineIntegrate: "aws",
  },
  TCR002: {
    //yarn,react,tailwind,jest,cognito,github
    projectName: "react-project-002",
    projectDirectoryPath: process.cwd(),
    managerChoice: "yarn",
    frontEnd: true,
    frontEndChoice: "react",
    cssFrameworkChoice: "tailwind",
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: false,
    networkInformer: false,
    authenticationChoice: "Cognito",
    store: false,
    backEnd: false,
    dockerService: false,
    cicdPipelineIntegrate: "github",
  },
  TCR003: {
    //npm,react,material,nightwatch,okta,backend,mongoose,winston,smtp,azure
    projectName: "react-project-003",
    projectDirectoryPath: process.cwd(),
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "react",
    cssFrameworkChoice: "tailwind",
    frontEndName: "front-end",
    testCaseFramework: "nightwatchJS",
    theme: false,
    networkInformer: false,
    authenticationChoice: "Okta",
    store: false,
    backEnd: true,
    backEndChoice: "node-js",
    backEndName: "backend",
    defaultRoute: "users",
    dbName: "mongoose",
    loggerServiceName: "winston",
    emailServiceName: "smtp",
    blobServiceName: "azure",
    dockerService: true,
    cicdPipelineIntegrate: false,
  },
};
module.exports = {
  EXPECTED_RESULT,
  ANSWERS,
};
