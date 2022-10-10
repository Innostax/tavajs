const fs = require("fs");
const expect = require("chai").expect;
require("mocha-sinon");

const projectInfo = require("../../src/utils/projectInfo");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const { handleAnswersEvaluator } = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, EXPECTED_RESULT } = require("../mockData");
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

  it("Should verify 'Creating vue project'", async () => {
    expect(echos[0]).to.include(EXPECTED_RESULT.frontend.vue);
  });
  it("Should verify 'Integrating CSS Framework: bootstrap", async () => {
    expect(echos[1]).to.include(EXPECTED_RESULT.css.bootstrap);
  });
  it("Should verify 'Integrating Test Case framework: nightwatchJS'", async () => {
    expect(echos[2]).to.include(EXPECTED_RESULT.testcase.nightwatch);
  });
  it("Should verify 'Integrating Authentication service: Okta'", async () => {
    expect(echos[3]).to.include(EXPECTED_RESULT.authentication.okta);
  });
  it("Should verify 'Powered by Innostax'", async () => {
    expect(echos[4]).to.include(EXPECTED_RESULT.copyright);
  });
});
