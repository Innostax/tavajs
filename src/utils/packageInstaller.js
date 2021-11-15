const shell = require("shelljs");
function packageInstaller(managerChoice, frontEndName,path)
{
  shell.cd(`${path}`);
if (managerChoice==="npm") {
  console.log(
    "-------------NPM loading on ",frontEndName,", Wait for finish--------------------"
  );
  shell.exec("npm install --legacy-peer-deps");
  console.log("-------------NPM process completed--------------------");
}
if (managerChoice==="yarn") {
  console.log(
    "-------------yarn loading on ",frontEndName,", Wait for finish--------------------"
  );
  shell.exec("npm install -g yarn");
  shell.exec("yarn");
  console.log("-------------yarn process completed--------------------");
}
}
module.exports=packageInstaller