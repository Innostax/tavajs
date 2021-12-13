const shell = require("shelljs");

function projectSetUp(frontEnd, backEnd, answers) {
  const managerChoice = answers["managerChoice"];
  if (frontEnd) {
    const { choice, path } = frontEnd;
     packageInstaller(managerChoice, choice, path);
  }
  if (backEnd) {
    const { choice, path } = backEnd;
    packageInstaller(managerChoice, choice, path);
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
