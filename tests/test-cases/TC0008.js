const fsExtra = require("fs-extra");
const expect = require("chai").expect;
require("mocha-sinon");

const projectInfo = require("../../src/utils/projectInfo");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const projectExecutionCommands = require("../../src/utils/projectExecutionCommands");
const { handleAnswersEvaluator } = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, EXPECTED_RESULT } = require("../mockData");
const { echos } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC0008;

const CURR_DIR = projectDirectoryPath;

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TC0008
);

describe("Verify working of ANSWERS.TC0008 evaluator method.", async () => {
  await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0008);
  await projectInfo(frontEnd, backEnd, ANSWERS.TC0008);
  await projectExecutionCommands(frontEnd, backEnd, ANSWERS.TC0008);
    // console.log("executed projectExecutionCommands successfully");
  // console.log("echos",echos)

  it("Should verify 'Creating vue project'", async () => {
    expect(echos[0]).to.include(EXPECTED_RESULT.frontend.vue);
  });
  it("Should verify 'Integrating CSS Framework: bootstrap", async () => {
    expect(echos[1]).to.include(EXPECTED_RESULT.css.bootstrap);
  });
  it("Should verify 'Integrating Test Case framework: cypress'", async () => {
    expect(echos[2]).to.include(EXPECTED_RESULT.testcase.nightwatch);
  });
  it("Should verify 'Integrating Authentication service: Okta'", async () => {
    expect(echos[3]).to.include(EXPECTED_RESULT.authentication.okta);
  });
  it("Should verify 'Creating node-js project'", async () => {
    expect(echos[4]).to.include(EXPECTED_RESULT.backend.node);
  });
  it("Should verify 'Integrating Database service: mongoose'", async () => {
    expect(echos[5]).to.include(EXPECTED_RESULT.database.mongoose);
  });
  it("Should verify 'Integrating Logger service: winston", async () => {
    expect(echos[6]).to.include(EXPECTED_RESULT.logger.winston);
  });
  it("Should verify 'Integrating Email service: smtp'", async () => {
    expect(echos[7]).to.include(EXPECTED_RESULT.email.smtp);
  });
  it("Should verify 'Integrating Blob service: azure'", async () => {
    expect(echos[8]).to.include(EXPECTED_RESULT.blob.azure);
  });
  it("Should verify 'Integrating Docker Service'", async () => {
    expect(echos[9]).to.include(EXPECTED_RESULT.docker);
  });
  it("Should verify 'Powered by Innostax'", async () => {
    expect(echos[10]).to.include(EXPECTED_RESULT.copyright);
  });
  it("Should verify 'Successfully created", async () => {
    expect(echos[11]).to.include(EXPECTED_RESULT.success);
  });
  it("Should verify 'To get Started'", async () => {
    expect(echos[12]).to.include(EXPECTED_RESULT.getStarted);
  });
  it("Should verify 'For vue'", async () => {
    expect(echos[14]).to.include(EXPECTED_RESULT.executionMsg.vue);
  });
  it("Should verify 'For node-js'", async () => {
    expect(echos[18]).to.include(EXPECTED_RESULT.executionMsg.node);
  });
  it("Should verify 'Ready to go'", async () => {
    expect(echos[22]).to.include(EXPECTED_RESULT.ready);
  });
  after(async ()=> {
    fsExtra.remove(`${CURR_DIR}/${projectName}`);
  })
});

