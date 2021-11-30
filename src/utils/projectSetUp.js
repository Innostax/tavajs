const chalk = require("chalk");
const backEndTraitShow = require("./backEndTraitShow");
const frontEndTraitShow = require("./frontEndTraitShow");
const packageInstaller = require("./packageInstaller");
const projectInvokeInstructions = require("./projectInvokeInstructions");

function projectSetUp(
  projectName,
  frontEndName,
  nodeName,
  managerChoice,
  projectChoice,
  projectPath,
  reactPath,
  nodePath,
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
    frontEndTraitShow(
      frontEndName,
      "react",
      authService,
      authenticationChoice,
      isNgrx,
      isRedux,
      isVuex
    );
    backEndTraitShow(
      nodeName,
      dbService,
      dbName,
      loggerService,
      loggerName,
      emailService,
      emailServiceName,
      blobService,
      blobServiceName
    );
    console.log(
      chalk.green.bold(`${String.fromCodePoint(0x1f4a1)} Powered by Innostax`)
    );
    packageInstaller(managerChoice, "react", reactPath);
    packageInstaller(managerChoice, "node-js", nodePath);
  } else {
    projectChoice === "node-js"
      ? backEndTraitShow(
          projectName,
          dbService,
          dbName,
          loggerService,
          loggerName,
          emailService,
          emailServiceName,
          blobService,
          blobServiceName
        )
      : frontEndTraitShow(
          projectName,
          projectChoice,
          authService,
          authenticationChoice,
          isNgrx,
          isRedux,
          isVuex
        );
    console.log(
      chalk.green.bold(`${String.fromCodePoint(0x1f4a1)} Powered by Innostax`)
    );
    packageInstaller(managerChoice, projectChoice, projectPath);
  }
  console.log(
    chalk.green.bold(`${String.fromCodePoint(0x2705)} Successfully created \n `)
  );
  console.log(
    chalk.magentaBright.bold(
      `${String.fromCodePoint(45)}${String.fromCodePoint(
        62
      )} To get Started: \n`
    )
  );
  console.log(chalk.cyanBright.italic.bold(`     cd ${projectName} \n`));
  if (projectChoice === "react_Node") {
    console.log(
      chalk.magentaBright.bold(
        `${String.fromCodePoint(45)}${String.fromCodePoint(62)} For React: \n`
      )
    );
    console.log(chalk.cyanBright.italic.bold(`     cd ${frontEndName}`));
    projectInvokeInstructions((projectChoice = "react"), managerChoice);
    console.log(
      chalk.magentaBright.bold(
        `\n ${String.fromCodePoint(45)}${String.fromCodePoint(62)} For Node: \n`
      )
    );
    console.log(chalk.cyanBright.italic.bold(`     cd ${nodeName}`));
    projectInvokeInstructions((projectChoice = "node-js"), managerChoice);
  } else {
    projectInvokeInstructions(projectChoice, managerChoice);
  }
  console.log(
    chalk.cyanBright.italic.bold(
      `------------------------ Ready to go --------------------------`
    )
  );
}
module.exports = projectSetUp;
