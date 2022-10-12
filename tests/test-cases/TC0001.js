const fs = require("fs");
const { expect } = require("chai");

const projectInfo = require("../../src/utils/projectInfo");
const projectSetUp = require("../../src/utils/projectSetUp");
const projectExecutionCommands = require("../../src/utils/projectExecutionCommands");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const {
  handleAnswersEvaluator,
} = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, TC0001_EXPECTED_RESULT } = require("../mockData");
const { echos } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC0001;

const CURR_DIR = projectDirectoryPath;
fs.mkdir(`${CURR_DIR}/${projectName}`, (err) => {
  if (err) {
    console.error(err);
  }
});

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

    await projectSetUp(frontEnd, backEnd, ANSWERS.TC0001);
    console.log("executed projectSetUp successfully");
    await projectExecutionCommands(frontEnd, backEnd, ANSWERS.TC0001);
    console.log("executed projectExecutionCommands successfully");
  });

  it("Should verify 'Creating angular project'", async (done) => {
    expect(echos[0]).to.include(TC0001_EXPECTED_RESULT[0][0]);
    done();
  });
  it("Should verify 'Integrating CSS Framework'", async (done) => {
    expect(echos[1]).to.include(TC0001_EXPECTED_RESULT[1][0]);
    done();
  });
  it("Should verify 'Creating node-js project'", async (done) => {
    expect(echos[2]).to.include(TC0001_EXPECTED_RESULT[2][0]);
    done();
  });
  it("Should verify 'Powered by Innostax'", async (done) => {
    expect(echos[3]).to.include(TC0001_EXPECTED_RESULT[3][0]);
    done();
  });
  it("Should verify 'NPM loading on angular'", async (done) => {
    expect(echos[4]).to.include(TC0001_EXPECTED_RESULT[4][0]);
    done();
  });
  it("Should verify 'NPM modules installed for AngularJS'", async (done) => {
    expect(echos[5]).to.include(TC0001_EXPECTED_RESULT[5][0]);
    done();
  });
  it("Should verify 'NPM loading on node-js'", async (done) => {
    expect(echos[6]).to.include(TC0001_EXPECTED_RESULT[6][0]);
    done();
  });
  it("Should verify 'NPM modules installed for NodeJS'", async (done) => {
    expect(echos[7]).to.include(TC0001_EXPECTED_RESULT[7][0]);
    done();
  });
  it("Should verify 'Installing time taken'", async (done) => {
    expect(echos[8]).to.include(TC0001_EXPECTED_RESULT[8][0]);
    done();
  });
  it("Should verify 'Successfully created'", async (done) => {
    expect(echos[9]).to.include(TC0001_EXPECTED_RESULT[9][0]);
    done();
  });
  it("Should verify 'To get Started'", async (done) => {
    expect(echos[10]).to.include(TC0001_EXPECTED_RESULT[10][0]);
    done();
  });
  it("Should verify 'For angular'", async (done) => {
    expect(echos[12]).to.include(TC0001_EXPECTED_RESULT[12][0]);
    done();
  });
  it("Should verify 'cd front-end'", async (done) => {
    expect(echos[13]).to.include(TC0001_EXPECTED_RESULT[13][0]);
    done();
  });
  it("Should verify 'npm start'", async (done) => {
    expect(echos[14]).to.include(TC0001_EXPECTED_RESULT[14][0]);
    done();
  });
  it("Should verify 'For node-js'", async (done) => {
    expect(echos[16]).to.include(TC0001_EXPECTED_RESULT[16][0]);
    done();
  });
  it("Should verify 'cd backend'", async (done) => {
    expect(echos[17]).to.include(TC0001_EXPECTED_RESULT[17][0]);
    done();
  });
  it("Should verify 'npm start'", async (done) => {
    expect(echos[18]).to.include(TC0001_EXPECTED_RESULT[18][0]);
    done();
  });
  it("Should verify 'Ready to go'", async (done) => {
    expect(echos[20]).to.include(TC0001_EXPECTED_RESULT[20][0]);
    done();
  });

  after(async function () {
    console.log("Project Path", `${CURR_DIR}/${projectName}`);
    fs.rmSync(`${CURR_DIR}/${projectName}`, { recursive: true, force: true });
  });
});
