const shell = require("shelljs");
const fsExtra = require("fs-extra");

const defaultEcho = shell.echo.bind(shell);

const echos = [];

shell.echo = function () {
  defaultEcho.apply(shell, arguments);
  echos.push(arguments[0]);
};

const removeProject = function (projectName){
  CURR_DIR = process.cwd();
  setTimeout(()=> {
    fsExtra.remove(`${CURR_DIR}/${projectName}`);
  }, "100")
}

module.exports = { defaultEcho, echos, echo: shell.echo, removeProject};
