#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const { render } = require("./utils/template");
const path = require("path");

const CURR_DIR = process.cwd();


const CHOICES = fs.readdirSync(path.join(__dirname, "templates"));

const QUESTIONS = [
  {
    name: "project-choice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES
  },
  {
    name: "project-name",
    type: "input",
    message: "Project name:",
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    }
  }
];

inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers["project-choice"];
  const projectName = answers["project-name"];
  const templatePath = path.join(__dirname, "templates", projectChoice);
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  if(projectChoice=='react'){
          let contents = fs.readFileSync(`${CURR_DIR}/`+"src/code_templates/for-React.js","utf-8");
          contents = render(contents, { projectName: projectName });
          fs.writeFile(`${CURR_DIR}/${projectName}/${projectName}`+'.js',contents, function (err) {
            if (err) throw err;
            console.log('Template created successfully.');
          });
      }
  
  createDirectoryContents(templatePath, projectName);
});

function createDirectoryContents(templatePath, newProjectPath) {
  const filesToCreate = fs.readdirSync(templatePath);
  

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");
      contents = render(contents, { projectName: newProjectPath });

      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
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
