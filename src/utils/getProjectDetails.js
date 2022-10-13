const getProjectDetails = (projectDirectoryPath, answers) => {
    let details = {};
    if (answers.frontEnd) {
        details = {
            frontEnd: {
                name: answers.frontEndName,
                choice: answers.frontEndChoice,
                path: answers.backEnd
                    ? `${projectDirectoryPath}/${answers.frontEndName}`
                    : projectDirectoryPath,
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
                    ? `${projectDirectoryPath}/${answers.backEndName}`
                    : projectDirectoryPath,
            },
        };
    }

    return details;
};

module.exports = { getProjectDetails };
