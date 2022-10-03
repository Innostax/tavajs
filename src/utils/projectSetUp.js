const shell = require("shelljs");
const chalk = require("chalk");
const Spinner = require("cli-spinner").Spinner;
const StopWatch = require("stopwatch-node").StopWatch;
const sw = new StopWatch("sw");
const spawn = require("child_process").spawn;
const projectExecutionCommands = require("./projectExecutionCommands");
const { millisToMinutesAndSeconds } = require("./converters")
let taskId = 1;
let projectCreationTime = 0;

const spinner = new Spinner({
  text: "Installing packages... %s  ",
  stream: process.stderr,
  onTick: function (msg) {
    this.clearLine(this.stream);
    this.stream.write(msg);
  },
});
spinner.setSpinnerString("|/-\\");

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
    sw.start(`Task-${taskId}`);
    const process = spawn(command, { shell: true });
    spinner.start();
    process.on("exit", () => {
      spinner.stop(true);
      sw.stop();
      const task = sw.getTask(`Task-${taskId}`);
      projectCreationTime += task?.timeMills;
      shell.echo(chalk.green.bold(`-> NPM modules installed!👍\r`));
      isProjectCreated = !(frontEnd && backEnd && taskId === 1)
      if ( isProjectCreated ) {
        const FIVE_MINUTES = 1000 * 60 * 5;
        const messageColor = projectCreationTime < FIVE_MINUTES ? "green" : "red";
        shell.echo(
          chalk[messageColor].bold(
            `Installing took ${millisToMinutesAndSeconds(
              projectCreationTime
            )} minutes.`
          )
        );
      }
      taskId++;
      if (shouldExecute) {
        projectExecutionCommands(frontEnd, backEnd, answers);
      }
      resolve();
    });
  });
};

module.exports = projectSetUp;
