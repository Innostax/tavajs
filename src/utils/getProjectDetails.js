function getProjectDetails(currentDirectory, answers) {
  if (answers["backEndChoice"] === "node-js") {
    if (answers["frontEndChoice"] === "react")
      return {
        projectChoice: "react_Node",
        projectPath: [
          {
            projectChoice: "react",
            projectPath: `${currentDirectory}/${answers["frontEndName"]}`,
          },
          {
            projectChoice: "node-js",
            projectPath: `${currentDirectory}/${answers["nodeName"]}`,
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
