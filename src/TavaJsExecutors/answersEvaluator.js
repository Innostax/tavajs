#! node
const fsExtra = require("fs-extra");
const path = require("path");
const fs = require("fs");
const createBlobService = require("../utils/createBlobService");
const createDbConn = require("../utils/createDbConn");
const createLogger = require("../utils/createLogger");
const createEmailSevice = require("../utils/createEmailSevice");
const {
    createDirectoryContents,
    updateProjectDependencies,
    updateProjectScripts,
    copyFiles,
    getFilePaths,
    handleRenderEJS,
} = require("../utils/helper");

const {
    ANGULAR_THEME_FILE_PATH,
    AUTHENTICATIONS,
    CSS_FRAMEWORKS,
    CYPRESS_FILE_PATH,
    JEST_FILE_PATH,
    MOCHA_FILE_PATH,
    NIGHTWATCH_FILE_PATH,
    FRAMEWORKS,
    REACT_THEME_FILE_PATH,
    REDUX_FILE_PATH,
    VUE_THEME_FILE_PATH,
    REACT_DOCKER_FILE_PATH,
    NGRX_FILE_PATH,
    VUEX_FILE_PATH,
    VUEX_NODE_FILE_PATH,
    VUEX_USERMODAL_FILE_PATH,
    NGRX_CRUD_FILE_PATH,
    ANGULAR_CRUD_NODE_FILE_PATH,
    TAILWIND_ANGULAR_FILE_PATH,
    TAILWIND_REACT_FILE_PATH,
    TAILWIND_VUE_FILE_PATH,
    ANGULAR_DOCKER_FILE_PATH,
    VUE_DOCKER_FILE_PATH,
    DATABASES,
    LOGGER_SERVICES,
    EMAIL_SERVICES,
    TESTCASE_FRAMEWORKS,
    VUE_NETWORKSTATUS_FILE_PATH,
    REACT_NETWORKSTATUS_FILE_PATH,
    OKTA_FILE_PATH,
    BLOB_SERVICES,
    ANGULAR_MATERIAL_FILE_PATH,
    REACT_CSS_FRAMEWORK_FILE_PATH,
    PACKAGE_MANAGERS,
} = require("./constants");
const { SCRIPTS } = require("./scripts");
const { DEPENDENCIES, DEV_DEPENDENCIES } = require("./dependencies");

const { ANGULAR, REACT, VUE } = FRAMEWORKS;
const { AUTH0, COGNITO, OKTA } = AUTHENTICATIONS;
const { POSTGRES, MYSQL, MONGOOSE } = DATABASES;
const { WINSTON, SENTRY } = LOGGER_SERVICES;
const { SMTP, SENDGRID, AMAZON_SES } = EMAIL_SERVICES;
const { CYPRESS, JEST, MOCHAJS, NIGHTWATCHJS } = TESTCASE_FRAMEWORKS;
const { MATERIAL, BOOTSTRAP, TAILWIND } = CSS_FRAMEWORKS;
const { AWS_S3, AZURE } = BLOB_SERVICES;
const { YARN, NPM } = PACKAGE_MANAGERS;

const currentPath = path.join(__dirname, "../");
const NODE_JS = "node-js";

let dependencies = [];
let devDependencies = [];
let scripts = [];
let paths = [];

