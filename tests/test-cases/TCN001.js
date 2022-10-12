const { expect } = require("chai");

const projectInfo = require("../../src/utils/projectInfo");
const { getProjectDetails } = require("../../src/utils/getProjectDetails");
const projectExecutionCommands = require("../../src/utils/projectExecutionCommands");
const { handleAnswersEvaluator } = require("../../src/TavaJsExecutors/answersEvaluator");

const { ANSWERS, EXPECTED_RESULT } = require("../mockData");
const { echos, removeProject } = require("../helpers");

const { projectName, projectDirectoryPath } = ANSWERS.TCN001;

const CURR_DIR = projectDirectoryPath;

const { frontEnd, backEnd } = getProjectDetails(
  `${CURR_DIR}/${projectName}`,
  ANSWERS.TCN001
);
console.log("EXPECTED_RESULT.backend.node", EXPECTED_RESULT.backend.node)

describe("Verify working of ANSWERS.TCN001 evaluator method.", async () => {
    await handleAnswersEvaluator(frontEnd, backEnd, ANSWERS.TCN001);
    await projectInfo(frontEnd, backEnd, ANSWERS.TCN001);
    await projectExecutionCommands(frontEnd, backEnd, ANSWERS.TCN001);
    
    it("Should verify 'Creating node-js project'", async () => {
      expect(echos[0]).to.include(EXPECTED_RESULT.backend.node);
    });
    it("Should verify 'Integrating database service: mongoose'", async () => {
      expect(echos[1]).to.include(EXPECTED_RESULT.database.mongoose);
    });
    it("Should verify 'Integrating Logger service: winston'", async () => {
      expect(echos[2]).to.include(EXPECTED_RESULT.logger.winston);
    });
    it("Should verify 'Integrating Email service: smtp'", async () => {
      expect(echos[3]).to.include(EXPECTED_RESULT.email.smtp);
    });
    it("Should verify 'Integrating Blob service: azure'", async () => {
      expect(echos[4]).to.include(EXPECTED_RESULT.blob.azure);
    });
    it("Should verify 'Powered by Innostax'", async () => {
      expect(echos[5]).to.include(EXPECTED_RESULT.copyright);
    });
    it("Should verify 'Successfully created", async () => {
      expect(echos[6]).to.include(EXPECTED_RESULT.success);
    });
    it("Should verify 'To get Started'", async () => {
      expect(echos[7]).to.include(EXPECTED_RESULT.getStarted);
    });
    it("Should verify 'npm start'", async () => {
      expect(echos[9]).to.include(EXPECTED_RESULT.package.npm);
    });
    it("Should verify 'Ready to go'", async () => {
      expect(echos[10]).to.include(EXPECTED_RESULT.ready);
    });
  });
  
  removeProject(projectName);
