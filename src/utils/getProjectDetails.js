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
            projectChoice: "node",
            projectPath: `${currentDirectory}/${answers["node-name"]}`,
          },
        ],
      };
    else
      return {
        projectChoice: answers["backEndChoice"],
        projectPath: `${currentDirectory}/${answers["node-name"]}`,
      };
  } else
    return {
      projectChoice: answers["frontEndChoice"],
      projectPath: `${currentDirectory}/${answers["FrontEnd-name"]}`,
    };
}

module.exports = { getProjectDetails };
