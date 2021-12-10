const shell = require("shelljs");

function projectSetUp(managerChoice, frontEnd, backEnd) {
  if (frontEnd && backEnd) {
    packageInstaller(managerChoice, frontEnd.choice, frontEnd.path);
    packageInstaller(managerChoice, backEnd.choice, backEnd.path);
  } else {
    const { choice, path } = frontEnd || backEnd;
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
