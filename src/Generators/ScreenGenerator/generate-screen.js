#! node

const inquirer = require("inquirer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const { render } = require("ejs");

const currentPath = path.join(__dirname);

const QUESTIONS = [
    {
        name: "screen-name",
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
    const screenName = answers["screen-name"];
    const package = JSON.parse(fs.readFileSync(`${PROJ_DIR}/package.json`, "utf-8"));

    if (Object.keys(package.dependencies).includes("vue")) {

    //----------------------------- Add Screen -------------------------------->
        let content;
        const page = fsExtra.readFileSync(`${currentPath}/ScreenTemplates/vue/screen.vue`,"utf-8");
        content = render(page, {screenName} ,content);
        fsExtra.ensureFileSync(`${PROJ_DIR}/src/pages/${screenName}.vue`);
        fsExtra.writeFileSync(`${PROJ_DIR}/src/pages/${screenName}.vue`,content);
        
    //----------------------------- Add Import -------------------------->
        let routeFile = fsExtra.readFileSync(`${PROJ_DIR}/src/router/index.js`,"utf-8");
    
        const lastImportStart = routeFile.lastIndexOf("import");
        const lastImportEnd =  routeFile.indexOf("\n",lastImportStart);
    
        const lastImport = routeFile.slice(lastImportStart,lastImportEnd+1);
        const newImport = lastImport + `import ${screenName} from "../pages/${screenName}.vue"; \n`;
        routeFile  = routeFile.replace(lastImport, newImport)
    
    //----------------------------- Add Route ----------------------------->
        const routesArray = routeFile.indexOf("routes")
        const arrayStart = routeFile.indexOf("[",routesArray);
        const arrayEnd = routeFile.indexOf("]",arrayStart);
    
        const routes = routeFile.slice(arrayStart,arrayEnd+1)
        const newRoutes = routes.replace("]",`  { path: '/${screenName.toLowerCase()}', component: ${screenName} }, \n]`)
        routeFile = routeFile.replace(routes,newRoutes)
    
        fsExtra.writeFileSync(`${PROJ_DIR}/src/router/index.js`,routeFile,"utf-8");
    
    //---------------------------- Add Navbar Item -------------------------------->
        let navbarFile = fsExtra.readFileSync(`${PROJ_DIR}/src/components/organisms/navbar.vue`,"utf-8");
        navbarFile = navbarFile.replace("</b-navbar-nav>", `  <b-nav-item to="/${screenName.toLowerCase()}">${screenName}</b-nav-item> \n      </b-navbar-nav>`);
    
        fsExtra.writeFileSync(`${PROJ_DIR}/src/components/organisms/navbar.vue`,navbarFile);       
        console.log(`New screen is ready for use by url /${screenName}`);

    } 
    else if (Object.keys(package.dependencies).includes("react")) {
        fs.mkdirSync(`${PROJ_DIR}/src/screens/${screenName}`);

        const templatePath = path.join(`${currentPath}`, "ScreenTemplates/react");

        function createDirectoryContents(templatePath, screenName) {
            const filesToCreate = fs.readdirSync(templatePath);

            const routePath = `${PROJ_DIR}/src`;

            const data = fs.readFileSync(`${routePath}/Routes.js`).toString().split("\n");
            data.splice(
                9,
                0,
                `<Route exact path="/${screenName}" component={${screenName}}></Route>`,
            );
            data.splice(3, 0, `import ${screenName} from "./screens/${screenName}";`);
            const text = data.join("\n");

            fs.writeFile(`${routePath}/Routes.js`, text, (err) => {
                if (err) return console.log(err);
            });

            filesToCreate.forEach((file, i) => {
                const origFilePath = `${templatePath}/${file}`;
                const stats = fs.statSync(origFilePath);
                if (stats.isFile()) {
                    let contents = fs.readFileSync(origFilePath, "utf8");
                    contents = render(contents, { screenName: screenName });

                    const writePath = `${PROJ_DIR}/src/screens/${screenName}/${file}`;

                    if (file.startsWith("screen")) {
                        const filesName = [".constant", "", ".utils"];
                        setTimeout(() => {
                            fs.rename(
                                `${PROJ_DIR}/src/screens/${screenName}/${file}`,
                                `${PROJ_DIR}/src/screens/${screenName}/${screenName}${
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
                    fsExtra.ensureDirSync(`${PROJ_DIR}/src/screens/${screenName}${file}`);

                    createDirectoryContents(`${templatePath}/${file}`, `${screenName}`);
                }
            });
        }
        createDirectoryContents(templatePath, screenName);
        console.log(`New screen is ready for use at url /${screenName}`);
    }
    else if (Object.keys(package.dependencies).includes("@anngular/core")) {
        //add angular code here
    }
    else {
        console.log("Works with react, angular and vue project only");
    }
});
