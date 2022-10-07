const fs = require("fs");
const expect = require("chai").expect;
require("mocha-sinon");

const projectInfo = require("../../src/utils/projectInfo");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const { handleAnswersEvaluator } = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, VUE_APP_EXPECTED_RESULT } = require("../mockData");
const { echos } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC0006;

const CURR_DIR = projectDirectoryPath;
fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {});

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TC0006
);

describe("Verify working of ANSWERS.TC0006 evaluator method.", async () => {
  await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0006);
  await projectInfo(frontEnd, backEnd, ANSWERS.TC0006);
  // console.log("echos",echos)

  it("Should verify 'Creating react project'", async () => {
    expect(echos[0][0]).to.include(VUE_APP_EXPECTED_RESULT[0][0]);
  });
  it("Should verify 'Integrating CSS Framework", async () => {
    expect(echos[1][0]).to.include(VUE_APP_EXPECTED_RESULT[1][0]);
  });
  it("Should verify 'Integrating Test Case framework'", async () => {
    expect(echos[2][0]).to.include(VUE_APP_EXPECTED_RESULT[3][0]);
  });
  it("Should verify 'Integrating Theme Provider'", async () => {
    expect(echos[3][0]).to.include(VUE_APP_EXPECTED_RESULT[7][0]);
  });
  it("Should verify 'Integrating Network Informer'", async () => {
    expect(echos[4][0]).to.include(VUE_APP_EXPECTED_RESULT[8][0]);
  });
  it("Should verify 'Integrating Authentication service'", async () => {
    expect(echos[5][0]).to.include(VUE_APP_EXPECTED_RESULT[9][0]);
  });
  it("Should verify 'Integrating Vuex pattern'", async () => {
    expect(echos[6][0]).to.include(VUE_APP_EXPECTED_RESULT[12][0]);
  });
  it("Should verify 'Integrating Docker Service'", async () => {
    expect(echos[7][0]).to.include(VUE_APP_EXPECTED_RESULT[13][0]);
  });
  it("Should verify 'Integrating CI/CD Pipeline'", async () => {
    expect(echos[8][0]).to.include(VUE_APP_EXPECTED_RESULT[14][0]);
  });
  it("Should verify 'Powered by Innostax'", async () => {
    expect(echos[9][0]).to.include(VUE_APP_EXPECTED_RESULT[28][0]);
  });
});
