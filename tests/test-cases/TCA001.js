const { expect } = require("chai");

const projectInfo = require("../../src/utils/projectInfo");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const projectExecutionCommands = require("../../src/utils/projectExecutionCommands");
const { handleAnswersEvaluator } = require("../../src/TavaJsExecutors/answersEvaluator");

// async function TCA001() {

const { ANSWERS, EXPECTED_RESULT } = require("../mockData");
const { echos, removeProject } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TCA001;

const CURR_DIR = projectDirectoryPath;

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TCA001
);

describe("Verify working of ANSWERS.TCA001 evaluator method.", async () => {
  await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TCA001);
  await projectInfo(frontEnd, backEnd, ANSWERS.TCA001);
  await projectExecutionCommands(frontEnd, backEnd, ANSWERS.TCA001);
  // console.log("echos",echos)

  it("Should verify 'Creating angular project'", async () => {
    expect(echos[0]).to.include(EXPECTED_RESULT.frontend.angular);
  });
  it("Should verify 'Integrating CSS Framework: bootstrap", async () => {
    expect(echos[1]).to.include(EXPECTED_RESULT.css.bootstrap);
  });
  it("Should verify 'Integrating Theme Provider: light-dark-mode'", async () => {
    expect(echos[2]).to.include(EXPECTED_RESULT.theme.light_dark_mode);
  });
  it("Should verify 'Integrating Network Informer'", async () => {
    expect(echos[3]).to.include(EXPECTED_RESULT.networkInformer);
  });
  it("Should verify 'Integrating Authentication service: Auth0'", async () => {
    expect(echos[4]).to.include(EXPECTED_RESULT.authentication.auth0);
  });
  it("Should verify 'Integrating Vuex store'", async () => {
    expect(echos[5]).to.include(EXPECTED_RESULT.store.ngrx);
  });
  it("Should verify 'Integrating Docker Service'", async () => {
    expect(echos[6]).to.include(EXPECTED_RESULT.docker);
  });
  it("Should verify 'Integrating CI/CD Pipeline: aws'", async () => {
    expect(echos[7]).to.include(EXPECTED_RESULT.ci_cd.aws);
  });
  it("Should verify 'Powered by Innostax'", async () => {
    expect(echos[8]).to.include(EXPECTED_RESULT.copyright);
  });
  it("Should verify 'Successfully created", async () => {
    expect(echos[9]).to.include(EXPECTED_RESULT.success);
  });
  it("Should verify 'To get Started'", async () => {
    expect(echos[10]).to.include(EXPECTED_RESULT.getStarted);
  });
  it("Should verify 'Ready to go'", async () => {
    expect(echos[13]).to.include(EXPECTED_RESULT.ready);
  });
});

removeProject(projectName);
// }

// module.exports = { TCA001 };
