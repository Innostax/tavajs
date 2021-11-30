const chalk = require("chalk");
const package = require("../../package.json");

function frontEndTraitShow(
  projectName,
  projectChoice,
  authService,
  authenticationChoice,
  isNgrx,
  isRedux,
  isVuex
) {
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
}
module.exports = frontEndTraitShow;
