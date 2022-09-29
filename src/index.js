#! node
const { handleInquirerExecutor } = require("./inquirerExecutor");
const { handleAnswersEvaluator } = require("./answersEvaluator");
const questionnaire = require("./questionnaire");

// IIFE(Imediately Invoked Function Expression) 
(async () => {
  await handleInquirerExecutor(questionnaire).then(
    async (ans) => await handleAnswersEvaluator(ans)
  );
})();
