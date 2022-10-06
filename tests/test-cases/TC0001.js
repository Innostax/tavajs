const fs = require("fs");
const expect = require("chai").expect;
require("mocha-sinon");

const projectInfo = require("../../src/utils/projectInfo");
const projectSetUp = require("../../src/utils/projectSetUp");
const projectExecutionCommands = require("../../src/utils/projectExecutionCommands");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const {
  handleAnswersEvaluator,
} = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, PROJECT_INFO_EXPECTED_DATA, ANGULAR_APP_EXPECTED_RESULT } = require("../mockData");
const { echos, initialExecution } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC0001;

const CURR_DIR = projectDirectoryPath;
fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {});

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TC0001
);

describe("Verify working of ANSWERS.TC0001 evaluator method.", async () => {
  before(async function () {
    await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0001);
    console.log("executed handleAnswersEvaluator successfully");
    await projectInfo(frontEnd, backEnd, ANSWERS.TC0001);
    console.log("executed projectInfo successfully");
    
    // await projectSetUp(frontEnd, backEnd, ANSWERS.TC0001);
    // console.log("executed projectSetUp successfully");
    // projectExecutionCommands(frontEnd, backEnd, ANSWERS.TC0001);
    // console.log("executed projectExecutionCommands successfully");
  });

  it("Should verify 'Creating react project'", async function (done) {
    expect(echos[0][0]).to.equal(ANGULAR_APP_EXPECTED_RESULT[0][0]);
    done();
  });
  it("Should verify 'Integrating Authentication service", async (done) => {
    expect(echos[1][0]).to.equal(ANGULAR_APP_EXPECTED_RESULT[1][0]);
    done();
  });
  it("Should verify 'Integrating CSS Framework", async (done) => {
    console.log("echos===============>", echos);
    expect(echos[2][0]).to.equal(ANGULAR_APP_EXPECTED_RESULT[2][0]);
    done();
  });
  it("Should verify 'Integrating theme", async (done) => {
    expect(echos[3][0]).to.equal(ANGULAR_APP_EXPECTED_RESULT[3][0]);
    done();
  });
  // it("Should verify 'Integrating Redux pattern'", async (done) => {
  //   expect(echos[4][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[4][0]);
  //   done();
  // });
  // it("Should verify 'Creating node-js project'", async (done) => {
  //   expect(echos[5][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[5][0]);
  //   done();
  // });
  // it("Should verify 'Integrating Database service'", async (done) => {
  //   expect(echos[6][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[6][0]);
  //   done();
  // });
  // it("Should verify 'Integrating Logger service'", async (done) => {
  //   expect(echos[7][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[7][0]);
  //   done();
  // });
  // it("Should verify 'Integrating Email service'", async (done) => {
  //   expect(echos[8][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[8][0]);
  //   done();
  // });
  // it("Should verify 'Integrating Redux pattern'", async (done) => {
  //   expect(echos[9][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[9][0]);
  //   done();
  // });

  after(async function () {
    // fs.close();
    console.log("path is this", `${CURR_DIR}/${projectName}`)
    fs.rmSync(`${CURR_DIR}/${projectName}`, { recursive: true, force: true });
  });
});
