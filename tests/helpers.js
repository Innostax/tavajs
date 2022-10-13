const shell = require("shelljs");
const fsExtra = require("fs-extra");

const defaultEcho = shell.echo.bind(shell);

const echos = [];

shell.echo = function () {
  defaultEcho.apply(shell, arguments);
  echos.push(arguments[0]);
};

const removeProject = async (projectName) => {
  const projectDirectoryPath = process.cwd();
  setTimeout(()=> {
    fsExtra.remove(`${projectDirectoryPath}/${projectName}`);
  }, "3000")
}

module.exports = { defaultEcho, echos, echo: shell.echo, removeProject};
