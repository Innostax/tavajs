const fs = require("fs");
const { render } = require("ejs");
const { updateProjectDependencies } = require("./helper");
const { DATABASES } = require("../TavaJsExecutors/constants");
const { DEPENDENCIES } = require("../TavaJsExecutors/dependencies");

const { POSTGRES, MYSQL, MONGOOSE } = DATABASES;
// <----------------------------- Function to create db service -------------------------------------------->
const createDbConn = (nodePath, dbName, defaultRoute, currentPath) => {
    let dependencies = [];
    let fileName;
    let modelName;
    const modelPath = `${nodePath}/models`;

    switch (dbName) {
    case POSTGRES:
    case MYSQL:
        fileName = "sequelize.js";
        modelName = "sequelizeModel.js";
        dependencies = [
            ...dependencies,
            { name: "sequelize", version: "^6.6.5" },
        ];
        if (MYSQL === dbName) dependencies = [ ...dependencies, ...DEPENDENCIES.DATABASES.MYSQL ]
        else dependencies = [...dependencies, ...DEPENDENCIES.DATABASES.POSTGRES ];
        break;
    case MONGOOSE:
        fileName = "mongoose.js";
        modelName = "mongooseModel.js";
        dependencies = [...dependencies, ...DEPENDENCIES.DATABASES.MONGOOSE ];
        break;
    default:
        break;
    }

    // Updating package dependencies
    updateProjectDependencies(nodePath, dependencies);

    // Create modal directory
    fs.mkdirSync(modelPath);
    let databaseFilePath = `${nodePath}/${fileName}`;
    // Reading Database file data
    let databaseFile = fs.readFileSync(
        `${currentPath}/Services/DatabaseServices/${fileName}`,
        "utf8",
    );
    databaseFile = render(databaseFile, { defaultRoute });
    // Writing database file data
    fs.writeFileSync(databaseFilePath, databaseFile, "utf8");

    // Database file path
    databaseFilePath = `${modelPath}/${defaultRoute}.js`;
    // // Reading Database file data
    databaseFile = fs.readFileSync(
        `${currentPath}/Services/DatabaseServices/${modelName}`,
        "utf8",
    );
    databaseFile = render(databaseFile, { defaultRoute });
    // Writing database file data
    fs.writeFileSync(databaseFilePath, databaseFile, "utf8");
};

module.exports = createDbConn;
