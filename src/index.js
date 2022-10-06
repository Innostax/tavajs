#! node
const { handleInquirerExecutor } = require("./TavaJsExecutors/inquirerExecutor");
const { handleAnswersEvaluator } = require("./TavaJsExecutors/answersEvaluator");
const questionnaire = require("./TavaJsExecutors/questionnaire");

// IIFE(Imediately Invoked Function Expression) 
(async () => {
    await handleInquirerExecutor(questionnaire).then(
        async (ans) => await handleAnswersEvaluator(ans)
    );
})();
