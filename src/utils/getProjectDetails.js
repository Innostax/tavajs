function getProjectDetails(currentDirectory, answers) {
    let details = {};
    if (answers.frontEnd) {
        details = {
            frontEnd: {
                name: answers.frontEndName,
                choice: answers.frontEndChoice,
                path: answers.backEnd
                    ? `${currentDirectory}/${answers.frontEndName}`
                    : currentDirectory,
            },
        };
    }

    if (answers.backEnd) {
        details = {
            ...details,
            backEnd: {
                name: answers.backEndName,
                choice: answers.backEndChoice,
                path: answers.frontEnd
                    ? `${currentDirectory}/${answers.backEndName}`
                    : currentDirectory,
            },
        };
    }

    return details;
}
module.exports = { getProjectDetails };
