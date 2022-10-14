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

    const newRouteName = answers["routeName"];
    const dependencies = Object.keys(package.dependencies);
    const isMongoose = dependencies.includes("mongoose")
    const isSequelize = dependencies.includes("sequelize")
    const isMySql = dependencies.includes("mySql2")
   
    if (isSequelize && !isMySql) {
        const templatePath = `${currentPath}/postgresTemplates`;
        createDirectoryContentsSequelize(templatePath, newRouteName, PROJ_DIR);

    } else if (isMySql) {
        const templatePath = `${currentPath}/postgresTemplates`;
        createDirectoryContents(templatePath, newRouteName, PROJ_DIR);
    } else if (isMongoose) {
        const templatePath = `${currentPath}/mongooseTemplates`;
        createDirectoryContents(templatePath, newRouteName, PROJ_DIR);
    } else {
        console.log(
            "You are not currently in the node directory. Switch it node directory and run the commands again.",
        );
        return;
    }
    console.log(`New Route is ready for use by /${newRouteName}-----`);

    });
    function createDirectoryContentsSequelize(templatePath, newRouteName, PROJ_DIR) {
    const filesToCreates = fs.readdirSync(templatePath);
    var data = fs
        .readFileSync(`${PROJ_DIR}/routes/index.js`)
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
    let text = data.join("\n");
    fs.writeFile(`${PROJ_DIR}/routes/index.js`, text, function (err) {
        if (err) return console.log(err);
    });

    var newData = fs
        .readFileSync(`${PROJ_DIR}/sequelize.js`)
        .toString()
        .split("\n");
    newData.splice(
        4,
        0,
        `const ${newRouteName}Model = require('./models/${newRouteName}')`
    );
    newData.splice(
        5,
        0,
        `const ${newRouteName}= ${newRouteName}Model(sequelize, Sequelize);`
    );
    newData.splice(
        newData.findIndex((each) => each === "module.exports = {") + 1,
        0,
        ` ${newRouteName},`
    );
    text = newData.join("\n");
    fs.writeFile(`${PROJ_DIR}/sequelize.js`, text, function (err) {
        if (err) return console.log(err);
    });

    filesToCreates.forEach((file, i) => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(origFilePath);
        if (stats.isFile()) {
            let contents = fs.readFileSync(origFilePath, "utf8");

            contents = render(contents, { routeName: newRouteName });
            const writePath = [
                `${PROJ_DIR}/Controllers/${file}`,
                `${PROJ_DIR}/Models/${file}`,
                `${PROJ_DIR}/routes/${file}`,
            ];

            fs.writeFileSync(writePath[i], contents, "utf8");
            i++;
            renameFile(file, newRouteName, PROJ_DIR);
        }
    });
    }

    function createDirectoryContents(templatePath, newRouteName,PROJ_DIR) {
    const filesToCreate = fs.readdirSync(templatePath);

    var data = fs
        .readFileSync(`${PROJ_DIR}/routes/index.js`)
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
    let text = data.join("\n");
    fs.writeFile(`${PROJ_DIR}/Routes/index.js`, text, function (err) {
        if (err) return console.log(err);
    });

    filesToCreate.forEach((file, i) => {
        const origFilePath = `${templatePath}/${file}`;
        const stats = fs.statSync(origFilePath);
        if (stats.isFile()) {
            let contents = fs.readFileSync(origFilePath, "utf8");

            contents = render(contents, { routeName: newRouteName });
            const writePath = [
                `${PROJ_DIR}/Controllers/${file}`,
                `${PROJ_DIR}/Models/${file}`,
                `${PROJ_DIR}/Routes/${file}`,
            ];

            fs.writeFileSync(writePath[i], contents, "utf8");
            i++;
            renameFile(file, newRouteName, PROJ_DIR);
        }
    });
    }

    // Function to rename files of the route.

    function renameFile(file, newRouteName, currentDirectory) {
        if (file.startsWith("route")) {
            setTimeout(function name() {
                fs.rename(
                    `${currentDirectory}/Controllers/${file}`,
                    `${currentDirectory}/Controllers/${newRouteName}.controllers.js`,
                    (error) => {
                        console.log(error)
                    }
                );
                fs.rename(
                    `${currentDirectory}/Routes/${file}`,
                    `${currentDirectory}/Routes/${newRouteName}.routes.js`,
                    (error) => {
                        console.log(error)
                    }
                );
                fs.rename(
                    `${currentDirectory}/Models/${file}`,
                    `${currentDirectory}/Models/${newRouteName}.js`,
                    (error) => {
                        console.log(error)
                    }
                );
            }, 300);
        }
    }
}