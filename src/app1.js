#! node

const inquirer = require("inquirer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const CURR_DIR = process.cwd();
const path = require("path");
const { render } = require("./utils/template");
const currentPath = path.join(__dirname);

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
  const projectName = answers["project-name"];
  fs.mkdirSync(`${CURR_DIR}/src/Screens/${projectName}`);

  const templatePath = path.join(`${currentPath}`, "screenTemplates");

  function createDirectoryContents(templatePath, projectName) {
    const filesToCreate = fs.readdirSync(templatePath);

    //=============add to routers
    const routePath = `${CURR_DIR}/src`;
    // console.log("----routePath----", routePath);
    var data = fs.readFileSync(`${routePath}/Routes.js`).toString().split("\n");
    data.splice(
      9,
      0,
      `<Route exact path="/${projectName}" component={${projectName}}></Route>`
    );
    data.splice(3, 0, `import ${projectName} from "./Screens/${projectName}";`);
    var text = data.join("\n");

    fs.writeFile(`${routePath}/Routes.js`, text, function (err) {
      if (err) return console.log(err);
    });
    //====================================

    filesToCreate.forEach((file, i) => {
      const origFilePath = `${templatePath}/${file}`;
      const stats = fs.statSync(origFilePath);
      if (stats.isFile()) {
        let contents = fs.readFileSync(origFilePath, "utf8");
        // console.log("****contents****", contents);
        contents = render(contents, { screenName: projectName });

        const writePath = `${CURR_DIR}/src/Screens/${projectName}/${file}`;

        //================================================================
        if (file.startsWith("screen")) {
          const filesName = [".constant", "", ".utils"];
          setTimeout(function name() {
            fs.rename(
              `${CURR_DIR}/src/Screens/${projectName}/${file}`,
              `${CURR_DIR}/src/Screens/${projectName}/${projectName}${
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

        //=================================================

        fs.writeFileSync(writePath, contents, "utf8");
      } else if (stats.isDirectory()) {
        fsExtra.ensureDirSync(`${CURR_DIR}/src/Screens/${projectName}${file}`);

        createDirectoryContents(`${templatePath}/${file}`, `${projectName}`);
      }
    });
  }
  createDirectoryContents(templatePath, projectName);

  console.log("New screen is ready for use by /screenName-----");
});
