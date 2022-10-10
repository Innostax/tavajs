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
const { projectName, projectDirectoryPath } = ANSWERS.TC0006;

const CURR_DIR = projectDirectoryPath;

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TC0006
);

describe("Verify working of ANSWERS.TC0006 evaluator method.", async () => {
  await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0006);
  await projectInfo(frontEnd, backEnd, ANSWERS.TC0006);
  await projectExecutionCommands(frontEnd, backEnd, ANSWERS.TC0008);
  // console.log("echos",echos)

  it("Should verify 'Creating vue project'", async () => {
    expect(echos[0]).to.include(EXPECTED_RESULT.frontend.vue);
  });
  it("Should verify 'Integrating CSS Framework: bootstrap", async () => {
    expect(echos[1]).to.include(EXPECTED_RESULT.css.bootstrap);
  });
  it("Should verify 'Integrating Test Case framework: mochaJS'", async () => {
    expect(echos[2]).to.include(EXPECTED_RESULT.testcase.mocha);
  });
  it("Should verify 'Integrating Theme Provider: light-dark-mode'", async () => {
    expect(echos[3]).to.include(EXPECTED_RESULT.theme.light_dark_mode);
  });
  it("Should verify 'Integrating Network Informer'", async () => {
    expect(echos[4]).to.include(EXPECTED_RESULT.networkInformer);
  });
  it("Should verify 'Integrating Authentication service: Auth0'", async () => {
    expect(echos[5]).to.include(EXPECTED_RESULT.authentication.auth0);
  });
  it("Should verify 'Integrating Vuex store'", async () => {
    expect(echos[6]).to.include(EXPECTED_RESULT.store.vuex);
  });
  it("Should verify 'Integrating Docker Service'", async () => {
    expect(echos[7]).to.include(EXPECTED_RESULT.docker);
  });
  it("Should verify 'Integrating CI/CD Pipeline: aws'", async () => {
    expect(echos[8]).to.include(EXPECTED_RESULT.ci_cd.aws);
  });
  it("Should verify 'Powered by Innostax'", async () => {
    expect(echos[9]).to.include(EXPECTED_RESULT.copyright);
  });
  it("Should verify 'Successfully created", async () => {
    expect(echos[10]).to.include(EXPECTED_RESULT.success);
  });
  it("Should verify 'To get Started'", async () => {
    expect(echos[11]).to.include(EXPECTED_RESULT.getStarted);
  });
  it("Should verify 'Ready to go'", async () => {
    expect(echos[14]).to.include(EXPECTED_RESULT.ready);
  });
});
fsExtra.remove(`${CURR_DIR}/${projectName}`);
