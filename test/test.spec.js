const { echos } = require("../shell");
const { handleAnswersEvaluator } = require("../src/answersEvaluator");
const { answers } = require("./tests.constants");
const expect = require("chai").expect;

const projectInfo = require("../src/utils/projectInfo");
const { getProjectDetails } = require("../src/utils/getProjectDetails");
const fs = require("fs");

require("mocha-sinon");

const expectedData = [
  [
    "\x1B[32m\x1B[1m📂 Creating react project: front-end using dev-tava 1.0.0\x1B[22m\x1B[39m",
  ],
  [
    "\x1B[32m\x1B[1m   ⌛ Integrating Authentication service: Autho\x1B[22m\x1B[39m",
  ],
  [
    '\x1B[32m\x1B[1m   ⌛ Integrating CSS Framework: true\x1B[22m\x1B[39m'
  ],
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

// Before to run the test cases:
const { projectName, projectDirectoryPath } = answers;
const CURR_DIR = projectDirectoryPath; 
  fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {
   
  });
    
  const { frontEnd, backEnd } = getProjectDetails(
    `${CURR_DIR}/${projectName}`,
    answers
  );

describe("Verify working of answers evaluator method.", async () => {
  // beforeEach(async () => {
    await handleAnswersEvaluator(frontEnd, backEnd, answers);
    await projectInfo(frontEnd, backEnd, answers);
  // });

  it("Should verify 'Creating react project'", async () => {
    expect(echos[0][0]).to.equal(expectedData[0][0]);
  });
  it("Should verify 'Integrating Authentication service", async () => {
    expect(echos[1][0]).to.equal(expectedData[1][0]);
  });
  it("Should verify 'Integrating CSS Framework", async () => {
    expect(echos[2][0]).to.equal(expectedData[2][0]);
  });
  it("Should verify 'Integrating theme", async () => {
    expect(echos[3][0]).to.equal(expectedData[3][0]);
  });
  it("Should verify 'Integrating Redux pattern'", async () => {
    expect(echos[4][0]).to.equal(expectedData[4][0]);
  });
  it("Should verify 'Creating node-js project'", async () => {
    expect(echos[5][0]).to.equal(expectedData[5][0]);
  });
  it("Should verify 'Integrating Database service'", async () => {
    expect(echos[6][0]).to.equal(expectedData[6][0]);
  });
  it("Should verify 'Integrating Logger service'", async () => {
    expect(echos[7][0]).to.equal(expectedData[7][0]);
  });
  it("Should verify 'Integrating Email service'", async () => {
    expect(echos[8][0]).to.equal(expectedData[8][0]);
  });
  it("Should verify 'Integrating Blob service'", async () => {
    expect(echos[9][0]).to.equal(expectedData[9][0]);
  });
});
