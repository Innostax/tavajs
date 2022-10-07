const fs = require("fs");
const path = require("path");
const { updateProjectDependencies } = require("./helper");

const WINSTON = "winston";
const SENTRY = "@sentry/node";

// Function to create logger service ------------------------------------------------------------>
function createLogger(utilpath, loggerName, loggerTemplatePath) {
    const dependencies = [];
    if (loggerName === WINSTON) {
        const loggerServicePath = path.join(utilpath, "utils", "logger");
        fs.mkdirSync(loggerServicePath);

        dependencies.push({ name: WINSTON, version: "^3.3.3" });

        const loggerFile = fs.readFileSync(
            `${loggerTemplatePath}/${loggerName}.js`,
            "utf-8",
        );

        fs.writeFile(
            `${loggerServicePath}/index` + ".js",
            loggerFile,
            (err) => {
                if (err) throw err;
            },
        );
    } else {
        const loggerServicePath = path.join(utilpath, "utils", "logger");
        fs.mkdirSync(loggerServicePath);

        dependencies.push({ name: SENTRY, version: "^7.13.0" });

        const loggerFile = fs.readFileSync(
            `${loggerTemplatePath}/${loggerName}.js`,
            "utf-8",
        );

        fs.writeFile(
            `${loggerServicePath}/index` + ".js",
            loggerFile,
            (err) => {
                if (err) throw err;
            },
        );
    }

    updateProjectDependencies(utilpath, dependencies);
}
module.exports = createLogger;
