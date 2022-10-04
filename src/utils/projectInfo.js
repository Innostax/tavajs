const chalk = require("chalk");
const shell = require("shelljs");
const projectDetails = require("../../package.json");

const projectInfo = async (frontEnd, backEnd, answers) => {
  //<---------------------------- For frontEnd ---------------------------->

  if (frontEnd) {
    const { name, choice } = frontEnd;

    shell.echo(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating ${choice} project: ${name} using ${projectDetails.name} ${
          projectDetails.version
        }`
      )
    );

    if (answers["cssFrameworkChoice"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating CSS Framework: ${answers["cssFrameworkChoice"]}`
        )
      );

    if (answers["testCaseFramework"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Test Case framework: ${answers["testCaseFramework"]}`
        )
      );
    if (answers["theme"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Theme Provider: ${answers["theme"]}`
        )
      );

    if (answers["networkInformer"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Network Infromer`
        )
      );
    
    if (answers["authenticationChoice"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Authentication service: ${answers["authenticationChoice"]}`
        )
      );

    if (choice === "react" && answers["store"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Redux pattern`
        )
      );

    if (choice === "angular" && answers["store"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Ngrx pattern`
        )
      );

    if (choice === "vue" && answers["store"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Vuex pattern`
        )
      );

    if (answers["dockerService"] && !answers["dbName"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Docker Service`
        )
      );  

    if (answers["cicdPipelineIntegrate"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating CI/CD Pipeline: ${answers["cicdPipelineIntegrate"]}`
        )
      );
  }

  //<---------------------------- For backEnd ---------------------------->

  if (backEnd) {
    const { name, choice } = backEnd;

    shell.echo(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating ${choice} project: ${name} using ${projectDetails.name} ${
          projectDetails.version
        }`
      )
    );

    if (answers["dbName"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Database service: ${
            answers["dbName"]
          }`
        )
      );

    if (answers["loggerServiceName"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Logger service: ${
            answers["loggerServiceName"]
          }`
        )
      );

    if (answers["emailServiceName"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Email service: ${
            answers["emailServiceName"]
          }`
        )
      );

    if (answers["blobServiceName"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Blob service: ${
            answers["blobServiceName"]
          }`
        )
      );

    if (answers["dockerService"])
      shell.echo(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Docker Service`
        )
      ); 
  }

  shell.echo(
    chalk.green.bold(`${String.fromCodePoint(169)} Powered by Innostax`)
  );
};

module.exports = projectInfo;
