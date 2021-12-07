const shell = require("shelljs");

function projectSetUp(managerChoice, projectChoice, projectPath) {
  if (projectChoice === "react_Node") {
    const [frontEnd, backEnd] = projectPath;
    projectSetUp(managerChoice, frontEnd.projectChoice, frontEnd.projectPath);
    projectSetUp(managerChoice, backEnd.projectChoice, backEnd.projectPath);
  } else {
    packageInstaller(managerChoice, projectChoice, projectPath);
  }
}

function packageInstaller(managerChoice, projectChoice, path) {
  shell.cd(`${path}`);
  if (managerChoice === "npm") {
    console.log(
      "-------------NPM loading on ",
      projectChoice,
      ", Wait for finish--------------------"
    );
    shell.exec("npm install --legacy-peer-deps");
    console.log("-------------NPM process completed--------------------");
  }
  if (managerChoice === "yarn") {
    console.log(
      "-------------yarn loading on ",
      projectChoice,
      ", Wait for finish--------------------"
    );
    shell.exec("npm install -g yarn");
    shell.exec("yarn");
    console.log("-------------yarn process completed--------------------");
  }
}

module.exports = projectSetUp;