const handleAnswersEvaluator = async (frontEnd, backEnd, answers) => {
    const {
        projectName,
        frontEndName,
        frontEndChoice,
        authenticationChoice,
        backEndName,
        defaultRoute,
        dbName,
        emailServiceName,
        blobServiceName,
        loggerServiceName,
        cssFrameworkChoice,
        store,
        dockerService,
        theme,
        projectDirectoryPath,
        networkInformer,
        cicdPipelineIntegrate,
        managerChoice,
    } = answers;

    // Project Directory Path
    const CURR_DIR = projectDirectoryPath;
    const isStore = Boolean(store);
    const isThemeProvider = Boolean(theme == "light-dark-mode");
    const isDocker = Boolean(dockerService);
    const isMaterialUI = cssFrameworkChoice === MATERIAL;
    const isBootstrap = cssFrameworkChoice === BOOTSTRAP;
    const isTailWind = cssFrameworkChoice === TAILWIND;
    const isNetworkInformer = networkInformer;
    const isCICDPipelineIntegrate = cicdPipelineIntegrate;

    const isAuth0 = authenticationChoice === AUTH0;
    const isCognito = authenticationChoice === COGNITO;
    const isOkta = authenticationChoice === OKTA;
    const mongoSelected = dbName === MONGOOSE;
    const sequelizeSelected = dbName === POSTGRES || dbName === MYSQL;
    const isWinston = loggerServiceName === WINSTON;
    const isSentry = loggerServiceName === SENTRY;

    /* START: Testcases Framework */
    const isTestCasesFramework = Boolean(answers?.testCaseFramework);
    const isCypress = answers?.testCaseFramework === CYPRESS;
    const isJest = answers?.testCaseFramework === JEST;
    const isMocha = answers?.testCaseFramework === MOCHAJS;
    const isNightWatch = answers?.testCaseFramework === NIGHTWATCHJS;
    /* END: Testcases Framework */

    const isSMTP = emailServiceName === SMTP;
    const isSendgrid = emailServiceName === SENDGRID;
    const isAmazonSes = emailServiceName === AMAZON_SES;

    const isAwsS3 = blobServiceName === AWS_S3;
    const isAzure = blobServiceName === AZURE;

    const isFrontEndChoiceReact = frontEndChoice === REACT;
    const isFrontEndChoiceAngular = frontEndChoice === ANGULAR;
    const isFrontEndChoiceVue = frontEndChoice === VUE;
    const isBackEnd = Boolean(backEnd);

    const isYarn = managerChoice === YARN;
    const isNPM = managerChoice === NPM;

    // <---------------------------- For react, angular, vue ---------------------------------->
    if (frontEnd) {
        const { choice, path: frontEndPath } = frontEnd;
        // <------------------------- For Start: CSS Framework dependency ---------------------------->

        if (isFrontEndChoiceReact) {
            if (isMaterialUI) {
                dependencies = [...dependencies, ...DEPENDENCIES.MATERIALUI];
            }
            if (isBootstrap) {
                dependencies = [...dependencies, ...DEPENDENCIES.BOOTSTRAP];
            }
            if (isTailWind) {
                dependencies = [...dependencies, ...DEPENDENCIES.TAILWINDREACT];
                const res = getFilePaths(
                    TAILWIND_REACT_FILE_PATH,
                    currentPath,
                    frontEnd.path
                );
                paths = [...paths, ...res];
            }
        }
        if (isFrontEndChoiceAngular) {
            if (isTailWind) {
                dependencies = [...dependencies, ...DEPENDENCIES.TAILWINDCSS];

                const res = getFilePaths(
                    TAILWIND_ANGULAR_FILE_PATH,
                    currentPath,
                    frontEnd.path
                );
                paths = [...paths, ...res];
            } else if (isBootstrap) {
                dependencies = [...dependencies, ...DEPENDENCIES.ANGULARBOOTSTRAP];
            } else if (isMaterialUI) {
                dependencies = [...dependencies, ...DEPENDENCIES.ANGULARMATERIALUI];

                const res = getFilePaths(
                    ANGULAR_MATERIAL_FILE_PATH,
                    currentPath,
                    frontEnd.path
                );
                paths = [...paths, ...res];
            }
        }
        if (isFrontEndChoiceVue) {
            if (isTailWind) {
                dependencies = [...dependencies, ...DEPENDENCIES.TAILWINDVUE];
                const res = getFilePaths(
                    TAILWIND_VUE_FILE_PATH,
                    currentPath,
                    frontEnd.path
                );
                paths = [...paths, ...res];
            } else {
                dependencies = [...dependencies, ...DEPENDENCIES.BOOTSTRAPVUE];
            }
        }
        // <------------------------- For End: CSS Framework dependency ---------------------------->
        const templatePath = path.join(
            currentPath,
            "Frameworks/WebFrameworks",
            choice
        );

        const projectPath = backEnd
            ? `${projectName}/${frontEndName}`
            : projectName;

        fsExtra.ensureDirSync(frontEndPath);

        createDirectoryContents(
            templatePath,
            projectPath,
            defaultRoute,
            mongoSelected,
            sequelizeSelected,
            dbName,
            isSMTP,
            isSendgrid,
            isAmazonSes,
            isSentry,
            isWinston,
            isAuth0,
            isOkta,
            isCognito,
            isStore,
            frontEndName,
            backEndName,
            choice,
            isThemeProvider,
            isMaterialUI,
            isBootstrap,
            isTailWind,
            CURR_DIR,
            isJest,
            isCypress,
            isMocha,
            isNightWatch,
            blobServiceName,
            isNetworkInformer,
            isBackEnd,
            isCICDPipelineIntegrate,
            isYarn,
            isNPM,
            isDocker
        );

        // <------------------------------- Light/Dark Mode + React ---------------------------------->
        if (isThemeProvider && isFrontEndChoiceReact) {
            const res = getFilePaths(
                REACT_THEME_FILE_PATH,
                currentPath,
                frontEnd.path
            );
            paths = [...paths, ...res];
            if (isBootstrap || isTailWind) {
                handleRenderEJS(
                    `${currentPath}/Providers/ThemeProviders/react-themes/theme.js`,
                    { isBootstrap, isTailWind },
                    `${frontEnd.path}/src/theme.js`
                );
            }
        }

        if (isFrontEndChoiceReact && cssFrameworkChoice) {
            const res = getFilePaths(
                REACT_CSS_FRAMEWORK_FILE_PATH,
                `${currentPath}/Frameworks/CSSFrameworks/React/${cssFrameworkChoice}`,
                frontEnd.path
            );
            paths = [...paths, ...res];

            fsExtra.ensureDirSync(`${frontEnd.path}/src/components/organisms`);
            handleRenderEJS(
                `${currentPath}/Frameworks/CSSFrameworks/React/${cssFrameworkChoice}/organisms/NavBar.js`,
                {
                    isAuth0,
                    isThemeProvider,
                    isOkta,
                    isCognito,
                },
                `${frontEnd.path}/src/components/organisms/NavBar.js`
            );
        }

        // <----------------------------------- Light/Dark Mode + Vue ------------------------------------------------>
        if (isThemeProvider && isFrontEndChoiceVue) {
            const res = getFilePaths(VUE_THEME_FILE_PATH, currentPath, frontEnd.path);
            paths = [...paths, ...res];

            handleRenderEJS(
                `${currentPath}/Providers/ThemeProviders/vue-themes/theme.vue`,
                { isBootstrap, isTailWind },
                `${frontEnd.path}/src/theme.vue`
            );
        }

        // <----------------------------------- Light/Dark Mode + Angular ------------------------------------------------>
        if (isThemeProvider && isFrontEndChoiceAngular) {
            const res = getFilePaths(
                ANGULAR_THEME_FILE_PATH,
                currentPath,
                frontEnd.path
            );
            paths = [...paths, ...res];
        }

        // <----------------------------------- Network Informer + React ------------------------------------------------>
        if (isNetworkInformer && isFrontEndChoiceReact) {
            const res = getFilePaths(
                REACT_NETWORKSTATUS_FILE_PATH,
                currentPath,
                frontEnd.path
            );
            paths = [...paths, ...res];
        }

        // <----------------------------------- Network Informer + Vue ------------------------------------------------>
        if (isNetworkInformer && isFrontEndChoiceVue) {
            const res = getFilePaths(
                VUE_NETWORKSTATUS_FILE_PATH,
                currentPath,
                frontEnd.path
            );
            paths = [...paths, ...res];
        }

        // <---------------------------- For TestCases Framework ------------------------------------>
        if (isTestCasesFramework) {
            // CYPRESSS
            if (isCypress) {
                const res = getFilePaths(CYPRESS_FILE_PATH, currentPath, frontEnd.path);
                paths = [...paths, ...res];

                devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.CYPRESS];

                scripts = [...scripts, ...SCRIPTS.CYPRESS];
            }

            if (isJest && isFrontEndChoiceVue) {
                const res = getFilePaths(JEST_FILE_PATH, currentPath, frontEnd.path);
                paths = [...paths, ...res];

                handleRenderEJS(
                    `${currentPath}/Frameworks/TestCasesFrameworks/JestTests/TestScripts/app.spec.js`,
                    { frontEndChoice },
                    `${frontEnd.path}/__tests__/app.spec.js`
                );
                devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.JEST_VUE];

                scripts = [...scripts, ...SCRIPTS.JEST_VUE];
            }

            if (isJest && isFrontEndChoiceReact) {
                handleRenderEJS(
                    `${currentPath}/Frameworks/TestCasesFrameworks/JestTests/TestScripts/app.spec.js`,
                    { frontEndChoice },
                    `${frontEnd.path}/src/__tests__/app.spec.js`
                );
                devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.JEST_REACT];

                scripts = [...scripts, ...SCRIPTS.JEST_REACT];
            }

            if (isMocha && isFrontEndChoiceVue) {
                const res = getFilePaths(MOCHA_FILE_PATH, currentPath, frontEnd.path);
                paths = [...paths, ...res];

                devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.MOCHA];

                scripts = [...scripts, ...SCRIPTS.MOCHA];
            }

            if (isNightWatch) {
                const res = getFilePaths(
                    NIGHTWATCH_FILE_PATH,
                    currentPath,
                    frontEnd.path
                );
                paths = [...paths, ...res];

                devDependencies = [...devDependencies, ...DEV_DEPENDENCIES.NIGHTWATCH];

                scripts = [...scripts, ...SCRIPTS.NIGHTWATCH];
            }
        }
    }

    // <------------------ CI CD Pipeline ----------------------------------->
    if (isCICDPipelineIntegrate) {
        if (isFrontEndChoiceAngular) {
            handleRenderEJS(
                `${currentPath}/Providers/CICDWorkflow/angular-build.yml`,
                { isCICDPipelineIntegrate },
                `${frontEnd.path}/.github/workflows/build.yml`
            );
        }
        if (isFrontEndChoiceVue) {
            handleRenderEJS(
                `${currentPath}/Providers/CICDWorkflow/vue-build.yml`,
                { isCICDPipelineIntegrate },
                `${frontEnd.path}/.github/workflows/build.yml`
            );
        }
        if (isFrontEndChoiceReact) {
            handleRenderEJS(
                `${currentPath}/Providers/CICDWorkflow/react-build.yml`,
                { isCICDPipelineIntegrate },
                `${frontEnd.path}/.github/workflows/build.yml`
            );
        }
    }

    // <---------------------------- node-js ---------------------------------->
    if (backEnd) {
        const { choice, path: backEndPath } = backEnd;
        const templatePath = path.join(
            currentPath,
            "Frameworks/BackendFrameworks",
            choice
        );
        const projectPath = frontEnd
            ? `${projectName}/${backEndName}`
            : projectName;

        fsExtra.ensureDirSync(backEndPath);
        createDirectoryContents(
            templatePath,
            projectPath,
            defaultRoute,
            mongoSelected,
            sequelizeSelected,
            dbName,
            isSMTP,
            isSendgrid,
            isAmazonSes,
            isSentry,
            isWinston,
            isAuth0,
            isOkta,
            isCognito,
            isStore,
            frontEndName,
            backEndName,
            choice,
            isThemeProvider,
            isMaterialUI,
            isBootstrap,
            isTailWind,
            CURR_DIR,
            isJest,
            isCypress,
            isMocha,
            isNightWatch,
            blobServiceName,
            isNetworkInformer,
            isBackEnd,
            isCICDPipelineIntegrate,
            isYarn,
            isNPM,
            isDocker
        );

        const ROUTE_FILES = [
            {
                oldName: "route.js",
                folder: "routes",
                newName: `${defaultRoute}.routes.js`,
            },
            {
                oldName: "controller.js",
                folder: "controllers",
                newName: `${defaultRoute}.controllers.js`,
            },
        ];

        ROUTE_FILES.forEach((each) =>
            fs.rename(
                `${backEnd.path}/${each.folder}/${each.oldName}`,
                `${backEnd.path}/${each.folder}/${each.newName}`,
                () => {}
            )
        );

        // creating utils dir
        if (emailServiceName || blobServiceName || loggerServiceName) {
            fsExtra.ensureDirSync(`${backEnd.path}/utils`);
        }

        // <---------------------------- For Email service ---------------------------------->
        if (emailServiceName) {
            const emailTemplatePath = path.join(
                currentPath,
                "Services/EmailServices",
                emailServiceName
            );
            createEmailSevice(
                emailServiceName,
                emailTemplatePath,
                backEnd.path,
                currentPath
            );
        }

        // <---------------------------- For Blob service ---------------------------------->
        if (blobServiceName) {
            const blobTemplatePath = path.join(
                currentPath,
                "Services/BlobServices",
                blobServiceName
            );
            createBlobService(
                backEnd.path,
                blobServiceName,
                blobTemplatePath,
                backEnd.path
            );
        }

        // <---------------------------- For Logger service ---------------------------------->
        if (loggerServiceName) {
            const loggerTemplatePath = path.join(
                currentPath,
                "Services/LoggerServices"
            );

            createLogger(
                backEnd.path,
                loggerServiceName,
                loggerTemplatePath,
                defaultRoute
            );
        }

        // <---------------------------- For Database service ---------------------------------->
        if (dbName) {
            createDbConn(backEnd.path, dbName, defaultRoute, `${currentPath}`);
        }

        // <---------------------------- For ENV file ---------------------------------->
        if (!isDocker) {
            const envFilePath =
        frontEnd?.choice && backEnd?.choice
            ? `${backEnd.path}/.env`
            : `${CURR_DIR}/${projectName}/.env`;
            handleRenderEJS(
                `${currentPath}/Environments/BackendEnvironment/.dbEnv`,
                {
                    dbName,
                    frontEnd,
                    backEnd,
                    isAuth0,
                    isOkta,
                    isSMTP,
                    isSendgrid,
                    isAmazonSes,
                    isAwsS3,
                    isAzure,
                },
                envFilePath
            );
        }
    }

    // <---------------------------- For Docker integration ---------------------------------->
    if (isDocker) {
        const dockerPath = path.join(currentPath, "Services/DockerServices");
        let res = [];

        if (isFrontEndChoiceReact) {
            res = getFilePaths(REACT_DOCKER_FILE_PATH, dockerPath, frontEnd.path);
            paths = [...paths, ...res];
        } else if (isFrontEndChoiceAngular) {
            res = getFilePaths(ANGULAR_DOCKER_FILE_PATH, dockerPath, frontEnd.path);
            paths = [...paths, ...res];
        } else if (isFrontEndChoiceVue) {
            res = getFilePaths(VUE_DOCKER_FILE_PATH, dockerPath, frontEnd.path);
            paths = [...paths, ...res];
        }

        if (backEnd?.choice === NODE_JS) {
            res = getFilePaths(REACT_DOCKER_FILE_PATH, dockerPath, backEnd.path);
            paths = [...paths, ...res];
        }

        const dockerSrcPath = backEnd
            ? "db-docker-compose.yml"
            : "docker-compose.yml";
        const dockerDestPath =
      frontEnd && backEnd
          ? `${projectName}/docker-compose.yml`
          : "docker-compose.yml";

        handleRenderEJS(
            `${dockerPath}/${dockerSrcPath}`,
            {
                frontEnd,
                backEnd,
                projectName,
                frontEndChoice,
                frontEndName,
                backEndName,
                mongoSelected,
                sequelizeSelected,
            },
            `${CURR_DIR}/${dockerDestPath}`
        );
    }

    // <---------------------------- For Store integration ---------------------------------->
    if (isStore) {
    // <---------------------------- Redux ---------------------------------->
        if (isFrontEndChoiceReact) {
            dependencies = [...dependencies, ...DEPENDENCIES.REACT];

            const res = getFilePaths(REDUX_FILE_PATH, currentPath, frontEnd.path);
            paths = [...paths, ...res];

            handleRenderEJS(
                `${currentPath}/StateManagement/reduxTemplates/demoUser/users.actions.js`,
                { defaultRoute },
                `${frontEnd.path}/src/screens/Users/users.actions.js`
            );
            handleRenderEJS(
                `${currentPath}/StateManagement/reduxTemplates/userform/DeleteConfirmationModal.js`,
                { isBootstrap, isTailWind, isMaterialUI },
                `${frontEnd.path}/src/screens/Users/DeleteConfirmationModal.js`
            );
            if (!isBackEnd) {
                handleRenderEJS(
                    `${currentPath}/StateManagement/reduxTemplates/userform/Adduser.js`,
                    {
                        isMaterialUI,
                        isBootstrap,
                        isTailWind,
                        isBackEnd,
                    },
                    `${frontEnd.path}/src/screens/Users/AddUser.js`
                );
            }
            if (isBackEnd) {
                handleRenderEJS(
                    `${currentPath}/StateManagement/reduxTemplates/userform/AdduserForm.js`,
                    { isMaterialUI, isBootstrap, isTailWind },
                    `${frontEnd.path}/src/screens/Users/AddUser.js`
                );
            }
        }

        // <---------------------------------MaterialUI Dark Theme----------------------->

        if (isThemeProvider && isFrontEndChoiceReact) {
            handleRenderEJS(
                `${currentPath}/Frameworks/WebFrameworks/react/src/App.js`,
                {
                    isMaterialUI,
                    isBootstrap,
                    isTailWind,
                    isBackEnd,
                    isAuth0,
                    isThemeProvider,
                    isOkta,
                    isCognito,
                    isNetworkInformer,
                },
                `${frontEnd.path}/src/App.js`
            );
        }

        // <--------------------------------- Vuex ---------------------------->
        if (isFrontEndChoiceVue) {
            let res = getFilePaths(VUEX_FILE_PATH, currentPath, frontEnd.path);
            paths = [...paths, ...res];

            handleRenderEJS(
                `${currentPath}/StateManagement/vuexTemplates/store/modules/users.js`,
                { isBackEnd },
                `${frontEnd.path}/src/store/modules/users.js`
            );

            const userModalPath = isBootstrap
                ? path.join(currentPath, "StateManagement/vuexTemplates/bootstrap")
                : path.join(currentPath, "StateManagement/vuexTemplates/tailwind");

            res = getFilePaths(
                VUEX_USERMODAL_FILE_PATH,
                userModalPath,
                frontEnd.path
            );
            paths = [...paths, ...res];

            handleRenderEJS(
                `${userModalPath}/userModal/ShowUsers.vue`,
                { isBackEnd },
                `${frontEnd.path}/src/userModal/ShowUsers.vue`
            );

            if (isBackEnd) {
                const res = getFilePaths(
                    VUEX_NODE_FILE_PATH,
                    currentPath,
                    frontEnd.path
                );
                paths = [...paths, ...res];
            }
        }
        // <--------------------------------- Ngrx ---------------------------->
        if (isFrontEndChoiceAngular) {
            const res = getFilePaths(NGRX_FILE_PATH, currentPath, frontEnd.path);
            paths = [...paths, ...res];

            if (isStore && !dbName) {
                const res = getFilePaths(
                    NGRX_CRUD_FILE_PATH,
                    currentPath,
                    frontEnd.path
                );
                paths = [...paths, ...res];
                handleRenderEJS(
                    `${currentPath}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.html`,
                    { isTailWind, isBootstrap, isMaterialUI },
                    `${frontEnd.path}/src/app/shared/components/user-actions-modal/user-actions-modal.component.html`
                );
                handleRenderEJS(
                    `${currentPath}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.ts`,
                    { isStore, isBackEnd, dbName },
                    `${frontEnd.path}/src/app/shared/components/user-actions-modal/user-actions-modal.component.ts`
                );
            }
        }
    }

    // <-------------- For angular node crud ------------------->
    if (isFrontEndChoiceAngular && isBackEnd && dbName) {
        const res = getFilePaths(
            ANGULAR_CRUD_NODE_FILE_PATH,
            currentPath,
            frontEnd.path
        );
        paths = [...paths, ...res];
        handleRenderEJS(
            `${currentPath}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.html`,
            { isTailWind, isBootstrap, isMaterialUI },
            `${frontEnd.path}/src/app/shared/components/user-actions-modal/user-actions-modal.component.html`
        );
        handleRenderEJS(
            `${currentPath}/StateManagement/ngrxTemplates/user-actions-modal/user-actions-modal.component.ts`,
            { isStore, isBackEnd, dbName },
            `${frontEnd.path}/src/app/shared/components/user-actions-modal/user-actions-modal.component.ts`
        );
        handleRenderEJS(
            `${currentPath}/Services/HttpServices/AngularServices/base-url.ts`,
            { defaultRoute },
            `${frontEnd.path}/src/app/shared/base-url.ts`
        );
    }

    // <---------------------------- For Authentication service ---------------------------------->
    if (isAuth0) {
        handleRenderEJS(
            `${currentPath}/Environments/FrontendEnvironment/.authEnv`,
            { frontEndChoice },
            `${frontEnd.path}/.env`
        );

        if (isFrontEndChoiceAngular) {
            dependencies = [
                ...dependencies,
                ...DEPENDENCIES.AUTH0_SPA,
                ...DEPENDENCIES.AUTH0_ANGULAR,
            ];
        }

        if (isFrontEndChoiceReact) {
            dependencies = [...dependencies, ...DEPENDENCIES.AUTH0_SPA];

            const reactSpaPath = path.join(
                currentPath,
                "Services/AuthenticationServices/authTemplates/"
            );
            handleRenderEJS(
                `${reactSpaPath}react-spa.js`,
                { isStore },
                `${frontEnd.path}/src/react-spa.js`
            );
        }
        if (isFrontEndChoiceVue) {
            dependencies = [...dependencies, ...DEPENDENCIES.AUTH0_VUE];
        }
    } else if (isCognito) {
        if (isFrontEndChoiceVue) {
            dependencies = [...dependencies, ...DEPENDENCIES.COGNITO_VUE];
        }
        if (isFrontEndChoiceAngular) {
            dependencies = [...dependencies, ...DEPENDENCIES.COGNITO_ANGULAR];
        }
        if (isFrontEndChoiceReact) {
            dependencies = [...dependencies, ...DEPENDENCIES.COGNITO_REACT];
        }

        handleRenderEJS(
            `${currentPath}/Environments/FrontendEnvironment/.cognitoEnv`,
            { frontEndChoice },
            `${frontEnd.path}/.env`
        );
    } else if (isOkta) {
        dependencies = [...dependencies, ...DEPENDENCIES.OKTA_AUTH_JS];
        if (isFrontEndChoiceReact) {
            dependencies = [...dependencies, ...DEPENDENCIES.OKTA_REACT];
        } else if (isFrontEndChoiceAngular) {
            dependencies = [...dependencies, ...DEPENDENCIES.OKTA_ANGULAR];
        } else if (isFrontEndChoiceVue) {
            dependencies = [...dependencies, ...DEPENDENCIES.OKTA_VUE];
        }

        if (isFrontEndChoiceReact || isFrontEndChoiceAngular) {
            const res = getFilePaths(OKTA_FILE_PATH, currentPath, frontEnd.path);
            paths = [...paths, ...res];
        }

        handleRenderEJS(
            `${currentPath}/Environments/FrontendEnvironment/.oktaEnv`,
            { frontEndChoice },
            `${frontEnd.path}/.env`
        );
    }

    copyFiles(paths);

    // These methods are used to update the dependencies and scripts respectively.
    if (frontEnd) {
        updateProjectDependencies(frontEnd.path, dependencies, devDependencies);
        updateProjectScripts(frontEnd.path, scripts);
    }
};

module.exports = { handleAnswersEvaluator };
