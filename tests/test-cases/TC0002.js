const fs = require("fs");
const { expect } = require("chai");

const projectInfo = require("../../src/utils/projectInfo");
const projectSetUp = require("../../src/utils/projectSetUp");
const projectExecutionCommands = require("../../src/utils/projectExecutionCommands");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const {
    handleAnswersEvaluator,
} = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, PROJECT_INFO_EXPECTED_DATA } = require("../mockData");
const { echos, initialExecution } = require("../helpers");

// Before to run the test cases:
const { projectName, projectDirectoryPath } = ANSWERS.TC0002;

const PROJ_DIR = projectDirectoryPath;
fs.mkdir(`${PROJ_DIR}/${projectName}`, (err, data) => {});

const { frontEnd, backEnd } = getProjectDetails(
    `${PROJ_DIR}/${projectName}`,
    ANSWERS.TC0002
);

describe("Verify working of ANSWERS.TC0002 evaluator method.", async () => {
    before(async function () {
        await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TC0002);
        console.log("executed handleAnswersEvaluator successfully");
        await projectInfo(frontEnd, backEnd, ANSWERS.TC0002);
        console.log("executed projectInfo successfully");
        await projectSetUp(frontEnd, backEnd, ANSWERS.TC0002);
        console.log("executed projectSetUp successfully");
        projectExecutionCommands(frontEnd, backEnd, ANSWERS.TC0002);
        console.log("executed projectExecutionCommands successfully");
    });
    it("Should verify 'Creating react project'", (done) => {
        expect(echos[0]).to.equal(PROJECT_INFO_EXPECTED_DATA[0][0]);
        done();
    });
    it("Should verify 'Integrating CSS Framework'", (done) => {
        expect(echos[1]).to.equal(PROJECT_INFO_EXPECTED_DATA[2][0]);
        done();
    });
    it("Should verify 'Integrating theme's", (done) => {
        expect(echos[2]).to.equal(PROJECT_INFO_EXPECTED_DATA[3][0]);
        done();
    });
    it("Should verify 'Integrating Redux pattern'", (done) => {
        expect(echos[3]).to.equal(PROJECT_INFO_EXPECTED_DATA[4][0]);
        done();
    });
    after(async function () {
        console.log("`${PROJ_DIR}/${projectName}`", `${PROJ_DIR}/${projectName}`);
        fs.rmSync(`${PROJ_DIR}/${projectName}`, { recursive: true, force: true });
    });
});
