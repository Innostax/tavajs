const PROJECT_INFO_EXPECTED_DATA = [
  ["📂 Creating react project: front-end using dev-tava 1.0.0"],
  ["⌛ Integrating Authentication service: Autho"],
  ["⌛ Integrating CSS Framework: material"],
  ["⌛ Integrating Theme Provider: light-dark-mode"],
  ["⌛ Integrating Redux pattern"],
  ["📂 Creating node-js project: back-end using dev-tava 1.0.0"],
  ["⌛ Integrating Database service: mongoose"],
  ["⌛ Integrating Logger service: winston"],
  ["⌛ Integrating Email service: sendgrid"],
  ["⌛ Integrating Blob service: azure"],
  ["© Powered by Innostax"],
  ["--------------- NPM loading on react, Wait for finish ---------------\r"],
  ["📂 Creating angular project: backend using dev-tava 1.0.0"],
  ["⌛ Integrating Database service: mysql"],
  ["⌛ Integrating CSS Framework: bootstrap"],
  ["⌛ Integrating CSS Framework: tailwind"],
];

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

const ANGULAR_APP_EXPECTED_RESULT = [
  [ '   📂 Creating angular project: front-end using dev-tava 1.0.0' ],
  [ '   ⌛ Integrating CSS Framework: bootstrap' ],
  [ '   📂 Creating node-js project: backend using dev-tava 1.0.0' ],
  [ '© Powered by Innostax' ],
  [
    '--------------- NPM loading on angular, Wait for finish ---------------\r'
  ],
  [ '-> NPM modules installed!👍\r' ],
  [
    '--------------- NPM loading on node-js, Wait for finish ---------------\r'
  ],
  [ '-> NPM modules installed!👍\r' ],
  [ '✅ Successfully created' ],
  [ '-> To get Started: \n' ],
  [
    '     cd /home/runner/work/tavajs/tavajs\\test-cases-for-angular-project-tc0001 \n'
  ],
  [ '-> For angular: \n' ],
  [ '     cd front-end' ],
  [ '     npm start' ],
  [ '-> For node-js: \n' ],
  [ '     cd backend' ],
  [ '     npm start' ],
  [ '------------------------ Ready to go --------------------------' ]
]

const ANGULAR_APP_TC009_EXPECTED = [
  [ '📂 Creating angular project: front-end using dev-tava 1.0.0' ],
  [ '⌛ Integrating CSS Framework: tailwind' ],
  [ '⌛ Integrating Theme Provider: light-dark-mode' ],
  [ '⌛ Integrating Network Informer' ],
  [ '⌛ Integrating Ngrx pattern' ],
  [ '© Powered by Innostax' ],
  ['NPM loading on angular, Wait for finish ---------------\r'
  ],
  [ '-> NPM modules installed!👍\r' ],
  [ 'Successfully created' ],
  [ 'To get Started' ],
  ['cd /home/runner/work/tavajs/tavajs\\test-cases-for-angular-project-tc0009 \n'],
  [ 'npm start' ],
  [ 'Ready to go' ]
]

const ANGULAR_APP_TC00010_EXPECTED = [
  [ 'Creating angular project: front-end using dev-tava 1.0.0' ],
  [ 'Integrating CSS Framework: material' ],
  [ 'Integrating Theme Provider: light-dark-mode' ],
  [ 'Integrating Network Informer' ],
  [ 'Integrating Authentication service: Okta' ],
  [ 'Integrating Ngrx pattern' ],
  [ '© Powered by Innostax' ],
  ['NPM loading on angular, Wait for finish'],
  [ '-> NPM modules installed!👍\r' ],
  ['NPM loading on node-js, Wait for finish'],
  [ '-> NPM modules installed!👍\r' ],
  [ 'Successfully created' ],
  [ 'To get Started' ],
  ['For angular']
  [ 'npm start' ],
  ['For node-js'],
  [ 'npm start' ],
  [ 'Ready to go' ]
]

const ANSWERS = {
  // AngularJS, Bootstrap and NodeJS
  TC0001: {
    projectName: "angular-project-tc0001",
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
  },
  TC0002: {
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
  TC0009: {
    //angular tailwind light-darkomode ngrx 
    projectName: "angular-tailwind",
    projectDirectoryPath: "C:\\tavatest",
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "angular",
    cssFrameworkChoice: "tailwind",
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: "light-dark-mode",
    networkInformer: true,
    authenticationChoice: false,
    store: true,
    backEnd: false,
    dockerService: false,
  },
  TC00010: {
    //angular material light-darkomode ngrx authentication node database email-service
    projectName: "angular-full",
    projectDirectoryPath: "C:\\tavatest",
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "angular",
    cssFrameworkChoice: "tailwind",
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: "light-dark-mode",
    networkInformer: true,
    authenticationChoice: "Okta",
    store: true,
    backEnd: true,
    backEndChoice: "node-js",
    backEndName: "backend",
    defaultRoute: "users",
    dbName: "mongoose",
    emailServiceName: "smtp",
    dockerService: false,
  }
};
module.exports = {
  PROJECT_INFO_EXPECTED_DATA,
  PROJECT_SETUP_EXPECTED_DATA,
  ANGULAR_APP_EXPECTED_RESULT,
  ANGULAR_APP_TC009_EXPECTED,
  ANGULAR_APP_TC00010_EXPECTED,
  ANSWERS
};
