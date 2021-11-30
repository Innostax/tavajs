const chalk = require("chalk");
const package = require("../../package.json");

function backEndTraitShow(
  projectName,
  dbService,
  dbName,
  loggerService,
  loggerName,
  emailService,
  emailServiceName,
  blobService,
  blobServiceName
) {
  console.log(
    chalk.green.bold(
      `${String.fromCodePoint(
        0x1f4c2
      )} Creating Node project: ${projectName} using ${package.name} ${
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
}
module.exports = backEndTraitShow;
