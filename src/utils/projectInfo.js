const chalk = require("chalk");
const shell = require("shelljs");
const projectDetails = require("../../package.json");

const printMessage = (message, answer = "") => {
  shell.echo(chalk.green.bold(answer ? `${message}: ${answer}` : `${message}`));
};

const projectInfo = async (frontEnd, backEnd, answers) => {
  //<---------------------------- For frontEnd ---------------------------->

  if (frontEnd) {
    const { name, choice } = frontEnd;

    printMessage(
      `📂 Creating ${choice} project`,
      `${name} using ${projectDetails.name} ${projectDetails.version}`
    );

    if (answers["cssFrameworkChoice"])
      printMessage(
        "⌛ Integrating CSS Framework",
        answers["cssFrameworkChoice"]
      );

    if (answers["testCaseFramework"])
      printMessage(
        "⌛ Integrating Test Case framework",
        answers["testCaseFramework"]
      );

    if (answers["theme"])
      printMessage("⌛ Integrating Theme Provider", answers["theme"]);

    if (answers["networkInformer"])
      printMessage("⌛ Integrating Network Informer");

    if (answers["authenticationChoice"])
      printMessage(
        "⌛ Integrating Authentication service",
        answers["authenticationChoice"]
      );

    if (choice === "react" && answers["store"])
      printMessage("⌛ Integrating Redux store");

    if (choice === "angular" && answers["store"])
      printMessage("⌛ Integrating Ngrx store");

    if (choice === "vue" && answers["store"])
      printMessage("⌛ Integrating Vuex store");

    if (answers["dockerService"] && !answers["dbName"])
      printMessage("⌛ Integrating Docker Service");

    if (answers["cicdPipelineIntegrate"])
      printMessage(
        "⌛ Integrating CI/CD Pipeline",
        answers["cicdPipelineIntegrate"]
      );
  }

  //<---------------------------- For backEnd ---------------------------->

  if (backEnd) {
    const { name, choice } = backEnd;

    printMessage(
      `📂 Creating ${choice} project`,
      `${name} using ${projectDetails.name} ${projectDetails.version}`
    );

    if (answers["dbName"])
      printMessage("⌛ Integrating Database service", answers["dbName"]);

    if (answers["loggerServiceName"])
      printMessage(
        "⌛ Integrating Logger service",
        answers["loggerServiceName"]
      );

    if (answers["emailServiceName"])
      printMessage("⌛ Integrating Email service", answers["emailServiceName"]);

    if (answers["blobServiceName"])
      printMessage("⌛ Integrating Blob service", answers["blobServiceName"]);

    if (answers["dockerService"]) printMessage("⌛ Integrating Docker Service");
  }

  shell.echo(chalk.green.bold(`© Powered by Innostax`));
};

module.exports = projectInfo;
