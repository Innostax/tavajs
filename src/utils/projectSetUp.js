const shell = require("shelljs");

function projectSetUp(
  managerChoice,
  projectChoice,
  projectPath,
  reactPath,
  nodePath
) {
  const path = [
    {
      projectChoice: "react",
      projectPath: `${reactPath}`,
    },
    {
      projectChoice: "node",
      projectPath: `${nodePath}`,
    },
  ];

  if (projectChoice === "react_Node") {
    path.map((each) => {
      packageInstaller(
        managerChoice,
        `${each.projectChoice}`,
        `${each.projectPath}`
      );
    });
  } else {
    packageInstaller(managerChoice, projectChoice, projectPath);
  }
}
module.exports = projectSetUp;

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
