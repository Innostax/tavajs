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
const { projectName, projectDirectoryPath } = ANSWERS.TC0003;

const CURR_DIR = projectDirectoryPath;
fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {});

const { frontEnd, backEnd } = getProjectDetails(
    `${CURR_DIR}/${projectName}`,
    ANSWERS.TC0003
);

describe("Verify working of ANSWERS.TC0003 evaluator method.", async () => {
    //await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0003);
    //await projectInfo(frontEnd, backEnd, ANSWERS.TC0003);
    before(async function () {
        await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0003);
        console.log("executed handleAnswersEvaluator successfully");
        await projectInfo(frontEnd, backEnd, ANSWERS.TC0003);
        console.log("executed projectInfo successfully");
        await projectSetUp(frontEnd, backEnd, ANSWERS.TC0003);
        console.log("executed projectSetUp successfully");
    });
    it("Should verify 'Creating node project'", (done) => {
        expect(echos[0]).to.equal(PROJECT_INFO_EXPECTED_DATA[12][0]);
        done();
    });
    it("Should verify 'Integrating Database service'", (done) => {
        expect(echos[1]).to.equal(PROJECT_INFO_EXPECTED_DATA[13][0]);
        done();
    });
});
