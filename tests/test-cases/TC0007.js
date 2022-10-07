const fs = require("fs");
const expect = require("chai").expect;
require("mocha-sinon");

const projectInfo = require("../../src/utils/projectInfo");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const { handleAnswersEvaluator } = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, ANGULAR_APP_TCOO7_EXPECTED } = require("../mockData");
const { echos } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC0007;

const CURR_DIR = projectDirectoryPath;
fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {});

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TC0007
);

describe("Verify working of ANSWERS.TC0007 evaluator method.", async () => {
  await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0007);
  await projectInfo(frontEnd, backEnd, ANSWERS.TC0007);

  it("Should verify 'Creating angular project'", async () => {
    expect(echos[0][0]).to.equal(ANGULAR_APP_TCOO7_EXPECTED[0][0]);
  });
  it("Should verify 'Integrating CSS Framework", async () => {
    expect(echos[1][0]).to.equal(ANGULAR_APP_TCOO7_EXPECTED[1][0]);
  });
});
