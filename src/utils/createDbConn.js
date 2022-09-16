const fs = require("fs");
const { updateProjectDependencies } = require("./helper");
const { render } = require("ejs");
//<----------------------------- Function to create db service -------------------------------------------->
function createDbConn(nodePath, dbName, defaultRoute, currentPath) {
  const dependencies = [];
  let fileName;
  let modelName;
  const modelPath = nodePath + "/models";
  const isPostgres = dbName === "postgres";
  const isMySQL = dbName === "mysql";

  if ( isPostgres || isMySQL) {
    dependencies.push({ name: "sequelize", version: "^6.6.5" });
    fileName = "sequelize.js";
    modelName = "sequelizeModel.js";

    isMySQL
      ? dependencies.push({ name: "mysql2", version: "^2.3.0" })
      : dependencies.push({ name: "pg", version: "^8.7.1" });
  } else {
    dependencies.push({ name: "mongoose", version: "^6.0.2" });
    fileName = "mongoose.js";
    modelName = "mongooseModel.js";
  }

  // Updating package dependencies
  updateProjectDependencies(nodePath, dependencies);

  // Create modal directory
  fs.mkdirSync(modelPath);

  let databaseFilePath = `${nodePath}/${fileName}`;

  // Reading Database file data
  let databaseFile = fs.readFileSync(
    currentPath + `/dbTemplates/` + fileName,
    "utf8"
  );
  databaseFile = render(databaseFile, { defaultRoute });

  // Writing database file data
  fs.writeFileSync(databaseFilePath, databaseFile, "utf8");

  // Database file path
  databaseFilePath = `${modelPath}/${defaultRoute}.js`;

  // // Reading Database file data
  databaseFile = fs.readFileSync(
    currentPath + `/dbTemplates/` + modelName,
    "utf8"
  );
  databaseFile = render(databaseFile, { defaultRoute });

  // Writing database file data
  fs.writeFileSync(databaseFilePath, databaseFile, "utf8");
}

module.exports = createDbConn;
