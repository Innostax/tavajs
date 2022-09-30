const fs = require("fs");
const expect = require("chai").expect;
require("mocha-sinon");

const projectInfo = require("../../src/utils/projectInfo");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const { handleAnswersEvaluator } = require("../../src/answersEvaluator");

const { ANSWERS, PROJECT_INFO_EXPECTED_DATA } = require("../mockData")
const { echos } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC0003;

const CURR_DIR = projectDirectoryPath; 
  fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {
   
  });
    
  const { frontEnd, backEnd } = getProjectDetails(
    `${CURR_DIR}/${projectName}`,
    ANSWERS.TC0003
  );
  console.log("before describe")
describe("Verify working of ANSWERS.TC0003 evaluator method.", async () => {
  // beforeEach(async () => {
    await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0003);
    console.log("describe")
    await projectInfo(frontEnd, backEnd, ANSWERS.TC0003);
  // });

  it("Should verify 'Creating node project'", async () => {
    expect(echos[0][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[12][0]);
  });
  it("Should verify 'Integrating Database service'", async () => {
    expect(echos[1][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[13][0]);
  });
  

});

