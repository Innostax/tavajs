#! node
const { handleInquirerExecutor } = require("./inquirerExecutor");
const { handleAnswersEvaluator } = require("./answersEvaluator");
const questionnaire = require("./questionnaire");
const projectInfo = require("./utils/projectInfo");
const { getProjectDetails } = require("./utils/getProjectDetails");
const fs = require("fs");

// IIFE(Imediately Invoked Function Expression) 
(async () => {
  await handleInquirerExecutor(questionnaire).then(
    async (ans) => {
      const { projectName, projectDirectoryPath } = ans;
      const CURR_DIR = projectDirectoryPath; 
      fs.mkdir(`${CURR_DIR}/${projectName}`, (err, data) => {
        if (err) {
          console.error(err);
        }
      });
    
      const { frontEnd, backEnd } = getProjectDetails(
        `${CURR_DIR}/${projectName}`,
        ans
      );

      await handleAnswersEvaluator(frontEnd, backEnd, ans);
      await projectInfo(frontEnd, backEnd, ans);
    }
  );
})();
