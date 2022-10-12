const { expect } = require("chai");

const projectInfo = require("../../src/utils/projectInfo");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const projectExecutionCommands = require("../../src/utils/projectExecutionCommands");
const { handleAnswersEvaluator } = require("../../src/TavaJsExecutors/answersEvaluator");

// async function TCA002() {

const { ANSWERS, EXPECTED_RESULT } = require("../mockData");
const { echos, removeProject } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TCA002;

const CURR_DIR = projectDirectoryPath;

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TCA002
);

describe("Verify working of ANSWERS.TCA002 evaluator method.", async () => {
  await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TCA002);
  await projectInfo(frontEnd, backEnd, ANSWERS.TCA002);
  await projectExecutionCommands(frontEnd, backEnd, ANSWERS.TCA002);

  it("Should verify 'Creating angular project'", async () => {
    expect(echos[0]).to.include(EXPECTED_RESULT.frontend.angular);
  });
  it("Should verify 'Integrating CSS Framework: tailwind", async () => {
    expect(echos[1]).to.include(EXPECTED_RESULT.css.tailwind);
  });

  it("Should verify 'Integrating Authentication service: Cognito'", async () => {
    expect(echos[2]).to.include(EXPECTED_RESULT.authentication.cognito);
  });
  it("Should verify 'Integrating CI/CD Pipeline: github'", async () => {
    expect(echos[3]).to.include(EXPECTED_RESULT.ci_cd.github);
  });
  it("Should verify 'Powered by Innostax'", async () => {
    expect(echos[4]).to.include(EXPECTED_RESULT.copyright);
  });
  it("Should verify 'Successfully created", async () => {
    expect(echos[5]).to.include(EXPECTED_RESULT.success);
  });
  it("Should verify 'To get Started'", async () => {
    expect(echos[6]).to.include(EXPECTED_RESULT.getStarted);
  });
  it("Should verify 'yarn start'", async () => {
    expect(echos[8]).to.include(EXPECTED_RESULT.package.yarn);
  });
  it("Should verify 'Ready to go'", async () => {
    expect(echos[9]).to.include(EXPECTED_RESULT.ready);
  });
});

removeProject(projectName);
// }

// module.exports = {TCA002 };
