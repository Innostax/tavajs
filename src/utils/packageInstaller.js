const shell = require("shelljs");
const chalk = require("chalk");
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

function managerConsole(projectChoice, managerChoice) {
  if (managerChoice === "npm") {
    if (projectChoice === "vue") {
      console.log(chalk.cyanBright.italic.bold(`     npm run serve`));
    } else {
      console.log(chalk.cyanBright.italic.bold(`     npm start`));
    }
  }
  if (managerChoice === "yarn") {
    if (projectChoice === "vue") {
      console.log(chalk.cyanBright.italic.bold(`     yarn run serve`));
    } else {
      console.log(chalk.cyanBright.italic.bold(`     yarn start`));
    }
  }
}

function projectEndConsole(
  projectName,
  frontEndName,
  nodeName,
  managerChoice,
  projectChoice,
  projectPath
) {
  if (projectChoice === "react_Node") {
    const { frontEndPath, backEndPath } = projectPath;
     packageInstaller(managerChoice, "react", frontEndPath);
     packageInstaller(managerChoice, "node-js", backEndPath);
  } else {
     packageInstaller(managerChoice, projectChoice, projectPath);
  }
  console.log(
    chalk.green.bold(`${String.fromCodePoint(0x2705)} Successfully created \n `)
  );
  console.log(
    chalk.magentaBright.bold(
      `${String.fromCodePoint(45)}${String.fromCodePoint(
        62
      )} To get Started: \n`
    )
  );
  console.log(chalk.cyanBright.italic.bold(`     cd ${projectName} \n`));
  if (projectChoice === "react_Node") {
    console.log(
      chalk.magentaBright.bold(
        `${String.fromCodePoint(45)}${String.fromCodePoint(62)} For React: \n`
      )
    );
    console.log(chalk.cyanBright.italic.bold(`     cd ${frontEndName}`));
    managerConsole((projectChoice = "react"), managerChoice);
    console.log(
      chalk.magentaBright.bold(
        `\n ${String.fromCodePoint(45)}${String.fromCodePoint(62)} For Node: \n`
      )
    );
    console.log(chalk.cyanBright.italic.bold(`     cd ${nodeName}`));
    managerConsole((projectChoice = "node-js"), managerChoice);
  } else {
    managerConsole(projectChoice, managerChoice);
  }
  console.log(
    chalk.cyanBright.italic.bold(
      `------------------------ Ready to go --------------------------`
    )
  );
}
module.exports = projectEndConsole;
