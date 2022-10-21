const fs = require("fs");
const path = require("path");
const { updateProjectDependencies } = require("./helper");
const { DEPENDENCIES } = require("../TavaJsExecutors/dependencies")
const { LOGGER_SERVICES } = require("../TavaJsExecutors/constants")
const { WINSTON, SENTRY } = LOGGER_SERVICES;

// Function to create logger service ------------------------------------------------------------>
const createLogger = (utilpath, loggerName, loggerTemplatePath) => {
    const dependencies = [];
    const isWinston = loggerName === WINSTON;
    const isSentry = loggerName === SENTRY;

    if (isWinston) {
        const loggerServicePath = path.join(utilpath, "utils", "logger");
        fs.mkdirSync(loggerServicePath);

        dependencies = [...dependencies, ...DEPENDENCIES.LOGGER_SERVICES.WINSTON ];

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
    } else if (isSentry) {
        const loggerServicePath = path.join(utilpath, "utils", "logger");
        fs.mkdirSync(loggerServicePath);

        dependencies = [...dependencies, ...DEPENDENCIES.LOGGER_SERVICES.SENTRY ];

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
};

module.exports = createLogger;
