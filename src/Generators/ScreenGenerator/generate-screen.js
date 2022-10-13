#! node

const inquirer = require("inquirer");
const fs = require("fs");
const fsExtra = require("fs-extra");
const path = require("path");
const { render } = require("ejs");
const shell = require("shelljs");
const currentPath = path.join(__dirname);
const chalk = require("chalk");

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
    const dependencies = Object.keys(package.dependencies);
    
    isReact = dependencies.includes("react");
    isAngular = dependencies.includes("@angular/core");
    isVue = dependencies.includes("vue");
    isBootstrap = dependencies.includes("bootstrap");
    isTailwind = dependencies.includes("tailwindcss");

    if (isVue) {
    //----------------------------- Add Screen -------------------------------->
        let content;
        const page = fsExtra.readFileSync(`${currentPath}/ScreenTemplates/vue/screen.vue`,"utf-8");
        content = render(page, {screenName, isTailwind} ,content);
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

        if (isBootstrap) {
            navbarFile = navbarFile.replace("</b-navbar-nav>", `  <b-nav-item to="/${screenName.toLowerCase()}">${screenName}</b-nav-item> \n      </b-navbar-nav>`);
        }
        else if (isTailwind) {
            const links = navbarFile.indexOf(`id="links"`);
            const linksStart = navbarFile.lastIndexOf("<div", links);
            const linksEnd = navbarFile.indexOf("</div>", links);
            const linksEndPos = navbarFile.indexOf(">", linksEnd);

            const allLinks = navbarFile.slice(linksStart,linksEndPos+1);
            const anchorLink = 
            `  <router-link
            to="/${screenName.toLowerCase()}"
            class="no-underline block mt-4 md:inline-block md:mt-0 text-gray-500 dark:hover:text-white hover:text-black mr-4"
            >
            ${screenName}
            </router-link>`
            const newLinks = allLinks.replace("</div>",anchorLink + "\n      </div>")
            navbarFile = navbarFile.replace(allLinks,newLinks);
        }
        fsExtra.writeFileSync(`${PROJ_DIR}/src/components/organisms/navbar.vue`,navbarFile);       
        shell.echo(
            chalk.cyanBright.italic.bold(
              `------------ New screen is ready for use at url /${screenName} -------------------`
            )
        );
    } 
    else if (isReact) {
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
        shell.echo(
            chalk.cyanBright.italic.bold(
              `------------ New screen is ready for use at url /${screenName} -------------------`
            )
        );
    }
    else if (isAngular) {
        shell.cd(`${PROJ_DIR}/src/app/pages`);
        shell.exec(`ng generate component ${screenName}`)

        let newName = screenName.charAt(0).toUpperCase() + screenName.slice(1) + "Component";

        // ---------------- Add Import --------------------

        let routeFile = fsExtra.readFileSync(`${PROJ_DIR}/src/app/app-routing.module.ts`,"utf-8");
        const firstImportStart = routeFile.indexOf("import");
        const lastImportEnd =  routeFile.indexOf("\n",firstImportStart);
        const lastImport = routeFile.slice(firstImportStart,lastImportEnd+1);
        const newImport = lastImport +  `import {${newName}} from "./pages/${screenName.toLowerCase()}/${screenName.toLowerCase()}.component"; \n`;
        routeFile  = routeFile.replace(lastImport, newImport)

        // -------------------Add Route--------------------

        const isOkta = dependencies.includes("@okta/okta-angular")
        const isAuth = dependencies.includes("@auth0/auth0-angular")

        const routesArray = routeFile.indexOf("routes")
        const arrayStart = routeFile.indexOf("[",routesArray);
        const arrayEnd = routeFile.indexOf("\n",arrayStart);
        const routes = routeFile.slice(arrayStart,arrayEnd+1)

        let newRoutes = "";
        if(isOkta) newRoutes = routes + `  { path: '${screenName.toLowerCase()}', component: ${newName}, canActivate: [OktaAuthGuard] }, \n`
        else if(isAuth) newRoutes = routes + `  { path: '${screenName.toLowerCase()}', component: ${newName}, canActivate: [AuthGuard] }, \n`
        else newRoutes = routes + `  { path: '${screenName.toLowerCase()}', component: ${newName} }, \n` 
        
        routeFile = routeFile.replace(routes, newRoutes)
        fsExtra.writeFileSync(`${PROJ_DIR}/src/app/app-routing.module.ts`,routeFile,"utf-8");

        // ------------Add navbar Item------------------

        let headerFile = fsExtra.readFileSync(`${PROJ_DIR}/src/app/pages/header/header.component.ts`,"utf-8");
        const screensArray = headerFile.indexOf("screens")
        const screensStart = headerFile.indexOf("[", screensArray);
        const screensEnd = headerFile.indexOf("]", screensStart);
    
        const routes1 = headerFile.slice(screensStart,screensEnd+1)
        const newScreens = routes1.replace("]",` ,"${screenName}"]`)
        headerFile = headerFile.replace(routes1, newScreens)
        fsExtra.writeFileSync(`${PROJ_DIR}/src/app/pages/header/header.component.ts`,headerFile,"utf-8");
        shell.echo(
            chalk.cyanBright.italic.bold(
              `------------ New screen is ready for use at url /${screenName} -------------------`
            )
        );

    }
    else {
        console.log("Works with react, angular and vue project only");
    }
});
