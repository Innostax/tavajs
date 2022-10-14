#! node
const inquirer = require("inquirer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const { render } = require("ejs");
const currentPath = path.join(__dirname);
const PROJ_DIR = process.cwd();
const chalk = require("chalk");
const shell = require("shelljs");
const { handleRenderEJS } = require("../../utils/helper");

const QUESTIONS = [
  {
    name: "routeName",
    type: "input",
    message: "what will be the name of the Route?",
    validate(input) {
      if (/^([A-Za-z\-\d])+$/.test(input)) return true;
      return "Route name may only include letters, numbers, underscores, and hashes";
    },
  },
];

const readPackage = async () => {
  await fs.readFile(`${PROJ_DIR}/package.json`, "utf-8", (err, data) => {
    if (err) {
      shell.echo(
        chalk.red.italic.bold(
          `Error: You are not in correct directory.\nNote: Please run this command in backend project directory.`
        )
      );
    }
    if (data) {
      const package = JSON.parse(data);
      askQuestion(package);
    }
  });
};
readPackage();

const askQuestion = (package) => {
  inquirer.prompt(QUESTIONS).then((answers) => {
    const routeName = answers["routeName"];
    const dependencies = Object.keys(package.dependencies);
    const isMongoose = dependencies.includes("mongoose");
    const isSequelize = dependencies.includes("sequelize");
    const isMySql = dependencies.includes("mysql2");
    const isPostgres = dependencies.includes("pg");

    if (isSequelize) {
      if (isMySql) {
        handleRenderEJS(
          `${currentPath}/controllers/mysql.controllers.js`,
          { routeName },
          `${PROJ_DIR}/controllers/${routeName}.controllers.js`
        );
      } else if (isPostgres) {
        handleRenderEJS(
          `${currentPath}/controllers/postgres.controllers.js`,
          { routeName },
          `${PROJ_DIR}/controllers/${routeName}.controllers.js`
        );
      }

      handleRenderEJS(
        `${currentPath}/models/sequelize.models.js`,
        { routeName },
        `${PROJ_DIR}/models/${routeName}.js`
      );

      //------------------------- Added UserModel ----------------------------
      let sequelizeFile = fsExtra.readFileSync(
        `${PROJ_DIR}/sequelize.js`,
        "utf-8"
      );
      const modelName = routeName[0].toUpperCase()+routeName.slice(1)
      const lastUserModelMethod = sequelizeFile.lastIndexOf("Sequelize");
      const lastUserModelStart =
        sequelizeFile.lastIndexOf("\n", lastUserModelMethod) + 1;
      const lastUserModelEnd = sequelizeFile.indexOf("\n", lastUserModelStart);

      const lastUserModel = sequelizeFile.slice(
        lastUserModelStart,
        lastUserModelEnd + 1
      );
      const newUserModel =
        lastUserModel +
        `const ${modelName}Model = require('./models/${routeName}') \n` +
        `const ${routeName} = ${modelName}Model(sequelize, Sequelize); \n`;
      sequelizeFile = sequelizeFile.replace(lastUserModel, newUserModel);

      //------------------------- Added Export ----------------------------
      const exportObject = sequelizeFile.indexOf("module.exports");
      const exportStart = sequelizeFile.indexOf("{", exportObject);
      const exportEnd = sequelizeFile.indexOf("}", exportStart);

      const oldExport = sequelizeFile.slice(exportStart, exportEnd + 1);
      const newExport = oldExport.replace("}", ` ${routeName}, \n}`);
      sequelizeFile = sequelizeFile.replace(oldExport, newExport);

      fsExtra.writeFileSync(`${PROJ_DIR}/sequelize.js`, sequelizeFile, "utf-8");
    } else if (isMongoose) {
      handleRenderEJS(
        `${currentPath}/controllers/mongoose.controllers.js`,
        { routeName },
        `${PROJ_DIR}/controllers/${routeName}.controllers.js`
      );
      handleRenderEJS(
        `${currentPath}/models/mongoose.models.js`,
        { routeName },
        `${PROJ_DIR}/models/${routeName}.js`
      );
    }

    handleRenderEJS(
      `${currentPath}/routes/route.routes.js`,
      { routeName },
      `${PROJ_DIR}/routes/${routeName}.routes.js`
    );

    //------------------------- Added Require ----------------------------
    let routeIndex = fsExtra.readFileSync(
      `${PROJ_DIR}/routes/index.js`,
      "utf-8"
    );

    const lastRequireStart = routeIndex.lastIndexOf("require");
    const lastRequireEnd = routeIndex.indexOf("\n", lastRequireStart);

    const lastRequire = routeIndex.slice(lastRequireStart, lastRequireEnd + 1);
    const newRequire =
      lastRequire + `const ${routeName} = require('./${routeName}.routes'); \n`;
    routeIndex = routeIndex.replace(lastRequire, newRequire);

    //------------------------- Added Selection Route ----------------------------
    const selectionRouteMethod = routeIndex.indexOf("selectionRoute");
    const selectionRouteStart = routeIndex.indexOf("{", selectionRouteMethod);
    const selectionRouteEnd = routeIndex.indexOf("}", selectionRouteStart);

    const selectionRoute = routeIndex.slice(
      selectionRouteStart,
      selectionRouteEnd + 1
    );
    const newSelectionRoute = selectionRoute.replace(
      "}",
      `	app.use('/${routeName.toLowerCase()}', ${routeName}); \n}`
    );
    routeIndex = routeIndex.replace(selectionRoute, newSelectionRoute);

    fsExtra.writeFileSync(`${PROJ_DIR}/routes/index.js`, routeIndex, "utf-8");
    shell.echo(
      chalk.cyanBright.italic.bold(
        `-------------- New Route is ready for use at url /${routeName} --------------`
      )
    );
  });
};
