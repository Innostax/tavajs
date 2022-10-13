#! node

const inquirer = require("inquirer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const { render } = require("ejs");

const currentPath = path.join(__dirname);

const QUESTIONS = [
    {
        name: "project-name",
        type: "input",
        message: "What will be name of screen?",
        validate(input) {
            if (/^([A-Za-z\-\d])+$/.test(input)) return true;
            return "Screen name may only include letters, numbers, underscores and hashes.";
        },
    },
];

inquirer.prompt(QUESTIONS).then((answers) => {
    const PROJ_DIR = answers.projectDirectoryPath ? answers.projectDirectoryPath : process.cwd();
    const projectName = answers["project-name"];
    fs.mkdirSync(`${PROJ_DIR}/src/screens/${projectName}`);

    const templatePath = path.join(`${currentPath}`, "screenTemplates");

    function createDirectoryContents(templatePath, projectName) {
        const filesToCreate = fs.readdirSync(templatePath);

        const routePath = `${PROJ_DIR}/src`;

        const data = fs.readFileSync(`${routePath}/Routes.js`).toString().split("\n");
        data.splice(
            9,
            0,
            `<Route exact path="/${projectName}" component={${projectName}}></Route>`,
        );
        data.splice(3, 0, `import ${projectName} from "./screens/${projectName}";`);
        const text = data.join("\n");

        fs.writeFile(`${routePath}/Routes.js`, text, (err) => {
            if (err) return console.log(err);
        });

        filesToCreate.forEach((file, i) => {
            const origFilePath = `${templatePath}/${file}`;
            const stats = fs.statSync(origFilePath);
            if (stats.isFile()) {
                let contents = fs.readFileSync(origFilePath, "utf8");
                contents = render(contents, { screenName: projectName });

                const writePath = `${PROJ_DIR}/src/screens/${projectName}/${file}`;

                if (file.startsWith("screen")) {
                    const filesName = [".constant", "", ".utils"];
                    setTimeout(() => {
                        fs.rename(
                            `${PROJ_DIR}/src/screens/${projectName}/${file}`,
                            `${PROJ_DIR}/src/screens/${projectName}/${projectName}${
                                filesName[i - 1]
                            }.js`,
                            (error) => {
                                if (error) {
                                    // Show the error
                                } else {
                                    // List all the filenames after renaming
                                }
                            },
                        );
                    }, 300);
                }

                fs.writeFileSync(writePath, contents, "utf8");
            } else if (stats.isDirectory()) {
                fsExtra.ensureDirSync(`${PROJ_DIR}/src/screens/${projectName}${file}`);

                createDirectoryContents(`${templatePath}/${file}`, `${projectName}`);
            }
        });
    }
    createDirectoryContents(templatePath, projectName);

    console.log("New screen is ready for use by /screenName-----");
});
