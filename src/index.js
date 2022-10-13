#! node
const {
    handleInquirerExecutor,
} = require("./TavaJsExecutors/inquirerExecutor");
const {
    handleAnswersEvaluator,
} = require("./TavaJsExecutors/answersEvaluator");
const questionnaire = require("./TavaJsExecutors/questionnaire");
const projectInfo = require("./utils/projectInfo");
const projectSetUp = require("./utils/projectSetUp");
const projectExecutionCommands = require("./utils/projectExecutionCommands");
const { getProjectDetails } = require("./utils/getProjectDetails");
const fs = require("fs");

// IIFE(Imediately Invoked Function Expression)
(async () => {
    await handleInquirerExecutor(questionnaire).then(async (ans) => {
        const { projectName, projectDirectoryPath } = ans;
        fs.mkdir(`${projectDirectoryPath}/${projectName}`, (err) => {
            if (err) {
                console.error(err);
            }
        });

        const { frontEnd, backEnd } = getProjectDetails(
            `${projectDirectoryPath}/${projectName}`,
            ans
        );

        await handleAnswersEvaluator(frontEnd, backEnd, ans);
        await projectInfo(frontEnd, backEnd, ans);
        await projectSetUp(frontEnd, backEnd, ans);
        await projectExecutionCommands(frontEnd, backEnd, ans);
    });
})();
