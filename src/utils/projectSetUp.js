const shell = require("shelljs");
const chalk = require("chalk");
const { createSpinner } = require('nanospinner');
const StopWatch = require("stopwatch-node").StopWatch;
const sw = new StopWatch("sw");
const spawn = require("child_process").spawn;
const projectExecutionCommands = require("./projectExecutionCommands");
const { millisToMinutesAndSeconds } = require("./converters")

const projectSetUp = async (frontEnd, backEnd, answers) => {
  const managerChoice = answers["managerChoice"];
  if (frontEnd) {
    const { choice, path } = frontEnd;
    await packageInstaller(
      managerChoice,
      choice,
      path,
      true,
      false,
      answers,
      frontEnd,
      backEnd
    );
  }
  if (backEnd) {
    const { choice, path } = backEnd;
    await packageInstaller(
      managerChoice,
      choice,
      path,
      false,
      true,
      answers,
      frontEnd,
      backEnd
    );
  }
};

const packageInstaller = async (
  managerChoice,
  projectChoice,
  path,
  isFrontEnd,
  isBackEnd,
  answers,
  frontEnd,
  backEnd
) => {
  shell.cd(`${path}`);
  if (managerChoice === "npm") {
    shell.echo(
      chalk.green.magenta(
        `--------------- NPM loading on ${projectChoice}, Wait for finish ---------------\r`
      )
    );
    await npmInstall(
      "npm install --silent --legacy-peer-deps",
      isFrontEnd,
      isBackEnd,
      answers,
      frontEnd,
      backEnd
    );
    // shell.exec("npm install --silent --legacy-peer-deps"); // -s / --silent ,  --no-optional , npm --logevel=error install
  }
  if (managerChoice === "yarn") {
    shell.echo(
      "--------------- yarn loading on ",
      projectChoice,
      ", Wait for finish ---------------\r"
    );
    shell.exec("npm install -g yarn");
    shell.exec("yarn");
    shell.echo(
      chalk.green.bold(
        "--------------- yarn process completed ---------------\r"
      )
    );
  }
};

const npmInstall = async (
  command,
  isFrontEnd,
  isBackEnd,
  answers,
  frontEnd,
  backEnd
) => {
  const shouldExecute = answers.backEnd ? isBackEnd : isFrontEnd;
  return new Promise((resolve, reject) => {
    sw.start(`Task-1`);
    const process = spawn(command, { shell: true });
    const spinner = createSpinner(`Installing packages`).start();
    process.on("exit", () => {
      spinner.success();
      sw.stop();
      const task2 = sw.getTask(`Task-1`);
      shell.echo(chalk.green.bold(`-> NPM modules installed!👍\r`));
      shell.echo(
        chalk.red.bold(
          `Installing took ${millisToMinutesAndSeconds(
            task2?.timeMills
          )} minutes.`
        )
      );
      if (shouldExecute) {
        projectExecutionCommands(frontEnd, backEnd, answers);
      }
      resolve();
    });
  });
};

module.exports = projectSetUp;
