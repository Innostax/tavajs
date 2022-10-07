const inquirer = require("inquirer");

const handleInquirerExecutor = async (questionnaire) => {
    const prompt = inquirer.createPromptModule();
    const answers = await prompt(questionnaire);
    return answers;
};

module.exports = { handleInquirerExecutor };
