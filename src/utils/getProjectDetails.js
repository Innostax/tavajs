function getProjectDetails(currentDirectory, answers) {
  if (answers["backEndChoice"] === "node-js") {
    if (answers["frontEndChoice"] === "react")
      return {
        projectChoice: "react_Node",
        projectPath: [
          {
            projectChoice: "react",
            projectPath: `${currentDirectory}/${answers["FrontEnd-name"]}`,
          },
          {
            projectChoice: "node-js",
            projectPath: `ecurrentDirectory}/${answers["node-name"]}`,
          },
        ],
      };
    else
      return {
        projectChoice: answers["backEndChoice"],
        projectPath: currentDirectory,
      };
  } else
    return {
      projectChoice: answers["frontEndChoice"],
      projectPath: currentDirectory,
    };
}

module.exports = { getProjectDetails };
