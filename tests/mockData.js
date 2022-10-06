const ANGULAR_APP_TEST_CASES = [
  [ '📂 Creating angular project: front-end using dev-tava 1.0.0' ],
  [ '   ⌛ Integrating CSS Framework: bootstrap' ],
  [ '📂 Creating node-js project: backend using dev-tava 1.0.0' ],
  [ '© Powered by Innostax' ],
  [
    '--------------- NPM loading on angular, Wait for finish ---------------\r'
  ],
  [ '-> NPM modules installed!👍\r' ],
  [
    '--------------- NPM loading on node-js, Wait for finish ---------------\r'
  ],
  [ '-> NPM modules installed!👍\r' ],
  [ 'Installing took 0:57 minutes.' ],
  [ '✅ Successfully created \n ' ],
  [ '-> To get Started: \n' ],
  [
    '     cd /home/runner/work/tavajs/tavajs\\test-angular-proj-new-new \n'
  ],
  [ '-> For angular: \n' ],
  [ '     cd front-end' ],
  [ '     npm start' ],
  [ '' ],
  [ '-> For node-js: \n' ],
  [ '     cd backend' ],
  [ '     npm start' ],
  [ '' ],
  [ '------------------------ Ready to go --------------------------' ]
]

const PROJECT_INFO_EXPECTED_DATA = [
  [
    "\x1B[32m\x1B[1m📂 Creating react project: front-end using dev-tava 1.0.0\x1B[22m\x1B[39m",
  ],
  [
    "\x1B[32m\x1B[1m   ⌛ Integrating Authentication service: Autho\x1B[22m\x1B[39m",
  ],
  ["\x1B[32m\x1B[1m   ⌛ Integrating CSS Framework: material\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m   ⌛ Integrating Theme Provider: light-dark-mode\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m   ⌛ Integrating Redux pattern\x1B[22m\x1B[39m"],
  [
    "\x1B[32m\x1B[1m📂 Creating node-js project: back-end using dev-tava 1.0.0\x1B[22m\x1B[39m",
  ],
  [
    "\x1B[32m\x1B[1m   ⌛ Integrating Database service: mongoose\x1B[22m\x1B[39m",
  ],
  ["\x1B[32m\x1B[1m   ⌛ Integrating Logger service: winston\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m   ⌛ Integrating Email service: sendgrid\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m   ⌛ Integrating Blob service: azure\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m© Powered by Innostax\x1B[22m\x1B[39m"],
  [
    "\x1B[32m\x1B[35m--------------- NPM loading on react, Wait for finish ---------------\r\x1B[39m\x1B[39m",
  ],
  [
    "\x1B[32m\x1B[1m📂 Creating angular project: backend using dev-tava 1.0.0\x1B[22m\x1B[39m",
  ],
  ["\x1B[32m\x1B[1m   ⌛ Integrating Database service: mysql\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m   ⌛ Integrating CSS Framework: bootstrap\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m   ⌛ Integrating CSS Framework: tailwind\x1B[22m\x1B[39m"],
];

const ANSWERS = {
  // AngularJS, Bootstrap and NodeJS
  TC0001: {
    projectName: "test-angular-proj-new-new-new",
    projectDirectoryPath: process.cwd(), // "C:\\\\Practice",  // 
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "angular",
    cssFrameworkChoice: "bootstrap",
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: false,
    networkInformer: false,
    authenticationChoice: false,
    store: false,
    backEnd: true,
    backEndChoice: "node-js",
    backEndName: "backend",
    defaultRoute: "users",
    dbName: false,
    loggerServiceName: false,
    emailServiceName: false,
    blobServiceName: false,
    dockerService: false,
    cicdPipelineIntegrate: false,
    // projectName: "test-cases-project-new-test",
    // projectDirectoryPath: "C:\\Practice",
    // managerChoice: "npm",
    // frontEnd: true,
    // frontEndChoice: "react",
    // cssFrameworkChoice: "material",
    // frontEndName: "front-end",
    // testCaseFramework: "mochaJS",
    // theme: "light-dark-mode", 
    // networkInformer: true,
    // authenticationChoice: "Auth0",
    // store: true,
    // backEnd: true,
    // backEndChoice: "node-js",
    // backEndName: "backend",
    // defaultRoute: "users",
    // dbName: "postgres",
    // loggerServiceName: "winston",
    // emailServiceName: "sendgrid",
    // blobServiceName: "aws-s3",
    // dockerService: false,
    // cicdPipelineIntegrate: "github",
  },
  TC0002: {
    //npm,react,materialui,light-dark-mode,crud
    // projectName: "test-case-00003",
    // projectDirectoryPath: process.cwd(), // "C:\\\\Practice",  // 
    // managerChoice: "npm",
    // frontEnd: true,
    // frontEndChoice: "angular",
    // cssFrameworkChoice: "bootstrap",
    // frontEndName: "front-end",
    // testCaseFramework: false,
    // theme: false,
    // networkInformer: false,
    // authenticationChoice: false,
    // store: false,
    // backEnd: true,
    // backEndChoice: "node-js",
    // backEndName: "backend",
    // defaultRoute: "users",
    // dbName: false,
    // loggerServiceName: false,
    // emailServiceName: false,
    // blobServiceName: false,
    // dockerService: false,
    // cicdPipelineIntegrate: false,
    projectName: "react-frontend",
    projectDirectoryPath: process.cwd(),
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "react",
    cssFrameworkChoice: "material",
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: "light-dark-mode",
    authenticationChoice: false,
    store: true,
    backEnd: false,
    CRUD: true,
    dockerService: false,
  },
  TC0003: {
    //npm,Nodejs+mysql
    projectName: "my-project-backend",
    projectDirectoryPath: "C:/Test-tavajs",
    managerChoice: "npm",
    frontEnd: false,
    backEnd: true,
    backEndChoice: "node-js",
    backEndName: "backend",
    defaultRoute: "users",
    dbName: "mysql",
    loggerServiceName: false,
    emailServiceName: false,
    blobServiceName: false,
    dockerService: false,
  },
  TC0004: {
    //npm,react,bootstrap,light-dark-mode,crud,store
    projectName: "react-bootstrap",
    projectDirectoryPath: "C:/Test-tavajs",
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "react",
    cssFrameworkChoice: "bootstrap",
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: "light-dark-mode",
    authenticationChoice: false,
    store: true,
    backEnd: false,
    CRUD: true,
    dockerService: false,
  },
  TC0005: {
    //npm,react,tailwind
    projectName: "react-tailwind",
    projectDirectoryPath: "C:\\TAVAJS-Projects",
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "react",
    cssFrameworkChoice: "tailwind",
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: false,
    authenticationChoice: false,
    store: false,
    backEnd: false,
    dockerService: false,
  },
};

