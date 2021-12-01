const chalk = require("chalk");
const package = require("../../package.json");

function projectInfo(
  projectName,
  frontEndName,
  nodeName,
  projectChoice,
  dbService,
  dbName,
  loggerService,
  loggerName,
  emailService,
  emailServiceName,
  blobService,
  blobServiceName,
  authService,
  authenticationChoice,
  isNgrx,
  isRedux,
  isVuex
) {
  if (projectChoice === "react_Node") {
    console.log(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating React project: ${frontEndName} using ${package.name} ${
          package.version
        }`
      )
    );
    if (authService === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Authentication service: ${authenticationChoice}`
        )
      );
    if (isRedux)
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Redux pattern`
        )
      );
    if (isNgrx)
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Ngrx pattern`
        )
      );
    if (isVuex)
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Vuex pattern`
        )
      );
    console.log(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating Node project: ${nodeName} using ${package.name} ${
          package.version
        }`
      )
    );
    if (dbService === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Database service: ${dbName}`
        )
      );
    if (loggerService === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Logger service: ${loggerName}`
        )
      );
    if (emailService == "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Email service: ${emailServiceName}`
        )
      );
    if (blobService == "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Blob service: ${blobServiceName}`
        )
      );
  } else {
    console.log(
      chalk.green.bold(
        `${String.fromCodePoint(
          0x1f4c2
        )} Creating ${projectChoice} project: ${projectName} using ${
          package.name
        } ${package.version}`
      )
    );
    if (authService === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Authentication service: ${authenticationChoice}`
        )
      );
    if (isRedux)
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Redux pattern`
        )
      );
    if (isNgrx)
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Ngrx pattern`
        )
      );
    if (isVuex)
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(0x231b)} Integrating Vuex pattern`
        )
      );
    if (dbService === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Database service: ${dbName}`
        )
      );
    if (loggerService === "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Logger service: ${loggerName}`
        )
      );
    if (emailService == "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Email service: ${emailServiceName}`
        )
      );
    if (blobService == "yes")
      console.log(
        chalk.green.bold(
          `   ${String.fromCodePoint(
            0x231b
          )} Integrating Blob service: ${blobServiceName}`
        )
      );
  }
  console.log(
    chalk.green.bold(`${String.fromCodePoint(169)} Powered by Innostax`)
  );
}

module.exports = projectInfo;
