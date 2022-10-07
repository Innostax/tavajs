const chalk = require("chalk");
const shell = require("shelljs");
const projectDetails = require("../../package.json");

const printMessage = (colorCode, message, answer) => {
    shell.echo(
        chalk.green.bold(
            `   ${String.fromCodePoint(colorCode)} ${message}: ${answer}`
        )
    );
};

const projectInfo = async (frontEnd, backEnd, answers) => {
    //<---------------------------- For frontEnd ---------------------------->

    if (frontEnd) {
        const { name, choice } = frontEnd;

        printMessage(
            "0x1f4c2",
            `Creating ${choice} project`,
            `${name} using ${projectDetails.name} ${projectDetails.version}`
        );

        if (answers["cssFrameworkChoice"])
            printMessage(
                "0x231b",
                "Integrating CSS Framework",
                answers["cssFrameworkChoice"]
            );

        if (answers["testCaseFramework"])
            printMessage(
                "0x231b",
                "Integrating Test Case framework",
                answers["testCaseFramework"]
            );

        if (answers["theme"])
            printMessage("0x231b", "Integrating Theme Provider", answers["theme"]);

        if (answers["networkInformer"])
            printMessage("0x231b", "Integrating Network Informer", "");

        if (answers["authenticationChoice"])
            printMessage(
                "0x231b",
                "Integrating Authentication service",
                answers["authenticationChoice"]
            );

        if (choice === "react" && answers["store"])
            printMessage("0x231b", "Integrating Redux pattern", "");

        if (choice === "angular" && answers["store"])
            printMessage("0x231b", "Integrating Ngrx pattern", "");

        if (choice === "vue" && answers["store"])
            printMessage("0x231b", "Integrating Vuex pattern", "");

        if (answers["dockerService"] && !answers["dbName"])
            printMessage("0x231b", "Integrating Docker Service", "");

        if (answers["cicdPipelineIntegrate"])
            printMessage(
                "0x231b",
                "Integrating CI/CD Pipeline",
                answers["cicdPipelineIntegrate"]
            );
    }

    //<---------------------------- For backEnd ---------------------------->

    if (backEnd) {
        const { name, choice } = backEnd;

        printMessage(
            "0x1f4c2",
            `Creating ${choice} project`,
            `${name} using ${projectDetails.name} ${projectDetails.version}`
        );

        if (answers["dbName"])
            printMessage("0x231b", "Integrating Database service", answers["dbName"]);

        if (answers["loggerServiceName"])
            printMessage(
                "0x231b",
                "Integrating Logger service",
                answers["loggerServiceName"]
            );

        if (answers["emailServiceName"])
            printMessage(
                "0x231b",
                "Integrating Email service",
                answers["emailServiceName"]
            );

        if (answers["blobServiceName"])
            printMessage(
                "0x231b",
                "Integrating Blob service",
                answers["blobServiceName"]
            );

        if (answers["dockerService"])
            printMessage("0x231b", "Integrating Docker Service", "");
    }

    shell.echo(
        chalk.green.bold(`${String.fromCodePoint(169)} Powered by Innostax`)
    );
};

module.exports = projectInfo;
