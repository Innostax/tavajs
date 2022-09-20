const chalk = require("chalk");

function projectExecutionCommands(frontEnd, backEnd, answers) {
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

  if(answers.projectDirectoryPath) {
    console.log(
      chalk.cyanBright.italic.bold(`     cd ${answers.projectDirectoryPath}\${answers["projectName"]} \n`)
    );
  }
  else {
    console.log(
      chalk.cyanBright.italic.bold(`     cd ${answers["projectName"]} \n`)
    );
  }

  if (frontEnd && backEnd) {
    const managerChoice = answers["managerChoice"];
    const project = [frontEnd, backEnd];

    project.map(({ name, choice }) => {
      console.log(
        chalk.magentaBright.bold(
          `${String.fromCodePoint(45)}${String.fromCodePoint(
            62
          )} For ${choice}: \n`
        )
      );
      console.log(chalk.cyanBright.italic.bold(`     cd ${name}`));
      projectInvokeInstructions(choice, managerChoice);
      console.log("");
    });
  } else {
    const { name, choice } = backEnd || frontEnd;
    const managerChoice = answers["managerChoice"];
    projectInvokeInstructions(choice, managerChoice);
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
