const chalk = require("chalk");

function projectExecutionCommands(
  projectName,
  frontEndName,
  nodeName,
  managerChoice,
  projectChoice
) {
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
    projectInvokeInstructions((projectChoice = "react"), managerChoice);
    console.log(
      chalk.magentaBright.bold(
        `\n ${String.fromCodePoint(45)}${String.fromCodePoint(62)} For Node: \n`
      )
    );
    console.log(chalk.cyanBright.italic.bold(`     cd ${nodeName}`));
    projectInvokeInstructions((projectChoice = "node-js"), managerChoice);
  } else {
    projectInvokeInstructions(projectChoice, managerChoice);
  }
  console.log(
    chalk.cyanBright.italic.bold(
      `------------------------ Ready to go --------------------------`
    )
  );
}

//---------------------------------------------------------------------------
function projectInvokeInstructions(projectChoice, managerChoice) {
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

module.exports = projectExecutionCommands;
