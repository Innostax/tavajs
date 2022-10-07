const fs = require("fs");
const expect = require("chai").expect;
require("mocha-sinon");

const projectInfo = require("../../src/utils/projectInfo");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const { handleAnswersEvaluator } = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, VUE_APP_EXPECTED_RESULT } = require("../mockData");
const { echos } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC0008;

const CURR_DIR = projectDirectoryPath;
fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {});

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TC0008
);

describe("Verify working of ANSWERS.TC0008 evaluator method.", async () => {
  await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0008);
  await projectInfo(frontEnd, backEnd, ANSWERS.TC0008);
  // console.log("echos",echos)

  it("Should verify 'Creating react project'", async () => {
    expect(echos[0][0]).to.include(VUE_APP_EXPECTED_RESULT[0][0]);
  });
  it("Should verify 'Integrating CSS Framework", async () => {
    expect(echos[1][0]).to.include(VUE_APP_EXPECTED_RESULT[1][0]);
  });
  it("Should verify 'Integrating Test Case framework'", async () => {
    expect(echos[2][0]).to.include(VUE_APP_EXPECTED_RESULT[5][0]);
  });
  it("Should verify 'Integrating Authentication service'", async () => {
    expect(echos[3][0]).to.include(VUE_APP_EXPECTED_RESULT[11][0]);
  });
  it("Should verify 'Powered by Innostax'", async () => {
    expect(echos[4][0]).to.include(VUE_APP_EXPECTED_RESULT[28][0]);
  });
});
