const fs = require("fs");
const expect = require("chai").expect;
require("mocha-sinon");

const projectInfo = require("../../src/utils/projectInfo");
const projectSetUp = require("../../src/utils/projectSetUp");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const {
  handleAnswersEvaluator,
} = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, PROJECT_INFO_EXPECTED_DATA } = require("../mockData");
const { echos } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC0001;

const CURR_DIR = projectDirectoryPath;
fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {});

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TC0001
);

// const executeTestCases = async () => {
  
// };

// before(async () => {
//   await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0001);
//   console.log("executed handleAnswersEvaluator successfully");
//   await projectInfo(frontEnd, backEnd, ANSWERS.TC0001);
//   console.log("executed projectInfo successfully");
//   // await executeTestCases();
//   await projectSetUp(frontEnd, backEnd, ANSWERS.TC0001);
// });

// before((done) => {
//   (async () => {
//     await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0001);
//     console.log("executed handleAnswersEvaluator successfully");
//     await projectInfo(frontEnd, backEnd, ANSWERS.TC0001);
//     console.log("executed projectInfo successfully");
//     await projectSetUp(frontEnd, backEnd, ANSWERS.TC0001);
//   })().then(async () => {
//     done();
//   });
// });

let currentValue = 100000000;
let isExecuted  = false;

const getTimeoutValue = () => {
  if(isExecuted) {
    console.log("If called", isExecuted, currentValue)
    return currentValue;
  }
  else {
    currentValue = currentValue + 10000;
    console.log("Else called", isExecuted, currentValue)
    return currentValue
  }
}

describe("Verify working of ANSWERS.TC0001 evaluator method.", async (done) => {
  it('resolves', async (done) => {
    await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0001);
    console.log("executed handleAnswersEvaluator successfully");
    await projectInfo(frontEnd, backEnd, ANSWERS.TC0001)
    projectSetUp(frontEnd, backEnd, ANSWERS.TC0001).then(() => {
      currentValue = 1000;
      console.log("executed projectInfo successfully");
      isExecuted = true;
      expect(echos[0][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[0][0]);
      // done();
    });
  // await executeTestCases();
 }).timeout(currentValue);
  // it('should filter out unsubscribed emails', () => {
  //   return (async function () => {
  //     await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0001);
  //     console.log("executed handleAnswersEvaluator successfully");
  //     await projectInfo(frontEnd, backEnd, ANSWERS.TC0001);
  //     console.log("executed projectInfo successfully");
  //     await projectSetUp(frontEnd, backEnd, ANSWERS.TC0001);
  //   })()
  //     .then(() => {
  //       expect(echos[0][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[0][0]);
  //     });
  // });
  // before(async (done) => {
  //     await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0001);
  //     console.log("executed handleAnswersEvaluator successfully");
  //     await projectInfo(frontEnd, backEnd, ANSWERS.TC0001);
  //     console.log("executed projectInfo successfully");
  //     // await executeTestCases();
  //     await projectSetUp(frontEnd, backEnd, ANSWERS.TC0001);
  //     done();
  //   });

  // it("Should verify 'Creating react project'", async function () {
  //   console.log("started successfully")
  //   this.timeout(5000);
  //   console.log("Creating react project");
  //   expect(echos[0][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[0][0]);
  // });
  // it("Should verify 'Integrating Authentication service", async () => {
  //   expect(echos[1][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[1][0]);
  // });
  // it("Should verify 'Integrating CSS Framework", async () => {
  //   expect(echos[2][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[2][0]);
  // });
  // it("Should verify 'Integrating theme", async () => {
  //   expect(echos[3][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[3][0]);
  // });
  // it("Should verify 'Integrating Redux pattern'", async () => {
  //   expect(echos[4][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[4][0]);
  // });
  // it("Should verify 'Creating node-js project'", async () => {
  //   expect(echos[5][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[5][0]);
  // });
  // it("Should verify 'Integrating Database service'", async () => {
  //   expect(echos[6][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[6][0]);
  // });
  // it("Should verify 'Integrating Logger service'", async () => {
  //   expect(echos[7][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[7][0]);
  // });
  // it("Should verify 'Integrating Email service'", async () => {
  //   expect(echos[8][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[8][0]);
  // });
  // it("Should verify 'Integrating Blob service'", async () => {
  //   expect(echos[9][0]).to.equal(PROJECT_INFO_EXPECTED_DATA[9][0]);
  // });
});
