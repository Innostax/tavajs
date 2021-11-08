#! node
const inquirer = require("inquirer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const CURR_DIR = process.cwd();
const path = require("path");
const { render } = require("../../src/utils/template");
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
  const projectName = answers["routeName"];
  console.log("");
  const templatePath = `${currentPath}/routesTemplates`;

  function createDirectoryContents(templatePath, projectName) {
    const filesToCreate = fs.readdirSync(templatePath);

    var data = fs
      .readFileSync(`${CURR_DIR}/Routes/index.js`)
      .toString()
      .split("\n");

    data.splice(5, 0, `app.use( '/${projectName}', ${projectName})`);

    data.splice(
      2,
      0,
      `const  ${projectName}= require("./${projectName}.routes");`
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

        contents = render(contents, { routeName: projectName });
        const writePath = [
          `${CURR_DIR}/Controllers/${file}`,
          `${CURR_DIR}/Models/${file}`,
          `${CURR_DIR}/Routes/${file}`,
        ];

        fs.writeFileSync(writePath[i], contents, "utf8");
        i++;

        //--------------------rename file-----------

        if (file.startsWith("route")) {
          const fileName = [".controller", "", ".routes"];
          setTimeout(function name() {
            fs.rename(
              `${CURR_DIR}/Controllers/${file}`,
              `${CURR_DIR}/Controllers/${projectName}.controllers.js`,
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
              `${CURR_DIR}/Routes/${projectName}.routes.js`,
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
              `${CURR_DIR}/Models/${projectName}.js`,
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
    });
  }
  createDirectoryContents(templatePath, projectName);
  console.log(`New Routes is ready for use by /${projectName}-----`);
});
