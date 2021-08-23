#!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const { render } = require("./utils/template");
const path = require("path");
const fsExtra = require('fs-extra');
const CURR_DIR = process.cwd();

const CHOICES = fs.readdirSync(path.join(__dirname, "templates"));
const AUTH_CHOICES= ['Auth0','Cognito','Okta','None']

const QUESTIONS = [
  {
    name: "projectChoice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: CHOICES
  },
  {
    name:"authentication-choice",
    type:"list",
    message:"What Authentication Service you want to use?",
    choices:AUTH_CHOICES,
    when: (answers)=>answers.projectChoice === 'react'
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

inquirer.prompt(QUESTIONS).then(async answers => {
  const projectChoice = answers["projectChoice"];
  const projectName = answers["project-name"];
  let useEffectImport = ' '
  let auth0UseEffect = ''
  let renderCondition = ''
  let auth0Imports =''
  const templatePath = path.join(__dirname, "templates", projectChoice);
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);
  if(projectChoice==='react'){
          let contents = fs.readFileSync(`${CURR_DIR}/`+"code_templates/for-React.js","utf-8");
          contents = render(contents, { projectName: projectName });
          fs.writeFile(`${CURR_DIR}/${projectName}/${projectName}`+'.js',contents, function (err) {
            if (err) throw err;
            console.log('File is created successfully.');
          });
          // console.log(contents);
      }    
      if(answers["authentication-choice"]==='Auth0') {
        useEffectImport=`,{useEffect}`
        auth0UseEffect=`const { loginWithRedirect,isUserAuthenticated } = useAuth0()
         useEffect(() => {
        if (isUserAuthenticated === false) {
        loginWithRedirect({ appState: { target: window.location.pathname } })
          }
       }, [isUserAuthenticated, loginWithRedirect])`
        auth0Imports=`import { useAuth0 } from './react-spa'`
        renderCondition='isUserAuthenticated&&'
      }       
  createDirectoryContents(templatePath, projectName, useEffectImport, auth0UseEffect, auth0Imports, renderCondition);
  if(answers["authentication-choice"]==='Auth0')
  {
    console.log('entered')
    // generator.npmInstall('',{})
    const filesMap=[
      // {srcFolder:'indexTemplates',srcFileName:'authIndex.js', destFolder:'src',destFileName:'index.js'},
      {srcFolder:'authTemplates',srcFileName:'react-spa.js', destFolder:'src', destFileName:'react-spa.js'},
      {srcFolder:'envTemplates',srcFileName:'.authenv', destFolder:'', destFileName:'.env'},
    ]
    const auth_adapter={name:"@auth0/auth0-spa-js",version:"^1.10.0"}

    const packagefile = await fsExtra.readJSON(`${CURR_DIR}\\${projectName}\\package.json`,{});
    const newPackageFile = {...packagefile,dependencies:{...packagefile.dependencies,[auth_adapter.name]:auth_adapter.version}}
    fsExtra.writeJson(`${CURR_DIR}\\${projectName}\\package.json`, newPackageFile ,{})

    filesMap.map((each)=>{
      fs.copyFile(`${CURR_DIR}\\src\\${each.srcFolder}\\${each.srcFileName}`,
      `${CURR_DIR}\\${projectName}\\${each.destFolder}\\${each.destFileName}`,(err) => {
        if (err) {
          console.log("Error Found:", err);
             }
            }
          )}
        )
  }
  else if(answers["authentication-choice"]==='Okta')
  {
    const okta_adapter={name:"@okta/okta-react",version:"^6.2.0"}
  }

})
function createDirectoryContents(templatePath, newProjectPath, useEffectImport, auth0UseEffect, auth0Imports, renderCondition) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");

      contents = render(contents, { projectName: newProjectPath, useEffectImport, auth0UseEffect, auth0Imports, renderCondition });
      const writePath = `${CURR_DIR}/${newProjectPath}/${file}`;
      console.log(writePath,contents)
      fs.writeFileSync(writePath, contents, "utf8");
    } else if (stats.isDirectory()) {
      fs.mkdirSync(`${CURR_DIR}/${newProjectPath}/${file}`);

      // recursive call
      createDirectoryContents(
        `${templatePath}/${file}`,
        `${newProjectPath}/${file}`, useEffectImport, auth0UseEffect, auth0Imports, renderCondition
      );
    }
  });
}

