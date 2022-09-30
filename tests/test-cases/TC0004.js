const fs = require("fs");
const expect = require("chai").expect;
require("mocha-sinon");

const projectInfo = require("../../src/utils/projectInfo");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const { handleAnswersEvaluator } = require("../../src/answersEvaluator");

const { ANSWERS, PROJECT_INFO_EXPECTED_DATA } = require("../mockData")
const { echos } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC0004;

const CURR_DIR = projectDirectoryPath; 
  fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {
   
  });
    
  const { frontEnd, backEnd } = getProjectDetails(
    `${CURR_DIR}/${projectName}`,
    ANSWERS.TC0004
  );
  console.log("before describe")
describe("Verify working of ANSWERS.TC0004 evaluator method.", async () => {
  // beforeEach(async () => {
    await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0004);
    console.log("describe")
    await projectInfo(frontEnd, backEnd, ANSWERS.TC0004);
  // });

  it("Should verify 'Creating react project'", async () => {
    expect(echos[0][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[0][0]);
  });
  it("Should verify 'Integrating CSS Framework", async () => {
    expect(echos[1][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[14][0]);
  });
  it("Should verify 'Integrating theme", async () => {
    expect(echos[2][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[3][0]);
  });
  it("Should verify 'Integrating Redux pattern'", async () => {
    expect(echos[3][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[4][0]);
  });
 
 
  
});

