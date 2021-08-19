// #!/usr/bin/env node

const inquirer = require("inquirer");
const fs = require("fs");
const { render } = require("./utils/template");
const path = require("path");
const exec = require('child_process').exec;

const CURR_DIR = process.cwd();


const QUESTIONS = [
  {
    name: "projectChoice",
    type: "list",
    message: "What project template would you like to generate?",
    choices: [
      { name: 'React', value: 'react' },
      { name: 'Node', value: 'node-js' },
      { name: 'React + Node', value: 'react_Node' },
    ],
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
  },
  {
    name: "react-name",
    type: "input",
    message: "React project  name:",
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "React Project name may only include letters, numbers, underscores and hashes.";
    },
    when:(answers)=>{return answers.projectChoice=='react_Node'}
  },
  {
    name: "node-name",
    type: "input",
    message: "Node Project name:",
    validate: function(input) {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else
        return "Project name may only include letters, numbers, underscores and hashes.";
    },
    when:(answers)=>{return answers.projectChoice=='react_Node' }
  },
  {
    name: "default-route",
    type: "input",
    message: "Enter the default route",
    when: (answers) => {
      return (answers.projectChoice == "node-js" || answers.projectChoice=='react_Node');
    },
  },
  {
    name:"emailService",
    type: "list",
    message:"do you want e-mail services?",
    choices:[
      { name:'yes', value:'yes'  },
      { name:'no', value:'no' }
    ],
    when:(answers)=>{return (answers.projectChoice=='react_Node' || answers.projectChoice=='node-js')}
  },
  {
    name:'emailServiceName',
    type:"list",
    message:"which Email service do you want?",
    choices:[
      { name:'SendGrid', value:'sendgrid' },
      { name:'Amazon Ses', value:'amazon_ses' },
      { name:'Test 2', value:'test2' },
      { name:'Test 3', value:'test3' }
    ],
    when:(answers)=>{return answers.emailService=='yes'}
  }

];

inquirer.prompt(QUESTIONS).then(answers => {
  const projectChoice = answers["projectChoice"];
  const projectName = answers["project-name"];
  const emailService = answers["emailService"];
  const templatePath = path.join(__dirname, "templates", projectChoice);
  const defaultRoute = answers["default-route"];
  fs.mkdirSync(`${CURR_DIR}/${projectName}`);

  //for react + node
  if(projectChoice=="react_Node"){
    const reactName = answers["react-name"];
    const nodeName = answers["node-name"];
    fs.mkdirSync(`${CURR_DIR}/${projectName}/${reactName}`);
    fs.mkdirSync(`${CURR_DIR}/${projectName}/${nodeName}`);
    const reactTemplatePath = path.join(__dirname, "templates", "react");
    const nodeTemplatePath = path.join(__dirname, "templates", "node-js");
    createDirectoryContents(reactTemplatePath, `${projectName}/${reactName}`,defaultRoute);
    createDirectoryContents(nodeTemplatePath,`${projectName}/${nodeName}`,defaultRoute);
    var nodePath=`${CURR_DIR}/${projectName}/${nodeName}`;
    // console.dir(object)
  
  }
  // for react or Node
  else{
       var nodePath=path.join(CURR_DIR,projectName);
  createDirectoryContents(templatePath, projectName,defaultRoute);  
  
    } 
   //for email Sevices
   if(emailService=='yes'){
    const emailServiceName = answers["emailServiceName"];
    const emailTemplatePath = path.join(__dirname, "code_templates", emailServiceName);

    createEmailSevice(emailServiceName,emailTemplatePath,nodePath);
  }
  console.log('Boiler-Plate created successfully');
});

function createDirectoryContents(templatePath, newProjectPath, newDefaultRoute) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = `${templatePath}/${file}`;

    // get stats about the current file
    const stats = fs.statSync(origFilePath);

    if (stats.isFile()) {
      let contents = fs.readFileSync(origFilePath, "utf8");
      const elements = newProjectPath.split('/');
      const NameProject = elements[elements.length-1];
      contents = render(contents, {
        projectName: NameProject,
        defaultRoute: newDefaultRoute,
      });

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
function createEmailSevice(emailServiceName,emailTemplatePath,nodePath){
  let contents = fs.readFileSync(emailTemplatePath+'.js',"utf-8");
          const servicePath=path.join(nodePath,'services');
          fs.mkdirSync(servicePath);
          // contents = render(contents, { projectName: projectName });
          fs.writeFile(`${servicePath}`+'/'+`${emailServiceName}`+'.js',contents, function (err) {
            if (err) throw err;
            console.log('Email service created successfully.');
          });
}
