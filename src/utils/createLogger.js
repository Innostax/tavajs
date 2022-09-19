const fs = require("fs");
const { updateProjectDependencies } = require("./helper");
const path = require("path");
const WINSTON = "winston";
const RAVEN = "raven";

//Function to create logger service ------------------------------------------------------------>
function createLogger(utilpath, loggerName, loggerTemplatePath, defaultRoute) {
  const dependencies = [];
  if (loggerName === WINSTON) {
    let loggerServicePath = path.join(utilpath, "utils", "logger");
    fs.mkdirSync(loggerServicePath);

    dependencies.push({ name: WINSTON, version: "^3.3.3" });

    let loggerFile = fs.readFileSync(
      loggerTemplatePath + "/" + loggerName + ".js",
      "utf-8"
    );

    fs.writeFile(
      loggerServicePath + "/index" + ".js",
      loggerFile,
      function (err) {
        if (err) throw err;
      }
    );
  } else {
    dependencies.push({ name: RAVEN, version: "^2.6.4" });
  }

  updateProjectDependencies(utilpath, dependencies);
}
module.exports = createLogger;
