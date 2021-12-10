function getProjectDetails(currentDirectory, answers) {
  if (answers["backEnd"]) {
    if (answers["frontEnd"])
      return {
        frontEnd: {
          choice: answers["frontEndChoice"],
          path: `${currentDirectory}/${answers["frontEndName"]}`,
        },
        backEnd: {
          choice: answers["backEndChoice"],
          path: `${currentDirectory}/${answers["nodeName"]}`,
        },
      };
    else
      return {
        backEnd: {
          choice: answers["backEndChoice"],
          path: currentDirectory,
        },
      };
  } else
    return {
      frontEnd: {
        choice: answers["frontEndChoice"],
        path: currentDirectory,
      },
    };
}
module.exports = { getProjectDetails };
