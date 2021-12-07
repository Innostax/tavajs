function getProjectDetails(
  currentDirectory,
  frontEndChoice,
  backEndChoice,
  frontEndName,
  backEndName
) {
  if (backEndChoice === "node-js") {
    if (frontEndChoice === "react")
      return {
        projectChoice: "react_Node",
        projectPath: [
          {
            projectChoice: "react",
            projectPath: `${currentDirectory}/${frontEndName}`,
          },
          {
            projectChoice: "node",
            projectPath: `${currentDirectory}/${backEndName}`,
          },
        ],
      };
    else
      return {
        projectChoice: backEndChoice,
        projectPath: `${currentDirectory}/${backEndName}`,
      };
  } else
    return {
      projectChoice: frontEndChoice,
      projectPath: `${currentDirectory}/${frontEndName}`,
    };
}

module.exports = getProjectDetails;
