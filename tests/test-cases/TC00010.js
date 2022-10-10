const fs = require("fs");
const expect = require("chai").expect;
require("mocha-sinon");

const projectInfo = require("../../src/utils/projectInfo");
const projectSetUp = require("../../src/utils/projectSetUp");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const projectExecutionCommands = require("../../src/utils/projectExecutionCommands");
const { handleAnswersEvaluator } = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, ANGULAR_APP_TC00010_EXPECTED } = require("../mockData");
const { echos } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC00010;

const CURR_DIR = projectDirectoryPath;
fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {});

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TC00010
);

describe("Verify working of ANSWERS.TC00010 evaluator method.", async () => {
before(async function () {
    await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC00010);
    console.log("executed handleAnswersEvaluator successfully");
    await projectInfo(frontEnd, backEnd, ANSWERS.TC00010);
    console.log("executed projectInfo successfully");
    await projectSetUp(frontEnd, backEnd, ANSWERS.TC00010);
    console.log("executed projectSetUp successfully");
    projectExecutionCommands(frontEnd, backEnd, ANSWERS.TC00010);
    console.log("executed projectExecutionCommands successfully");
  });

  it("Should verify 'Creating angular project'", async (done) => {
    console.log("echos+++",echos[1][0])
    console.log("test++",ANGULAR_APP_TC00010_EXPECTED[1][0])
    expect(echos[0][0]).to.include(ANGULAR_APP_TC00010_EXPECTED[0][0]);
    done();
  });
  it("Should verify 'Integrating CSS Framework'", async (done) => {
    expect(echos[1][0]).to.include(ANGULAR_APP_TC00010_EXPECTED[1][0]);
    done();
  });
  it("Should verify 'Integrating Theme Provider'", async (done) => {
    expect(echos[2][0]).to.include(ANGULAR_APP_TC00010_EXPECTED[2][0]);
    done();
  });
  it("Should verify 'Integrating Network Informer'", async (done) => {
    expect(echos[3][0]).to.include(ANGULAR_APP_TC00010_EXPECTED[3][0]);
    done();
  });
  it("Should verify 'Integrating Authentication Service'", async (done) => {
    expect(echos[4][0]).to.include(ANGULAR_APP_TC00010_EXPECTED[4][0]);
    done();
  });
  it("Should verify 'Integrating Ngrx pattern'", async (done) => {
    expect(echos[5][0]).to.include(ANGULAR_APP_TC00010_EXPECTED[5][0]);
    done();
  });
//   it("Should verify 'Powered by Innostax'", async (done) => {
//     expect(echos[5][0]).to.include(ANGULAR_APP_TCOO10_EXPECTED[5][0]);
//     done();
//   });
//   it("Should verify 'NPM loading on angular'", async  (done) => {
//     expect(echos[6][0]).to.include(ANGULAR_APP_TCOO10_EXPECTED[6][0]);
//     done();
//   });
//   it("Should verify 'NPM modules installed for AngularJS'", async (done) => {
//     expect(echos[7][0]).to.include(ANGULAR_APP_TCOO10_EXPECTED[7][0]);
//     done();
//   });
//   it("Should verify 'Successfully created'", async (done) => {
//     expect(echos[9][0]).to.include(ANGULAR_APP_TCOO10_EXPECTED[8][0]);
//     done();
//   });
//   it("Should verify 'To get Started'", async (done) => {
//     expect(echos[10][0]).to.include(ANGULAR_APP_TCOO10_EXPECTED[9][0]);
//     done();
//   });
//   it("Should verify 'npm start'", async (done) => {
//     expect(echos[12][0]).to.include(ANGULAR_APP_TCOO10_EXPECTED[11][0]);
//     done();
//   });
//   it("Should verify 'Ready to go'", async (done) => {
//     expect(echos[13][0]).to.include(ANGULAR_APP_TCOO10_EXPECTED[12][0]);
//     done();
//   });
});
