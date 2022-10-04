#! node
const { handleInquirerExecutor } = require("./TavaJsExecutors/inquirerExecutor");
const { handleAnswersEvaluator } = require("./TavaJsExecutors/answersEvaluator");
const questionnaire = require("./TavaJsExecutors/questionnaire");
const projectInfo = require("./utils/projectInfo");
const projectSetUp = require("./utils/projectSetUp");
const { getProjectDetails } = require("./utils/getProjectDetails");
const fs = require("fs");

// IIFE(Imediately Invoked Function Expression) 
(async () => {
  await handleInquirerExecutor(questionnaire).then(
    async (ans) => {
      console.log("ans========================", ans)
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
      await projectSetUp(frontEnd, backEnd, ans);
    }
  );
})();
