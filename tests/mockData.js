const PROJECT_INFO_EXPECTED_DATA = [
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
];

const ANSWERS_TC0001 = {
    projectName: "my-project-we-abcdeffgfgfg",
    projectDirectoryPath: "C:/Test-tavajs",
    managerChoice: "npm",
    frontEnd: true,
    frontEndChoice: "react",
    cssFrameworkChoice: 'material',
    frontEndName: "front-end",
    testCaseFramework: false,
    theme: "light-dark-mode",
    authenticationChoice: "Autho",
    store: true,
    backEnd: true,
    backEndChoice: "node-js",
    backEndName: "back-end",
    defaultRoute: "users",
    dbName: "mongoose",
    reactNodeCrud: true,
    loggerServiceName: "winston",
    emailServiceName: "sendgrid",
    blobServiceName: "azure",
    dockerService: false,
  };

module.exports = { PROJECT_INFO_EXPECTED_DATA, ANSWERS_TC0001 };
