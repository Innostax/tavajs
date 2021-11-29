const chalk = require("chalk");

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

module.exports = projectInvokeInstructions;
