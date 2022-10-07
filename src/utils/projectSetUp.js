const shell = require("shelljs");
const chalk = require("chalk");
const { createSpinner } = require("nanospinner");
const StopWatch = require("stopwatch-node").StopWatch;
const sw = new StopWatch("sw");
const spawn = require("child_process").spawn;
const { millisToMinutesAndSeconds } = require("./converters");
let taskId = 1;
let totalTimeConsumptionInMinutes = 0;

const projectSetUp = async (frontEnd, backEnd, answers) => {
    const managerChoice = answers["managerChoice"];
    const cicdPipelineIntegrate = answers["cicdPipelineIntegrate"];
    if (frontEnd) {
        const { choice, path } = frontEnd;
        await packageInstaller(
            managerChoice,
            choice,
            path,
            frontEnd,
            backEnd,
            cicdPipelineIntegrate
        );
    }
    if (backEnd) {
        const { choice, path } = backEnd;
        await packageInstaller(
            managerChoice,
            choice,
            path,
            frontEnd,
            backEnd,
            cicdPipelineIntegrate
        );
    }
};

const packageInstaller = async (
    managerChoice,
    projectChoice,
    path,
    frontEnd,
    backEnd,
    cicdPipelineIntegrate
) => {
    shell.cd(`${path}`);
    if (managerChoice === "npm") {
        shell.echo(
            chalk.green.magenta(
                `--------------- NPM loading on ${projectChoice}, Wait for finish ---------------\r`
            )
        );
        const commandsDep = ["npm install --silent --legacy-peer-deps"];
        await npmInstall(commandsDep, frontEnd, backEnd, cicdPipelineIntegrate);
    }
    if (managerChoice === "yarn") {
        shell.echo(
            chalk.green.magenta(
                `--------------- YARN loading on ${projectChoice}, Wait for finish ---------------\r`
            )
        );
        const commandsDep = ["npm install --silent  -g yarn", "yarn"];

        await npmInstall(commandsDep, frontEnd, backEnd, cicdPipelineIntegrate);
    }
};

const npmInstall = async (
    command,
    frontEnd,
    backEnd,
    cicdPipelineIntegrate
) => {
    return new Promise((resolve) => {
        sw.start(`Task-${taskId}`);
        const process = spawn(command.join("&&"), { shell: true });
        const spinner = createSpinner("Installing packages").start();
        process.on("exit", () => {
            spinner.success();
            sw.stop();
            const task = sw.getTask(`Task-${taskId}`);
            totalTimeConsumptionInMinutes += task?.timeMills;
            shell.echo(chalk.green.bold("-> NPM modules installed!👍\r"));
            const isProjectCreated = !(frontEnd && backEnd && taskId === 1);
            if (isProjectCreated) {
                const FIVE_MINUTES = 1000 * 60 * 5;
                const messageColor =
          totalTimeConsumptionInMinutes < FIVE_MINUTES ? "green" : "red";
                shell.echo(
                    chalk[messageColor].bold(
                        `Installing took ${millisToMinutesAndSeconds(
                            totalTimeConsumptionInMinutes
                        )} minutes.`
                    )
                );
            }
            taskId++;
            if (cicdPipelineIntegrate) shell.exec("git init");
            resolve();
        });
    });
};

module.exports = projectSetUp;