const PROJECT_SETUP_EXPECTED_DATA = [
  [
    "\x1B[32m\x1B[1m📂 Creating react project: front-end using dev-tava 1.0.0\x1B[22m\x1B[39m",
  ],
  [
    "\x1B[32m\x1B[1m   ⌛ Integrating Authentication service: Autho\x1B[22m\x1B[39m",
  ],
  ["\x1B[32m\x1B[1m   ⌛ Integrating CSS Framework: material\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m   ⌛ Integrating theme: light-dark-mode\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m   ⌛ Integrating Redux pattern\x1B[22m\x1B[39m"],
  [
    "\x1B[32m\x1B[1m📂 Creating node-js project: back-end using dev-tava 1.0.0\x1B[22m\x1B[39m",
  ],
  [
    "\x1B[32m\x1B[1m   ⌛ Integrating Database service: mongoose\x1B[22m\x1B[39m",
  ],
  ["\x1B[32m\x1B[1m   ⌛ Integrating Logger service: winston\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m   ⌛ Integrating Email service: sendgrid\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m   ⌛ Integrating Blob service: azure\x1B[22m\x1B[39m"],
  ["\x1B[32m\x1B[1m© Powered by Innostax\x1B[22m\x1B[39m"],
  [
    "\x1B[32m\x1B[35m--------------- NPM loading on react, Wait for finish ---------------\r\x1B[39m\x1B[39m",
  ],
  ["\x1B[32m\x1B[1m-> NPM modules installed!👍\r\x1B[22m\x1B[39m"],
  ["\x1B[31m\x1B[1mInstalling took 19:54 minutes.\x1B[22m\x1B[39m"],
  [
    "\x1B[32m\x1B[35m--------------- NPM loading on node-js, Wait for finish ---------------\r\x1B[39m\x1B[39m",
  ],
  ["\x1B[32m\x1B[1m-> NPM modules installed!👍\r\x1B[22m\x1B[39m"],
  ["\x1B[31m\x1B[1mInstalling took 19:54 minutes.\x1B[22m\x1B[39m"],
  [
    "\x1B[32m\x1B[1m✅ Successfully created \x1B[22m\x1B[39m\n\x1B[32m\x1B[1m \x1B[22m\x1B[39m",
  ],
  [
    "\x1B[95m\x1B[1m-> To get Started: \x1B[22m\x1B[39m\n\x1B[95m\x1B[1m\x1B[22m\x1B[39m",
  ],
  [
    "\x1B[96m\x1B[3m\x1B[1m     cd C:/Practice\\test-oooijklm \x1B[22m\x1B[23m\x1B[39m\n" +
      "\x1B[96m\x1B[3m\x1B[1m\x1B[22m\x1B[23m\x1B[39m",
  ],
  [
    "\x1B[95m\x1B[1m-> For react: \x1B[22m\x1B[39m\n\x1B[95m\x1B[1m\x1B[22m\x1B[39m",
  ],
  ["\x1B[96m\x1B[3m\x1B[1m     cd front-end\x1B[22m\x1B[23m\x1B[39m"],
  ["\x1B[96m\x1B[3m\x1B[1m     npm start\x1B[22m\x1B[23m\x1B[39m"],
  [""],
  [
    "\x1B[95m\x1B[1m-> For node-js: \x1B[22m\x1B[39m\n\x1B[95m\x1B[1m\x1B[22m\x1B[39m",
  ],
  ["\x1B[96m\x1B[3m\x1B[1m     cd back-end\x1B[22m\x1B[23m\x1B[39m"],
  ["\x1B[96m\x1B[3m\x1B[1m     npm start\x1B[22m\x1B[23m\x1B[39m"],
  [""],
  [
    "\x1B[96m\x1B[3m\x1B[1m------------------------ Ready to go --------------------------\x1B[22m\x1B[23m\x1B[39m",
  ],
];

module.exports = {
  PROJECT_INFO_EXPECTED_DATA,
  PROJECT_SETUP_EXPECTED_DATA,
  ANSWERS,
  ANGULAR_APP_TEST_CASES
};
