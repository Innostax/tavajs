#! node
const inquirer = require("inquirer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const CURR_DIR = process.cwd();
const path = require("path");
const { render } = require("ejs");
const currentPath = path.join(__dirname);

const QUESTIONS = [
  {
    name: "routeName",
    type: "input",
    message: "what will be name of Routes?",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Route name may only include letters, numbers, underscores and hashes.";
    },
  },
];
inquirer.prompt(QUESTIONS).then((answers) => {
  var newRouteName = answers["routeName"];

  const dbName = JSON.parse(fs.readFileSync(`${CURR_DIR}/package.json`));

  if (
    Object.keys(dbName["dependencies"]).some((each) => each === "sequelize") ===
    true
  ) {
    var templatePath = `${currentPath}/postgresTemplates`;
    function createDirectoryContents(templatePath, newRouteName) {
      const filesToCreates = fs.readdirSync(templatePath);
      var data = fs
        .readFileSync(`${CURR_DIR}/routes/index.js`)
        .toString()
        .split("\n");

      data.splice(
        data.findIndex((each) => each === "const selectionRoute = (app) => {") +
          1,
        0,
        `app.use( '/${newRouteName}', ${newRouteName})`
      );
      data.splice(
        1,
        0,
        `const  ${newRouteName}= require("./${newRouteName}.routes");`
      );
      var text = data.join("\n");
      fs.writeFile(`${CURR_DIR}/Routes/index.js`, text, function (err) {
        if (err) return console.log(err);
      });

      var newData = fs
        .readFileSync(`${CURR_DIR}/sequelize.js`)
        .toString()
        .split("\n");
      newData.splice(
        4,
        0,
        `var UserModel = require('./models/${newRouteName}')`
      );
      newData.splice(
        5,
        0,
        `var ${newRouteName}= UserModel(sequelize, Sequelize);`
      );
      newData.splice(
        newData.findIndex((each) => each === "module.exports = {") + 1,
        0,
        ` ${newRouteName},`
      );
      var text = newData.join("\n");
      fs.writeFile(`${CURR_DIR}/sequelize.js`, text, function (err) {
        if (err) return console.log(err);
      });

      filesToCreates.forEach((file, i) => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(origFilePath);
        if (stats.isFile()) {
          let contents = fs.readFileSync(origFilePath, "utf8");

          contents = render(contents, { routeName: newRouteName });
          const writePath = [
            `${CURR_DIR}/Controllers/${file}`,
            `${CURR_DIR}/Models/${file}`,
            `${CURR_DIR}/Routes/${file}`,
          ];

          fs.writeFileSync(writePath[i], contents, "utf8");
          i++;

          //--------------------rename file-----------
          renameFile(file, newRouteName);
        }
      });
    }
  } else if (
    Object.keys(dbName["dependencies"]).some((each) => each === "mySql") ===
    true
  ) {
    console.log(" +++  mysql is selected");
  } else if (
    Object.keys(dbName["dependencies"]).some((each) => each === "mongoose") ===
    true
  ) {
    var templatePath = `${currentPath}/mongooseTemplates`;
    function createDirectoryContents(templatePath, newRouteName) {
      const filesToCreate = fs.readdirSync(templatePath);

      var data = fs
        .readFileSync(`${CURR_DIR}/Routes/index.js`)
        .toString()
        .split("\n");

      data.splice(
        data.findIndex((each) => each === "const selectionRoute = (app) => {") +
          1,
        0,
        `app.use( '/${newRouteName}', ${newRouteName})`
      );

      data.splice(
        2,
        0,
        `const  ${newRouteName}= require("./${newRouteName}.routes");`
      );
      var text = data.join("\n");
      fs.writeFile(`${CURR_DIR}/Routes/index.js`, text, function (err) {
        if (err) return console.log(err);
      });

      filesToCreate.forEach((file, i) => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(origFilePath);
        if (stats.isFile()) {
          let contents = fs.readFileSync(origFilePath, "utf8");

          contents = render(contents, { routeName: newRouteName });
          const writePath = [
            `${CURR_DIR}/Controllers/${file}`,
            `${CURR_DIR}/Models/${file}`,
            `${CURR_DIR}/Routes/${file}`,
          ];

          fs.writeFileSync(writePath[i], contents, "utf8");
          i++;

          //--------------------rename file-----------
          renameFile(file, newRouteName);
        }
      });
    }
  } else if (
    Object.keys(dbName["dependencies"]).some((each) => each === "nodemon") !==
      true &&
    Object.keys(dbName["dependencies"]).some((each) => each === "express") !==
      true
  ) {
    console.log(
      "------You are not currently in node directory. Switch it node directory and run the commands again.------  "
    );
    return;
  }
  createDirectoryContents(templatePath, newRouteName);
  console.log(`New Routes is ready for use by /${newRouteName}-----`);
});

// function to rename Files to Files

function renameFile(file, newRouteName) {
  if (file.startsWith("route")) {
    const fileName = [".controller", "", ".routes"];
    setTimeout(function name() {
      fs.rename(
        `${CURR_DIR}/Controllers/${file}`,
        `${CURR_DIR}/Controllers/${newRouteName}.controllers.js`,
        (error) => {
          if (error) {
            // Show the error
          } else {
            // List all the filenames after renaming
          }
        }
      );
      fs.rename(
        `${CURR_DIR}/Routes/${file}`,
        `${CURR_DIR}/Routes/${newRouteName}.routes.js`,
        (error) => {
          if (error) {
            // Show the error
          } else {
            // List all the filenames after renaming
          }
        }
      );
      fs.rename(
        `${CURR_DIR}/Models/${file}`,
        `${CURR_DIR}/Models/${newRouteName}.js`,
        (error) => {
          if (error) {
            // Show the error
          } else {
            // List all the filenames after renaming
          }
        }
      );
    }, 300);
  }
}
