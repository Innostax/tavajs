const chalk = require("chalk");
const shell = require("shelljs");

const projectExecutionCommands = async (frontEnd, backEnd, answers) => {
    shell.echo(
        chalk.green.bold(`${String.fromCodePoint(0x2705)} Successfully created \n `),
    );
    shell.echo(
        chalk.magentaBright.bold(
            `${String.fromCodePoint(45)}${String.fromCodePoint(
                62,
            )} To get Started: \n`,
        ),
    );

    if (answers.projectDirectoryPath) {
        shell.echo(
            chalk.cyanBright.italic.bold(
                `     cd ${answers.projectDirectoryPath}\\${answers.projectName} \n`,
            ),
        );
    } else {
        shell.echo(
            chalk.cyanBright.italic.bold(`     cd ${answers.projectName} \n`),
        );
    }

    if (frontEnd && backEnd) {
        const { managerChoice } = answers;
        const project = [frontEnd, backEnd];

        project.map(({ name, choice }) => {
            shell.echo(
                chalk.magentaBright.bold(
                    `${String.fromCodePoint(45)}${String.fromCodePoint(
                        62,
                    )} For ${choice}: \n`,
                ),
            );
            shell.echo(chalk.cyanBright.italic.bold(`     cd ${name}`));
            projectInvokeInstructions(choice, managerChoice);
            shell.echo("");
        });
    } else {
        const { choice } = backEnd || frontEnd;
        const { managerChoice } = answers;
        projectInvokeInstructions(choice, managerChoice);
    }

    shell.echo(
        chalk.cyanBright.italic.bold(
            "------------------------ Ready to go --------------------------",
        ),
    );
};

//---------------------------------------------------------------------------
const projectInvokeInstructions = (projectChoice, managerChoice) => {
    if (managerChoice === "npm") {
        if (projectChoice === "vue") {
            shell.echo(chalk.cyanBright.italic.bold("     npm run serve"));
        } else {
            shell.echo(chalk.cyanBright.italic.bold("     npm start"));
        }
    }
    if (managerChoice === "yarn") {
        if (projectChoice === "vue") {
            shell.echo(chalk.cyanBright.italic.bold("     yarn run serve"));
        } else {
            shell.echo(chalk.cyanBright.italic.bold("     yarn start"));
        }
    }
};

module.exports = projectExecutionCommands;
