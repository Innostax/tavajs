#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const { render } = require("./utils/template");
const path = require("path");

const CURR_DIR = process.cwd();

const QUESTIONS = [
  {
    name: "project-name",
    type: "input",
    message: "What will be name of screen?",
    validate: function (input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Screen name may only include letters, numbers, underscores and hashes.";
    },
  },
];

inquirer.prompt(QUESTIONS).then((answers) => {
  const projectChoice = "new-screen";
  const projectName = answers["project-name"];
  const templatePath = path.join(__dirname, "templates", projectChoice);

  fs.mkdirSync(`${CURR_DIR}\\src\\Screens/${projectName}`);

  createDirectoryContents(templatePath, projectName);
});

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);

  //Updating Routes
  var data = fs
    .readFileSync(`${CURR_DIR}\\src\\Routes.js`)
    .toString()
    .split("\n");
  data.splice(
    9,
    0,
    `<Route exact path="/${newProjectPath}" component={${newProjectPath}}></Route>`
  );
  data.splice(
    3,
    0,
    `import ${newProjectPath} from "./Screens/${newProjectPath}";`
  );
  var text = data.join("\n");

  fs.writeFile(`${CURR_DIR}\\src\\Routes.js`, text, function (err) {
    if (err) return console.log(err);
  });

  filesToCreate.forEach((file, i) => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");
      contents = render(contents, { projectName: newProjectPath });

      const writePath = `${CURR_DIR}\\src\\Screens/${newProjectPath}/${file}`;

      if (file.startsWith("screen")) {
        const filesName = [".constant", "", ".utils"];
        setTimeout(function name() {
          fs.rename(
            `${CURR_DIR}\\src\\Screens/${newProjectPath}\\${file}`,
            `${CURR_DIR}\\src\\Screens/${newProjectPath}\\${newProjectPath}${
              filesName[i - 1]
            }.js`,
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
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`
      );
    }
  });
}
