const fs = require("fs");
const { updateProjectDependencies } = require("./helper");
const { render } = require("ejs");
//function to create db service---------------------------------------------->
function createDbConn(nodePath, dbName, defaultRoute,currentPath) {
  if (dbName === "postgres" || dbName === "mysql") {
    let package = { name: "sequelize", version: "^6.6.5" };
    updateProjectDependencies(nodePath, package);
    var fileName = "sequelize.js";
    var modelName = "sequelizeModel.js";
    if (dbName === "mysql") {
      package = { name: "mysql2", version: "^2.3.0" };
      updateProjectDependencies(nodePath, package);
    } else {
      package = { name: "pg", version: "^8.7.1" };
      updateProjectDependencies(nodePath, package);
    }
  } else {
    let package = { name: "mongoose", version: "^6.0.2" };
    updateProjectDependencies(nodePath, package);
    var fileName = "mongoose.js";
    var modelName = "mongooseModel.js";
  }
  const modelPath = nodePath + "/models";
  fs.mkdirSync(modelPath);

  let writePath = `${nodePath}/${fileName}`;
  let contents = fs.readFileSync(
    currentPath+`/dbTemplates/` + fileName,
    "utf8"
  );
  contents = render(contents, { defaultRoute });
  fs.writeFileSync(writePath, contents, "utf8");

  writePath = `${modelPath}/${defaultRoute}.js`;
  contents = fs.readFileSync(currentPath+`/dbTemplates/` + modelName, "utf8");
  contents = render(contents, { defaultRoute });
  fs.writeFileSync(writePath, contents, "utf8");
}
  module.exports=createDbConn