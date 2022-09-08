const chalk = require("chalk");
const package = require("../../package.json");

function projectInfo(frontEnd, backEnd, answers) {
  //<---------------------------- For frontEnd ---------------------------------->

  if (frontEnd) {
    const { name, choice } = frontEnd;
    console.log(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating ${choice} project: ${name} using ${package.name} ${
          package.version
        }`
      )
    );
    if (answers["authenticationChoice"])
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Authentication service: ${
            answers["authenticationChoice"]
          }`
        )
      );
    if (choice === "react" && answers["store"])
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Redux pattern`
        )
      );
    if (choice === "angular" && answers["store"])
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Ngrx pattern`
        )
      );
    if (choice === "vue" && answers["store"])
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Vuex pattern`
        )
      );
  }

  //<---------------------------- For backEnd ---------------------------------->

  if (backEnd) {
    const { name, choice } = backEnd;
    console.log(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating ${choice} project: ${name} using ${package.name} ${
          package.version
        }`
      )
    );

    if (answers["dbName"])
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Database service: ${
            answers["dbName"]
          }`
        )
      );
    if (answers["loggerName"])
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Logger service: ${
            answers["loggerName"]
          }`
        )
      );
    if (answers["emailServiceName"])
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Email service: ${
            answers["emailServiceName"]
          }`
        )
      );
    if (answers["blobServiceName"])
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Blob service: ${
            answers["blobServiceName"]
          }`
        )
      );
  }
  console.log(
    chalk.green.bold(`${String.fromCodePoint(169)} Powered by Innostax`)
  );
}

module.exports = projectInfo;
