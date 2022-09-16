const fs = require("fs");
const { updateProjectDependencies } = require("./helper");
const path = require("path");
//Function to create logger service ------------------------------------------------------------>
function createLogger(utilpath, loggerName, loggerTemplatePath, defaultRoute) {
  if (loggerName === "winston") {
    let servicePath = path.join(utilpath, "utils", "logger");
    fs.mkdirSync(servicePath);
    let package = { name: "winston", version: "^3.3.3" };
    updateProjectDependencies(utilpath, package);
    let contents = fs.readFileSync(
      loggerTemplatePath + "/" + loggerName + ".js",
      "utf-8"
    );
    fs.writeFile(servicePath + "/index" + ".js", contents, function (err) {
      if (err) throw err;
    });
  } else {
    let package = { name: "raven", version: "^2.6.4" };
    updateProjectDependencies(utilpath, package);
  }
}
  module.exports=createLogger