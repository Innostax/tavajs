const fs = require("fs");
const { updateProjectDependencies } = require("./helper");
const { render } = require("ejs");
const { DATABASES } = require("../constants");
const { POSTGRES, MYSQL } = DATABASES;
//<----------------------------- Function to create db service -------------------------------------------->
function createDbConn(nodePath, dbName, defaultRoute, currentPath) {
  let dependencies = [];
  let fileName;
  let modelName;
  const modelPath = nodePath + "/models";

  switch (dbName) {
    case POSTGRES:
    case MYSQL:
      fileName = "sequelize.js";
      modelName = "sequelizeModel.js";
      dependencies = [...dependencies, { name: "sequelize", version: "^6.6.5" }]
      if (MYSQL == dbName) dependencies.push({ name: "mysql2", version: "^2.3.0" });
      else dependencies = [...dependencies, { name: "pg", version: "^8.7.1" }];
      break;
    default:
      fileName = "mongoose.js";
      modelName = "mongooseModel.js";
      dependencies = [...dependencies, { name: "mongoose", version: "^6.0.2" }];
      break;
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
